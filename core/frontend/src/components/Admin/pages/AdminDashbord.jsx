import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useEffect, useState, useCallback } from "react"
import { Separator } from "@/components/ui/separator"
import { FormationsRecherche } from "./FormationsRecherche"
import { EntrepriseRecherche } from "./EntrepriseRecherche"
import { AlertCircle, Users, Building2, GraduationCap, Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import StatistiqueApi from "../../../services/api/Statistique"

const chartConfig = {
  views: {
    label: "Page Views",
  },
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-2))",
  },
  mobile: {
    label: "Mobile", 
    color: "hsl(var(--chart-1))",
  },
}

// KPI Card Component
const KpiCard = ({ title, value, icon: Icon, description, isLoading }) => (
  <Card className="w-full max-w-xs transition-all duration-200 hover:shadow-lg">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">
        {isLoading ? (
          <Loader2 className="h-6 w-6 animate-spin" />
        ) : (
          value || "0"
        )}
      </div>
      {description && (
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      )}
    </CardContent>
  </Card>
)

// Chart Component
const StatChart = ({ title, data, dataKey, isLoading, className = "" }) => (
  <Card className={`w-full ${className}`}>
    <CardHeader>
      <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      <CardDescription>
        Répartition par formation
      </CardDescription>
    </CardHeader>
    <CardContent>
      {isLoading ? (
        <div className="flex items-center justify-center h-[300px]">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2 text-sm text-muted-foreground">Chargement des données...</span>
        </div>
      ) : data && data.length > 0 ? (
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="intitule"
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis />
              <ChartTooltip 
                content={<ChartTooltipContent />}
                cursor={{ fill: 'rgba(0, 0, 0, 0.1)' }}
              />
              <Bar 
                dataKey={dataKey} 
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      ) : (
        <div className="flex items-center justify-center h-[300px] text-muted-foreground">
          <AlertCircle className="h-8 w-8 mr-2" />
          <span>Aucune donnée disponible</span>
        </div>
      )}
    </CardContent>
  </Card>
)

// Section Header Component
const SectionHeader = ({ title, className = "" }) => (
  <div className={`text-center ${className}`}>
    <h2 className="text-2xl font-bold text-primary mb-4">{title}</h2>
  </div>
)

export function AdminDashbord() {
  const [statistics, setStatistics] = useState({})
  const [chartData, setChartData] = useState([])
  const [participantsChartData, setParticipantsChartData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchStatistics = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      // Simulate API call since StatistiqueApi is not available
      // Replace this with your actual API call
      // await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock data for demonstration
      const mockResponse = {
        data: {
          kpis: {
            totalFormations: 12,
            total_clients: 45,
            total_participants: 234
          },
          charts: {
            entreprisesParFormation: [
              { intitule: "Formation React", total_entreprises: 8 },
              { intitule: "Formation Vue.js", total_entreprises: 6 },
              { intitule: "Formation Angular", total_entreprises: 4 },
              { intitule: "Formation Node.js", total_entreprises: 10 }
            ],
            participantsParFormation: [
              { intitule: "Formation React", total_participants: 45 },
              { intitule: "Formation Vue.js", total_participants: 32 },
              { intitule: "Formation Angular", total_participants: 28 },
              { intitule: "Formation Node.js", total_participants: 67 }
            ]
          }
        }
      }
      
      const response = await StatistiqueApi.admin();
      
      
      setStatistics(response.data)
      setChartData(response.data.charts.entreprisesParFormation || [])
      setParticipantsChartData(response.data.charts.participantsParFormation || [])
      
    } catch (error) {
      console.error("Erreur lors de la récupération des statistiques:", error)
      setError("Erreur lors du chargement des statistiques. Veuillez réessayer.")
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchStatistics()
  }, [fetchStatistics])

  const kpiData = [
    {
      title: "Nombre de formations",
      value: statistics?.kpis?.totalFormations,
      icon: GraduationCap,
      description: "Total des formations disponibles"
    },
    {
      title: "Nombre d'entreprises",
      value: statistics?.kpis?.total_clients,
      icon: Building2,
      description: "Entreprises clientes"
    },
    {
      title: "Nombre de participants",
      value: statistics?.kpis?.total_participants,
      icon: Users,
      description: "Participants inscrits"
    }
  ]

  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto">
  
      <SectionHeader title="Tableau de bord administrateur" />
      
    
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Separator className="my-6" />

     
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {kpiData.map((kpi, index) => (
          <KpiCard 
            key={index}
            title={kpi.title}
            value={kpi.value}
            icon={kpi.icon}
            description={kpi.description}
            isLoading={isLoading}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <StatChart
          title="Entreprises par formation"
          data={chartData}
          dataKey="total_entreprises"
          isLoading={isLoading}
        />
        
        <StatChart
          title="Participants par formation"
          data={participantsChartData}
          dataKey="total_participants"
          isLoading={isLoading}
        />
      </div>

      <Separator className="my-8" />

      <div className="space-y-6">
        <SectionHeader title="Gestion des formations" />
        <div className="flex flex-col justify-center">
          <FormationsRecherche />
        </div>
      </div>

      <Separator className="my-8" />

      <div className="space-y-6">
        <SectionHeader title="Gestion des entreprises" />
        <div className="flex flex-col justify-center">
          <EntrepriseRecherche />
        </div>
      </div>
    </div>
  )
}