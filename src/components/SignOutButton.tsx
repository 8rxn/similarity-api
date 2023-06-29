"use client"
import {useState} from 'react'
import Button from './ui/Button'
import { signOut } from 'next-auth/react'
import { toast } from './ui/Toast'
import { redirect } from 'next/navigation'


const SignOutButton = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const SignOutUser = async () => {
        setIsLoading(true)
        try{
            await signOut()
        }
        catch(err){
            toast({
                title: "Error Signing Out",
                message:"Please try again Later",
                type: "error"
            })
        }
    }

  return (
    <Button onClick={SignOutUser} isLoading={isLoading}>
        Sign Out
    </Button>
  )
}

export default SignOutButton
