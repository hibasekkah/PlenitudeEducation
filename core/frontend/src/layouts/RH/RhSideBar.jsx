import {cn} from "@/lib/utils"
import {Button} from "../../components/ui/button.jsx";
import {Link} from "react-router-dom";


import {BookText , UserIcon,ChartNoAxesCombined,Building2  } from "lucide-react";

export function RhSideBar({className}) {
  const profile = "/rh/profile"
  const entreprise = "/rh/entreprise"
  const formation = "/rh/formation"
  return (
    <div className={cn("pb-12", className)}>
      <div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Administration
          </h2>
          <div className="space-y-1">
            <Link to={entreprise}>
              <Button variant="ghost" className="w-full justify-start">
                <Building2  className="mr-2"/>
                Fiche de l'entreprise
              </Button>
            </Link>
            <Link to={formation}>
              <Button variant="ghost" className="w-full justify-start">
                <BookText  className="mr-2"/>
                formations
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