import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
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
  SIRET: z.string().min(2,{ message: "Le SIRET doit contenir au moins 2 caractères." }),
  IF: z.string().min(2,{ message: "Le IF doit contenir au moins 2 caractères." }),
  CNSS: z.string().min(2,{ message: "Le CNSS doit contenir au moins 2 caractères." }),
  priode: z.coerce.number().int().positive(),
  capital: z.coerce.number().positive(),
  budget: z.coerce.number().positive(),
  debut_period: z.string().min(1, { message: "La date de début est obligatoire." }),
  fin_period: z.string().min(1, { message: "La date de fin est obligatoire." }),
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

  useEffect(() => {
    if (initialData) {
      console.log("Données initiales reçues:", initialData);
      
      const formData = {
        ...initialValues,
        ...initialData,
        priode: initialData.priode ? String(initialData.priode) : "",
        capital: initialData.capital ? String(initialData.capital) : "",
        budget: initialData.budget ? String(initialData.budget) : "",
        debut_period: initialData.debut_period || "",
        fin_period: initialData.fin_period || "",
      };
      
      console.log("Données préparées pour le formulaire:", formData);
      
      reset(formData);
      
      setDocRcFile(null);
      setDocStatusFile(null);
      setDocPvFile(null);
      setCinGerantFile(null);
      
      setTimeout(() => {
        const fileInputs = document.querySelectorAll('input[type="file"]');
        fileInputs.forEach(input => input.value = '');
      }, 100);
      
    } else {
      // Mode création : réinitialiser avec les valeurs par défaut
      reset(initialValues);
      setDocRcFile(null);
      setDocStatusFile(null);
      setDocPvFile(null);
      setCinGerantFile(null);
    }
  }, [initialData, reset]);

  const onSubmit = async (values) => {
    console.log("Valeurs soumises:", values);
    
    const loaderMsg = isUpdate ? "Mise à jour en cours..." : "Ajout en cours...";
    const loader = toast.loading(loaderMsg);
    const formData = new FormData();

    // ✅ SOLUTION 2 : Filtrer les valeurs vides/null/undefined
    Object.keys(values).forEach(key => {
      if (!['doc_rc', 'doc_status', 'doc_pv', 'CIN_gerant'].includes(key)) {
        const value = values[key];
        // Ne pas envoyer les valeurs vides, null ou undefined
        if (value !== "" && value !== null && value !== undefined) {
          formData.append(key, value);
        }
      }
    });

    // Ajouter les fichiers seulement s'ils sont sélectionnés
    if (docRcFile) formData.append('doc_rc', docRcFile);
    if (docStatusFile) formData.append('doc_status', docStatusFile);
    if (docPvFile) formData.append('doc_pv', docPvFile);
    if (cinGerantFile) formData.append('CIN_gerant', cinGerantFile);
    
    // Debug : afficher le contenu du FormData
    console.log(`--- Contenu du FormData envoyé (${isUpdate ? 'UPDATE' : 'CREATE'}) ---`);
    for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
    }
    console.log("-----------------------------------------");
    
    try {
      let response;
      if (isUpdate) {
        formData.append('_method', 'put');
        response = await onFormSubmit(initialData.id, formData);
      } else {
        response = await onFormSubmit(formData);
      }
      
      toast.success(response.data.message);
      
      // ✅ SOLUTION 3 : Réinitialiser seulement en mode création
      if (!isUpdate) {
        reset(initialValues);
        setDocRcFile(null);
        setDocStatusFile(null);
        setDocPvFile(null);
        setCinGerantFile(null);
        
        // Réinitialiser les inputs de fichiers
        const fileInputs = document.querySelectorAll('input[type="file"]');
        fileInputs.forEach(input => input.value = '');
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
      console.log(`--- Contenu du FormData envoyé (${isUpdate ? 'UPDATE' : 'CREATE'}) ---`);
    for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
    }
    console.log("-----------------------------------------");
    
    }
  };

  // ✅ SOLUTION 4 : Fonction helper pour gérer les changements de fichiers
  const handleFileChange = (setter) => (e) => {
    const file = e.target.files[0];
    setter(file || null);
    console.log("Fichier sélectionné:", file?.name || "Aucun");
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
          <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" placeholder="Email" {...field} /></FormControl><FormMessage /></FormItem>
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
          <FormItem><FormLabel>Capital</FormLabel><FormControl><Input type="number" placeholder="Capital" min="0" step="0.01" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        
        <FormField control={form.control} name="budget" render={({ field }) => (
          <FormItem><FormLabel>Budget (dh)</FormLabel><FormControl><Input type="number" placeholder="Budget" min="0" step="0.01" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        
        <FormField control={form.control} name="priode" render={({ field }) => (
          <FormItem><FormLabel>Période (en mois)</FormLabel><FormControl><Input type="number" placeholder="Période" min="1" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        
        <FormField control={form.control} name="debut_period" render={({ field }) => (
          <FormItem><FormLabel>Début de période</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        
        <FormField control={form.control} name="fin_period" render={({ field }) => (
          <FormItem><FormLabel>Fin de période</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
        )} />

        {/* ✅ SOLUTION 5 : Améliorer les champs de fichiers avec indication des fichiers actuels */}
        <FormItem>
          <FormLabel htmlFor="doc_rc">Registre de commerce</FormLabel>
          <FormControl>
            <Input 
              id="doc_rc" 
              type="file" 
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              onChange={handleFileChange(setDocRcFile)} 
            />
          </FormControl>
          {isUpdate && initialData?.doc_rc && !docRcFile && (
            <p className="text-sm text-gray-600 mt-1">
              📎 Fichier actuel: {initialData.doc_rc.split('/').pop()}
            </p>
          )}
        </FormItem>
        
        <FormItem>
          <FormLabel htmlFor="doc_status">Statuts d'entreprise</FormLabel>
          <FormControl>
            <Input 
              id="doc_status" 
              type="file" 
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              onChange={handleFileChange(setDocStatusFile)} 
            />
          </FormControl>
          {isUpdate && initialData?.doc_status && !docStatusFile && (
            <p className="text-sm text-gray-600 mt-1">
              📎 Fichier actuel: {initialData.doc_status.split('/').pop()}
            </p>
          )}
        </FormItem>
        
        <FormItem>
          <FormLabel htmlFor="doc_pv">Procès verbal</FormLabel>
          <FormControl>
            <Input 
              id="doc_pv" 
              type="file" 
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              onChange={handleFileChange(setDocPvFile)} 
            />
          </FormControl>
          {isUpdate && initialData?.doc_pv && !docPvFile && (
            <p className="text-sm text-gray-600 mt-1">
              📎 Fichier actuel: {initialData.doc_pv.split('/').pop()}
            </p>
          )}
        </FormItem>
        
        <FormItem>
          <FormLabel htmlFor="CIN_gerant">CIN Gérant</FormLabel>
          <FormControl>
            <Input 
              id="CIN_gerant" 
              type="file" 
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              onChange={handleFileChange(setCinGerantFile)} 
            />
          </FormControl>
          {isUpdate && initialData?.CIN_gerant && !cinGerantFile && (
            <p className="text-sm text-gray-600 mt-1">
              📎 Fichier actuel: {initialData.CIN_gerant.split('/').pop()}
            </p>
          )}
        </FormItem>
        
        <Button className="mt-4" type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader className="mr-2 h-4 w-4 animate-spin" />}
          {isUpdate ? 'Mettre à jour' : 'Créer'}
        </Button>
      </form>
    </Form>
  );
}