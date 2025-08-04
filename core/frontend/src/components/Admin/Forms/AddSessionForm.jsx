import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader} from "lucide-react";
import FormationApi from "../../../services/api/Formation"; 
import EntrepriseApi from "../../../services/api/Entreprise"; 

const formSchema = z.object({
  date_debut: z.string().min(1, { message: "La date de début est obligatoire." }),
  date_fin: z.string().min(1, { message: "La date de fin est obligatoire." }),
  //etat: z.string().min(2, { message: "L'état doit contenir au moins 2 caractères." }).max(100),
  //raison_sus: z.string().optional(),
  //raison_annulation: z.string().optional(),
  observations: z.string().optional(),
  formation_id: z.coerce.number().int().positive("Veuillez sélectionner une formation."),
  entreprise_id: z.coerce.number().int().positive("Veuillez sélectionner une entreprise."),
});

export default function AddSessionForm({ onFormSubmit, initialData = null }) {
  const isUpdate = !!initialData; 

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || { 
      date_debut: "", 
      date_fin: "", 
      //etat: "", 
      //raison_sus: "", 
      //raison_annulation: "", 
      observations: "", 
      entreprise_id: "", 
      formation_id: "", 
    },
  });
  const { setError, formState: { isSubmitting }, reset } = form;

  const [formationsdata, setFormationsdata] = useState([]);
  const [entreprisesdata, setEntreprisesdata] = useState([]);

  useEffect(() => {
    const fetchFormations = async () => {
      try {
        const response = await FormationApi.all();
        setFormationsdata(response.data.data);
      } catch (error) { console.error("Échec lors du chargement des formations", error); }
    };
    fetchFormations();
    const fetchEntreprises = async () => {
      try {
        const response = await EntrepriseApi.all();
        setEntreprisesdata(response.data.data);
      } catch (error) { console.error("Échec lors du chargement des entreprises", error); }
    };
    fetchEntreprises();
  }, []);

  const onSubmit = async (values) => {
    console.log("Étape 3 : onSubmit est appelé DANS le formulaire avec les valeurs :", values);
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
        <FormField control={form.control} name="date_debut" render={({ field }) => (
          <FormItem><FormLabel>Date de Début</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        
        <FormField control={form.control} name="date_fin" render={({ field }) => (
          <FormItem><FormLabel>Date de Fin</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        
        {/* ADDED: Missing etat field
        <FormField control={form.control} name="etat" render={({ field }) => (
          <FormItem>
            <FormLabel>État</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Choisir l'état" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="planifie">Planifié</SelectItem>
                <SelectItem value="en_cours">En cours</SelectItem>
                <SelectItem value="termine">Terminé</SelectItem>
                <SelectItem value="suspendu">Suspendu</SelectItem>
                <SelectItem value="annule">Annulé</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )} /> */}
        
        <FormField control={form.control} name="observations" render={({ field }) => (
          <FormItem><FormLabel>Observations</FormLabel><FormControl><Textarea placeholder="Observations" className="resize-none" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        
        <FormField control={form.control} name="formation_id" render={({ field }) => (
          <FormItem>
            <FormLabel>Formation</FormLabel>
            <Select onValueChange={field.onChange} value={String(field.value)}>
              <FormControl><SelectTrigger><SelectValue placeholder="Choisir la formation" /></SelectTrigger></FormControl>
              <SelectContent>{formationsdata.map((formation) => <SelectItem key={formation.id} value={String(formation.id)}>{formation.intitule}</SelectItem>)}</SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )} />
        
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
        
        <Button className={'mt-4'} type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader className={'mr-2 h-4 w-4 animate-spin'} />}
          {isUpdate ? 'Mettre à jour' : 'Créer'}
        </Button>
      </form>
    </Form>
  );
}