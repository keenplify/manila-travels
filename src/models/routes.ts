import { z } from 'zod'

export const RouteSchema = z.object({
    id: z.number(),
    routeId: z.number(),
    busNo: z.string(),
    location: z.string(),
    from: z.string(),
    to: z.string(),
    departureDate: z.string(),
    departureTime: z.string(),
    stepCost: z.number(),
})

export type Route = z.infer<typeof RouteSchema>
