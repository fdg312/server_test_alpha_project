import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import { productSchema } from './schema'
const prisma = new PrismaClient()

export const getProducts = async (req: Request, res: Response) => {
	const products = await prisma.product.findMany({
		orderBy: {
			price: 'asc',
		},
	})
	res.json(products)
}

export const createProduct = async (req: Request, res: Response) => {
	if (!productSchema.required().safeParse(req.body).success) {
		res.status(400).json({ error: 'Invalid product data' })
		return
	}
	const { name, price, quantity, description, srcImg } = req.body
	const product = await prisma.product.create({
		data: {
			name,
			price: +price,
			quantity: +quantity,
			description,
			srcImg,
		},
	})
	res.json(product)
}

export const changeFavorite = async (req: Request, res: Response) => {
	const { id } = req.params
	const { isFavorite } = req.body
	if (typeof isFavorite !== 'boolean') {
		res.status(400).json({ error: 'Invalid isFavorite data' })
		return
	}
	const product = await prisma.product.update({
		where: { id },
		data: { isFavorite },
	})
	res.json(product)
}

export const updateProduct = async (req: Request, res: Response) => {
	if (!productSchema.safeParse(req.body).success) {
		res.status(400).json({ error: 'Invalid product data' })
		return
	}
	const { id } = req.params
	const { name, price, quantity, description } = req.body

	const product = await prisma.product.update({
		where: { id },
		data: { name, price, quantity, description },
	})
	res.json(product)
}

export const deleteProduct = async (req: Request, res: Response) => {
	const { id } = req.params
	const product = await prisma.product.delete({
		where: { id },
	})
	res.json(product)
}

export const getProductById = async (req: Request, res: Response) => {
	const { id } = req.params
	const product = await prisma.product.findUnique({
		where: { id },
	})
	res.json(product)
}
