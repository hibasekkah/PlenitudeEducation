import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { toast } from "sonner";
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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader, Trash2 } from "lucide-react";
import FormationApi from "../../../services/api/Formation"; 

const formSchema = z.object({
  titre: z.string().min(2, { message: "Le titre doit contenir au moins 2 caractères." }).max(100),
  categorie: z.string().optional(),
  duree: z.coerce.number({ invalid_type_error: "La durée doit être un nombre." })
    .int({ message: "La durée doit être un nombre entier." })
    .positive({ message: "La durée doit être un nombre positif." }),
  formation_id: z.coerce
    .number({ required_error: "Veuillez sélectionner une formation." })
    .int()
    .positive("Veuillez sélectionner une formation valide."),
  files: z.any().optional(),
});

export default function EditModuleForm({ onFormSubmit, initialData = null }) {
  const isUpdate = !!initialData;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      titre: "",
      categorie: "",
      duree: "",
      formation_id: "",
    },
  });
  const { setError, formState: { isSubmitting }, reset } = form;

  const [formationsdata, setFormationsdata] = useState([]);
  const [existingFiles, setExistingFiles] = useState([]);
  const [filesToDelete, setFilesToDelete] = useState([]);
  const [newFilesToUpload, setNewFilesToUpload] = useState([]);

  useEffect(() => {
    const fetchFormations = async () => {
      try {
        const response = await FormationApi.all();
        setFormationsdata(response.data.data);
      } catch (error) {
        console.error("Failed to fetch formations:", error);
      }
    };
    fetchFormations();
  }, []);

  useEffect(() => {
    if (isUpdate && initialData?.files) {
      setExistingFiles(initialData.files);
    }
  }, [initialData, isUpdate]);

  const handleMarkForDeletion = (fileId) => {
    setFilesToDelete(prev => [...prev, fileId]);
    setExistingFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const onSubmit = async (values) => {
    const loaderMsg = isUpdate ? "Mise à jour en cours..." : "Ajout en cours...";
    const loader = toast.loading(loaderMsg);
    const formData = new FormData();

    formData.append('titre', values.titre);
    formData.append('categorie', values.categorie);
    formData.append('duree', values.duree);
    formData.append('formation_id', values.formation_id);

    try {
      let response;
      if (isUpdate) {
        //formData.append('_method', 'PUT');
        if (filesToDelete.length > 0) {
          filesToDelete.forEach(id => formData.append('files_to_delete[]', id));
        }
        if (newFilesToUpload.length > 0) {
          newFilesToUpload.forEach(file => formData.append('files[]', file));
        }
        response = await onFormSubmit(initialData.id, formData);
        toast.success(response.data.message || "Mise à jour réussie !");
      } else {
        if (newFilesToUpload.length > 0) {
          newFilesToUpload.forEach(file => formData.append('files[]', file));
        }
        response = await onFormSubmit(formData);
        toast.success(response.data.message || "Ajout réussi !");
        reset();
        setNewFilesToUpload([]);
        if(document.getElementById('module_files')) {
          document.getElementById('module_files').value = '';
        }
      }
    } catch (error) {
      console.error("Échec de la soumission du formulaire:", error.response || error);
      if (error.response?.status === 422 && error.response.data.errors) {
        toast.error("Certains champs sont invalides. Veuillez corriger.");
        Object.entries(error.response.data.errors).forEach(([fieldName, errorMessages]) => {
          setError(fieldName, { type: "server", message: errorMessages.join(', ') });
        });
      } else {
        toast.error(error.response?.data?.message || "Une erreur inattendue est survenue.");
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
          <FormItem><FormLabel>Durée (heures)</FormLabel><FormControl><Input type="number" placeholder="Durée" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="categorie" render={({ field }) => (
          <FormItem><FormLabel>Catégorie</FormLabel><FormControl><Input placeholder="Catégorie" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="formation_id" render={({ field }) => (
          <FormItem>
            <FormLabel>Formation</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={String(field.value)}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Choisir la formation" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {formationsdata.map((formation) => <SelectItem key={formation.id} value={String(formation.id)}>{formation.intitule}</SelectItem>)}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )} />

        {isUpdate && existingFiles.length > 0 && (
          <div className="space-y-2">
            <FormLabel>Fichiers Actuels</FormLabel>
            {existingFiles.map(file => (
              <div key={file.id} className="flex items-center justify-between text-sm p-2 bg-muted rounded-md">
                <a href={file.url_telechargement} target="_blank" rel="noopener noreferrer" className="truncate pr-4">{file.nom_original}</a>
                <Button type="button" variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleMarkForDeletion(file.id)}>
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            ))}
          </div>
        )}

        <FormItem>
          <FormLabel>{isUpdate ? 'Ajouter de nouveaux fichiers' : 'Fichiers'}</FormLabel>
          <FormControl>
            <Input
              id="module_files"
              type="file"
              multiple
              onChange={(e) => setNewFilesToUpload(Array.from(e.target.files))}
            />
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