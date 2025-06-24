'use client';

import { Bar, BarChart, CartesianGrid, Legend, RadialBar, RadialBarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Calendar, Circle, TrendingUp, ThumbsUp, ThumbsDown, Wifi } from 'lucide-react';
import { Progress } from '../ui/progress';

const barChartData = [
    { date: '2023-12-18', created: 3800, resolved: 2100 },
    { date: '2023-12-19', created: 4100, resolved: 2300 },
    { date: '2023-12-20', created: 4200, resolved: 2200 },
    { date: '2023-12-21', created: 3900, resolved: 2150 },
    { date: '2023-12-22', created: 3600, resolved: 2000 },
    { date: '2023-12-23', created: 3800, resolved: 2100 },
    { date: '2023-12-24', created: 3900, resolved: 2200 },
];

const radialChartData = [
  { name: 'Email', value: 35, fill: 'var(--chart-1)' },
  { name: 'Live Chat', value: 25, fill: 'var(--chart-2)' },
  { name: 'Contact Form', value: 20, fill: 'var(--chart-3)' },
  { name: 'Messenger', value: 15, fill: 'var(--chart-4)' },
  { name: 'WhatsApp', value: 5, fill: 'var(--chart-5)' },
];

export default function DashboardClient() {
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Created Tickets" value="24,208" change="+5%" />
        <StatCard title="Unsolved Tickets" value="4,564" change="+2%" />
        <StatCard title="Resolved Tickets" value="18,208" change="+8%" />
        <StatCard title="Average First Time Reply" value="12:01 min" change="+8%" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Average Tickets Created</CardTitle>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Calendar className="h-4 w-4" />
              <span>Dec 18, 2023 - Dec 24, 2023</span>
            </Button>
          </CardHeader>
          <CardContent className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barChartData} margin={{ top: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted-foreground)/.2)" />
                <XAxis dataKey="date" tick={{ fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                <Tooltip
                  cursor={{ fill: 'hsl(var(--accent))' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg border bg-card p-2 text-sm shadow-sm">
                          <p className="font-bold text-card-foreground">{payload[0].payload.date}</p>
                          <p className="text-green-400">Created: {payload[0].value}</p>
                          <p className="text-blue-400">Resolved: {payload[1].value}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend
                  verticalAlign="top"
                  align="left"
                  iconType="circle"
                  wrapperStyle={{ paddingBottom: '20px', paddingLeft: '1rem' }}
                  formatter={(value, entry) => <span className="text-muted-foreground">{value}</span>}
                />
                <Bar dataKey="resolved" stackId="a" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} barSize={30} name="Avg. Tickets Resolved"/>
                <Bar dataKey="created" stackId="a" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} barSize={30} name="Avg. Tickets Created"/>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Conversions</CardTitle>
            <CardDescription>17,220 Sales</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center h-[300px]">
            <div className="flex items-center justify-center gap-4">
              <div className="relative flex items-center justify-center h-48 w-48 rounded-full bg-blue-500/20">
                <div className="relative flex items-center justify-center h-40 w-40 rounded-full bg-primary text-primary-foreground">
                    <span className="text-3xl font-bold">12,320</span>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="relative flex items-center justify-center h-24 w-24 rounded-full bg-cyan-500/20">
                     <div className="relative flex items-center justify-center h-20 w-20 rounded-full bg-cyan-500 text-white">
                        <span className="text-xl font-bold">3,260</span>
                     </div>
                </div>
                <div className="relative flex items-center justify-center h-16 w-16 rounded-full bg-orange-500/20">
                     <div className="relative flex items-center justify-center h-14 w-14 rounded-full bg-orange-500 text-white">
                        <span className="text-lg font-bold">1,320</span>
                     </div>
                </div>
              </div>
            </div>
             <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2"><Circle className="h-2 w-2 fill-primary text-primary" /> Yogyakarta</div>
                <div className="flex items-center gap-2"><Circle className="h-2 w-2 fill-cyan-500 text-cyan-500" /> Bandung</div>
                <div className="flex items-center gap-2"><Circle className="h-2 w-2 fill-orange-500 text-orange-500" /> Jakarta</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Wifi className="h-5 w-5 text-primary" /> Ticket By Channels</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
             <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart 
                    innerRadius="55%" 
                    outerRadius="100%" 
                    data={radialChartData} 
                    startAngle={180} 
                    endAngle={0}
                >
                    <RadialBar
                        background
                        dataKey="value"
                        cornerRadius={10}
                    />
                    <Legend 
                        iconType="circle"
                        layout="horizontal" 
                        verticalAlign="bottom" 
                        align="center"
                        wrapperStyle={{paddingTop: '20px'}}
                        formatter={(value, entry) => <span className="text-muted-foreground">{entry.payload.name}</span>}
                    />
                    <Tooltip content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                            return <div className="rounded-lg border bg-card p-2 text-sm shadow-sm">{payload[0].payload.name}: {payload[0].value}%</div>;
                        }
                        return null;
                    }} />
                    <text x="50%" y="55%" textAnchor="middle" dominantBaseline="middle" className="text-muted-foreground text-sm">
                        Total Active Tickets
                    </text>
                    <text x="50%" y="70%" textAnchor="middle" dominantBaseline="middle" className="text-3xl font-bold fill-foreground">
                        14,832
                    </text>
                </RadialBarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Customer Satisfaction</CardTitle>
            <CardDescription>156 Customers responded</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <SatisfactionRow icon={ThumbsUp} label="Positive" value={80} color="bg-green-500" />
            <SatisfactionRow icon={Circle} label="Neutral" value={15} color="bg-yellow-500" />
            <SatisfactionRow icon={ThumbsDown} label="Negative" value={5} color="bg-red-500" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatCard({ title, value, change }: { title: string, value: string, change: string }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-3xl font-bold">{value}</div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                    <span className="flex items-center gap-1 text-green-500">
                        <TrendingUp className="h-4 w-4" />
                        {change}
                    </span>
                    <span>vs. last month</span>
                </div>
            </CardContent>
        </Card>
    );
}

function SatisfactionRow({ icon: Icon, label, value, color }: { icon: React.ElementType, label: string, value: number, color: string }) {
    return (
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 w-24">
                <Icon className={`h-5 w-5 ${label === 'Positive' ? 'text-green-500' : label === 'Negative' ? 'text-red-500' : 'text-yellow-500'}`} />
                <span className="text-muted-foreground">{label}</span>
            </div>
            <div className="flex-1">
                <Progress value={value} indicatorClassName={color} />
            </div>
            <span className="w-10 text-right font-semibold">{value}%</span>
        </div>
    );
}
