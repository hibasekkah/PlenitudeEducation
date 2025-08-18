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
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import EntrepriseApi from "../../../services/api/Entreprise";



const formSchema = z.object({
    email: z.string().email(),
    nom: z.string().min(2, "Le nom est trop court.").max(100),
    prenom: z.string().min(2, "Le prénom est trop court.").max(100),
    specialite_fonction: z.string().min(2, "La fonction est trop court.").max(100),
    telephone: z.string(),
    statut: z.string(),
    photo_profile: z.any().optional(),
    entreprise_id: z.coerce.number().int(),
});

export function EditParticipantForm({initialData = null}) {
    const [file, setFile] = useState(null);
    const [entreprisesdata, setEntreprisesdata] = useState([]);


    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nom: initialData.nom || "",
            email: initialData.email || "",
            prenom: initialData.prenom || "",
            telephone: initialData.telephone || "",
            specialite_fonction: initialData.specialite_fonction || "",
            entreprise_id: initialData.entreprise_id || "",
            statut: initialData.statut || "",
        },
    });
    const { setError } = form;
    useEffect(() => {
        const fetchEntreprises = async () => {
        try {
            const response = await EntrepriseApi.all();
            setEntreprisesdata(response.data.data);
        } catch (error) { console.error("Échec lors du chargement des entreprises", error); }
        };
        fetchEntreprises();
    }, []);

    const onSubmit = async (values) => {
        const loader = toast.loading("Mise à jour en cours...");
        
        const formData = new FormData();
        formData.append('_method', 'PUT');
        formData.append('nom', values.nom);
        formData.append('email', values.email);
        formData.append('prenom', values.prenom);
        formData.append('telephone', values.telephone);
        formData.append('specialite_fonction', values.specialite_fonction);
        formData.append('statut', values.statut);
        formData.append('entreprise_id', values.entreprise_id);
        
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
                        <FormField control={form.control} name="status" render={({ field }) => (
                            <FormItem>
                            <FormLabel>Status</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Choisir le Statut" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                <SelectItem value="cadre">Cadre</SelectItem>
                                <SelectItem value="ouvrier">Ouvrier</SelectItem>
                                <SelectItem value="employe">Employé</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField control={form.control} name="specialite_fonction" render={({ field }) => (<FormItem><FormLabel>Fonction</FormLabel><FormControl><Input placeholder="Fonction" {...field} /></FormControl><FormMessage/></FormItem>)} />
                        <FormField control={form.control} name="entreprise_id" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Entreprise</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={String(field.value)}>
                                <FormControl><SelectTrigger><SelectValue placeholder="Choisir l'entreprise" /></SelectTrigger></FormControl>
                                <SelectContent>{entreprisesdata.map((entreprise) => <SelectItem key={entreprise.id} value={String(entreprise.id)}>{entreprise.nom}</SelectItem>)}</SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                            )} />
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