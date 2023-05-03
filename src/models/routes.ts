import { z } from 'zod'
import { BusSchema } from './bus'

export const RouteSchema = z.object({
    id: z.number(),
    routeId: z.string(),
    busNo: z.string(),
    location: z.string(),
    from: z.string(),
    to: z.string(),
    departureDate: z.string(),
    departureTime: z.string(),
    stepCost: z.number(),
    bus: BusSchema.optional()
})

export type Route = z.infer<typeof RouteSchema>
