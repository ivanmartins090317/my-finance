import { Card, CardContent, CardHeader } from "@/app/_components/ui/card"

interface SummaryCardProps{
      icon: React.ReactNode 
      title: string
      amount: number
}
export const SummaryCard = ({icon, title,amount} : SummaryCardProps) =>{
  return(
    <Card>
    <CardHeader className="flex">
      {icon}
      <p>{title}</p>
    </CardHeader>
    <CardContent>
      {amount}
    </CardContent>  
  </Card>

  )
}






































