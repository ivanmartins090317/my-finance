"use server"

import { auth } from "@clerk/nextjs/server"
import { AddTransactionSchema } from "./schema"
import { Prisma} from "@prisma/client"
import { db } from "@/app/_lib/prisma"


export const AddTransaction = async(params: Omit<Prisma.TransactionCreateInput, "userId"> ) =>{
  AddTransactionSchema.parse(params)
  const {userId} = await auth()
  if(!userId) {
    throw new Error("Unauthenticated user")
  }
    await db.transaction.create({
    data: {...params, userId}
  })
} 