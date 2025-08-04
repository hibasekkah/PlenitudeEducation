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

const chartData = [
    { data: "formation", desktop: 2 },
    { data: "formation", desktop: 9},
  ]



chartData.push({ data: "formation", desktop: 2, desktop: 2});

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
  <div className="center "><h1 className="m-5 center">Statistiques</h1></div>
  
  <div className="flex flex-row items-stretch justify-around mt-5">
    
    {/* <Card className="py-0">
      <CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:!py-0 h-20">
          <CardTitle>Statistiques globales</CardTitle>
          <CardDescription>
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6 flex justify-around"> */}
          <Card className="w-full max-w-2xs">
            <CardHeader>
              <CardTitle>nombre des formations</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{satistiques?.kpis?.totalFormations}</p>
            </CardContent>
          </Card>

          <Card className="w-full max-w-2xs">
            <CardHeader>
              <CardTitle>nombre des entreprises</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{satistiques?.kpis?.total_clients}</p>
            </CardContent>
          </Card>

          <Card className="w-full max-w-2xs">
            <CardHeader>
              <CardTitle>nombre des participants</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{satistiques?.kpis?.total_participants}</p>
            </CardContent>
          </Card>
      {/* </CardContent>
    </Card> */}
    </div>
    <div className="mt-4">
    <ChartContainer config={chartConfig} className="min-h-[200px] w-2xl mt-4">
      <BarChart accessibilityLayer data={chartDatas}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="intitule"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          //tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="total_entreprises" fill="var(--color-desktop)" radius={4} />
        <ChartLegend content={<ChartLegendContent />} />
      </BarChart>
    </ChartContainer>
    </div>

    <div className="mt-4">
    <ChartContainer config={chartConfig} className="min-h-[200px] w-2xl mt-4">
      <BarChart accessibilityLayer data={chartDatap}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="intitule"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          //tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="total_participants" fill="var(--color-desktop)" radius={4} />
        <ChartLegend content={<ChartLegendContent />} />
      </BarChart>
    </ChartContainer>
    </div>
    {/* <Card className="py-0">
      <CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:!py-0">
          <CardTitle>Statistiques globales</CardTitle>
          <CardDescription>
            
          </CardDescription>
        </div>
        <div className="flex">
          {["desktop", "mobile"].map((key) => {
            const chart = key
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="data-[active=true]:bg-muted/50 relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-muted-foreground text-xs">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg leading-none font-bold sm:text-3xl">
                  {total[key].toLocaleString()}
                </span>
              </button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card> */}
    </>
  )
}