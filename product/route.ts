import express from 'express'
import {
	changeFavorite,
	createProduct,
	deleteProduct,
	getProductById,
	getProducts,
	updateProduct,
} from './controller'

const productRouter = express.Router()

productRouter.patch('/:id/favorite', changeFavorite)
productRouter.get('', getProducts)
productRouter.get('/:id', getProductById)
productRouter.post('', createProduct)
productRouter.put('/:id', updateProduct)
productRouter.delete('/:id', deleteProduct)

export default productRouter
