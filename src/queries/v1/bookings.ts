import { makeApi } from '@zodios/core'
import z from 'zod'
import { BookingSchema } from '../../models/booking'

export const bookingsAPI = makeApi([
  {
    method: 'get',
    path: '/v1/users/bookings/',
    alias: 'listBookings',
    response: z.object({
      data: z.array(BookingSchema)
    })
  },
  {
    method: 'post',
    path: '/v1/users/bookings',
    alias: 'storeBooking',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: BookingSchema.pick({
          routeId: true,
          customerRoute: true,
          bookedAmount: true,
          bookedSeat: true,
          referenceNo: true
        }).merge(z.object({
          passengerId: z.number()
        }))
      }
    ],
    response: z.object({
      data: BookingSchema
    })
  }
])
