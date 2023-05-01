import { z } from 'zod'
import { UserSchema } from './user'
import { CustomerTypes } from '../enums/CustomerType'

export const PassengerSchema = z.object({
    id: z.number(),
    name: z.string().min(1, 'Name is required'),
    phone: z.string().min(1, 'Phone is required').nullable(),
    type: z.enum(CustomerTypes),
    validIdImageUrl: z.string().nullable().optional(),
    isVerified: z.boolean().optional(),
    userId: z.number(),
    user: UserSchema.optional(),
})

export type Passenger = z.infer<typeof PassengerSchema>
