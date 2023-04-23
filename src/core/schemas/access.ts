import z from 'zod'

export const AccessSchema = z.object({
  expiry: z.number().optional(),
  token: z.string(),
  type: z.string()
})

type Access = z.infer<typeof AccessSchema>

export default Access
