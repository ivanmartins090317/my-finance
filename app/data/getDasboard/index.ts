import { db } from "@/app/_lib/prisma"
import { TransactionType } from "@prisma/client"
import { TransactionPercentagePerType } from "./types"

export const getDashboard = async (month: string ) =>{ 
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
    const transactionsTotal = Number(
      (
        await db.transaction.aggregate({
          where,
          _sum: { amount: true },
        })
      )._sum.amount,
    );
    const typesPercentage:TransactionPercentagePerType = {
      [TransactionType.DEPOSIT]: Math.round(
        (Number(deposiTotal || 0) / Number(transactionsTotal)) * 100,
      ),
      [TransactionType.EXPENSE]: Math.round(
        (Number(expenseTotal || 0) / Number(transactionsTotal)) * 100,
      ),
      [TransactionType.INVESTMENT]: Math.round(
        (Number(investmentTotal || 0) / Number(transactionsTotal)) * 100,
      ),
    };
    return{
      typesPercentage,
      balanceTotal,
      deposiTotal,
      expenseTotal,
      investmentTotal
    }
}