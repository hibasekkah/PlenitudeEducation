import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProfileApi from "../../services/api/Profile";


const formSchema = z.object({
  current_password: z.string().min(8),
  new_password: z.string().min(8),
  new_password_confirmation: z.string().min(8),
  }).refine(data => data.new_password === data.new_password_confirmation, {
    message: "Les mots de passe ne correspondent pas.",
    path: ["new_password_confirmation"], 
  });

export function ChangePasswordP() {
    const navigate = useNavigate();
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            current_password: "",
            new_password: "",
            new_password_confirmation: "",
        },
    });

    const onSubmit = async (values) => {
        const loader = toast.loading("Mise à jour en cours...");
        
        const formData = new FormData();
        formData.append('_method', 'PUT');
        formData.append('current_password', values.current_password);
        formData.append('new_password', values.new_password);
        formData.append('new_password_confirmation', values.new_password_confirmation);
        
        try {
            const response = await ProfileApi.password(formData);
            toast.success(response.data.message || "Mot de passe mis à jour avec succès !");  
            setTimeout(() => {
                navigate('/login');
            }, 2000);          
        } catch (error) {
            console.error("Échec de la soumission du formulaire:", error.response || error);
            if (error.response?.status === 422 && error.response.data.errors) {
                toast.error("Certains champs sont invalides.",error.message);
            } else {
                toast.error(error.response?.data?.message || "Une erreur est survenue.");
            }
        } finally {
            toast.dismiss(loader);
        }
    };

    return (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField control={form.control} name="current_password" render={({ field }) => (<FormItem><FormLabel>Mot de passe actuel</FormLabel><FormControl><Input type="password" placeholder="Mot de passe actuel" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="new_password" render={({ field }) => (<FormItem><FormLabel>Nouveau mot de passe</FormLabel><FormControl><Input type="password" placeholder="Nouveau mot de passe" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="new_password_confirmation" render={({ field }) => (<FormItem><FormLabel>Ressaisir le mot de passe</FormLabel><FormControl><Input type="password" placeholder="Ressaisir le mot de passe" {...field} /></FormControl><FormMessage/></FormItem>)} />
                        
                        <Button type="submit" disabled={form.formState.isSubmitting}>
                            {form.formState.isSubmitting && <Loader className="mr-2 h-4 w-4 animate-spin" />}
                            Sauvegarder
                        </Button>
                    </form>
                </Form>
    );
}