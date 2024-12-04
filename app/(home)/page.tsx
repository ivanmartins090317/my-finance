import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { NavBar } from "../_components/navBar";
import { SummaryCards } from "./_components/summaryCards";
import { TimeSelct } from "./_components/time-select";
import { isMatch } from "date-fns";

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

  return (
    <div className="p-6 space-y-6">
      <NavBar/>
      <div className="flex justify-between">
       <h1 className="font-bold text-2xl">Dashboard</h1>
       <TimeSelct/>
      </div>
      <SummaryCards month={month}/>
    </div>
  );
}
