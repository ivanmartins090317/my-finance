"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { ArrowDownUpIcon } from "lucide-react"
import { UpsertTransactionDialog } from "./upsert-transaction-button"



export const AddTransactionButton = () => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false) 

 return (
        <>
        <Button className="rounded-full font-bold" onClick={() => setDialogIsOpen(true)}>
          Adicionar transação
          <ArrowDownUpIcon />
        </Button>
        <UpsertTransactionDialog isOpen={dialogIsOpen} setIsOpen={setDialogIsOpen} />
      </>
  
 )
}