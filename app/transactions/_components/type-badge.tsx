import { Transaction, TransactionType } from "@prisma/client"
import { CircleIcon } from "lucide-react"
import { Badge } from "@/app/_components/ui/badge"

interface TransactionTypeProps{
  transaction: Transaction
}
const TransactionTypeBadge = ({transaction}: TransactionTypeProps) =>{
  if(transaction.type === TransactionType.DEPOSIT){
    return (
      <Badge className="bg-muted text-primary hover:bg-muted">
        <CircleIcon size={10} className="fill-green-300 mr-2"/>
        Despósito
      </Badge>
    )
  }
  if(transaction.type === TransactionType.EXPENSE){
    return(
      <Badge className="bg-muted hover:bg-muted text-red-500">
      <CircleIcon size={10} className="fill-red-300 mr-2"/>
      Despesa
    </Badge>
    )
  }
  if(transaction.type === TransactionType.INVESTMENT){
    return(
      <Badge className="bg-white hover:bg-muted bg-opacity-10">
        <CircleIcon size={10} className="fill-white mr-2"/>
        Investimento
      </Badge>
    )
  }
}

export default TransactionTypeBadge