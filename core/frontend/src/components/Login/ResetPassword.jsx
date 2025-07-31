"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useParams, useNavigate, useSearchParams } from "react-router-dom" // <-- 2. Import useParams
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { axiosUser } from "../api/axios" 
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
  password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères.").max(50),
  password_confirmation: z.string().min(8).max(50),
}).refine(data => data.password === data.password_confirmation, {
  message: "Les mots de passe ne correspondent pas.",
  path: ["password_confirmation"], 
});

export default function ResetPassword() {
    const { token } = useParams();
    const [searchParams] = useSearchParams();
    const email = searchParams.get('email');
    const navigate = useNavigate();

    const form = useForm({
        resolver: zodResolver(formSchema), 
        defaultValues: {
            password: "",
            password_confirmation: "",
        }
    });
    const { formState: { isSubmitting } } = form; 
 
    const onSubmit = async (data) => {
        const loader = toast.loading("Réinitialisation en cours...");
        try {
            const payload = {
                token: token,
                email: email,
                password: data.password,
                password_confirmation: data.password_confirmation,
            };
            const response = await axiosUser.post('/api/reset-password', payload);
            toast.success(response.data.status || "Votre mot de passe a été réinitialisé avec succès !");
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (error) {
            toast.error(error.response?.data?.message || "Une erreur est survenue.");
            console.error(error);
        } finally {
            toast.dismiss(loader);
        }
    };

    if (!email || !token) {
        return <div>Lien de réinitialisation invalide ou incomplet.</div>;
    }

    return (
        <div className="flex justify-center items-center m-11 w-full">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Réinitialiser votre mot de passe</CardTitle>
                    <CardDescription>
                        Saisissez votre nouveau mot de passe ci-dessous.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input value={email} disabled readOnly />
                                </FormControl>
                            </FormItem>

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nouveau mot de passe</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="********" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password_confirmation"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirmer le mot de passe</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="********" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button disabled={isSubmitting} type="submit" className="w-full">
                                {isSubmitting && <Loader className={"mr-2 h-4 w-4 animate-spin"} />}
                                Réinitialiser le mot de passe
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}