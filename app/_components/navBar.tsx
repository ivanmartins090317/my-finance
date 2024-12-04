"use client"

import { UserButton } from "@clerk/nextjs";
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation";

export const NavBar = () => {
   const pathName = usePathname();    
    return (
    <div className="flex w-full py-4 justify-between border-b border-text-muted-foreground">

     <div className="flex gap-4  items-center ">
       <Image src="/logo.svg" alt="logo" width={173} height={39} className="mr-6"/>
       <Link href="/" className={pathName === "/" ? "primary-font font-bold text-primary" : "primary-font text-muted-foreground"}>Dashboard</Link>
       <Link href="/transactions" className={pathName === "/transactions" ? "primary-font font-bold text-primary" : "primary-font text-muted-foreground"}>Transações</Link>
       <Link href="/subscription" className={pathName === "/subscription" ? "primary-font font-bold text-primary" : "primary-font text-muted-foreground"}>Assinatura</Link>
     </div>
     <div className="flex">
      <UserButton showName/>
     </div>
    </div>
    )
}