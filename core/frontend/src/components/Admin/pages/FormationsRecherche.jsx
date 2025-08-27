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
import FormationApi from "../../../services/api/Formation";
import StatistiqueApi from "../../../services/api/Statistique"

const FormSchema = z.object({
  formation: z.coerce.number().int({
    required_error: "Please select a fomation.",
  }),
})

export function FormationsRecherche() {
  const form = useForm({
    resolver: zodResolver(FormSchema),
  })

  const [formationsdata, setFormationsdata] = useState([]);
  const [satistiques,setSatistiques] = useState([]);

  useEffect(() => {
    const fetchFormations = async () => {
      try {
        const response = await FormationApi.all();
        setFormationsdata(response.data.data);
      } catch (error) { console.error("Failed to fetch formations:", error); }
    };
    fetchFormations();
  }, []);

  useEffect(() => {
    console.log("L'état 'formation' a été mis à jour :", formationsdata);
  }, [formationsdata]);

  const onSubmit = async (data) => {

    try{
      const response = await StatistiqueApi.formation(data.formation);
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
          name="formation"
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
                        ? formationsdata.find(
                            (formationdata) => formationdata.id === field.value
                          ).intitule
                        : "Choisir Formation"}
                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Rechercher Formation..."
                      className="h-9"
                    />
                    <CommandList>
                      <CommandEmpty>Pas Resultat.</CommandEmpty>
                      <CommandGroup>
                        {formationsdata.map((formationdata) => (
                          <CommandItem
                            value={formationdata.id}
                            key={formationdata.id}
                            onSelect={() => {
                              form.setValue("formation", formationdata.id)
                            }}
                          >
                            {formationdata.intitule}
                            <Check
                              className={cn(
                                "ml-auto",
                                formationdata.intitule === field.value
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
              <CardTitle className="text-center">Nombre des modules</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="center"><p>{satistiques?.kpis?.totalModules}</p></div>
            </CardContent>
          </Card>

          <Card className="w-full max-w-2xs">
            <CardHeader>
              <CardTitle className="text-center">Nombre des ateliers</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p>{satistiques?.kpis?.totalAteliers}</p>
            </CardContent>
          </Card>

          <Card className="w-full max-w-2xs">
            <CardHeader>
              <CardTitle className="text-center">Nombre des sessions</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <HoverCard>
                <HoverCardTrigger><Button variant="ghost">{satistiques?.kpis?.sessions}</Button></HoverCardTrigger>
                <HoverCardContent>
                  <p> Sessions terminées : {satistiques?.kpis?.sessionsTerminees}</p>
                  <p> Sessions Planifiées : {satistiques?.kpis?.sessionsAVenir}</p>
                  <p> Sessions Annuler : {satistiques?.kpis?.sessionsAnnulees}</p> 
                </HoverCardContent>
              </HoverCard>
            </CardContent>
          </Card>
    </div>
    </div>
    </>
  )
}

