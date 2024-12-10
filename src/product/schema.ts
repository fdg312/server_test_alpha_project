import { z } from 'zod'

export const productSchema = z.object({
	name: z.string(),
	price: z.coerce.number(),
	quantity: z.coerce.number(),
	description: z.string(),
	srcImg: z.string().optional(),
})
