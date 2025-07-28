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

import { Loader } from "lucide-react";
import { toast } from "sonner";
import FormationApi from "../../../services/api/Formation";
import { useEffect, useState } from "react";
import ModuleApi from "../../../services/api/Module";

const formSchema = z.object({
  titre: z.string().min(2, { message: "Le titre doit contenir au moins 2 caractères." }).max(100),
  categorie: z.string(),
  duree: z.coerce.number({ invalid_type_error: "La période doit être un nombre." })
    .int({ message: "La duree doit être un nombre entier." })
    .positive({ message: "La duree doit être un nombre positif." }),
  formation_id: z.coerce 
    .number({ required_error: "Please select a formation." })
    .int()
    .positive("Please select a valid formation."),
  files: z.any().optional(),
});

const initialValues = {
  titre: "",
  categorie: "",
  duree: "",
  formation_id: "",
};

export default function AddModuleForm({ onFormSubmit, initialData }) {
  const isUpdate = !!initialData;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ? { ...initialValues, ...initialData } : initialValues,
  });
  const { setError, formState: { isSubmitting }, reset } = form;

  const [formationsdata,setFormationsdata] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const [existingFiles, setExistingFiles] = useState([]);
  const [filesToDelete, setFilesToDelete] = useState([]);
  const [newFilesToUpload, setNewFilesToUpload] = useState([]);

  const handleMarkForDeletion = (fileId) => {
    setFilesToDelete(prev => [...prev, fileId]);
    setExistingFiles(prev => prev.filter(file => file.id !== fileId));
  };

  useEffect(() => {
    if (initialData?.files) {
      setExistingFiles(initialData.files);
    }
  }, [initialData]);

  useEffect(()=>{
    const fetchFormations = async () => {
    try {
      const response = await FormationApi.all();
      setFormationsdata(response.data.data);
      console.log(response.data); 
    } catch (error) {
      console.error("Failed to fetch formations:", error);
    }
  };

  fetchFormations();
  },[])


  const onSubmit = async (values) => {
    const loaderMsg = isUpdate ? "Mise à jour en cours..." : "Ajout en cours...";
    const loader = toast.loading(loaderMsg);
    const formData = new FormData();

    formData.append('titre', values.titre);
    formData.append('categorie', values.categorie);
    formData.append('duree', values.duree);
    formData.append('formation_id', values.formation_id);

    if (selectedFiles.length > 0) {
      selectedFiles.forEach(file => {
        formData.append('files[]', file);
      });
    }

    if (filesToDelete.length > 0) {
      filesToDelete.forEach(id => formData.append('files_to_delete[]', id));
    }

    if (newFilesToUpload.length > 0) {
      newFilesToUpload.forEach(file => formData.append('files[]', file));
    }

    try {
      const response = await onFormSubmit(formData);
      console.log(response.data);
      toast.success(response.data.message || (isUpdate ? "Mise à jour réussie !" : "Ajout réussi !"));
      
      if (!isUpdate) {
        reset(); 
        setSelectedFiles([]);
        document.getElementById('module_files').value = ''; 
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
        <FormField control={form.control} name="titre" render={({ field }) => (
          <FormItem><FormLabel>Titre</FormLabel><FormControl><Input placeholder="titre" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="duree" render={({ field }) => (
          <FormItem><FormLabel>Durée (heures) </FormLabel><FormControl><Input type="number" placeholder="Durée" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="categorie" render={({ field }) => (
          <FormItem><FormLabel>Catégorie</FormLabel><FormControl><Input placeholder="Catégorie" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="formation_id" render={({ field }) => (
            <FormItem>
              <FormLabel>Formation</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir la formation" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {formationsdata.map((formation)=><SelectItem key={formation.id} value={String(formation.id)}>{formation.intitule}</SelectItem>)
                  }
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField control={form.control} name="files" render={({ field }) => (
          <FormItem>
            <FormLabel>Fichiers</FormLabel>
            <FormControl><Input id="module_files" type="file" multiple placeholder="Fichier" {...field} 
            onChange={(event) => setSelectedFiles(Array.from(event.target.files))}/>
            </FormControl><FormMessage /></FormItem>
        )} />
        <Button className={'mt-4'} type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader className={'mr-2 h-4 w-4 animate-spin'} />}
          {isUpdate ? 'Mettre à jour' : 'Créer'}
        </Button>
      </form>
    </Form>
  );
}