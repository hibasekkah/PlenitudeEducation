import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.jsx";
import {Separator} from "@/components/ui/separator.jsx";
import {ScrollArea,ScrollBar} from "@/components/ui/scroll-area.jsx";
import AdminSessionList from "../Data-table/AdminSessionList";
import SessionApi from "../../../services/api/Session";
import AddSessionForm from "../Forms/AddSessionForm";
import { useCallback } from "react";


export function ManageSession(){
    const handleCreateSubmit = useCallback(async (values) => {
        console.log("handleCreateSubmit a été appelé !");
        return SessionApi.create(values);
    }, []);
    return <>
        <div className="relative overflow-x-auto">
            <div className="hidden md:block">
                <div className="">
                <div className="bg-background">
                    <div className="grid">
                    <div className="col-span-3 lg:col-span-4">
                        <div className="h-full px-4 py-6 lg:px-8">
                        <Tabs defaultValue="session" className="h-full space-y-6">
                            <div className="space-between flex items-center">
                            <TabsList>
                                <TabsTrigger value="session" className="relative">
                                Sessions
                                </TabsTrigger>
                                <TabsTrigger value="add_session">Crée Sessions</TabsTrigger>
                            </TabsList>
                            </div>
                            <TabsContent
                            value="session"
                            className="border-none p-0 outline-none"
                            >
                            <div className="flex items-center justify-between">
                                <div className="space-y-1 w-full">
                                <h2 className="text-2xl font-semibold tracking-tight">
                                    Sessions
                                </h2>
                                 <AdminSessionList/>
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
                            value="add_session">
                            <div className="space-y-1">
                                <AddSessionForm onFormSubmit={handleCreateSubmit} />
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