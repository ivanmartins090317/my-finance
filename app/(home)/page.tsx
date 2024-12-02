import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { NavBar } from "../_components/navBar";

export default async function HomePage ()  {
 const {userId} = auth()
 if(!userId) {
  redirect("/login")
 }
  return (
    <div className="">
      <NavBar/>
      <h1 className="text-muted-foreground">Dashboard</h1>
    </div>
  );
}
