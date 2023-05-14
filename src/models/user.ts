import { z } from 'zod'

export const UserSchema = z.object({
    id: z.number(),
    fullName: z.string(),
    username: z.string(),
    password: z.string().optional(),
})

export type User = z.infer<typeof UserSchema>
