"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Eye, EyeOff } from "lucide-react"


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

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Link } from "react-router-dom"
import { useState } from "react"



const formSchema = z.object({
  email: z.string().email().min(2).max(50),
  password: z.string().min(4).max(50),
})

export default function UserLogin(){
    const auth = useAuth();
    const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "Admin@example.com",
      password: "AdminAdmin",
    },
  })

  const [showPassword, setShowPassword] = useState(false);

 
  const onSubmit = async values => {
    console.log(values)
    try {
      const response = await axiosUser.post('/api/login', values);
      
      console.log("Login successful:", response.data);

      if (response.data && response.data.authorisation && response.data.authorisation.token) {
        auth.setToken(response.data.authorisation.token,response.data.user);
      }

    } catch (error) {
      console.error("Login failed:", error);
      form.setError('password', {
        message:"email/mot de passe incorrect"
      })
      form.setError('email', {
        message:"email/mot de passe incorrect"
      })
      form.formState.isSubmitting
      if (error.response && error.response.status === 422) {
        console.log("Validation errors:", error.response.data.errors);
      }
    }
  };

    return <>
        <Card className="w-full max-w-sm m-16">
          <CardHeader>
            <CardTitle>Connectez-vous à votre compte</CardTitle>
            <CardDescription>
              Saisissez votre adresse e-mail ci-dessous pour accéder à votre compte
            </CardDescription>
          </CardHeader>
          <CardContent>
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
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Mot de passe"
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                          >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button disabled={form.formState.isSubmitting} type="submit">
                  {form.formState.isSubmitting && <Loader className={"mx-2 my-2 animate-spin"}/>} {' '}se connecter</Button>
              </form>
            </Form>

            <Link
              to="/forgot-password"
              className="ml-auto inline-block text-sm underline-offset-4 hover:underline mt-2"
              >
                Mot de passe oublié ?
              </Link>
          </CardContent>
        </Card>
    </>
}
