import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from '@/components/ui/card';
import { ChartContainer, ChartLegend, ChartLegendContent, ChartStyle, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchCategories } from "@/slices/categoriesSlice";
import { fetchProducts } from "@/slices/productsSlice";
import { TrendingDown, TrendingUp } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, Label, Line, LineChart, Pie, PieChart, Sector, XAxis } from "recharts";
import type { PieSectorDataItem } from "recharts/types/polar/Pie";

const chartData = [
    { month: "January", desktop: 186 },
    { month: "February", desktop: 305 },
    { month: "March", desktop: 237 },
    { month: "April", desktop: 73 },
    { month: "May", desktop: 209 },
    { month: "June", desktop: 214 },
]

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "white"
    },
} satisfies ChartConfig

const desktopData = [
    { month: "january", desktop: 186, fill: "var(--color-january)" },
    { month: "february", desktop: 305, fill: "var(--color-february)" },
    { month: "march", desktop: 237, fill: "var(--color-march)" },
    { month: "april", desktop: 173, fill: "var(--color-april)" },
    { month: "may", desktop: 209, fill: "var(--color-may)" },
]

const mychartConfig = {
    visitors: { label: "Visitors", },
    desktop: { label: "Desktop", },
    mobile: { label: "Mobile", },
    january: { label: "January", color: "var(--chart-1)", },
    february: { label: "February", color: "#3FB076", },
    march: { label: "March", color: "var(--chart-3)", },
    april: { label: "April", color: "var(--chart-4)", },
    may: { label: "May", color: "var(--chart-5)", },
} satisfies ChartConfig

/* -------------Bar chart variables ---------------*/

const barChartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
]

const barChartConfig = {
    desktop: {
        label: "Desktop",
        color: "var(--chart-1)",
    },
    mobile: {
        label: "Mobile",
        color: "#3FB076",
    },
} satisfies ChartConfig




const Dashboard = () => {

    const dispatch = useAppDispatch();
    const { items: products } = useAppSelector((state) => state.products);
    const { items: categories } = useAppSelector((state) => state.categories);

    const totalValue = products.reduce((sum, p) => sum + p.prix * p.quantite, 0);



    useEffect(() => { dispatch(fetchCategories()); }, [dispatch]);
    useEffect(() => { dispatch(fetchProducts()); }, [dispatch]);




    const id = "pie-interactive"
    const [activeMonth, setActiveMonth] = useState(desktopData[0].month)

    const activeIndex = useMemo(
        () => desktopData.findIndex((item) => item.month === activeMonth),
        [activeMonth]
    )
    const months = useMemo(() => desktopData.map((item) => item.month), [])

    return (
        <div className="w-full flex flex-col gap-10 p-4 md:p-6 lg:p-10">

            {/* Première ligne */}
            <div className="flex flex-col lg:flex-row gap-6">
                <div className="bg-white shadow-xl/10 flex flex-col md:flex-row gap-5 rounded-3xl justify-between items-center p-5 md:w-1/3 w-full border-2">
                    <div className="flex flex-col gap-3 text-center md:text-left">
                        <h1 className="text-xl md:text-2xl">Total des produits</h1>
                        <span className="text-4xl md:text-5xl"> {products.length} </span>
                        <div className="flex items-center justify-center md:justify-start gap-2 text-lg md:text-2xl">
                            <TrendingUp className="text-green-400" />
                            <span> {categories.length} catégories </span>
                        </div>
                    </div>
                    <img src="/DashboardImages/products.png" className="w-24 h-24 md:w-32 md:h-32 object-cover" alt="" />
                </div>

                <div className="bg-white shadow-xl/10 flex flex-col md:flex-row gap-5 rounded-3xl justify-between items-center p-5 md:w-1/3 w-full border-2">
                    <div className="flex flex-col gap-3 text-center md:text-left">
                        <h1 className="text-xl md:text-2xl">Ventes réalisés</h1>
                        <span className="text-3xl md:text-5xl"> {totalValue} € </span>
                        <div className="flex items-center justify-center md:justify-start gap-2 text-lg md:text-2xl">
                            <TrendingUp className="text-green-400" />
                            <span>+2000 € ce mois</span>
                        </div>
                    </div>
                    <img src="/DashboardImages/sales.png" className="w-24 h-24 md:w-32 md:h-32 object-cover" alt="" />
                </div>

                <div className="bg-white shadow-xl/10 flex flex-col md:flex-row gap-5 rounded-3xl justify-between items-center p-5 md:w-1/3 w-full border-2">
                    <div className="flex flex-col gap-3 text-center md:text-left">
                        <h1 className="text-xl md:text-2xl">Retours clients</h1>
                        <span className="text-4xl md:text-5xl">7</span>
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

                    <div>
                        <Card className="bg-[#3FBO76] border-none shadow-none text-white">
                            <CardHeader>
                                <CardTitle>Line Chart</CardTitle>
                                <CardDescription className="text-white">January - June 2025</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer config={chartConfig} className="text-white">
                                    <LineChart
                                        className="text-white"
                                        accessibilityLayer
                                        data={chartData}
                                        margin={{
                                            left: 12,
                                            right: 12,
                                        }}
                                    >
                                        <CartesianGrid vertical={false} />
                                        <XAxis
                                            dataKey="month"
                                            tickLine={false}
                                            axisLine={false}
                                            tickMargin={8}
                                            tickFormatter={(value) => value.slice(0, 3)}
                                        />
                                        <ChartTooltip
                                            cursor={false}
                                            content={<ChartTooltipContent hideLabel />}
                                        />
                                        <Line
                                            className="text-white"
                                            dataKey="desktop"
                                            type="natural"
                                            stroke="var(--color-desktop)"
                                            strokeWidth={2}
                                            dot={false}
                                        />
                                    </LineChart>
                                </ChartContainer>
                            </CardContent>
                            <CardFooter className="flex-col items-start gap-2 text-sm">
                                <div className="flex gap-2 leading-none font-medium">
                                    Augmentation de 6% ce mois <TrendingUp className="h-4 w-4" />
                                </div>
                                <div className="text-muted-foreground leading-none text-white">
                                    Toutes les recettes de ces 6 derniers mois
                                </div>
                            </CardFooter>
                        </Card>
                    </div>

                </div>

                {/* Produits les plus achetés */}
                <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col gap-5 w-full lg:w-1/3 border-2">
                    <h1 className="text-xl md:text-2xl font-semibold">Les plus achetés</h1>
                    <div className="flex flex-col gap-6 text-sm md:text-lg">
                        <div className="flex flex-col gap-2">
                            <h2>Livres</h2>
                            <Progress value={10} className="bg-gray-200 h-10 [&>div]:bg-[#FFA500]" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <h2>Cahiers</h2>
                            <Progress value={30} className="bg-gray-200 h-10 [&>div]:bg-red-500" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <h2>Stylos</h2>
                            <Progress value={90} className="bg-gray-200 h-10 [&>div]:bg-[#3FB076]" />
                        </div>
                    </div>
                </div>

                {/* Radial Chart */}
                <div className="flex flex-col gap-6 justify-center items-center shadow-2xl rounded-lg p-5 w-full lg:w-1/3 border-2">
                    <Card data-chart={id} className="flex flex-col w-full border-none shadow-none">
                        <ChartStyle id={id} config={mychartConfig} />
                        <CardHeader className="flex-row items-start space-y-0 pb-0">
                            <div className="grid gap-1">
                                <CardTitle>Nombre de retours par mois</CardTitle>
                                <CardDescription>Janvier - Juin 2025</CardDescription>
                            </div>
                            <Select value={activeMonth} onValueChange={setActiveMonth}>
                                <SelectTrigger
                                    className="ml-auto h-7 w-[130px] rounded-lg pl-2.5"
                                    aria-label="Select a value"
                                >
                                    <SelectValue placeholder="Select month" />
                                </SelectTrigger>
                                <SelectContent align="end" className="rounded-xl">
                                    {months.map((key) => {
                                        const config = mychartConfig[key as keyof typeof mychartConfig]

                                        if (!config) { return null }

                                        return (
                                            <SelectItem key={key} value={key} className="rounded-lg [&_span]:flex">
                                                <div className="flex items-center gap-2 text-xs">
                                                    <span
                                                        className="flex h-3 w-3 shrink-0 rounded-xs" style={{ backgroundColor: `var(--color-${key})`, }}
                                                    />
                                                    {config?.label}
                                                </div>
                                            </SelectItem>
                                        )
                                    })}
                                </SelectContent>
                            </Select>
                        </CardHeader>
                        <CardContent className="flex flex-1 justify-center pb-0">
                            <ChartContainer id={id} config={mychartConfig} className="mx-auto aspect-square w-full max-w-[300px]">
                                <PieChart>
                                    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                                    <Pie
                                        data={desktopData}
                                        dataKey="desktop"
                                        nameKey="month"
                                        innerRadius={60}
                                        strokeWidth={5}
                                        activeIndex={activeIndex}
                                        activeShape={({
                                            outerRadius = 0,
                                            ...props
                                        }: PieSectorDataItem) => (
                                            <g>
                                                <Sector {...props} outerRadius={outerRadius + 10} />
                                                <Sector
                                                    {...props}
                                                    outerRadius={outerRadius + 25}
                                                    innerRadius={outerRadius + 12}
                                                />
                                            </g>
                                        )}
                                    >
                                        <Label
                                            content={({ viewBox }) => {
                                                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                                    return (
                                                        <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                                                            <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                                                                {desktopData[activeIndex].desktop.toLocaleString()}
                                                            </tspan>
                                                            <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                                                                Visitors
                                                            </tspan>
                                                        </text>
                                                    )
                                                }
                                            }}
                                        />
                                    </Pie>
                                </PieChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Troisième ligne */}
            <div className="flex flex-col lg:flex-row gap-6">

                <div className="lg:w-1/2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Bar Chart - Stacked + Legend</CardTitle>
                            <CardDescription>January - June 2024</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer config={barChartConfig}>
                                <BarChart accessibilityLayer data={barChartData}>
                                    <CartesianGrid vertical={false} />
                                    <XAxis
                                        dataKey="month"
                                        tickLine={false}
                                        tickMargin={10}
                                        axisLine={false}
                                        tickFormatter={(value) => value.slice(0, 3)}
                                    />
                                    <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                                    <ChartLegend content={<ChartLegendContent />} />
                                    <Bar
                                        dataKey="desktop"
                                        stackId="a"
                                        fill="var(--color-desktop)"
                                        radius={[0, 0, 4, 4]}
                                    />
                                    <Bar
                                        dataKey="mobile"
                                        stackId="a"
                                        fill="var(--color-mobile)"
                                        radius={[4, 4, 0, 0]}
                                    />
                                </BarChart>
                            </ChartContainer>
                        </CardContent>
                        <CardFooter className="flex-col items-start gap-2 text-sm">
                            <div className="flex gap-2 leading-none font-medium">
                                Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                            </div>
                            <div className="text-muted-foreground leading-none">
                                Showing total visitors for the last 6 months
                            </div>
                        </CardFooter>
                    </Card>
                </div>

                <div className="w-full lg:w-1/2 bg-white rounded-2xl shadow-2xl p-6 flex flex-col gap-6 border-2">
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
                    <Button className="bg-[#3FB076] hover:bg-green-800 w-fit mb-0">Modifier</Button>
                </div>
            </div>
        </div>
    )
}


export default Dashboard
