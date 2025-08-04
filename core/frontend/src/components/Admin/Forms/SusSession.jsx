import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Loader } from "lucide-react";

const formSchema = z.object({
  raison_sus: z.string().min(2, "La raison doit contenir au moins 2 caractères."),
});

// 1. Receive props as an object: { initialData, onFormSubmit }
export function SusSession({ initialData, onFormSubmit }) {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            raison_sus: "",
        },
    });
    const { setError, formState: { isSubmitting } } = form;

    const onSubmit = async (values) => {
        const loader = toast.loading("Suspension en cours...");
        
        // 'values' already contains { raison_sus: '...' }
        
        try {
            // 2. Call the onFormSubmit prop with the correct ID and payload
            const response = await onFormSubmit(initialData.id, values);
            
            toast.success(response.data.message || "Session suspendue avec succès !");

            // You might want to close the dialog here
            // e.g., pass an `onSuccess` function to do that

        } catch (error) {
            console.error("Échec de la soumission du formulaire:", error.response || error);
            if (error.response?.status === 422 && error.response.data.errors) {
                toast.error("Données invalides.");
                Object.entries(error.response.data.errors).forEach(([fieldName, messages]) => {
                    setError(fieldName, { type: "server", message: messages.join(', ') });
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
                <FormField
                    control={form.control}
                    name="raison_sus"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Raison de la suspension</FormLabel>
                            <FormControl>
                                <Input placeholder="Indiquez la raison..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting && <Loader className="mr-2 h-4 w-4 animate-spin" />}
                    Confirmer la Suspension
                </Button>
            </form>
        </Form>
    );
}