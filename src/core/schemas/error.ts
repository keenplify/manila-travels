import z from 'zod'

export const ErrorSchema = z.object({
  message: z.string(),
  errors: z.any()
})

type Error = z.infer<typeof ErrorSchema>

export default Error
