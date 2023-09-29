import { Request } from 'express'

export default interface IRequestWithUser extends Request {
  user: {
    id: string
    name: string
    email: string
    company_id: string
    created_at: Date
    created_by: string
  }
}
