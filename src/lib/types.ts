import { ISODateString } from "next-auth"

export type Product = {
    id: number
    title: string
    description: string
    cost: number
    creation_date: string
}

export type Session = {
    user?: {
        name?: string | null
        email: string | null
        image?: string | null
      }
      expires: ISODateString
}