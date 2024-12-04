import { PiggyBankIcon, TrendingDown, TrendingUp, Wallet } from "lucide-react"
import { SummaryCard } from "./summaryCard"

import { db } from "@/app/_lib/prisma"

interface SummaryCardsProps{
  month: string
}

export const SummaryCards = async({month}: SummaryCardsProps) =>{
  const where = {
    date:{
      gte: new Date(`2024-${month}-01`),
      lt: new Date(`2024-${month}-31`)
    }
  }
  const deposiTotal = Number((await db.transaction.aggregate({
    where: {...where,type: "DEPOSIT"},
    _sum: {amount: true}, 
  }))?._sum.amount)

  const investmentTotal = Number((await db.transaction.aggregate({
    where: {...where,type: "INVESTMENT"},
    _sum: {amount: true}, 
  }))?._sum.amount )

  const expenseTotal = Number((await db.transaction.aggregate({
    where: {...where,type: "EXPENSE"},
    _sum: {amount: true}, 
  }))?._sum.amount)
  const balanceTotal = deposiTotal - investmentTotal - expenseTotal 
  return (
    <div className="space-y-6">
      <SummaryCard icon={<Wallet size={16} />} title="Saldo" amount={balanceTotal} size="large"/>
      <div className="grid grid-cols-3 gap-6">
       <SummaryCard icon={<PiggyBankIcon size={16} />} title="Investimento" amount={investmentTotal} size="small" />
       <SummaryCard icon={<TrendingUp size={16} />} title="Receita" amount={deposiTotal} size="small"/>
       <SummaryCard icon={<TrendingDown size={16} />} title="Despesa" amount={expenseTotal} size="small"/> 
      </div>
    </div>
  );
  
}