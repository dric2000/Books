import { Button } from "@/components/ui/button";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { TrendingDown, TrendingUp } from "lucide-react";
import { Bar, BarChart, Line, LineChart, RadialBar, RadialBarChart, ResponsiveContainer } from "recharts";


const data = [
  { name: 'Page A', uv: 4000, pv: 2400, amt: 2400, },
  { name: 'Page B', uv: 3000, pv: 1398, amt: 2210, },
  { name: 'Page C', uv: 2000, pv: 2800, amt: 2290, },
  { name: 'Page D', uv: 2780, pv: 3908, amt: 2000, },
  { name: 'Page E', uv: 1890, pv: 4800, amt: 2181, },
  { name: 'Page F', uv: 2390, pv: 3800, amt: 2500, },
  { name: 'Page G', uv: 3490, pv: 4300, amt: 2100, },
];

const radialData = [
  { name: "Tours", value: 186, fill: '#3FB076', },
];

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: { label: "Desktop", color: "#3FB076", },
  mobile: { label: "Mobile", color: "#3FB", },
} satisfies ChartConfig

const Dashboard = () => {
  return (
    <div className="w-full flex flex-col gap-10 p-4 md:p-6 lg:p-10">

      {/* Première ligne */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="bg-white shadow-xl/10 flex flex-col md:flex-row gap-5 rounded-3xl justify-between items-center p-5 md:w-1/3 w-full">
          <div className="flex flex-col gap-3 text-center md:text-left">
            <h1 className="text-xl md:text-2xl">Total des produits</h1>
            <span className="text-4xl md:text-6xl">685</span>
            <div className="flex items-center justify-center md:justify-start gap-2 text-lg md:text-2xl">
              <TrendingUp className="text-green-400" />
              <span>+10 ce mois</span>
            </div>
          </div>
          <img src="/DashboardImages/products.png" className="w-24 h-24 md:w-32 md:h-32 object-cover" alt="" />
        </div>

        <div className="bg-white shadow-xl/10 flex flex-col md:flex-row gap-5 rounded-3xl justify-between items-center p-5 md:w-1/3 w-full">
          <div className="flex flex-col gap-3 text-center md:text-left">
            <h1 className="text-xl md:text-2xl">Ventes réalisés</h1>
            <span className="text-4xl md:text-6xl">98 K</span>
            <div className="flex items-center justify-center md:justify-start gap-2 text-lg md:text-2xl">
              <TrendingUp className="text-green-400" />
              <span>+2000 € ce mois</span>
            </div>
          </div>
          <img src="/DashboardImages/sales.png" className="w-24 h-24 md:w-32 md:h-32 object-cover" alt="" />
        </div>

        <div className="bg-white shadow-xl/10 flex flex-col md:flex-row gap-5 rounded-3xl justify-between items-center p-5 md:w-1/3 w-full">
          <div className="flex flex-col gap-3 text-center md:text-left">
            <h1 className="text-xl md:text-2xl">Retours clients</h1>
            <span className="text-4xl md:text-6xl">7</span>
            <div className="flex items-center justify-center md:justify-start gap-2 text-lg md:text-2xl">
              <TrendingDown className="text-red-400" />
              <span>-2000</span>
            </div>
          </div>
          <img src="/DashboardImages/cancel.png" className="w-24 h-24 md:w-32 md:h-32 object-cover" alt="" />
        </div>
      </div>

      {/* Deuxième ligne */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Recettes */}
        <div className="bg-[#3FB076] flex flex-col text-white rounded-2xl p-5 shadow-2xs w-full lg:w-1/3">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl md:text-2xl">Recettes totales</h1>
              <span className="text-2xl md:text-4xl font-bold">20, 345 €</span>
            </div>
            <span className="text-lg md:text-3xl font-bold">+ 10%</span>
          </div>
          <div className="w-full h-40 md:h-52 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <Line type="monotone" dataKey="pv" stroke="#FFFFFF" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Produits les plus achetés */}
        <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col gap-5 w-full lg:w-1/3">
          <h1 className="text-xl md:text-2xl font-semibold">Les plus achetés</h1>
          <div className="flex flex-col gap-6 text-sm md:text-lg">
            <div className="flex flex-col gap-2">
              <h2>Livres</h2>
              <Progress value={10} className="bg-gray-200 [&>div]:bg-[#FFA500]" />
            </div>
            <div className="flex flex-col gap-2">
              <h2>Cahiers</h2>
              <Progress value={30} className="bg-gray-200 [&>div]:bg-red-500" />
            </div>
            <div className="flex flex-col gap-2">
              <h2>Stylos</h2>
              <Progress value={90} className="bg-gray-200 [&>div]:bg-[#3FB076]" />
            </div>
          </div>
        </div>

        {/* Radial Chart */}
        <div className="flex flex-col gap-6 justify-center items-center bg-white shadow-2xl rounded-lg p-5 w-full lg:w-1/3">
          <h1 className="text-xl md:text-2xl font-semibold">Pourcentage de retours</h1>
          <div className="relative flex h-48 w-48 md:h-64 md:w-64 items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                innerRadius="70%"
                outerRadius="100%"
                data={radialData}
                startAngle={90}
                endAngle={360}
              >
                <RadialBar
                  minAngle={15}
                  background={{ fill: "#f1f5f9" }}
                  clockWise
                  dataKey="value"
                />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="absolute flex flex-col items-center">
              <span className="text-xs md:text-sm text-gray-500">Tours</span>
              <span className="text-lg md:text-2xl font-bold">186</span>
            </div>
          </div>
        </div>
      </div>

      {/* Troisième ligne */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-1/2">
          <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <BarChart accessibilityLayer data={chartData}>
              <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
              <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
            </BarChart>
          </ChartContainer>
        </div>
        <div className="w-full lg:w-1/2 bg-white rounded-2xl shadow-2xl p-6 flex flex-col gap-6">
          <h1 className="text-2xl font-semibold">Note</h1>
          <p className="text-sm md:text-base lg:text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero dicta
            doloribus repellat quos incidunt...
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis quod
            nemo quam hic, tempore fuga. Ex, voluptatibus? Commodi nam dolor, eum
            neque nobis, quas cupiditate harum aliquam modi, quisquam id?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero dicta
            doloribus repellat quos incidunt...
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis quod
            nemo quam hic, tempore fuga. Ex, voluptatibus? Commodi nam dolor, eum
            neque nobis, quas cupiditate harum aliquam modi, quisquam id?
          </p>
          <Button className="bg-[#3FB076] hover:bg-green-800 w-fit">Modifier</Button>
        </div>
      </div>
    </div>
  )
}


export default Dashboard
