import { FastifyRequest, FastifyReply } from 'fastify'
import knex from 'knex'

const knexConfig = require('../../knexfile');
const db = knex(knexConfig.development)

interface Product {
  id: string
  name: string
  price: number
  description?: string
  category?: string
  image_url?: string
}

export async function getAllProducts(req: FastifyRequest, reply: FastifyReply) {
  try {
    const products: Product[] = await db('products').select('*')
    return reply.send(products)
  } catch (error) {
    console.error(error)
    return reply.status(500).send({ error: 'Erro ao buscar produtos' })
  }
}

export async function getProductById(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
  try {
    const product: Product | undefined = await db('products').where('id', req.params.id).first()
    if (!product) return reply.status(404).send({ error: 'Produto não encontrado' })
    return reply.send(product)
  } catch (error) {
    console.error(error)
    return reply.status(500).send({ error: 'Erro ao buscar produto' })
  }
}

export async function createProduct(
  req: FastifyRequest<{ Body: { name: string; price: number; description?: string; category?: string; image_url?: string } }>,
  reply: FastifyReply
) {
  try {
    const [newProduct] = await db('products')
      .insert({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
        image_url: req.body.image_url,
      })
      .returning('*')  // retorna o registro inserido (funciona no Postgres)
    return reply.status(201).send(newProduct)
  } catch (error) {
    console.error(error)
    return reply.status(500).send({ error: 'Erro ao criar produto' })
  }
}

export async function updateProduct(
  req: FastifyRequest<{ Params: { id: string }; Body: { name?: string; price?: number; description?: string; category?: string; image_url?: string } }>,
  reply: FastifyReply
) {
  try {
    const updatedRows = await db('products')
      .where('id', req.params.id)
      .update(req.body)
      .returning('*')

    if (updatedRows.length === 0) {
      return reply.status(404).send({ error: 'Produto não encontrado' })
    }
    return reply.send(updatedRows[0])
  } catch (error) {
    console.error(error)
    return reply.status(500).send({ error: 'Erro ao atualizar produto' })
  }
}

export async function updateProductImage(
  req: FastifyRequest<{ Params: { id: string }; Body: { image_url: string } }>,
  reply: FastifyReply
) {
  try {
    const updatedRows = await db('products')
      .where('id', req.params.id)
      .update(req.body)
      .returning('*')

    if (updatedRows.length === 0) {
      return reply.status(404).send({ error: 'Produto não encontrado' })
    }
    return reply.send(updatedRows[0])
  } catch (error) {
    console.error(error)
    return reply.status(500).send({ error: 'Erro ao atualizar imagem do produto' })
  }
}

export async function deleteProduct(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
  try {
    const deletedRows = await db('products')
      .where('id', req.params.id)
      .del()
      .returning('*')

    if (deletedRows.length === 0) {
      return reply.status(404).send({ error: 'Produto não encontrado' })
    }
    return reply.send(deletedRows[0])
  } catch (error) {
    console.error(error)
    return reply.status(500).send({ error: 'Erro ao deletar produto' })
  }
}
