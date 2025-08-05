import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

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
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useEffect, useState } from "react"
import StatistiqueApi from "../../../services/api/Statistique"
import { ChartLegend, ChartLegendContent } from "@/components/ui/chart"

export const description = "An interactive bar chart"
import { Separator } from "@/components/ui/separator"
import { FormationsRecherche } from "./FormationsRecherche"

const chartConfig = {
  views: {
    label: "Page Views",
  },
  desktop: {
    label: "Desktop",
    color: "var(--chart-2)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-1)",
  },
}

export function AdminDashbord() {

  const [satistiques,setSatistiques] = useState({})
  const [chartDatas,setChartData] = useState({})
  const [chartDatap,setChartDatap] = useState({});

  console.log(chartDatas);
  useEffect(() => {
    (async () => {
      try {
        const response = await StatistiqueApi.admin();
        console.log(response.data.kpis.totalFormations);
        console.log(response.data);
        console.log(response.data.charts.entreprisesParFormation);
        setSatistiques(response.data);
        setChartData(response.data.charts.entreprisesParFormation)
        setChartDatap(response.data.charts.participantsParFormation)
        console.log(satistiques);
      } catch (error) {
        console.error("Erreur lors de la récupération des statistiques:", error);
      }
    })();

  }, []);

  useEffect(() => {
    console.log("L'état 'satistiques' a été mis à jour :", satistiques);
  }, [satistiques]);

  useEffect(() => {
    console.log("L'état 'chartDatas' a été mis à jour :", chartDatas);
  }, [chartDatas]);


  return (<>
  <div className="text-center"><h1 className="m-5 caret-blue-800 font-bold text-3xl mb-5">Statistiques</h1></div>
  <Separator className="my-4"/>
  <div className="flex flex-row items-stretch justify-around mt-5">
          <Card className="w-full max-w-2xs">
            <CardHeader>
              <CardTitle className="text-center">Nombre des formations</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="center"><p>{satistiques?.kpis?.totalFormations}</p></div>
            </CardContent>
          </Card>

          <Card className="w-full max-w-2xs">
            <CardHeader>
              <CardTitle className="text-center">Nombre des entreprises</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p>{satistiques?.kpis?.total_clients}</p>
            </CardContent>
          </Card>

          <Card className="w-full max-w-2xs">
            <CardHeader>
              <CardTitle className="text-center">Nombre des participants</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p>{satistiques?.kpis?.total_participants}</p>
            </CardContent>
          </Card>
      {/* </CardContent>
    </Card> */}
    </div>
        <div className="flex flex-row items-center m-4">
          <Card className="w-3xl m-1">
                <CardHeader>
                  <CardTitle>Nombre des participants par formations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="">
                    <ChartContainer config={chartConfig} className="min-h-[200px] 2xl">
                      <BarChart accessibilityLayer data={chartDatas}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                          dataKey="intitule"
                          tickLine={false}
                          tickMargin={10}
                          axisLine={false}
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="total_entreprises" fill="var(--color-desktop)" radius={4} />
                        <ChartLegend content={<ChartLegendContent />} />
                      </BarChart>
                    </ChartContainer>
                    </div>
                </CardContent>
              </Card>


              <Card className="w-3xl m-1">
                <CardHeader>
                  <CardTitle>Nombre des entreprise par formations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="">
                    <ChartContainer config={chartConfig} className="min-h-[200px] 2xl">
                      <BarChart accessibilityLayer data={chartDatap}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                          dataKey="intitule"
                          tickLine={false}
                          tickMargin={10}
                          axisLine={false}
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="total_participants" fill="var(--color-desktop)" radius={4} />
                        <ChartLegend content={<ChartLegendContent />} />
                      </BarChart>
                    </ChartContainer>
                    </div>
                </CardContent>
              </Card>
              </div>
      <Separator className="my-4"/>
      <div className="text-center"><h1 className="m-5 caret-blue-800 font-bold text-3xl mb-5">Formations</h1></div>
      <Separator className="my-4"/>
      <div className=" flex flex-col justify-center text-center"><FormationsRecherche /></div>

    
    </>
  )
}