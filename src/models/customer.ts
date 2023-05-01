import { z } from 'zod'
import { CustomerTypes } from '../enums/CustomerType'

export const CustomerSchema = z.object({
    id: z.number(),
    customer: z.object({
        id: z.string(),
        name: z.string(),
        phone: z.string(),
        createdAt: z.string()
    }),
    isVerified: z.boolean(),
    validIdImageUrl: z.string().nullable(),
    type: z.enum(CustomerTypes),
    bookingId: z.string().nullable()
})

export type Customer = z.infer<typeof CustomerSchema>
