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
import { toast } from "sonner";
import { useState } from "react";
import { Loader } from "lucide-react";
import ProfileApi from "../../services/api/Profile";


const formSchema = z.object({
  nom: z.string().min(2, "Le nom est trop court.").max(100),
  prenom: z.string().min(2, "Le prénom est trop court.").max(100),
  telephone: z.string().optional(),
  photo_profile: z.any().optional(),
  specialite_fonction: z.string().max(100),
  statut: z.string().max(100),
});

export function ProfilEditRH() {
    const { user, setUser} = useAuth();
    const [file, setFile] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nom: user?.nom || "",
            prenom: user?.prenom || "",
            telephone: user?.telephone || "",
            statut: user?.statut || "",
            specialite_fonction: user?.specialite_fonction || "",
        },
    });
    const { setError } = form;

    const onSubmit = async (values) => {
        const loader = toast.loading("Mise à jour en cours...");
        
        const formData = new FormData();
        formData.append('_method', 'PUT');
        formData.append('nom', values.nom);
        formData.append('prenom', values.prenom);
        formData.append('telephone', values.telephone);
        formData.append('statut', values.statut);
        formData.append('specialite_fonction', values.specialite_fonction);
        
        if (file) {
            formData.append('photo_profile', file);
        }
        
        try {
            const response = await ProfileApi.update(user.id, formData);
            
            toast.success(response.data.message || "Profil mis à jour avec succès !");

            setUser(response.data.user);
            
            setIsOpen(false);

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
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button>Éditer le Profil</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Éditer le profil</DialogTitle>
                    <DialogDescription>
                        Apportez des modifications à votre compte ici.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField control={form.control} name="nom" render={({ field }) => (<FormItem><FormLabel>Nom</FormLabel><FormControl><Input placeholder="Nom" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="prenom" render={({ field }) => (<FormItem><FormLabel>Prénom</FormLabel><FormControl><Input placeholder="Prénom" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="telephone" render={({ field }) => (<FormItem><FormLabel>Téléphone</FormLabel><FormControl><Input placeholder="Téléphone" {...field} /></FormControl><FormMessage/></FormItem>)} />
                        <FormField control={form.control} name="statut" render={({ field }) => (<FormItem><FormLabel>Statut</FormLabel><FormControl><Input placeholder="Statut" {...field} /></FormControl><FormMessage/></FormItem>)} />
                        <FormField control={form.control} name="specialite_fonction" render={({ field }) => (<FormItem><FormLabel>Fonction</FormLabel><FormControl><Input placeholder="Fonction" {...field} /></FormControl><FormMessage/></FormItem>)} />

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
            </DialogContent>
        </Dialog>
    );
}