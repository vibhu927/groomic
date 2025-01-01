"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import GetCurrentUser from "./GetUser";

export function Redirect(){
    const user = GetCurrentUser();
    const router = useRouter();
    useEffect(()=>{
        if(user){
            router.push(`/dashboard/${user}`);
        }
    },[user])
    return null;
}