import { PiggyBankIcon, TrendingDown, TrendingUp, Wallet } from "lucide-react"
import { SummaryCard } from "./summaryCard"


interface SummaryCardsProps{
  month: string
  balanceTotal: number
  expenseTotal: number
  investmentTotal: number
  deposiTotal: number
}

export const SummaryCards = async({balanceTotal, expenseTotal, investmentTotal, deposiTotal}: SummaryCardsProps) =>{

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