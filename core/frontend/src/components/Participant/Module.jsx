import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DownloadIcon } from "lucide-react";

export function Module({module}){
    console.log(module);
    return <>
        <Card key={module.id} className='mt-1'>
            <CardHeader>
                <CardTitle>Module : {module.titre}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col space-y-2">             
                    <div className="space-y-2"><h2>support du cours :</h2>
                        {module?.files?.map((file) => (
                                    <div key={file.id} className="flex items-center justify-between bg-gray-50 p-2 rounded border">
                                        <div className="flex items-center space-x-2">
                                        <a
                                            href={`${import.meta.env.VITE_BACKEND_URL}/storage/${file.file_path}`}
                                            download={file.file_nom || 'document'}
                                            className="flex items-center  text-sm font-medium hover:underline"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                        <DownloadIcon className="h-4 w-4 mr-2 text-blue-700" />
                                            {file.file_nom || 'Télécharger'}
                                        </a>
                                        {file.size && (
                                        <span className="text-xs text-gray-500">
                                        </span>
                                            )}
                                        </div>
                                    </div>
                                    ))}
                                </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                            </CardFooter>
                        </Card>
    
    </>
}