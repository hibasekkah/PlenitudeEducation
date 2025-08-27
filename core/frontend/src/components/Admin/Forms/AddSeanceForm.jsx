import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useMemo } from "react";
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Loader, Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import FormateurApi from "../../../services/api/Formateur";
import SessionApi from "../../../services/api/Session";
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

  const selectedSessionId = watch("session_id");
  const contentType = watch("content_type");

  const [formateursdata, setFormateursdata] = useState([]);
  const [sessionsdata, setSessionsdata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setErrorState] = useState(null);

  const selectedSession = useMemo(() => {
    if (!selectedSessionId || !sessionsdata.length) return null;
    return sessionsdata.find(session => session.id === Number(selectedSessionId));
  }, [sessionsdata, selectedSessionId]);

  const availableModules = useMemo(() => {
    if (!selectedSession?.formation?.modules) return [];
    return selectedSession.formation.modules;
  }, [selectedSession]);

  const availableAteliers = useMemo(() => {
    if (!selectedSession?.formation?.ateliers) return [];
    return selectedSession.formation.ateliers;
  }, [selectedSession]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setErrorState(null);

        const [formateursRes, sessionsRes] = await Promise.all([
          FormateurApi.all(),
          SessionApi.all(),
        ]);

        setFormateursdata(formateursRes.data.data);
        setSessionsdata(sessionsRes.data.data);
      } catch (error) {
        const errorMsg = "Échec du chargement des données pour le formulaire.";
        setErrorState(errorMsg);
        toast.error(errorMsg);
        console.error("Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const defaultValues = getDefaultValues();
    reset(defaultValues);
  }, [initialData, reset]);

  useEffect(() => {
    if (selectedSessionId && !isUpdate) {
      form.setValue("content_id", "");
      form.setValue("content_type", "");
    }
  }, [selectedSessionId, form, isUpdate]);

  useEffect(() => {
    if (contentType && !isUpdate) {
      form.setValue("content_id", "");
    }
  }, [contentType, form, isUpdate]);

  const handleSubmit = async (values) => {
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

      const response = await onFormSubmit(apiData);
      toast.success(response?.data?.message || `Séance ${isUpdate ? 'mise à jour' : 'créée'} avec succès !`);

      if (!isUpdate) {
        reset(getDefaultValues());
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
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Date et heure */}
        <div className="space-y-4">
          <FormField control={form.control} name="date" render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        </div>

        {/* Sélection session */}
        <FormField control={form.control} name="session_id" render={({ field }) => (
          <FormItem>
            <FormLabel>Session</FormLabel>
            <Select onValueChange={(val) => field.onChange(Number(val))} value={field.value ? String(field.value) : ""}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Choisir la session" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {sessionsdata.map((session) => (
                  <SelectItem key={session.id} value={String(session.id)}>
                    Session #{session.id} - {session.formation?.intitule || 'Formation'} - {session.entreprise?.nom || 'Entreprise'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )} />

        {selectedSession && (
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              <div className="space-y-1">
                <p><strong>Formation:</strong> {selectedSession.formation?.intitule || 'N/A'}</p>
                <p><strong>Entreprise:</strong> {selectedSession.entreprise?.nom || 'N/A'}</p>
                <p><strong>Modules disponibles:</strong> {availableModules.length}</p>
                <p><strong>Ateliers disponibles:</strong> {availableAteliers.length}</p>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Sélection formateur */}
        <FormField control={form.control} name="formateur_id" render={({ field }) => (
          <FormItem>
            <FormLabel>Formateur</FormLabel>
            <Select onValueChange={(val) => field.onChange(Number(val))} value={field.value ? String(field.value) : ""}>
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

        {/* Type de contenu */}
        <div className="space-y-4 p-4 border rounded-lg bg-gray-50 dark:bg-gray-900/50">
          <FormField control={form.control} name="content_type" render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium">Type de contenu</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex flex-col sm:flex-row sm:space-x-6 space-y-2 sm:space-y-0"
                  disabled={!selectedSession}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="module" id="module" />
                    <Label htmlFor="module">
                      Module {selectedSession && `(${availableModules.length} disponibles)`}
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="atelier" id="atelier" />
                    <Label htmlFor="atelier">
                      Atelier {selectedSession && `(${availableAteliers.length} disponibles)`}
                    </Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
              {!selectedSession && (
                <p className="text-sm text-muted-foreground">
                  Veuillez d'abord sélectionner une session
                </p>
              )}
            </FormItem>
          )} />

          {contentType && selectedSession && (
            <FormField control={form.control} name="content_id" render={({ field }) => {
              const items = contentType === "module" ? availableModules : availableAteliers;
              return (
                <FormItem>
                  <FormLabel>
                    {contentType === "module" ? "Module" : "Atelier"}
                  </FormLabel>
                  <Select onValueChange={(val) => field.onChange(Number(val))} value={field.value ? String(field.value) : ""}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={`Choisir ${contentType === "module" ? "le module" : "l'atelier"}`} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {items.map((item) => (
                        <SelectItem key={item.id} value={String(item.id)}>
                          {contentType === "module" ? item.titre : item.type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                  {items.length === 0 && (
                    <p className="text-sm text-amber-600 dark:text-amber-400">
                      Aucun {contentType === "module" ? "module" : "atelier"} disponible pour cette session
                    </p>
                  )}
                </FormItem>
              );
            }} />
          )}
        </div>

        {/* Observations */}
        <FormField control={form.control} name="Observations" render={({ field }) => (
          <FormItem>
            <FormLabel>Observations</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Observations optionnelles"
                className="resize-none min-h-[100px]"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        {/* Bouton de soumission */}
        <Button 
          className="w-full sm:w-auto" 
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting && <Loader className="mr-2 h-4 w-4 animate-spin" />}
          {isUpdate ? 'Mettre à jour la Séance' : 'Créer la Séance'}
        </Button>
      </form>
    </Form>
  );
}
