import z from "zod"

export const createBountyType = z.object({
    type: z.union([z.literal('Project'),z.literal('Grant'),z.literal('Bounty')]),
    questions: z.array(z.object({
        question: z
        .string()
        .max(75, "Question must be at most 75 characters long."),
        type: z.union([z.literal('Text'),z.literal('Email'),z.literal('Number')])
    })),
    imageUrl: z.string().url(),
    name: z.string(),
    description: z.string(),
    interval: z.string(),
    amount: z.number(),
    submitText: z.string()
})