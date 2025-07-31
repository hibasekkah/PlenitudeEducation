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

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { toast } from "sonner"


const formSchema = z.object({
  email: z.string().email().min(2).max(50),
})

export default function ForgotPassword(){
    const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues:{
      email:""
    }
  })
 
  const onSubmit = async values => {
    console.log(values)
    try {
      const response = await axiosUser.post('/api/forgot-password', values);
      toast.success(response.data.status);
      console.log("successfully:", response.data);

    } catch (error) {
      console.error(error);
      toast.error(error.respons);
      form.formState.isSubmitting
      if (error.response && error.response.status === 422) {
        console.log("Validation errors:", error.response.data.errors);
      }
    }
  };

    return <>
        <Card className="w-full max-w-sm m-25">
          <CardHeader>
            <CardTitle>Réinitialiser votre mot de passe</CardTitle>
            <CardDescription>
              Saisissez votre adresse e-mail ci-dessous et nous vous enverrons un lien pour réinitialiser votre mot de passe.
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
                <Button disabled={form.formState.isSubmitting} type="submit">
                  {form.formState.isSubmitting && <Loader className={"mx-2 my-2 animate-spin"}/>} {' '}Valider</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
    </>
}
