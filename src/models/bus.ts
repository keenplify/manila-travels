import { z } from 'zod'
import { RouteSchema } from './routes'

export const BusSchema = z.object({
    no: z.string(),
    assigned: z.boolean(),
    created: z.string(),
    status: z.string(),
    seats: z.object({
        busNo: z.string(),
        booked: z.string().nullable()
    }).optional()
})

export type Route = z.infer<typeof RouteSchema>
