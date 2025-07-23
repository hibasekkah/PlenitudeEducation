import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader } from "lucide-react";
import { toast } from "sonner";

const formSchema = z.object({
  nom: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères." }).max(100),
  secteur: z.string().min(1, { message: "Le secteur d'activité est obligatoire." }),
  email: z.string({ required_error: "L'e-mail est obligatoire." }).email({ message: "Veuillez entrer une adresse e-mail valide." }),
  adresse: z.string().min(1, { message: "L'adresse est obligatoire." }).max(255),
  telephone: z.string().min(1, { message: "Le numéro de téléphone est obligatoire." }),
  
  SIRET: z.string(),
  IF: z.string(),
  CNSS: z.string(),

  priode: z.coerce.number({ invalid_type_error: "La période doit être un nombre." })
    .int({ message: "La période doit être un nombre entier." })
    .positive({ message: "La période doit être un nombre positif." }),
  capital: z.coerce.number({ invalid_type_error: "Le capital doit être un nombre." }).positive(),
  budget: z.coerce.number({ invalid_type_error: "Le budget doit être un nombre." }).positive(),
  debut_period: z.string().min(1, { message: "La date de début est obligatoire." }),
  fin_period: z.string().min(1, { message: "La date de fin est obligatoire." }),
});

const initialValues = {
  nom: "",
  secteur: "",
  SIRET: "",
  IF: "",
  CNSS: "",
  telephone: "",
  email: "",
  priode: "", 
  adresse: "",
  capital: "",
  budget: "",
  debut_period: "",
  fin_period: "",
};

export default function AddEntrepriseForm({ onFormSubmit, initialData }) {
  const isUpdate = !!initialData;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ? { ...initialValues, ...initialData } : initialValues,
  });
  const { setError, formState: { isSubmitting }, reset } = form;

  const onSubmit = async (values) => {
    const loaderMsg = isUpdate ? "Mise à jour en cours..." : "Ajout en cours...";
    const loader = toast.loading(loaderMsg);

    try {
      const response = await onFormSubmit(values);
      console.log(response.data);
      toast.success(response.data.message || (isUpdate ? "Mise à jour réussie !" : "Ajout réussi !"));
      
      if (!isUpdate) {
        reset(); 
      }
    } catch (error) {
      console.error("Échec de la soumission du formulaire:", error.response || error);

      if (error.response) {
        const status = error.response.status;
        const data = error.response.data;

        if (status === 422 && data.errors) {
          toast.error("Certains champs sont invalides. Veuillez corriger.");
          Object.entries(data.errors).forEach(([fieldName, errorMessages]) => {
            setError(fieldName, {
              type: "server",
              message: errorMessages.join(', '),
            });
          });
        } else if (status === 403) {
          toast.error(data.message || "Vous n'êtes pas autorisé à effectuer cette action.");
        } else if (status === 404) {
          toast.error("L'endpoint de l'API est introuvable. Vérifiez l'URL.");
        } else if (status >= 500) {
          toast.error("Une erreur est survenue sur le serveur. Veuillez réessayer plus tard.");
        } else {
          toast.error(data.message || "Une erreur inattendue est survenue.");
        }
      } else {
        toast.error("Impossible de contacter le serveur. Vérifiez votre connexion internet.");
      }
    } finally {
      toast.dismiss(loader);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField control={form.control} name="nom" render={({ field }) => (
          <FormItem><FormLabel>Nom de l'entreprise</FormLabel><FormControl><Input placeholder="Nom de l'entreprise" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="secteur" render={({ field }) => (
          <FormItem><FormLabel>Secteur d'activité</FormLabel><FormControl><Input placeholder="Secteur d'activité" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="email" render={({ field }) => (
          <FormItem><FormLabel>Email</FormLabel><FormControl><Input placeholder="Email" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="telephone" render={({ field }) => (
          <FormItem><FormLabel>Téléphone</FormLabel><FormControl><Input placeholder="Téléphone" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="SIRET" render={({ field }) => (
          <FormItem><FormLabel>SIRET</FormLabel><FormControl><Input placeholder="SIRET" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="IF" render={({ field }) => (
          <FormItem><FormLabel>IF</FormLabel><FormControl><Input placeholder="IF" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="CNSS" render={({ field }) => (
          <FormItem><FormLabel>CNSS</FormLabel><FormControl><Input placeholder="CNSS" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="adresse" render={({ field }) => (
          <FormItem><FormLabel>Adresse</FormLabel><FormControl><Textarea placeholder="Adresse" className="resize-none" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="capital" render={({ field }) => (
          <FormItem><FormLabel>Capital</FormLabel><FormControl><Input type="number" placeholder="Capital" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="budget" render={({ field }) => (
          <FormItem><FormLabel>Budget</FormLabel><FormControl><Input type="number" placeholder="Budget" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="priode" render={({ field }) => (
          <FormItem><FormLabel>Période de budget (en mois)</FormLabel><FormControl><Input type="number" placeholder="Période" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="debut_period" render={({ field }) => (
          <FormItem><FormLabel>Début de période</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="fin_period" render={({ field }) => (
          <FormItem><FormLabel>Fin de période</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        
        <Button className={'mt-4'} type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader className={'mr-2 h-4 w-4 animate-spin'} />}
          {isUpdate ? 'Mettre à jour' : 'Créer'}
        </Button>
      </form>
    </Form>
  );
}