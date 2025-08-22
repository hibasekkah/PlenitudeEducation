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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Loader } from "lucide-react";
import FormateurApi from "../../../services/api/Formateur";
import SessionApi from "../../../services/api/Session";
import ModuleApi from "../../../services/api/Module";
import AtelierApi from "../../../services/api/Atelier";
import TimePickerInput from "../../ui/TimePickerInput";

const formSchema = z.object({
  date: z.string().min(1, "La date est obligatoire."),
  heure_debut: z.string().min(1, "L'heure de début est obligatoire."),
  heure_fin: z.string().min(1, "L'heure de fin est obligatoire."),
  Observations: z.string().optional(),
  formateur_id: z.coerce.number().int().positive("Veuillez sélectionner un formateur."),
  session_id: z.coerce.number().int().positive("Veuillez sélectionner une session."),
  
  content_type: z.enum(["module", "atelier"], {
    required_error: "Veuillez choisir entre Module ou Atelier.",
  }),
  
  content_id: z.coerce.number().int().positive("Veuillez sélectionner un élément."),
});

export default function AddSeanceForm({ onFormSubmit, initialData = null }) {
  const isUpdate = !!initialData;

  const getDefaultValues = () => {
    if (!initialData) {
      return {
        date: "", 
        heure_debut: "", 
        heure_fin: "",
        Observations: "", 
        formateur_id: "", 
        session_id: "",
        content_type: "", 
        content_id: "",
      };
    }
 
    const content_type = initialData.module_id ? "module" : "atelier";
    const content_id = initialData.module_id || initialData.atelier_id;

    return {
      date: initialData.date || "",
      heure_debut: initialData.heure_debut || "",
      heure_fin: initialData.heure_fin || "",
      Observations: initialData.Observations || "",
      formateur_id: initialData.formateur_id || "",
      session_id: initialData.session_id || "",
      content_type,
      content_id: content_id || "",
    };
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: getDefaultValues(),
  });

  const { setError, formState: { isSubmitting }, reset, watch } = form;

  const contentType = watch("content_type");

  const [formateursdata, setFormateursdata] = useState([]);
  const [sessionsdata, setSessionsdata] = useState([]);
  const [modulesdata, setModulesdata] = useState([]);
  const [ateliersdata, setAteliersdata] = useState([]);

  useEffect(() => {
    if (initialData) {
      const defaultValues = getDefaultValues();
      reset(defaultValues);
    }
  }, [initialData, reset]);

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

  useEffect(() => {
    if (contentType && !isUpdate) {
      form.setValue("content_id", "");
    }
  }, [contentType, form, isUpdate]);

  const onSubmit = async (values) => {
    const loaderMsg = isUpdate ? "Mise à jour en cours..." : "Ajout en cours...";
    const loader = toast.loading(loaderMsg);
    
    try {
      const apiData = {
        date: values.date,
        heure_debut: values.heure_debut,
        heure_fin: values.heure_fin,
        Observations: values.Observations,
        formateur_id: values.formateur_id,
        session_id: values.session_id,
        ...(values.content_type === "module" 
          ? { module_id: values.content_id }
          : { atelier_id: values.content_id }
        ),
      };

      const response = isUpdate 
        ? await onFormSubmit(apiData) 
        : await onFormSubmit(apiData);
        
      toast.success(response.data.message || `Séance ${isUpdate ? 'mise à jour' : 'créée'} avec succès !`);
      
      if (!isUpdate) {
        reset();
      }
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
          <FormItem>
            <FormLabel>Date</FormLabel>
            <FormControl>
              <Input type="date" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <div className="grid grid-cols-2 gap-4">
          <FormField control={form.control} name="heure_debut" render={({ field }) => (
            <FormItem>
              <FormLabel>Heure de début</FormLabel>
              <FormControl>
                <TimePickerInput field={field}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="heure_fin" render={({ field }) => (
            <FormItem>
              <FormLabel>Heure de fin</FormLabel>
              <FormControl>
                <TimePickerInput field={field}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        <FormField control={form.control} name="session_id" render={({ field }) => (
          <FormItem>
            <FormLabel>Session</FormLabel>
            <Select onValueChange={field.onChange} value={String(field.value || "")}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Choisir la session" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {sessionsdata.map((session) => (
                  <SelectItem key={session.id} value={String(session.id)}>
                    Session #{session.id} - {session.formation.intitule} - {session.entreprise.nom}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="formateur_id" render={({ field }) => (
          <FormItem>
            <FormLabel>Formateur</FormLabel>
            <Select onValueChange={field.onChange} value={String(field.value || "")}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Choisir le formateur" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {formateursdata.map((formateur) => (
                  <SelectItem key={formateur.id} value={String(formateur.id)}>
                    {formateur.nom} {formateur.prenom}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )} />

        <div className="space-y-4 p-4 border rounded-lg">
          <FormField control={form.control} name="content_type" render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium">Type de contenu</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex space-x-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="module" id="module" />
                    <Label htmlFor="module">Module</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="atelier" id="atelier" />
                    <Label htmlFor="atelier">Atelier</Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          {contentType && (
            <FormField control={form.control} name="content_id" render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {contentType === "module" ? "Module" : "Atelier"}
                </FormLabel>
                <Select onValueChange={field.onChange} value={String(field.value || "")}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue 
                        placeholder={`Choisir ${contentType === "module" ? "le module" : "l'atelier"}`} 
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {contentType === "module" 
                      ? modulesdata.map((module) => (
                          <SelectItem key={module.id} value={String(module.id)}>
                            {module.titre}
                          </SelectItem>
                        ))
                      : ateliersdata.map((atelier) => (
                          <SelectItem key={atelier.id} value={String(atelier.id)}>
                            {atelier.type}
                          </SelectItem>
                        ))
                    }
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
          )}
        </div>

        <FormField control={form.control} name="Observations" render={({ field }) => (
          <FormItem>
            <FormLabel>Observations</FormLabel>
            <FormControl>
              <Textarea 
                value={field.value || ""} 
                placeholder="Observations" 
                className="resize-none" 
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <Button className="mt-4" type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader className="mr-2 h-4 w-4 animate-spin" />}
          {isUpdate ? 'Mettre à jour la Séance' : 'Créer la Séance'}
        </Button>
      </form>
    </Form>
  );
}