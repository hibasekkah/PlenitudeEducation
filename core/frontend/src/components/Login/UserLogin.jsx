"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { axiosUser } from "../api/axios"
import { useAuth } from "@/provider/authProvider";
import { Loader } from "lucide-react"


const formSchema = z.object({
  email: z.string().email().min(2).max(50),
  password: z.string().min(8).max(50),
})

export default function UserLogin(){
    const auth = useAuth();
    const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "Admin@exemple.com",
      password: "AdminAdmin",
    },
  })
 
  const onSubmit = async values => {
    console.log(values)
    try {
      const response = await axiosUser.post('/api/login', values);
      
      console.log("Login successful:", response.data);

      if (response.data && response.data.authorisation && response.data.authorisation.token) {
        auth.setToken(response.data.authorisation.token);
      }

    } catch (error) {
      console.error("Login failed:", error);
      form.setError('password', {
        message:"email/mot de passe incorrect"
      })
      form.formState.isSubmitting
      if (error.response && error.response.status === 422) {
        console.log("Validation errors:", error.response.data.errors);
      }
    }
  };

    return <>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mot de passe</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Mot de passe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={form.formState.isSubmitting} type="submit">
          {form.formState.isSubmitting && <Loader className={"mx-2 my-2 animate-spin"}/>} {' '}se connecter</Button>
      </form>
    </Form>
    </>
}