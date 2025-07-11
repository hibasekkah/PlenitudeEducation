import {cn} from "@/lib/utils"
import {Button} from "../../components/ui/button.jsx";
import {Link} from "react-router-dom";

import {GraduationCapIcon, UserIcon} from "lucide-react";

export function AdminSideBar({className}) {

  return (
    <div className={cn("pb-12", className)}>
      <div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Administration
          </h2>
          <div className="space-y-1">
            <Link >
              <Button variant="ghost" className="w-full justify-start">
                <UserIcon className="mr-2"/>
                Dashbord
              </Button>
            </Link>
            <Link >
              <Button variant="ghost" className="w-full justify-start">
                <GraduationCapIcon className="mr-2"/>
                Entreprises
              </Button>
            </Link><Link >
              <Button variant="ghost" className="w-full justify-start">
                <UserIcon className="mr-2"/>
                Programme de formation
              </Button>
            </Link>
            <Link >
              <Button variant="ghost" className="w-full justify-start">
                <GraduationCapIcon className="mr-2"/>
                Profile
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}