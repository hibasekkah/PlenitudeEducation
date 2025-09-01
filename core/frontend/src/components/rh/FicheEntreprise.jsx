import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useEffect, useState } from "react"
import EntrepriseApi from "../../services/api/Entreprise";
import { useAuth } from "../../provider/authProvider";

export function FicheEntreprise(){
    const {user} = useAuth();
    const [entreprise,setEntreprise] = useState([]);

    useEffect(()=>{
        const fetchData = async ()=>{
            const response = await EntrepriseApi.one(user.entreprise_id);
            console.log(response.data.data);
            setEntreprise(response.data.data);
        }
        fetchData();
    },[])
    return <>
        <Card className='w-2xl m-auto mt-3 mb-3'>
        <CardHeader className='text-center'>
            <CardTitle>Fiche d'entreprise</CardTitle>
            <CardDescription>les inforamtions de l'entreprise</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
            <TableCaption></TableCaption>
            <TableBody>
                <TableRow>
                <TableCell className="font-medium">Nom de l'entreprise</TableCell>
                <TableCell>{entreprise.nom}</TableCell>
                </TableRow>
                <TableRow>
                <TableCell className="font-medium">Secteur d'activité</TableCell>
                <TableCell>{entreprise.secteur}</TableCell>
                </TableRow>
                <TableRow>
                <TableCell className="font-medium">Email</TableCell>
                <TableCell>{entreprise.email}</TableCell>
                </TableRow>
                <TableRow>
                <TableCell className="font-medium">Téléphone</TableCell>
                <TableCell>{entreprise.telephone}</TableCell>
                </TableRow>
                <TableRow>
                <TableCell className="font-medium">Adresse</TableCell>
                <TableCell>{entreprise.adresse}</TableCell>
                </TableRow>
                <TableRow>
                <TableCell className="font-medium">Capital</TableCell>
                <TableCell>{entreprise.capital}</TableCell>
                </TableRow>
                <TableRow>
                <TableCell className="font-medium">Personnels</TableCell>
                <TableCell>{entreprise.nombre_personnels}</TableCell>
                </TableRow>
                <TableRow>
                <TableCell className="font-medium">Cadres</TableCell>
                <TableCell>{entreprise.nombre_cadres}</TableCell>
                </TableRow>
                <TableRow>
                <TableCell className="font-medium">Employees</TableCell>
                <TableCell>{entreprise.nombre_employees}</TableCell>
                </TableRow>
                <TableRow>
                <TableCell className="font-medium">Ouvriers</TableCell>
                <TableCell>{entreprise.nombre_ouvriers}</TableCell>
                </TableRow>
                <TableRow>
                <TableCell className="font-medium">Nom de gerant</TableCell>
                <TableCell>{entreprise.nom_gerant}</TableCell>
                </TableRow>
                <TableRow>
                <TableCell className="font-medium">Budget</TableCell>
                <TableCell>{entreprise.budget}</TableCell>
                </TableRow>
                <TableRow>
                <TableCell className="font-medium">Date de début</TableCell>
                <TableCell>{entreprise.debut_period}</TableCell>
                </TableRow>
                <TableRow>
                <TableCell className="font-medium">Date de fin</TableCell>
                <TableCell>{entreprise.fin_period}</TableCell>
                </TableRow>
            </TableBody>
            </Table>
        </CardContent>
        <CardFooter>
        </CardFooter>
        </Card>
    </>
}