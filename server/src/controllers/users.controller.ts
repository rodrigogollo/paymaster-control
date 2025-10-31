import { Response } from "express"

export async function getAllUsers(req, res: Response) {
  try {

  } catch (e) {
    console.error('Failed to fetch users', e)
    res.status(500).json({
      error: 'Failed to fetch users'
    })
  }
}
