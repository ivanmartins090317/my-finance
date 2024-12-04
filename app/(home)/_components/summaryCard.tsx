import { AddTransactionButton } from "@/app/_components/add-transaction-button"
import { Card, CardContent, CardHeader } from "@/app/_components/ui/card"
import { NormalizeAmount } from "@/app/transactions/constants/functions"
import { ReactNode } from "react"

interface SummaryCardProps{
      icon: ReactNode 
      title: string
      amount: number
      size: "small" | "large"
}
export const SummaryCard = ({icon, title,amount, size = "small"} : SummaryCardProps) =>{

  return(
      <Card className="">
      <CardHeader className="flex-row items-center gap-2">
        {icon}
        <p className={`${size === "small" ?"text-muted-foreground" :"text-white opacity-70" }`}>{title}</p>
      </CardHeader>
      <CardContent className={ ` "font-bold" ${size === "small" ? "text-2xl" : "text-4xl flex justify-between"}`}>
      <p>{NormalizeAmount({amount}) }</p>

      {size === "large" && <AddTransactionButton/>}
      </CardContent>
    </Card>
  )
}






































