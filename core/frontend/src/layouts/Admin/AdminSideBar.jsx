import {cn} from "@/lib/utils"
import {Button} from "../../components/ui/button.jsx";
import {Link} from "react-router-dom";
import {BookText,
  Clipboard, 
  Users, 
  UserIcon, 
  ChartNoAxesCombined, 
  Building2, 
  BookOpen, 
  TestTube, 
  BookCopy, 
  Clock,  
  UsersRound,
} from "lucide-react";

export function AdminSideBar({className}) {
  const profile = "/admin/profile";
  const fromation = "/admin/formation";
  const module = "/admin/module";
  const atelier = "/admin/atelier";
  const seance = "/admin/seance";
  const session = "/admin/session";
  const dashboard = "/admin/dashboard";
  const entreprise = "/admin/entreprise";
  const participant = "/admin/participant";
  const formateur = "/admin/formateur";
  const rh = "/admin/rh";
  return (
    <div className={cn("pb-12", className)}>
      <div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Administration
          </h2>
          <div className="space-y-1"> 
            <Link to={dashboard}>
              <Button variant="ghost" className="w-full justify-start">
                <ChartNoAxesCombined  className="mr-2"/>
                Dashboard
              </Button>
            </Link>
            <Link to={entreprise}>
              <Button variant="ghost" className="w-full justify-start">
                <Building2  className="mr-2"/>
                Entreprises
              </Button>
            </Link>
            <Link to={participant}>
              <Button variant="ghost" className="w-full justify-start">
                <Users  className="mr-2"/>
                Participants
              </Button>
            </Link>
            <Link to={rh}>
              <Button variant="ghost" className="w-full justify-start">
                <UsersRound className="mr-2"/>
                RH
              </Button>
            </Link>
            <Link to={fromation}>
              <Button variant="ghost" className="w-full justify-start">
                <BookText  className="mr-2"/>
                Formations
              </Button>
            </Link>
            <Link to={module}>
              <Button variant="ghost" className="w-full justify-start">
                <BookOpen className="mr-2"/>
                Modules
              </Button>
            </Link>
            <Link to={atelier}>
              <Button variant="ghost" className="w-full justify-start">
                <TestTube  className="mr-2"/>
                Ateliers
              </Button>
            </Link>
            <Link to={session}>
              <Button variant="ghost" className="w-full justify-start">
                <BookCopy  className="mr-2"/>
                Sessions
              </Button>
            </Link>
            <Link to={seance}>
              <Button variant="ghost" className="w-full justify-start">
                <Clock  className="mr-2"/>
                Seances
              </Button>
            </Link>
             <Link to={formateur}>
              <Button variant="ghost" className="w-full justify-start">
                <Clipboard   className="mr-2"/>
                Formateurs
              </Button>
            </Link>
            <Link to={profile}>
              <Button variant="ghost" className="w-full justify-start">
                <UserIcon className="mr-2"/>
                Profile
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}