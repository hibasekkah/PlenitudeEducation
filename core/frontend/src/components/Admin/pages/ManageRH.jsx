import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.jsx";
import {Separator} from "@/components/ui/separator.jsx";
import {ScrollArea,ScrollBar} from "@/components/ui/scroll-area.jsx";
import AdminRHList from "../Data-table/AdminRHList";
import { AddRHFrom } from "../Forms/AddRHForm";


export function ManageRH(){
    return <>
        <div className="relative overflow-x-auto">
            <div className="hidden md:block">
                <div className="">
                <div className="bg-background">
                    <div className="grid">
                    <div className="col-span-3 lg:col-span-4">
                        <div className="h-full px-4 py-6 lg:px-8">
                        <Tabs defaultValue="rh" className="h-full space-y-6">
                            <div className="space-between flex items-center">
                            <TabsList>
                                <TabsTrigger value="rh" className="relative">
                                RH
                                </TabsTrigger>
                                <TabsTrigger value="add_rh">Ajouter RH</TabsTrigger>
                            </TabsList>
                            </div>
                            <TabsContent
                            value="rh"
                            className="border-none p-0 outline-none"
                            >
                            <div className="flex items-center justify-between">
                                <div className="space-y-1 w-full">
                                <h2 className="text-2xl font-semibold tracking-tight">
                                    RH
                                </h2>
                                 <AdminRHList/>
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
                            value="add_rh">
                            <div className="space-y-1">
                                <AddRHFrom />
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