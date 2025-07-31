import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useAuth } from '@/provider/authProvider';
import ProfileApi from "../../../services/api/Profile";
import { toast } from "sonner";
import { useState } from "react";
import { Loader } from "lucide-react";



const formSchema = z.object({
  raison_annulation: z.string().min(2, "La raison est trop court."),
});

export function AnnulSession() {

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            raison_annulation:"",
        },
    });
    const { setError } = form;

    const onSubmit = async (values) => {
        const loader = toast.loading("Mise à jour en cours...");
        
        const payload = {
            raison_annulation:values.raison_annulation,
        }
        
        try {
            const response = await SessionApi.sus(payload);
            
            toast.success(response.data.message || "Profil mis à jour avec succès !");

        } catch (error) {
            console.error("Échec de la soumission du formulaire:", error.response || error);
            if (error.response?.status === 422 && error.response.data.errors) {
                toast.error("Certains champs sont invalides.",error.message);
                Object.entries(error.response.data.errors).forEach(([fieldName, errorMessages]) => {
                    setError(fieldName, { type: "server", message: errorMessages.join(', ') });
                });
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
                        <FormField control={form.control} name="raison_annulation" render={({ field }) => (<FormItem><FormLabel>raison_annulation</FormLabel><FormControl><Input placeholder="raison_annulation" {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <Button type="submit" disabled={form.formState.isSubmitting}>
                                {form.formState.isSubmitting && <Loader className="mr-2 h-4 w-full animate-spin" />}
                                Sauvegarder
                            </Button>
                    </form>
                </Form>
    );
}