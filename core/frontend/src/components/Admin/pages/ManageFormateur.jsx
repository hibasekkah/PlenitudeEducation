import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.jsx";
import {Separator} from "@/components/ui/separator.jsx";
import {ScrollArea,ScrollBar} from "@/components/ui/scroll-area.jsx";
import SessionApi from "../../../services/api/Session";
import AddSessionForm from "../Forms/AddSessionForm";
import AdminFormateurList from "../Data-table/AdminFormateurList";
import FormateurInvitationSend from "../Forms/FormateurInvitationSend";
import { AddFormateurFrom } from "../Forms/AddFormateurForm";


export function ManageFormateur(){
    return <>
        <div className="relative overflow-x-auto">
            <div className="hidden md:block">
                <div className="">
                <div className="bg-background">
                    <div className="grid">
                    <div className="col-span-3 lg:col-span-4">
                        <div className="h-full px-4 py-6 lg:px-8">
                        <Tabs defaultValue="formateur" className="h-full space-y-6">
                            <div className="space-between flex items-center">
                            <TabsList>
                                <TabsTrigger value="formateur" className="relative">
                                Formateurs
                                </TabsTrigger>
                                <TabsTrigger value="add_formateur">Ajouter Formateurs</TabsTrigger>
                            </TabsList>
                            </div>
                            <TabsContent
                            value="formateur"
                            className="border-none p-0 outline-none"
                            >
                            <div className="flex items-center justify-between">
                                <div className="space-y-1 w-full">
                                <h2 className="text-2xl font-semibold tracking-tight">
                                    Formateurs
                                </h2>
                                 <AdminFormateurList/>
                                </div>
                            </div>
                            <Separator className="my-4"/>
                            <div className="relative">
                                <ScrollArea>
                                <div className="flex space-x-4 pb-4">
                                </div>
                                <ScrollBar orientation="horizontal"/>
                                </ScrollArea>
                            </div>
                            </TabsContent>
                            <TabsContent
                            value="add_formateur">
                            <div className="space-y-1">
                                <AddFormateurFrom />
                            </div>
                            <Separator className="my-4"/>
                            </TabsContent>
                        </Tabs>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </>
}