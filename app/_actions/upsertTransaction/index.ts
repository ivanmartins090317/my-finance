"use server"

import { auth } from "@clerk/nextjs/server"
import { AddTransactionSchema } from "./schema"
import { db } from "@/app/_lib/prisma"
import { revalidatePath } from "next/cache"
import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from "@prisma/client";
interface UpsertTransactionParams {
  id?: string;
  name: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  paymentMethod: TransactionPaymentMethod;
  date: Date;
}
export const UpsertTransaction = async(params: UpsertTransactionParams ) =>{
  AddTransactionSchema.parse(params)
  const {userId} = await auth()
  if(!userId) {
    throw new Error("Unauthenticated user")
  }
    await db.transaction.upsert({
      update: {
        ...params, userId
      },
      create: {...params, userId},
      where:{
        id: params?.id ?? ""
      },
  })
  revalidatePath("/transactions");
} 