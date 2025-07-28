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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import FormationApi from "../../../services/api/Formation";

const formSchema = z.object({
  type: z.string().min(2, { message: "Le type doit contenir au moins 2 caractères." }).max(100),
  materiels: z.string().min(1, { message: "Les materiels sont obligatoires." }),
  lieu: z.string().min(1, { message: "Le lieu est obligatoire." }),
  observations: z.string().optional(),
  formation_id: z.coerce 
      .number({ required_error: "Veuillez sélectionner une formation." })
      .int()
      .positive("Veuillez sélectionner une formation valide."),
  duree: z.coerce.number({ invalid_type_error: "La durée doit être un nombre." })
    .int({ message: "La duree doit être un nombre entier." })
    .positive({ message: "La duree doit être un nombre positif." }),
});

const initialValues = {
  type: "",
  materiels: "",
  lieu: "",
  observations: "",
  duree: "",
};

export default function AddAtelierForm({ onFormSubmit, initialData }) {
  const isUpdate = !!initialData;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ? { ...initialValues, ...initialData } : initialValues,
  });
  const { setError, formState: { isSubmitting }, reset } = form;
  const [formationsdata,setFormationsdata] = useState([]);

  useEffect(()=>{
    const fetchFormations = async () => {
    try {
      const response = await FormationApi.all();
      setFormationsdata(response.data.data);
      console.log(response.data); 
    } catch (error) {
      console.error("Impossible de récupérer les formations :", error);
    }
  };

  fetchFormations();
  },[]);

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
        <FormField control={form.control} name="type" render={({ field }) => (
          <FormItem><FormLabel>Type</FormLabel><FormControl><Input placeholder="Type" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="materiels" render={({ field }) => (
          <FormItem><FormLabel>materiels</FormLabel><FormControl><Textarea placeholder="materiels" className="resize-none" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="observations" render={({ field }) => (
          <FormItem><FormLabel>observations</FormLabel><FormControl><Textarea placeholder="observations" className="resize-none" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="duree" render={({ field }) => (
          <FormItem><FormLabel>Durée (heurs)</FormLabel><FormControl><Input type="number" placeholder="Durée" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="lieu" render={({ field }) => (
          <FormItem><FormLabel>lieu</FormLabel><FormControl><Input placeholder="lieu" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="formation_id" render={({ field }) => (
          <FormItem>
            <FormLabel>Formation</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={String(field.value)}>
              <FormControl><SelectTrigger><SelectValue placeholder="Choisir la formation" /></SelectTrigger></FormControl>
              <SelectContent>{formationsdata.map((formation) => <SelectItem key={formation.id} value={String(formation.id)}>{formation.intitule}</SelectItem>)}</SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )} />
        <Button className={'mt-4'} type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader className={'mr-2 h-4 w-4 animate-spin'} />}
          {isUpdate ? 'Mettre à jour' : 'Créer'}
        </Button>
      </form>
    </Form>
  );
}