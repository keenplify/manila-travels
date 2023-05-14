import { makeApi } from '@zodios/core'
import z from 'zod'
import { AccessSchema } from '../../core/schemas/access'
import { UserSchema } from '../../models/user'

export const userAuthApi = makeApi([
  {
    method: 'post',
    path: '/v1/users/auth/login',
    alias: 'loginUser',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: z.object({
          password: z.string().min(1, 'Password is required'),
          username: z.string().min(1, 'Username is required')
        })
      }
    ],
    response: z.object({
      access: AccessSchema,
      data: UserSchema
    })
  },
  {
    method: 'post',
    path: '/v1/users/auth/register',
    alias: 'registerUser',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: z.object({
          username: z.string().email().min(1, 'Email is required'),
          fullName: z.string().min(1, 'Full name is required'),
          password: z.string().min(1, 'Password is required'),
          confirm: z.string().min(1, 'Confirm Password is required'),
        }).refine((data) => data.password === data.confirm, {
          message: "Passwords don't match",
          path: ["confirm"],
        })
      }
    ],
    response: z.object({
      access: AccessSchema,
      data: UserSchema
    })
  },
  {
    method: 'get',
    path: '/v1/users/auth/check',
    alias: 'checkUser',
    response: z.object({
      data: UserSchema
    })
  },
  {
    method: 'post',
    path: '/v1/user/auth/logout',
    alias: 'logoutUser',
    response: z.string().optional()
  },
  {
    method: 'put',
    path: '/v1/users/users/:id',
    alias: 'updateUser',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: UserSchema.pick({
          password: true,
          fullName: true
        })
      }
    ],
    response: z.object({
      data: UserSchema
    })
  }
])
