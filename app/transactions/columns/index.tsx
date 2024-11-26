"use client"

import { Transaction } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import TransactionTypeBadge from "../_components/type-badge"
import { NormalizeAmount, NormalizeDate, TRANSACTION_CATEGORY_LABEL, TRANSACTION_PAYMENT_METHOD_LABEL } from "../constants/functions"
import { Button } from "@/app/_components/ui/button"
import {  TrashIcon } from "lucide-react"
import { EditTransactionButton } from "../_components/edit-transaction-button"



export const transactionColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "type",
    header: "Tipo",
    cell:({row: {original: transaction}}) => <TransactionTypeBadge transaction={transaction}/>
  },
  {
    accessorKey: "category",
    header: "Categoria",
    cell:({row: {original: transaction}}) => TRANSACTION_CATEGORY_LABEL[transaction.category]
  },
  {
    accessorKey: "paymentMethod",
    header: "Método de pagamento",
    cell:({row : {original:transaction}}) => TRANSACTION_PAYMENT_METHOD_LABEL[transaction.paymentMethod]
  },
  {
    accessorKey: "date",
    header: "Data",
    cell:({row: {original:transaction}})=> NormalizeDate({date:transaction.date})
  },
  {
    accessorKey: "amount",
    header: "Valor",
    cell:({row: {original:transaction}}) => NormalizeAmount({amount:Number(transaction.amount)})
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell:({row: {original:transaction}}) => {
      return(
        <div className="space-x-1">
          <EditTransactionButton transaction={transaction}/>
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <TrashIcon/>
          </Button>
        </div>
      )
    }
  },
]
