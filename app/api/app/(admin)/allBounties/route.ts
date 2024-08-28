import { NextRequest, NextResponse } from "next/server";
import { verifyUser } from "@/helperFuncs/functions";
import { prisma } from "@/lib/utils";
import { cookies } from "next/headers";

export const GET = async (req:NextRequest) => {
    const token = cookies().get("token");
    const {valid, userId} = await verifyUser(token?.value as string);
    
    if(!valid){
        return NextResponse.json({
            msg:"User is unauthorized"
        },{
            status: 403
        })
    }

    try{
        const bounties = await prisma.bounties.findMany({
            where:{
                isVerified: false
            },
            select:{
                id: true,
                imageUrl: true,
                hostId: true
            }
        })

        return NextResponse.json({
            success: true,
            bounties
        })

    }catch(err){
        console.log(err);
        return NextResponse.json({
            msg: err
        })
    }
}