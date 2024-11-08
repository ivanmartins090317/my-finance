import { ArrowDownUpIcon } from "lucide-react";
import { Button } from "../_components/ui/button";
import { db } from "../_lib/prisma";
import { transactionColumns } from "./columns";
import { DataTable } from "../_components/ui/data-table";



const TransactionPage = async () =>{
 const transactions = await db.transaction.findMany({})

  return (
    <div className="p-6 space-y-6">
      <div className="w-full items-center flex justify-between p-6">
        <h1 className="font-bold text-2xl">Transactions</h1>
        <Button className="rounded-full">
          Adicionar transação
          <ArrowDownUpIcon/>
        </Button>
      </div>
      {/* TABELA DE TRANSAÇÕES */}
      <DataTable columns={transactionColumns} data={transactions}/>
    </div>
  )
}

export default TransactionPage;