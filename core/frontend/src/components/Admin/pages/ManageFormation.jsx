import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.jsx";
import {Separator} from "@/components/ui/separator.jsx";
import {ScrollArea,ScrollBar} from "@/components/ui/scroll-area.jsx";
import FormationApi from "../../../services/api/Formation";
import AddFormationForm from "../Forms/AddFormationForm";
import AdminFormationList from "../Data-table/AdminFormationList";

export function ManageFormation(){
    return <>
        <div className="relative overflow-x-auto">
            <div className="hidden md:block">
                <div className="">
                <div className="bg-background">
                    <div className="grid">
                    <div className="col-span-3 lg:col-span-4">
                        <div className="h-full px-4 py-6 lg:px-8">
                        <Tabs defaultValue="formation" className="h-full space-y-6">
                            <div className="space-between flex items-center">
                            <TabsList>
                                <TabsTrigger value="formation" className="relative">
                                Formations
                                </TabsTrigger>
                                <TabsTrigger value="add_formation">Crée formation</TabsTrigger>
                            </TabsList>
                            </div>
                            <TabsContent
                            value="formation"
                            className="border-none p-0 outline-none"
                            >
                            <div className="flex items-center justify-between">
                                <div className="space-y-1 w-full">
                                <h2 className="text-2xl font-semibold tracking-tight">
                                    Formations
                                </h2>
                                 <AdminFormationList/>
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
                            value="add_formation">
                            <div className="space-y-1">
                                <AddFormationForm onFormSubmit={FormationApi.create} /> 
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