import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function FicheEntreprise(){

    return <>
        <Card >
        <CardHeader>
            <CardTitle>fiche d'entreprise</CardTitle>
            <CardDescription>les inforamtions de l'entreprise</CardDescription>
        </CardHeader>
        <CardContent>
            <p>Card Content</p>
        </CardContent>
        <CardFooter>
            <p>Card Footer</p>
        </CardFooter>
        </Card>
    </>
}