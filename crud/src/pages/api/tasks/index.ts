import type { NextApiRequest, NextApiResponse } from 'next'
import {conn} from 'src/utils/database'

export default async function tasks(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req

  /* if(method === "GET") {
        res.status(200).json("getting tasks")
    } else if (method === "POST") {
        res.status(200).json("creating tasks")
    } else {
        res.json("invalid method")
    } */

  switch (method) {
    case 'GET':
      try {
        const query = 'SELECT * FROM tasks'
        const response = await conn.query(query)
        return res.status(200).json(response.rows)
      } catch (error: any) {
        return res.status(500).json({ error: error.message })
      }
    case 'POST':
      try {
        const { title, description } = body

        const query =
          'INSERT INTO tasks(title, description) VALUES ($1, $2) RETURNING *'
        const values = [title, description]
        const response = await conn.query(query, values)
        //Al hacer return hace el break también
        return res.status(200).json(response.rows[0])
      } catch (error: any) {
        return res.status(500).json({ error: error.message })
      }

    default:
      res.status(400).json('invalid method')
      break
  }
}
