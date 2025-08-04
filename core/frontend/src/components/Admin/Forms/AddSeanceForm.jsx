// --- IMPORTS ---
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
import { Loader } from "lucide-react";
import FormateurApi from "../../../services/api/Formateur";
import SessionApi from "../../../services/api/Session";
import ModuleApi from "../../../services/api/Module";
import AtelierApi from "../../../services/api/Atelier";

const formSchema = z.object({
  date: z.string().min(1, "La date est obligatoire."),
  heure_debut: z.string().min(1, "L'heure de début est obligatoire."),
  heure_fin: z.string().min(1, "L'heure de fin est obligatoire."),
  etat: z.enum(['planifiée', 'terminée', 'annulée'], { required_error: "L'état est obligatoire." }),
  Observations: z.string().optional(),
  formateur_id: z.coerce.number().int().positive("Veuillez sélectionner un formateur."),
  session_id: z.coerce.number().int().positive("Veuillez sélectionner une session."),
  module_id: z.coerce.number().int().positive().optional(),
  atelier_id: z.coerce.number().int().positive().optional(),
}).refine(data => data.module_id || data.atelier_id, {
  message: "Veuillez sélectionner un module OU un atelier.",
  path: ["module_id"],
});

export default function AddSeanceForm({ onFormSubmit, initialData = null }) {
  const isUpdate = !!initialData;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      date: "", heure_debut: "", heure_fin: "", etat: "activer",
      Observations: "", formateur_id: "", atelier_id: "", module_id: "", session_id: "",
    },
  });
  const { setError, formState: { isSubmitting }, reset } = form;

  const [formateursdata, setFormateursdata] = useState([]);
  const [sessionsdata, setSessionsdata] = useState([]);
  const [modulesdata, setModulesdata] = useState([]);
  const [ateliersdata, setAteliersdata] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [formateursRes, sessionsRes, modulesRes, ateliersRes] = await Promise.all([
          FormateurApi.all(),
          SessionApi.all(),
          ModuleApi.all(),
          AtelierApi.all(),
        ]);
        setFormateursdata(formateursRes.data.data);
        setSessionsdata(sessionsRes.data.data);
        setModulesdata(modulesRes.data.data);
        setAteliersdata(ateliersRes.data.data);
      } catch (error) {
        toast.error("Échec du chargement des données pour le formulaire.");
        console.error("Fetch Error:", error);
      }
    };
    fetchData();
  }, []);

  const onSubmit = async (values) => {
    const loaderMsg = isUpdate ? "Mise à jour en cours..." : "Ajout en cours...";
    const loader = toast.loading(loaderMsg);
    try {
      const response = isUpdate ? await onFormSubmit(initialData.id, values) : await onFormSubmit(values);
      toast.success(response.data.message || `Séance ${isUpdate ? 'mise à jour' : 'créée'} avec succès !`);
      if (!isUpdate) reset();
    } catch (error) {
        console.error("Échec:", error.response || error);
        if (error.response?.status === 422 && error.response.data.errors) {
            toast.error("Champs invalides.");
            Object.entries(error.response.data.errors).forEach(([fieldName, messages]) => {
                setError(fieldName, { type: "server", message: messages.join(', ') });
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
          <FormField control={form.control} name="date" render={({ field }) => (
            <FormItem><FormLabel>Date</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="heure_debut" render={({ field }) => (
            <FormItem><FormLabel>Heure de début</FormLabel><FormControl><Input type="time" {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="heure_fin" render={({ field }) => (
            <FormItem><FormLabel>Heure de fin</FormLabel><FormControl><Input type="time" {...field} /></FormControl><FormMessage /></FormItem>
          )} />

          <FormField control={form.control} name="session_id" render={({ field }) => (
            <FormItem>
              <FormLabel>Session</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={String(field.value)}>
                <FormControl><SelectTrigger><SelectValue placeholder="Choisir la session" /></SelectTrigger></FormControl>
                <SelectContent>{sessionsdata.map((session) => <SelectItem key={session.id} value={String(session.id)}>Session #{session.id} - {session.formation.intitule}</SelectItem>)}</SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="formateur_id" render={({ field }) => (
            <FormItem>
              <FormLabel>Formateur</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={String(field.value)}>
                <FormControl><SelectTrigger><SelectValue placeholder="Choisir le formateur" /></SelectTrigger></FormControl>
                <SelectContent>{formateursdata.map((formateur) => <SelectItem key={formateur.id} value={String(formateur.id)}>{formateur.nom} {formateur.prenom}</SelectItem>)}</SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="module_id" render={({ field }) => (
            <FormItem>
              <FormLabel>Module (Optionnel)</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={String(field.value)}>
                <FormControl><SelectTrigger><SelectValue placeholder="Choisir le module" /></SelectTrigger></FormControl>
                <SelectContent>{modulesdata.map((module) => <SelectItem key={module.id} value={String(module.id)}>{module.titre}</SelectItem>)}</SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="atelier_id" render={({ field }) => (
            <FormItem>
              <FormLabel>Atelier (Optionnel)</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={String(field.value)}>
                <FormControl><SelectTrigger><SelectValue placeholder="Choisir l'atelier" /></SelectTrigger></FormControl>
                <SelectContent>{ateliersdata.map((atelier) => <SelectItem key={atelier.id} value={String(atelier.id)}>{atelier.type}</SelectItem>)}</SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />
        <FormField control={form.control} name="etat" render={({ field }) => (
          <FormItem>
            <FormLabel>État</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl><SelectTrigger><SelectValue placeholder="Choisir un état" /></SelectTrigger></FormControl>
              <SelectContent>
                <SelectItem value="planifiée">Planifiée</SelectItem>
                <SelectItem value="terminée">Terminée</SelectItem>
                <SelectItem value="annulée">Annulée</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="Observations" render={({ field }) => (
          <FormItem><FormLabel>Observations</FormLabel><FormControl><Textarea placeholder="Observations" className="resize-none" {...field} /></FormControl><FormMessage /></FormItem>
        )} />

        <Button className="mt-4" type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader className="mr-2 h-4 w-4 animate-spin" />}
          {isUpdate ? 'Mettre à jour la Séance' : 'Créer la Séance'}
        </Button>
      </form>
    </Form>
  );
}