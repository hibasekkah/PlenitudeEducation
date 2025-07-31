import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useState } from "react";
import { Loader } from "lucide-react";
import InvitationApi from "../../services/api/Invitation";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const formSchema = z.object({
  nom: z.string().min(2, "Le nom est trop court.").max(100),
  prenom: z.string().min(2, "Le prénom est trop court.").max(100),
  specialite_fonction: z.string().min(2, "La fonction est trop court.").max(100),
  telephone: z.string(),
  photo_profile: z.any().optional(),
  password:z.string().min(8),
});

export function ParticipantInvitationRegister() {
    const [file, setFile] = useState(null);
    const { token } = useParams();
    const formData = new FormData();
    const navigate = useNavigate();


    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nom: "",
            prenom: "",
            telephone: "",
            specialite_fonction: "",
            photo_profile:"",
            password:"",
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
        formData.append('token',token)
        
        if (file) {
            formData.append('photo_profile', file);
        }
        
        try {
            const response = await InvitationApi.register(formData);
            toast.success(response.data.message || "Le compte a était creer avec succès !");
            setTimeout(() => {
                navigate('/login');
            }, 2000);
            
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
        <div className="flex justify-center items-center m-11 w-full">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Cree votre compte</CardTitle>
                    <CardDescription>
                        remplire les champs suivants
                    </CardDescription>
                </CardHeader>
                <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField control={form.control} name="nom" render={({ field }) => (<FormItem><FormLabel>Nom</FormLabel><FormControl><Input placeholder="Nom" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="prenom" render={({ field }) => (<FormItem><FormLabel>Prénom</FormLabel><FormControl><Input placeholder="Prénom" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="telephone" render={({ field }) => (<FormItem><FormLabel>Téléphone</FormLabel><FormControl><Input placeholder="Téléphone" {...field} /></FormControl><FormMessage/></FormItem>)} />
                        <FormField control={form.control} name="specialite_fonction" render={({ field }) => (<FormItem><FormLabel>Fonction/Spécialité</FormLabel><FormControl><Input placeholder="Fonction/Spécialité" {...field} /></FormControl><FormMessage/></FormItem>)} />
                        <FormField control={form.control} name="password" render={({ field }) => (<FormItem><FormLabel>Mot de passe</FormLabel><FormControl><Input type="password" placeholder="*******" {...field} /></FormControl><FormMessage/></FormItem>)} />
                        
                        <FormItem>
                            <FormLabel>Photo de profil</FormLabel>
                            <FormControl>
                                <Input id="photo_profile" type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
                            </FormControl>
                        </FormItem>
                            <Button type="submit" disabled={form.formState.isSubmitting}>
                                {form.formState.isSubmitting && <Loader className="mr-2 h-4 w-4 animate-spin" />}
                                Creer
                            </Button>
                    </form>
                </Form>
            </CardContent>
            </Card>
        </div>
    );
}