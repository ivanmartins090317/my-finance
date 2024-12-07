import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { NavBar } from "../_components/navBar";
import { SummaryCards } from "./_components/summaryCards";
import { TimeSelct } from "./_components/time-select";
import { isMatch } from "date-fns";
import {TransactionsPieChart} from "./_components/transaction-pie-chart";
import { getDashboard } from "../data/getDasboard";

interface MonthProps{
  searchParams: {month: string} 
}
export default async function HomePage ({searchParams:{month}} : MonthProps)  {
 const {userId} = auth()
 if(!userId) {
  redirect("/login")
 }
 const monthIsInvalid = !month || !isMatch(month, "MM");
 if (monthIsInvalid) {
   redirect(`?month=${new Date().getMonth() + 1}`);
 }
const dashboard = await getDashboard(month);
  return (
    <div className="p-6 space-y-6">
      <NavBar/>
      <div className="flex justify-between">
       <h1 className="font-bold text-2xl">Dashboard</h1>
       <TimeSelct/>
      </div>
      <div className="grid grid-cols-[2fr,1fr]">
       <SummaryCards month={month} {...dashboard}/>
     
      </div>
       <div className="grid grid-cols-3 grid-rows-1 gap-6">
        <TransactionsPieChart {...dashboard}/>
       </div>
    </div>
  );
}
