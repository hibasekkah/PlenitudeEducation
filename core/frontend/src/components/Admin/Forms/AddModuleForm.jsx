import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader, Trash2, FileText, X, DownloadIcon } from "lucide-react";
import FormationApi from "../../../services/api/Formation";

const formSchema = z.object({
  titre: z.string().min(2, { message: "Le titre doit contenir au moins 2 caractères." }).max(100),
  categorie: z.string().optional(),
  formation_id: z.coerce.number().int().positive("Veuillez sélectionner une formation."),
  files: z.any().optional(),
});

export default function ModuleForm({ onFormSubmit, initialData = null }) {
  const isUpdate = !!initialData;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || { titre: "", categorie: "", formation_id: "" },
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
        toast.error("Erreur lors du chargement des formations");
      }
    };
    fetchFormations();
  }, []);

  useEffect(() => {
    if (isUpdate && initialData) {
      console.log("=== DEBUG ModuleForm initialData ===");
      console.log("initialData complète:", initialData);
      console.log("initialData.files:", initialData?.files);
      
      if (initialData.files) {
        const validFiles = initialData.files.filter(file => file.id && !isNaN(file.id));
        console.log("Fichiers valides avec ID:", validFiles);
        setExistingFiles(validFiles);
      }
      
      setNewFilesToUpload([]);
      setFilesToDelete([]);
      console.log("==================================");
    } else {
      // Mode création : réinitialiser
      setExistingFiles([]);
      setNewFilesToUpload([]);
      setFilesToDelete([]);
    }
  }, [initialData, isUpdate]);

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleMarkForDeletion = (fileId) => {
    if (!fileId || isNaN(fileId)) {
      toast.error("ID de fichier invalide");
      return;
    }
    
    setFilesToDelete(prev => [...prev, parseInt(fileId)]);
    setExistingFiles(prev => prev.filter(file => file.id !== fileId));
    toast.info("Fichier marqué pour suppression");
  };

  const handleMultipleFilesChange = (e) => {
    const files = Array.from(e.target.files);
    setNewFilesToUpload(prev => [...prev, ...files]);
    e.target.value = ''; 
    console.log("Nouveaux fichiers ajoutés:", files.map(f => f.name));
  };

  const removeNewFile = (index) => {
    setNewFilesToUpload(prev => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (values) => {
    const loaderMsg = isUpdate ? "Mise à jour en cours..." : "Ajout en cours...";
    const loader = toast.loading(loaderMsg);
    
    const formData = new FormData();
    
    formData.append('titre', values.titre);
    formData.append('categorie', values.categorie || '');
    formData.append('formation_id', values.formation_id);

    if (newFilesToUpload.length > 0) {
      newFilesToUpload.forEach((file, index) => {
        formData.append(`files[${index}]`, file);
      });
    }
    
    if (isUpdate && filesToDelete.length > 0) {
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
        response = await onFormSubmit(formData);
      } else {
        response = await onFormSubmit(formData);
      }
      
      toast.success(response.data.message || `${isUpdate ? 'Mise à jour' : 'Ajout'} réussi !`);
      
      if (!isUpdate) {
        reset();
        setNewFilesToUpload([]);
        setExistingFiles([]);
        setFilesToDelete([]);
        
        const fileInput = document.getElementById('module_files');
        if (fileInput) fileInput.value = '';
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
          <FormItem>
            <FormLabel>Titre</FormLabel>
            <FormControl>
              <Input placeholder="Titre du module" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        
        <FormField control={form.control} name="categorie" render={({ field }) => (
          <FormItem>
            <FormLabel>Catégorie</FormLabel>
            <FormControl>
              <Input placeholder="Catégorie du module" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        
        <FormField control={form.control} name="formation_id" render={({ field }) => (
          <FormItem>
            <FormLabel>Formation</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={String(field.value)}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une formation" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {formationsdata.map((formation) => (
                  <SelectItem key={formation.id} value={String(formation.id)}>
                    {formation.intitule}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )} />

        {/* Section des fichiers multiples */}
        <div className="space-y-4 border-t pt-4">
          <div>
            <FormLabel htmlFor="module_files">
              {isUpdate ? 'Ajouter de nouveaux fichiers' : 'Fichiers du module'}
            </FormLabel>
            <FormControl>
              <Input 
                id="module_files" 
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

          {/* Affichage des fichiers existants (mode édition) */}
          {isUpdate && existingFiles.length > 0 && (
            <div>
              <h4 className="font-medium text-sm mb-2">Fichiers actuels:</h4>
              <div className="space-y-2">
                {existingFiles.map((file) => (
                  <div key={file.id} className="flex items-center justify-between bg-gray-50 p-2 rounded border">
                    <div className="flex items-center space-x-2 flex-1 min-w-0">
                      <FileText className="h-4 w-4 text-blue-500 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <span className="text-sm font-medium truncate block">{file.file_nom}</span>
                        {file.size && (
                          <span className="text-xs text-gray-500">
                            ({formatFileSize(file.size)})
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 flex-shrink-0">
                      <a
                        href={`${import.meta.env.VITE_BACKEND_URL}/storage/${file.file_path}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center h-8 w-8 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
                        title="Télécharger le fichier"
                      >
                        <DownloadIcon className="h-3 w-3" />
                      </a>
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => handleMarkForDeletion(file.id)}
                        className="h-8 w-8 p-0"
                        title="Supprimer le fichier"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Affichage des nouveaux fichiers sélectionnés */}
          {newFilesToUpload.length > 0 && (
            <div>
              <h4 className="font-medium text-sm mb-2">
                {isUpdate ? "Nouveaux fichiers à ajouter:" : "Fichiers sélectionnés:"}
              </h4>
              <div className="space-y-2">
                {newFilesToUpload.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-green-50 p-2 rounded border border-green-200">
                    <div className="flex items-center space-x-2 flex-1 min-w-0">
                      <FileText className="h-4 w-4 text-green-600 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <span className="text-sm font-medium truncate block">{file.name}</span>
                        <span className="text-xs text-gray-500">
                          ({formatFileSize(file.size)})
                        </span>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeNewFile(index)}
                      className="h-8 w-8 p-0 hover:bg-red-100 flex-shrink-0"
                      title="Retirer ce fichier"
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