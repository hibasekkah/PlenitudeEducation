
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useAuth } from '@/provider/authProvider';
import { ProfilEdit } from "../Forms/ProfilEdit"
import { Navigate } from 'react-router-dom';
import { ChangePassword } from "../Forms/ChangePassword"



export default function profile() {
    const {user} = useAuth();
    // if(!user){
    //     return <Navigate to="/login" replace />;
    // }
    console.log(user)
    
  return (
    <div className="flex w-full max-w-sm flex-col gap-6 m-5">
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account">Compte</TabsTrigger>
          <TabsTrigger value="password">Mot de passe</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Compte</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
                <img 
                    src={`${import.meta.env.VITE_BACKEND_URL}/storage/${user.photo_profile}`}
                    className="w-50 h-50 rounded-full object-cover"
                    alt="user photo" 
                    />
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-name">Nom</Label>
                <Input id="tabs-demo-name" defaultValue={user.nom} disabled/>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-username">Prenom</Label>
                <Input id="tabs-demo-username" defaultValue={user.prenom} disabled/>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-username">Email</Label>
                <Input id="tabs-demo-email" defaultValue={user.email} disabled/>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-username">Télephone</Label>
                <Input id="tabs-demo-tele" defaultValue={user.telephone} disabled/>
              </div>
            </CardContent>
            <CardFooter>
              <ProfilEdit/>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Mot de passe</CardTitle>
              <CardDescription>
                Modifiez votre mot de passe ici.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <ChangePassword/>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
