import cors from 'cors'
import dotenv from 'dotenv'
import express, { Express, Request, Response } from 'express'
import productRouter from './product/route'
dotenv.config()

const app: Express = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(
	cors({
		origin: [
			'http://localhost:5173',
			'https://fdg312.github.io',
			'https://fdg312.github.io/test_alpha_project',
		],
		credentials: true,
	})
)
app.use('/api/products', productRouter)

app.get('/', (req: Request, res: Response) => {
	res.send('Hello World!')
})

app.listen(Number(port), '0.0.0.0', () => {
	console.log(`Server is running on port ${port}`)
})
