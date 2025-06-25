
'use client';

import { Line, LineChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartTooltipContent, ChartContainer, ChartTooltip, type ChartConfig } from '@/components/ui/chart';
import { format } from 'date-fns';

interface OverviewChartProps {
  data: any[];
}

const chartConfig = {
    Views: {
      label: "Views",
      color: "hsl(var(--chart-1))",
    },
    Projects: {
      label: "Projects",
      color: "hsl(var(--chart-2))",
    },
    Blogs: {
      label: "Blogs",
      color: "hsl(var(--chart-3))",
    },
} satisfies ChartConfig

export function OverviewChart({ data }: OverviewChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Content Overview</CardTitle>
        <CardDescription>Activity over the last 30 days.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <LineChart accessibilityLayer data={data} margin={{ left: 12, right: 12, top: 5 }}>
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => {
                        const date = new Date(value);
                        return format(new Date(date.valueOf() + date.getTimezoneOffset() * 60 * 1000), "MMM d");
                    }}
                />
                <YAxis allowDecimals={false} tickLine={false} axisLine={false} />
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="line" />}
                />
                <Line dataKey="Views" type="monotone" stroke="var(--color-Views)" strokeWidth={2} dot={false} name="Views" />
                <Line dataKey="Projects" type="monotone" stroke="var(--color-Projects)" strokeWidth={2} dot={false} name="Projects" />
                <Line dataKey="Blogs" type="monotone" stroke="var(--color-Blogs)" strokeWidth={2} dot={false} name="Blogs" />
            </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
