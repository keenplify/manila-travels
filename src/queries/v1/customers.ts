import { makeApi } from '@zodios/core'
import z from 'zod'
import { CustomerSchema } from '../../models/customer'

export const customersAPI = makeApi([
  {
    method: 'get',
    path: '/v1/users/customers/',
    alias: 'listCustomers',
    response: z.object({
      data: z.array(CustomerSchema)
    })
  },
])
