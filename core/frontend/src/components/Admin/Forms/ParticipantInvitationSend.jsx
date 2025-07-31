"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useParams, useNavigate, useSearchParams } from "react-router-dom" 
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
import { Loader } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { toast } from "sonner"
import { useEffect, useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import EntrepriseApi from "../../../services/api/Entreprise"
import InvitationApi from "../../../services/api/Invitation"


const formSchema = z.object({
  email: z.string().email(),
  role: z.string().min(2).max(50),
  entreprise: z.coerce.number().int(),
})

export default function ParticipantInvitationSend() {
    const navigate = useNavigate();

    const form = useForm({
        resolver: zodResolver(formSchema), 
        defaultValues: {
            email: "",
            role: "participant",
            entreprise: "",
        }
    });
    
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
    const { formState: { isSubmitting } } = form; 
 
    const onSubmit = async (data) => {
        const loader = toast.loading("envoi en cours...");
        try {
            const payload = {
                role: "participant",
                email: data.email,
                entreprise: data.entreprise,
            };
            const response = await InvitationApi.send(payload);
            toast.success(response.data.status || "envoyer avec succès !");
            setTimeout(() => {
                navigate('/admin/participant');
            }, 2000);
        } catch (error) {
            toast.error(error.response?.data?.message || "Une erreur est survenue.");
            console.error(error);
        } finally {
            toast.dismiss(loader);
        }
    };

    // if (!email || !token) {
    //     return <div>Lien de réinitialisation invalide ou incomplet.</div>;
    // }

    return (
        <div className="flex justify-center items-center m-11 w-full">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Envoyer un invitation</CardTitle>
                    <CardDescription>
                        remplire les champs suivants
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormItem>
                                <FormLabel>Role</FormLabel>
                                <FormControl>
                                    <Input value="participant" disabled readOnly/>
                                </FormControl>
                            </FormItem>

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input type="email" placeholder="Email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField control={form.control} name="entreprise" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Entreprise</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={String(field.value)}>
                                    <FormControl><SelectTrigger><SelectValue placeholder="Choisir l'entreprise" /></SelectTrigger></FormControl>
                                    <SelectContent>{entreprisesdata.map((entreprise) => <SelectItem key={entreprise.id} value={String(entreprise.id)}>{entreprise.nom}</SelectItem>)}</SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                                )} />
                            <Button disabled={isSubmitting} type="submit" className="w-full">
                                {isSubmitting && <Loader className={"mr-2 h-4 w-4 animate-spin"} />}
                                Envoyer
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}