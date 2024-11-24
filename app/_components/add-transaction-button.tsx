"use client"

import { ArrowDownUpIcon } from "lucide-react"
import { Button } from "./ui/button"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { TransactionCategory, TransactionPaymentMethod, TransactionType } from "@prisma/client"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { MoneyInput } from "./money-input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/app/_components/ui/select"
import { TRANSACTION_CATEGORY_OPTIONS, TRANSACTION_PAYMENT_METHOD_OPTIONS, TRANSACTION_TYPE_OPTIONS, } from "../transactions/constants/functions"
import { DatePicker } from "./ui/date-picker"
import { AddTransaction} from "../_actions/add-transaction"
import { useState } from "react"

const formSchema = z.object({
  name: z.string().trim().min(1,{
    message: "O nome é obrigatório",
  }),
  amount: z.number({
   required_error: "O nome é obrigatório",
  }).positive({
    message: "O valor deve ser positivo",
  }),
  type: z.nativeEnum(TransactionType,{
   required_error: "O tipo é obrigatório",
  }),
  category: z.nativeEnum(TransactionCategory,{
   required_error: "A categoria é obrigatório",
  }),
  paymentMethod: z.nativeEnum(TransactionPaymentMethod,{
   required_error: "O tipo de método de pagamento é obrigatório",
  }),
  date: z.date({
    required_error: "A data é obrigatória"
  })
})

type FormSchema = z.infer<typeof formSchema>

export const AddTransactionButton = () => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false) 
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
      category: TransactionCategory.OTHER,
      date: new Date(),
      name: "",
      paymentMethod: TransactionPaymentMethod.CASH,
      type: TransactionType.EXPENSE 
    },
  })

  const onSubmit = async(data: FormSchema) => {
    try {
      await AddTransaction(data)
      setDialogIsOpen(false)
      form.reset()
    } catch (error) {
      console.log(error);
    
    }
    
  }

 return (
  <Dialog 
  open={dialogIsOpen}
  onOpenChange={(open) =>{  
    setDialogIsOpen(open)
    if(!open){
      form.reset()
    }
  }}>
    <DialogTrigger asChild>
      <Button className="rounded-full font-bold">
        Adicionar transação
        <ArrowDownUpIcon />
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          Adicionar Transação
        </DialogTitle>
        <DialogDescription>
          Insiar aas informções da transação
        </DialogDescription>
      </DialogHeader>
      {/* FORM */}
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* NOME */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="digite o nome..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Valor */}
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Valor</FormLabel>
              <FormControl>
                
              <MoneyInput
                  placeholder="Digite o valor..."
                  value={field.value}
                  onValueChange={({ floatValue }) =>
                    field.onChange(floatValue)
                  }
                  onBlur={field.onBlur}
                  disabled={field.disabled}
              />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* TIPOS */}
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo da transação</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um tipo de transição." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {
                    TRANSACTION_TYPE_OPTIONS.map(option => ( 
                    <SelectItem 
                    key={option.value}
                    value={option.value}>{option.label}</SelectItem>)
                    )
                  }
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* MÉTODO DE PAGAMENTO */}
        <FormField
          control={form.control}
          name="paymentMethod"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Método de pagemanto</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um método de pagamento." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {
                    TRANSACTION_PAYMENT_METHOD_OPTIONS.map(option => ( 
                    <SelectItem 
                    key={option.value}
                    value={option.value}>{option.label}</SelectItem>)
                    )
                  }
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Categoria */}
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoria</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a categoria." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {
                    TRANSACTION_CATEGORY_OPTIONS.map(option => ( 
                    <SelectItem 
                    key={option.value}
                    value={option.value}>{option.label}</SelectItem>)
                    )
                  }
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Data */}
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoria</FormLabel>
               <DatePicker value={field.value} onChange={field.onChange}/>
              <FormMessage />
            </FormItem>
          )}
        />
     
      <DialogFooter>
        <DialogClose asChild>
         <Button type="button" variant="outline">Cancelar</Button>
        </DialogClose>
        <Button type="submit">Adicionar</Button>
      </DialogFooter>
      </form>
      </Form>
    </DialogContent>
  </Dialog>
 )
}