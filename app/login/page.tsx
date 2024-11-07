import Image from "next/image";
import { Button } from "../_components/ui/button";
import { LogInIcon } from "lucide-react";
import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const LoginPage = async() =>{
//  AUTHENTICAION IF CLERK
 const {userId} = auth()
 if(userId){
  redirect("/")
 }

 return(
  <div className="h-full grid grid-cols-2">
    <div className="flex flex-col justify-center p-8 max-w-[500px] mx-auto">
      <Image src="/logo.svg" alt="logo" width={173} height={39} className="mb-8"/>
      <h2 className="font-bold text-4xl mb-4">Bem-vindo</h2>
      <p className="mb-8 text-muted-foreground">A Finance AI é uma plataforma de gestão financeira que utiliza IA para monitorar suas movimentações, e oferecer insights personalizados, facilitando o controle do seu orçamento.</p>
      <SignInButton>
        <Button variant="outline">
          <LogInIcon />
          Fazer login ou criar conta
        </Button>
      </SignInButton>
    </div>
    <div className="relative w-full h-full">
     <Image src="/login-image.png" className="object-cover" fill alt="image login" />
    </div>
  </div>
 )
}

export default LoginPage