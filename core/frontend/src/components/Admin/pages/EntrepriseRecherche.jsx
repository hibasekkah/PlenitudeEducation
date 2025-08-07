
import { zodResolver } from "@hookform/resolvers/zod"
import { Check, ChevronsUpDown } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
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
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useEffect, useState } from "react"

import StatistiqueApi from "../../../services/api/Statistique"
import EntrepriseApi from "../../../services/api/Entreprise"

const FormSchema = z.object({
  entreprise: z.coerce.number().int({
    required_error: "Please select a fomation.",
  }),
})

export function EntrepriseRecherche() {
  const form = useForm({
    resolver: zodResolver(FormSchema),
  })

  const [entreprisesdata, setEntreprisesdata] = useState([]);
  const [satistiques,setSatistiques] = useState([]);

  useEffect(() => {
    const fetchEntreprises = async () => {
      try {
        const response = await EntrepriseApi.all();
        setEntreprisesdata(response.data.data);
      } catch (error) { console.error("Failed to fetch entreprises:", error); }
    };
    fetchEntreprises();
  }, []);

  useEffect(() => {
    console.log("L'état 'entreprise' a été mis à jour :", entreprisesdata);
  }, [entreprisesdata]);

  const onSubmit = async (data) => {

    try{
      console.log(data);
      const response = await StatistiqueApi.entreprise(data.entreprise);
      console.log(response)
      setSatistiques(response.data);

    }catch(error){
      console.log(error);
    }
  };

  return (<>
  <div className="flex flex-col items-center">
    <Form {...form} className="items-center">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex flex-row">
        <FormField
          control={form.control}
          name="entreprise"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center">
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between m-5",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? entreprisesdata.find(
                            (entreprisedata) => entreprisedata.id === field.value
                          ).nom
                        : "Choisir Entreprise"}
                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Rechercher Entreprise..."
                      className="h-9"
                    />
                    <CommandList>
                      <CommandEmpty>Pas Resultat.</CommandEmpty>
                      <CommandGroup>
                        {entreprisesdata.map((entreprisedata) => (
                          <CommandItem
                            value={entreprisedata.id}
                            key={entreprisedata.id}
                            onSelect={() => {
                              form.setValue("entreprise", entreprisedata.id)
                            }}
                          >
                            {entreprisedata.nom}
                            <Check
                              className={cn(
                                "ml-auto",
                                entreprisedata.nom === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="m-5">Submit</Button>
      </form>
    </Form>
    

    <div className="flex flex-row items-stretch justify-around m-5 w-full">
          <Card className="w-full max-w-2xs">
            <CardHeader>
              <CardTitle className="text-center">Nombre des participants</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="center"><p>{satistiques?.kpis?.total_participants}</p></div>
            </CardContent>
          </Card>

          <Card className="w-full max-w-2xs">
            <CardHeader>
              <CardTitle className="text-center">Nombre des formations</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p>{satistiques?.kpis?.formations_uniques_suivies}</p>
            </CardContent>
          </Card>

          <Card className="w-full max-w-2xs">
            <CardHeader>
              <CardTitle className="text-center">Nombre des sessions</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <HoverCard>
                <HoverCardTrigger><Button variant="ghost">{satistiques?.kpis?.total_sessions}</Button></HoverCardTrigger>
                <HoverCardContent>
                  <p> Sessions terminées : {satistiques?.kpis?.sessions_terminees}</p>
                  <p> Sessions Planifiées : {satistiques?.kpis?.sessions_a_venir}</p>
                </HoverCardContent>
              </HoverCard>
            </CardContent>
          </Card>
    </div>
    </div>
    </>
  )
}

