import type { NextApiRequest, NextApiResponse } from "next";
import { conn } from "utils/database";

export default async function index(req: NextApiRequest, res: NextApiResponse) {
  const { method, query, body } = req;

  switch (method) {
    case "GET":
      try {
        const text = 'SELECT * FROM tasks WHERE id = $1'
        const values = [query.id]
        const response = await conn.query(text, values)
        if (response.rows.length === 0) {
          return res.status(404).json({error: 'Task not found'});
        }
        return res.status(200).json(response.rows[0]);
      } catch (error: any) {
        return res.status(500).json({error: error.message});
      }

    case "PUT":
      try {
        const {title, description} = body
        const text = 'UPDATE tasks SET title = $1, description = $2 WHERE  id = $3 RETURNING *'
        const values = [title, description, query.id]
        const response = await conn.query(text, values)
        return res.status(200).json(response.rows[0]);
      } catch (error: any) {
        return res.status(500).json({error: error.message});
      }

    case "DELETE":
      try {
        const text = 'DELETE FROM tasks WHERE id = $1 RETURNING *'
        const values = [query.id]
        const response = await conn.query(text, values)
        if (response.rowCount === 0) {
          return res.status(404).json({error: 'Task not found'});
        }
        return res.status(200).json(response.rows[0]);
      } catch (error: any) {
        return res.status(500).json({error: error.message});
      }

    default:
      break;
  }
}
