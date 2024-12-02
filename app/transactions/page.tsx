
import { db } from "../_lib/prisma";
import { transactionColumns } from "./columns";
import { DataTable } from "../_components/ui/data-table";
import { AddTransactionButton } from "../_components/add-transaction-button";
import { NavBar } from "../_components/navBar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";



const TransactionPage = async () =>{
  const { userId } = await auth()
  if(!userId){
    redirect("/login")
  }
 const transactions = await db.transaction.findMany({
  where:{
    userId
  }
 })

  return (
    <div className="p-6 space-y-6">
      <NavBar/>
      <div className="w-full items-center flex justify-between p-6">
        <h1 className="font-bold text-2xl">Transactions</h1>
       <AddTransactionButton/>
      </div>
      {/* TABELA DE TRANSAÇÕES */}
      <DataTable columns={transactionColumns} data={transactions}/>
    </div>
  )
}

export default TransactionPage;