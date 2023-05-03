import { z } from 'zod'
import { CustomerSchema } from './customer'
import { RouteSchema } from './routes'
import { UserSchema } from './user'

export const BookingSchema = z.object({
    id: z.number(),
   bookingId: z.number(),
   customerId: z.string(),
   customer: CustomerSchema.optional(),

   routeId: z.string(),
   route: RouteSchema.optional(),

   customerRoute: z.string(),

   bookedAmount: z.number(),

   bookedSeat: z.string(),

   referenceNo: z.string().nullable().optional(),
   
   userId: z.string().nullable().optional(),

   user: UserSchema.optional(),
   
   isPaid: z.boolean(),
})

export type Route = z.infer<typeof BookingSchema>
