import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader } from "lucide-react";
import { toast } from "sonner";

// Le formSchema reste exactement comme vous l'avez fourni
const formSchema = z.object({
  nom: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères." }).max(100),
  secteur: z.string().min(1, { message: "Le secteur d'activité est obligatoire." }),
  email: z.string({ required_error: "L'e-mail est obligatoire." }).email({ message: "Veuillez entrer une adresse e-mail valide." }),
  adresse: z.string().min(1, { message: "L'adresse est obligatoire." }).max(255),
  telephone: z.string().min(1, { message: "Le numéro de téléphone est obligatoire." }),
  SIRET: z.string().min(2,{ message: "Le SIRET doit contenir au moins 2 caractères." }),
  IF: z.string().min(2,{ message: "Le IF doit contenir au moins 2 caractères." }),
  CNSS: z.string().min(2,{ message: "Le CNSS doit contenir au moins 2 caractères." }),
  priode: z.coerce.number().int().positive(),
  capital: z.coerce.number().positive(),
  budget: z.coerce.number().positive(),
  debut_period: z.string(),
  fin_period: z.string(),
  doc_rc: z.any().optional(),
  doc_status: z.any().optional(),
  doc_pv: z.any().optional(),
  CIN_gerant: z.any().optional(),
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

export default function AddEntrepriseForm({ onFormSubmit, initialData = null }) {
  const isUpdate = !!initialData;

  const [docRcFile, setDocRcFile] = useState(null);
  const [docStatusFile, setDocStatusFile] = useState(null);
  const [docPvFile, setDocPvFile] = useState(null);
  const [cinGerantFile, setCinGerantFile] = useState(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ? { ...initialValues, ...initialData } : initialValues,
  });
  const { setError, formState: { isSubmitting }, reset } = form;

  const onSubmit = async (values) => {
    const loaderMsg = isUpdate ? "Mise à jour en cours..." : "Ajout en cours...";
    const loader = toast.loading(loaderMsg);
    const formData = new FormData();

    Object.keys(values).forEach(key => {
      if (!['doc_rc', 'doc_status', 'doc_pv', 'CIN_gerant'].includes(key) && values[key]) {
        formData.append(key, values[key]);
      }
    });

    if (docRcFile) formData.append('doc_rc', docRcFile);
    if (docStatusFile) formData.append('doc_status', docStatusFile);
    if (docPvFile) formData.append('doc_pv', docPvFile);
    if (cinGerantFile) formData.append('CIN_gerant', cinGerantFile);
    
    try {
      let response;
      if (isUpdate) {
        formData.append('_method', 'put');
        response = await onFormSubmit(initialData.id, formData);
      } else {
        response = await onFormSubmit(formData);
      }
      toast.success(response.data.message);
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
      console.log(`--- Contenu du FormData envoyé (${isUpdate ? 'UPDATE' : 'CREATE'}) ---`);
      for (let [key, value] of formData.entries()) {
          console.log(`${key}:`, value);
      }
      console.log("-----------------------------------------");
    }
  };

  

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* --- Tous vos FormField pour les champs de texte restent ici --- */}
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
          <FormItem><FormLabel>Budget (dh)</FormLabel><FormControl><Input type="number" placeholder="Budget" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="priode" render={({ field }) => (
          <FormItem><FormLabel>Période (en mois)</FormLabel><FormControl><Input type="number" placeholder="Période" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="debut_period" render={({ field }) => (
          <FormItem><FormLabel>Début de période</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="fin_period" render={({ field }) => (
          <FormItem><FormLabel>Fin de période</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
        )} />

        <FormItem>
          <FormLabel>Registre de commerce</FormLabel>
          <FormControl>
            <Input id="doc_rc" type="file" onChange={(e) => setDocRcFile(e.target.files[0])} />
          </FormControl>
        </FormItem>
        <FormItem>
          <FormLabel>Statuts d'entreprise</FormLabel>
          <FormControl>
            <Input id="doc_status" type="file" onChange={(e) => setDocStatusFile(e.target.files[0])} />
          </FormControl>
        </FormItem>
        <FormItem>
          <FormLabel>Procès verbal</FormLabel>
          <FormControl>
            <Input id="doc_pv" type="file" onChange={(e) => setDocPvFile(e.target.files[0])} />
          </FormControl>
        </FormItem>
        <FormItem>
          <FormLabel>CIN Gérant</FormLabel>
          <FormControl>
            <Input id="CIN_gerant" type="file" onChange={(e) => setCinGerantFile(e.target.files[0])} />
          </FormControl>
        </FormItem>
        
        <Button className="mt-4" type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader className="mr-2 h-4 w-4 animate-spin" />}
          {isUpdate ? 'Mettre à jour' : 'Créer'}
        </Button>
      </form>
    </Form>
  );
}