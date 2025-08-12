import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useEffect, useState } from "react";

import { Loader } from "lucide-react";
import FormateurApi from "../../../services/api/Formateur";

const formSchema = z.object({
  nom: z.string().min(2, "Le nom est trop court.").max(100),
  prenom: z.string().min(2, "Le prénom est trop court.").max(100),
  specialite_fonction: z.string().min(2, "La fonction est trop court.").max(100),
  telephone: z.string(),
  photo_profile: z.any().optional(),
  password:z.string().min(8),
  email: z.string().email(),
  role: z.string(),
});

export function AddFormateurFrom() {
    const [file, setFile] = useState(null);
    const formData = new FormData();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nom: "",
            prenom: "",
            email: "",
            telephone: "",
            specialite_fonction: "",
            photo_profile:"",
            password:"",
            role:"formateur",
        },
    });
    const { setError } = form;

    const onSubmit = async (values) => {

        const loader = toast.loading("registration en cours...");
        
        formData.append('nom', values.nom);
        formData.append('prenom', values.prenom);
        formData.append('telephone', values.telephone);
        formData.append('specialite_fonction', values.specialite_fonction);
        formData.append('password', values.password);
        formData.append('email',values.email)
        formData.append('role',values.role)
        
        if (file) {
            formData.append('photo_profile', file);
        }
        
        try {
            const response = await FormateurApi.create(formData);
            toast.success(response.data.message || "Le formateur a était creer avec succès !");
            
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
                        <FormField control={form.control} name="nom" render={({ field }) => (<FormItem><FormLabel>Nom</FormLabel><FormControl><Input placeholder="Nom" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="prenom" render={({ field }) => (<FormItem><FormLabel>Prénom</FormLabel><FormControl><Input placeholder="Prénom" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="email" render={({ field }) => (<FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" placeholder="Email" {...field} /></FormControl><FormMessage /></FormItem>)}/>                        
                        <FormField control={form.control} name="telephone" render={({ field }) => (<FormItem><FormLabel>Téléphone</FormLabel><FormControl><Input placeholder="Téléphone" {...field} /></FormControl><FormMessage/></FormItem>)} />
                        <FormField control={form.control} name="role" render={({ field }) => (<FormItem><FormLabel>Role</FormLabel><FormControl><Input placeholder="Role" {...field} disabled/></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="specialite_fonction" render={({ field }) => (<FormItem><FormLabel>Spécialité</FormLabel><FormControl><Input placeholder="Spécialité" {...field} /></FormControl><FormMessage/></FormItem>)} />
                        <FormField control={form.control} name="password" render={({ field }) => (<FormItem><FormLabel>Mot de passe</FormLabel><FormControl><Input type="password" placeholder="*******" {...field} /></FormControl><FormMessage/></FormItem>)} />
                        <FormItem>
                            <FormLabel>Photo de profil</FormLabel>
                            <FormControl>
                                <Input id="photo_profile" type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
                            </FormControl>
                        </FormItem>
                            <Button type="submit" disabled={form.formState.isSubmitting}>
                                {form.formState.isSubmitting && <Loader className="mr-2 h-4 w-4 animate-spin" />}
                                Créer
                            </Button>
                    </form>
                </Form>
    );
}