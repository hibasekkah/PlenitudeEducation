import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader, X, FileText, Trash2 } from "lucide-react";
import { toast } from "sonner";

const formSchema = z.object({
  nom: z
    .string({
      required_error: "Le nom est requis",
      invalid_type_error: "Le nom doit être une chaîne de caractères"
    })
    .min(2, { message: "Le nom doit contenir au moins 2 caractères." })
    .max(100, { message: "Le nom ne peut pas dépasser 100 caractères." }),
    
  secteur: z
    .string({
      required_error: "Le secteur d'activité est requis",
      invalid_type_error: "Le secteur d'activité doit être une chaîne de caractères"
    })
    .min(1, { message: "Le secteur d'activité est obligatoire." }),
    
  email: z
    .string({ 
      required_error: "L'e-mail est obligatoire.",
      invalid_type_error: "L'e-mail doit être une chaîne de caractères"
    })
    .email({ message: "Veuillez entrer une adresse e-mail valide." }),
    
  adresse: z
    .string().optional(),
    
  telephone: z
    .string({
      required_error: "Le numéro de téléphone est requis",
      invalid_type_error: "Le numéro de téléphone doit être une chaîne de caractères"
    })
    .min(1, { message: "Le numéro de téléphone est obligatoire." }),
    
  ICE: z
    .string({
      required_error: "L'ICE est requis",
      invalid_type_error: "L'ICE doit être une chaîne de caractères"
    })
    .min(2, { message: "L'ICE doit contenir au moins 2 caractères." }),
    
  IF: z
    .string({
      required_error: "L'IF est requis",
      invalid_type_error: "L'IF doit être une chaîne de caractères"
    })
    .min(2, { message: "L'IF doit contenir au moins 2 caractères." }),
    
  CNSS: z
    .string({
      required_error: "Le CNSS est requis",
      invalid_type_error: "Le CNSS doit être une chaîne de caractères"
    })
    .min(2, { message: "Le CNSS doit contenir au moins 2 caractères." }),
    
  numero_patente: z
    .string().optional(),
    
  priode: z
    .coerce
    .number({
      required_error: "La période est requise",
      invalid_type_error: "La période doit être un nombre"
    })
    .int({ message: "La période doit être un nombre entier." })
    .positive({ message: "La période doit être un nombre positif." }),
    
  nombre_personnels: z
    .coerce
    .number().optional(),
    
  nombre_cadres: z
    .coerce
    .number({
      invalid_type_error: "Le nombre de cadres doit être un nombre"
    }).optional(),
    
  nombre_employees: z
    .coerce
    .number({
      invalid_type_error: "Le nombre d'employés doit être un nombre"
    }).optional(),
    
  nombre_ouvriers: z
    .coerce
    .number({
      invalid_type_error: "Le nombre d'ouvriers doit être un nombre"
    }).optional(),
    
  nom_gerant: z
    .string({
      invalid_type_error: "Le nom du gérant doit être une chaîne de caractères"
    }).optional(),
    
  numero_cin_gerant: z
    .string({
      invalid_type_error: "Le numéro CIN du gérant doit être une chaîne de caractères"
    }).optional(),
    
  adresse_gerant: z
    .string({
      invalid_type_error: "L'adresse du gérant doit être une chaîne de caractères"
    }).optional(),
    
  capital: z
    .coerce
    .number({
      invalid_type_error: "Le capital doit être un nombre"
    }).optional(),
    
  budget: z
    .coerce
    .number({
      required_error: "Le budget est requis",
      invalid_type_error: "Le budget doit être un nombre"
    })
    .positive({ message: "Le budget doit être un nombre positif." }),
    
  debut_period: z
    .string({
      required_error: "La date de début est requise",
      invalid_type_error: "La date de début doit être une chaîne de caractères"
    })
    .min(1, { message: "La date de début est obligatoire." }),
    
  fin_period: z
    .string({
      required_error: "La date de fin est requise",
      invalid_type_error: "La date de fin doit être une chaîne de caractères"
    })
    .min(1, { message: "La date de fin est obligatoire." }),
    
  doc_rc: z.any().optional(),
  doc_status: z.any().optional(),
  doc_pv: z.any().optional(),
  CIN_gerant: z.any().optional(),
  files: z.any().optional(),
});

const initialValues = {
  nom: "",
  secteur: "",
  ICE: "",
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
  numero_patente:"",
  nombre_personnels:"",
  nombre_cadres:"",
  nombre_employees:"",
  nombre_ouvriers:"",
  nom_gerant:"",
  numero_cin_gerant:"",
  adresse_gerant:"",
};

export default function AddEntrepriseForm({ onFormSubmit, initialData = null }) {
  const isUpdate = !!initialData;

  const [docRcFile, setDocRcFile] = useState(null);
  const [docStatusFile, setDocStatusFile] = useState(null);
  const [docPvFile, setDocPvFile] = useState(null);
  const [cinGerantFile, setCinGerantFile] = useState(null);
  
  const [additionalFiles, setAdditionalFiles] = useState([]);
  const [existingFiles, setExistingFiles] = useState([]);
  const [filesToDelete, setFilesToDelete] = useState([]);

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
        priode: initialData.priode ? String(initialData.priode) : "",
        nombre_personnels: initialData.nombre_personnels ? String(initialData.nombre_personnels) : "",
        nombre_cadres: initialData.nombre_cadres ? String(initialData.nombre_cadres) : "",
        nombre_employees: initialData.nombre_employees ? String(initialData.nombre_employees) : "",
        nombre_ouvriers: initialData.nombre_ouvriers ? String(initialData.nombre_ouvriers) : "",
        debut_period: initialData.debut_period || "",
        fin_period: initialData.fin_period || "",
      };
      
      console.log("Données préparées pour le formulaire:", formData);
      
      reset(formData);
      
      setDocRcFile(null);
      setDocStatusFile(null);
      setDocPvFile(null);
      setCinGerantFile(null);
      
      setExistingFiles(initialData.files || []);
      setAdditionalFiles([]);
      setFilesToDelete([]);
      
      setTimeout(() => {
        const fileInputs = document.querySelectorAll('input[type="file"]');
        fileInputs.forEach(input => input.value = '');
      }, 100);
      
    } else {
      reset(initialValues);
      setDocRcFile(null);
      setDocStatusFile(null);
      setDocPvFile(null);
      setCinGerantFile(null);
      setAdditionalFiles([]);
      setExistingFiles([]);
      setFilesToDelete([]);
    }
  }, [initialData, reset]);

  const onSubmit = async (values) => {
    console.log("Valeurs soumises:", values);
    
    const loaderMsg = isUpdate ? "Mise à jour en cours..." : "Ajout en cours...";
    const loader = toast.loading(loaderMsg);
    const formData = new FormData();

    Object.keys(values).forEach(key => {
      if (!['doc_rc', 'doc_status', 'doc_pv', 'CIN_gerant', 'files'].includes(key)) {
        const value = values[key];
        if (value !== "" && value !== null && value !== undefined) {
          formData.append(key, value);
        }
      }
    });

    if (docRcFile) formData.append('doc_rc', docRcFile);
    if (docStatusFile) formData.append('doc_status', docStatusFile);
    if (docPvFile) formData.append('doc_pv', docPvFile);
    if (cinGerantFile) formData.append('CIN_gerant', cinGerantFile);
    
    additionalFiles.forEach((file, index) => {
      formData.append(`files[${index}]`, file);
    });
    
    if (filesToDelete.length > 0) {
      filesToDelete.forEach((fileId, index) => {
        formData.append(`files_to_delete[${index}]`, parseInt(fileId));
      });
    }
    
    console.log(`--- Contenu du FormData envoyé (${isUpdate ? 'UPDATE' : 'CREATE'}) ---`);
    console.log("Fichiers à supprimer (IDs):", filesToDelete.map(id => parseInt(id)));
    for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
    }
    console.log("-----------------------------------------");
    
    try {
      let response;
      if (isUpdate) {
        formData.append('_method', 'put');
        response = await onFormSubmit(formData);
      } else {
        response = await onFormSubmit(formData);
      }
      
      toast.success(response.data.message);
      
      if (!isUpdate) {
        reset(initialValues);
        setDocRcFile(null);
        setDocStatusFile(null);
        setDocPvFile(null);
        setCinGerantFile(null);
        setAdditionalFiles([]);
        setExistingFiles([]);
        setFilesToDelete([]);
        
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
    }
  };

  const handleFileChange = (setter) => (e) => {
    const file = e.target.files[0];
    setter(file || null);
    console.log("Fichier sélectionné:", file?.file_nom || "Aucun");
  };

  const handleMultipleFilesChange = (e) => {
    const files = Array.from(e.target.files);
    setAdditionalFiles(prev => [...prev, ...files]);
    e.target.value = ''; 
    console.log("Fichiers ajoutés:", files.map(f => f.file_nom));
  };

  const removeAdditionalFile = (index) => {
    setAdditionalFiles(prev => prev.filter((_, i) => i !== index));
  };

  const markFileForDeletion = (fileId) => {
    if (!fileId || isNaN(fileId)) {
      toast.error("ID de fichier invalide");
      return;
    }
    
    setFilesToDelete(prev => [...prev, parseInt(fileId)]);
    setExistingFiles(prev => prev.filter(file => file.id !== fileId));
    toast.info("Fichier marqué pour suppression");
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
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
        
        <FormField control={form.control} name="ICE" render={({ field }) => (
          <FormItem><FormLabel>ICE</FormLabel><FormControl><Input placeholder="ICE" {...field} /></FormControl><FormMessage /></FormItem>
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

        <FormField control={form.control} name="numero_patente" render={({ field }) => (
          <FormItem><FormLabel>Numéro de patente</FormLabel><FormControl><Input placeholder="Numéro de patente" {...field} /></FormControl><FormMessage /></FormItem>
        )} />

        <FormField control={form.control} name="nombre_personnels" render={({ field }) => (
          <FormItem><FormLabel>Nombre de personnels</FormLabel><FormControl><Input type="number" placeholder="Nombre de personnels" min="0" step="0.01" {...field} /></FormControl><FormMessage /></FormItem>
        )} />

        <FormField control={form.control} name="nombre_cadres" render={({ field }) => (
          <FormItem><FormLabel>Nombre des cadres</FormLabel><FormControl><Input type="number" placeholder="Nombre des cadres" min="0" step="0.01" {...field} /></FormControl><FormMessage /></FormItem>
        )} />

        <FormField control={form.control} name="nombre_employees" render={({ field }) => (
          <FormItem><FormLabel>Nombre des employées</FormLabel><FormControl><Input type="number" placeholder="Nombre des employées" min="0" step="0.01" {...field} /></FormControl><FormMessage /></FormItem>
        )} />

        <FormField control={form.control} name="nombre_ouvriers" render={({ field }) => (
          <FormItem><FormLabel>Nombre des ouvriers</FormLabel><FormControl><Input type="number" placeholder="Nombre des ouvriers" min="0" step="0.01" {...field} /></FormControl><FormMessage /></FormItem>
        )} />

        <FormField control={form.control} name="nom_gerant" render={({ field }) => (
          <FormItem><FormLabel>Nom complet de gerant</FormLabel><FormControl><Input placeholder="Nom complet de gerant" {...field} /></FormControl><FormMessage /></FormItem>
        )} />

        <FormField control={form.control} name="numero_cin_gerant" render={({ field }) => (
          <FormItem><FormLabel>Numéro cin de gerant</FormLabel><FormControl><Input placeholder="numero cin de gerant" {...field} /></FormControl><FormMessage /></FormItem>
        )} />

        <FormField control={form.control} name="adresse_gerant" render={({ field }) => (
          <FormItem><FormLabel>Adresse du gerant</FormLabel><FormControl><Textarea placeholder="Adresse du gerant" className="resize-none" {...field} /></FormControl><FormMessage /></FormItem>
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

        <div className="space-y-4 border-t pt-4">
          <div>
            <FormLabel htmlFor="additional_files">Fichiers supplémentaires</FormLabel>
            <FormControl>
              <Input 
                id="additional_files" 
                type="file" 
                multiple
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt,.xls,.xlsx"
                onChange={handleMultipleFilesChange}
                className="mt-2"
              />
            </FormControl>
            <p className="text-xs text-gray-500 mt-1">
              Vous pouvez sélectionner plusieurs fichiers à la fois
            </p>
          </div>

          {isUpdate && existingFiles.length > 0 && (
            <div>
              <h4 className="font-medium text-sm mb-2">Fichiers actuels:</h4>
              <div className="space-y-2">
                {existingFiles.map((file) => (
                  <div key={file.id} className="flex items-center justify-between bg-gray-50 p-2 rounded border">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-blue-500" />
                      <span className="text-sm font-medium">{file.file_nom}</span>
                      {file.size && (
                        <span className="text-xs text-gray-500">
                          ({formatFileSize(file.size)})
                        </span>
                      )}
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => markFileForDeletion(file.id)}
                      className="h-8 w-8 p-0"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {additionalFiles.length > 0 && (
            <div>
              <h4 className="font-medium text-sm mb-2">
                {isUpdate ? "Nouveaux fichiers à ajouter:" : "Fichiers sélectionnés:"}
              </h4>
              <div className="space-y-2">
                {additionalFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-green-50 p-2 rounded border border-green-200">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium">{file.name}</span>
                      <span className="text-xs text-gray-500">
                        ({formatFileSize(file.size)})
                      </span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeAdditionalFile(index)}
                      className="h-8 w-8 p-0 hover:bg-red-100"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {filesToDelete.length > 0 && (
            <div>
              <h4 className="font-medium text-sm mb-2 text-red-600">
                Fichiers à supprimer ({filesToDelete.length}):
              </h4>
              <p className="text-xs text-red-500">
                Ces fichiers seront supprimés lors de la soumission du formulaire
              </p>
            </div>
          )}
        </div>
        
        <Button className="mt-4" type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader className="mr-2 h-4 w-4 animate-spin" />}
          {isUpdate ? 'Mettre à jour' : 'Créer'}
        </Button>
      </form>
    </Form>
  );
}