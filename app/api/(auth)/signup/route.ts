import jwt from '@tsndr/cloudflare-worker-jwt'
import axios from "axios"
import { prisma } from "@/lib/utils"
import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { verifySignature } from "@/app/api/helperFuncs/functions"

export const runtime = 'edge';

const JWT_SECRET = process.env.JWT_SECRET;
console.log("jwtsecret:", JWT_SECRET);

export async function POST(req: NextRequest) {
    const { email, username, publicKey, signature }: {
        email: string,
        username: string,
        publicKey: any,
        signature: any
    } = await req.json();

    // If publickey & signature or either are null & correct as well
    if (!publicKey || !signature) {
        return NextResponse.json({ msg: "Check your wallet credentials please." })
    }

    const { isSuccess, msg } = await verifySignature(publicKey, signature);
    if (!isSuccess) {
        return NextResponse.json({
            msg
        })
    }

    // check if user exists already
    const user = await prisma.host.findFirst({
        where: {
            email
        }
    })

    if (user) {
        return NextResponse.json({ msg: "User exists already!" }, { status: 400 })
    }

    try {
        await prisma.host.create({
            data: {
                email,
                username,
                publicKey
            }
        })

        const token = await jwt.sign({ email }, JWT_SECRET);
        cookies().set("token", token, { maxAge: 60 * 60 * 24 * 7 });
    } catch (err: any) {
        console.log(err);
        return NextResponse.json({ msg: err.message })
    }

    return NextResponse.json({
        msg: "Signed in successful",
        success: true
    }, {
        status: 200
    })
}

