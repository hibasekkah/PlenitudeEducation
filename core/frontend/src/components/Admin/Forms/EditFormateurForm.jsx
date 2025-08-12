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
import ProfileApi from "../../../services/api/Profile";
import { toast } from "sonner";
import { useState } from "react";
import { Loader } from "lucide-react";


const formSchema = z.object({
    nom: z.string().min(2, "Le nom est trop court.").max(100),
    email: z.string().email(),
    prenom: z.string().min(2, "Le prénom est trop court.").max(100),
    specialite_fonction: z.string().min(2, "La fonction est trop court.").max(100),
    telephone: z.string(),
    photo_profile: z.any().optional(),
});

export function EditFormateurForm({initialData = null}) {
    const [file, setFile] = useState(null);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nom: initialData.nom || "",
            prenom: initialData.prenom || "",
            email: initialData.email || "",
            telephone: initialData.telephone || "",
            specialite_fonction: initialData.specialite_fonction || "",
        },
    });
    const { setError } = form;

    const onSubmit = async (values) => {
        const loader = toast.loading("Mise à jour en cours...");
        
        const formData = new FormData();
        formData.append('_method', 'PUT');
        formData.append('nom', values.nom);
        formData.append('email', values.email);
        formData.append('prenom', values.prenom);
        formData.append('telephone', values.telephone);
        formData.append('specialite_fonction', values.specialite_fonction);
        
        if (file) {
            formData.append('photo_profile', file);
        }
        
        try {
            const response = await ProfileApi.update(initialData.id, formData);
            
            toast.success(response.data.message || "Participant mis à jour avec succès !");

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
                        <FormField control={form.control} name="email" render={({ field }) => (<FormItem><FormLabel>Email</FormLabel><FormControl><Input placeholder="Email" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="nom" render={({ field }) => (<FormItem><FormLabel>Nom</FormLabel><FormControl><Input placeholder="Nom" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="prenom" render={({ field }) => (<FormItem><FormLabel>Prénom</FormLabel><FormControl><Input placeholder="Prénom" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="telephone" render={({ field }) => (<FormItem><FormLabel>Téléphone</FormLabel><FormControl><Input placeholder="Téléphone" {...field} /></FormControl><FormMessage/></FormItem>)} />
                        <FormField control={form.control} name="specialite_fonction" render={({ field }) => (<FormItem><FormLabel>Spécialité</FormLabel><FormControl><Input placeholder="Spécialité" {...field} /></FormControl><FormMessage/></FormItem>)} />
                        
                        <FormItem>
                            <FormLabel>Photo de profil</FormLabel>
                            <FormControl>
                                <Input id="photo_profile" type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
                            </FormControl>
                        </FormItem>

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="outline">Annuler</Button>
                            </DialogClose>
                            <Button type="submit" disabled={form.formState.isSubmitting}>
                                {form.formState.isSubmitting && <Loader className="mr-2 h-4 w-4 animate-spin" />}
                                Sauvegarder
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
    );
}