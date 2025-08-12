import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function Atelier({atelier}){
    console.log(atelier);
    return <>
        <Card key={atelier.id} className='mt-1'>
            <CardHeader>
                <CardTitle>Atelier : {atelier.type}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col space-y-2">             
                    <div className="space-y-2"><h2>support du cours :</h2>
                                </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                            </CardFooter>
                        </Card>
    
    </>
}