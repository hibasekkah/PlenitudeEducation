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

const formSchema = z.object({
  intitule: z
    .string({
      required_error: "L'intitulé est requis",
      invalid_type_error: "L'intitulé doit être une chaîne de caractères"
    })
    .min(2, { message: "L'intitulé doit contenir au moins 2 caractères." })
    .max(100, { message: "L'intitulé ne peut pas dépasser 100 caractères." }),
    
  objectifs: z
    .string({
      required_error: "Les objectifs sont requis",
      invalid_type_error: "Les objectifs doivent être une chaîne de caractères"
    })
    .min(1, { message: "Les objectifs sont obligatoires." }),
    
  niveau: z
    .string({
      required_error: "Le niveau est requis",
      invalid_type_error: "Le niveau doit être une chaîne de caractères"
    })
    .min(1, { message: "Le niveau est obligatoire." }),
    
  categorie: z
    .string({
      required_error: "La catégorie est requise",
      invalid_type_error: "La catégorie doit être une chaîne de caractères"
    })
    .min(1, { message: "La catégorie est obligatoire." }),
    
  duree: z
    .coerce
    .number({ 
      required_error: "La durée est requise",
      invalid_type_error: "La durée doit être un nombre." 
    })
    .int({ message: "La durée doit être un nombre entier." })
    .positive({ message: "La durée doit être un nombre positif." }),
    
  cout: z
    .coerce
    .number({ 
      required_error: "Le coût est requis",
      invalid_type_error: "Le coût doit être un nombre." 
    })
    .positive({ message: "Le coût doit être un nombre positif." }),
});

const initialValues = {
  intitule: "",
  objectifs: "",
  niveau: "",
  categorie: "",
  duree: "",
  cout: "",
};

export default function AddFormationForm({ onFormSubmit, initialData }) {
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
        <FormField control={form.control} name="intitule" render={({ field }) => (
          <FormItem><FormLabel>Intitulé</FormLabel><FormControl><Input placeholder="Intitulé" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="objectifs" render={({ field }) => (
          <FormItem><FormLabel>Objectifs</FormLabel><FormControl><Textarea placeholder="objectifs" className="resize-none" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="duree" render={({ field }) => (
          <FormItem><FormLabel>Durée (heures)</FormLabel><FormControl><Input type="number" placeholder="Durée" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="cout" render={({ field }) => (
          <FormItem><FormLabel>Cout (DH)</FormLabel><FormControl><Input type="number" placeholder="Cout" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="categorie" render={({ field }) => (
          <FormItem><FormLabel>Catégorie</FormLabel><FormControl><Input placeholder="Catégorie" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="niveau" render={({ field }) => (
            <FormItem>
              <FormLabel>Niveau</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir le niveau de la formation" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Debutant">Debutant</SelectItem>
                  <SelectItem value="Intermédiaire">Intermédiaire</SelectItem>
                  <SelectItem value="Expert">Expert</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className={'mt-4'} type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader className={'mr-2 h-4 w-4 animate-spin'} />}
          {isUpdate ? 'Mettre à jour' : 'Créer'}
        </Button>
      </form>
    </Form>
  );
}