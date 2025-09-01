import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Eye, EyeOff, Loader } from "lucide-react";
import EntrepriseApi from "../../../services/api/Entreprise";
import RHApi from "../../../services/api/RH";

const formSchema = z.object({
  nom: z
    .string({
      required_error: "Le nom est requis",
      invalid_type_error: "Le nom doit être une chaîne de caractères"
    })
    .min(2, "Le nom est trop court.")
    .max(100, "Le nom ne peut pas dépasser 100 caractères."),
    
  prenom: z
    .string({
      required_error: "Le prénom est requis",
      invalid_type_error: "Le prénom doit être une chaîne de caractères"
    })
    .min(2, "Le prénom est trop court.")
    .max(100, "Le prénom ne peut pas dépasser 100 caractères."),
    
  specialite_fonction: z
    .string({
      required_error: "La spécialité/fonction est requise",
      invalid_type_error: "La spécialité/fonction doit être une chaîne de caractères"
    })
    .min(2, "La fonction est trop courte.")
    .max(100, "La spécialité/fonction ne peut pas dépasser 100 caractères."),
    
  telephone: z
    .string({
      required_error: "Le numéro de téléphone est requis",
      invalid_type_error: "Le numéro de téléphone doit être une chaîne de caractères"
    })
    .min(1, "Le numéro de téléphone est obligatoire."),
    
  photo_profile: z.any().optional(),
  
  password: z
    .string({
      required_error: "Le mot de passe est requis",
      invalid_type_error: "Le mot de passe doit être une chaîne de caractères"
    })
    .min(8, "Le mot de passe doit contenir au moins 8 caractères."),
    
  email: z
    .string({
      required_error: "L'email est requis",
      invalid_type_error: "L'email doit être une chaîne de caractères"
    })
    .email("Veuillez entrer une adresse email valide."),
    
  entreprise_id: z
    .coerce
    .number({
      required_error: "Veuillez sélectionner une entreprise.",
      invalid_type_error: "L'ID d'entreprise doit être un nombre"
    })
    .int({ message: "L'ID d'entreprise doit être un nombre entier." }),
    
  role: z
    .string({
      required_error: "Le rôle est requis",
      invalid_type_error: "Le rôle doit être une chaîne de caractères"
    })
    .min(1, "Le rôle est obligatoire."),
    
  statut: z
    .string({
      required_error: "Le statut est requis",
      invalid_type_error: "Le statut doit être une chaîne de caractères"
    })
    .min(1, "Le statut est obligatoire."),
});
export function AddRHFrom() {
    const [file, setFile] = useState(null);
    const formData = new FormData();

    const [entreprisesdata, setEntreprisesdata] = useState([]);
    useEffect(() => {
        const fetchEntreprises = async () => {
        try {
            const response = await EntrepriseApi.all();
            setEntreprisesdata(response.data.data);
        } catch (error) { console.error("Échec lors du chargement des entreprises", error); }
        };
        fetchEntreprises();
    }, []);
    const [showPassword, setShowPassword] = useState(false);
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
            role:"rh",
            entreprise_id:"",
            statut:"",
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
        formData.append('entreprise_id',values.entreprise_id)
        formData.append('statut',values.statut)
        
        if (file) {
            formData.append('photo_profile', file);
        }
        
        try {
            const response = await RHApi.create(formData);
            toast.success(response.data.message || "Le participant a était creer avec succès !");
            
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
                        <FormField control={form.control} name="entreprise_id" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Entreprise</FormLabel>
                            <Select onValueChange={field.onChange} value={String(field.value)}>
                            <FormControl><SelectTrigger><SelectValue placeholder="Choisir l'entreprise" /></SelectTrigger></FormControl>
                            <SelectContent>{entreprisesdata.map((entreprise) => <SelectItem key={entreprise.id} value={String(entreprise.id)}>{entreprise.nom}</SelectItem>)}</SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                        )} />
                        <FormField control={form.control} name="nom" render={({ field }) => (<FormItem><FormLabel>Nom</FormLabel><FormControl><Input placeholder="Nom" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="prenom" render={({ field }) => (<FormItem><FormLabel>Prénom</FormLabel><FormControl><Input placeholder="Prénom" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="email" render={({ field }) => (<FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" placeholder="Email" {...field} /></FormControl><FormMessage /></FormItem>)}/>                        
                        <FormField control={form.control} name="telephone" render={({ field }) => (<FormItem><FormLabel>Téléphone</FormLabel><FormControl><Input placeholder="Téléphone" {...field} /></FormControl><FormMessage/></FormItem>)} />
                        <FormField control={form.control} name="role" render={({ field }) => (<FormItem><FormLabel>Role</FormLabel><FormControl><Input placeholder="Role" {...field} disabled/></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="specialite_fonction" render={({ field }) => (<FormItem><FormLabel>Fonction</FormLabel><FormControl><Input placeholder="Fonction" {...field} /></FormControl><FormMessage/></FormItem>)} />
                        <FormField control={form.control} name="password" render={({ field }) => (<FormItem><FormLabel>Mot de passe</FormLabel><FormControl><div className="relative"><Input type={showPassword ? "text" : "password"} placeholder="*******" {...field} />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                          >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button></div></FormControl><FormMessage/></FormItem>)} />
                        <FormField control={form.control} name="statut" render={({ field }) => (
                            <FormItem>
                            <FormLabel>Statut</FormLabel>
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