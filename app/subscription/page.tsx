import { auth } from "@clerk/nextjs/server";
import { NavBar } from "../_components/navBar";
import { redirect } from "next/navigation";

const Subscription = async() =>{
  const { userId } = await auth()
  if(!userId){
    redirect("/login")
  }
  return (
    <>
     <NavBar />
     <h1>Assinatura</h1>
    </>
  )
}

export default Subscription;