import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CopyPlus, Clock, Zap, TrendingUp, AlertCircle, ShieldAlert } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/Card";
import { Skeleton } from "../components/ui/Skeleton";
import { Badge } from "../components/ui/Badge";
import { useAppContext } from "../context/AppContext";
import { api } from "../services/api";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export function Dashboard() {
  const { user } = useAppContext();
  const [metrics, setMetrics] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [disruptions, setDisruptions] = useState([]);
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [met, data, dist, cls] = await Promise.all([
          api.getDashboardMetrics(user?.id),
          api.getAnalytics(user?.id),
          api.getDisruptions(),
          api.getRecentClaims(user?.id)
        ]);
        setMetrics(met); setAnalytics(data); setDisruptions(dist); setClaims(cls);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Welcome back, {user?.name.split(" ")[0]}!</h1>
        <p className="text-muted-foreground">Here is your income protection overview for this week.</p>
      </div>

      {loading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-4 w-4 rounded-full" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-[120px] mb-2" />
                <Skeleton className="h-4 w-[150px]" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Coverage</CardTitle>
              <ShieldAlert className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics?.activeCoverage}</div>
              <p className="text-xs text-muted-foreground">+2% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Weekly Premium</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics?.weeklyPremium}</div>
              <p className="text-xs text-muted-foreground opacity-80">Auto-deducted on Sundays</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Earnings Protected</CardTitle>
              <TrendingUp className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics?.earningsProtected}</div>
              <p className="text-xs text-muted-foreground">Based on recent avg payout</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Risk Score</CardTitle>
              <AlertCircle className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">{metrics?.riskScore}</div>
              <p className="text-xs text-muted-foreground">Current location: {user?.location || "N/A"}</p>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Earnings vs Protection</CardTitle>
            <CardDescription>Overview of your protected income over the week.</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? <Skeleton className="w-full h-[300px]" /> : (
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={analytics?.earningsVsProtection} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorProtection" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.5}/>
                        <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted))" />
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value}`} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                      itemStyle={{ color: 'hsl(var(--foreground))' }}
                    />
                    <Area type="monotone" dataKey="protection" stroke="hsl(var(--success))" fillOpacity={1} fill="url(#colorProtection)" name="Guaranteed" />
                    <Area type="monotone" dataKey="earnings" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorEarnings)" name="Actual Earnings" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex flex-col gap-4 lg:col-span-3">
          <Card className="flex-1">
            <CardHeader className="pb-2">
              <CardTitle>Active Disruptions</CardTitle>
              <CardDescription>Alerts impacting your area.</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? <div className="space-y-3"><Skeleton className="h-14 w-full" /><Skeleton className="h-14 w-full" /></div> : disruptions.length > 0 ? (
                <div className="space-y-4">
                  {disruptions.slice(0,2).map(dist => (
                    <motion.div key={dist.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex items-start justify-between rounded-lg border p-3 bg-secondary/30">
                      <div className="flex items-start gap-3">
                        <div className={`mt-0.5 rounded-full p-1.5 ${dist.severity === "high" || dist.severity === "critical" ? "bg-destructive/20 text-destructive" : "bg-warning/20 text-warning"}`}>
                          <AlertCircle className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{dist.title}</p>
                          <p className="text-xs text-muted-foreground">{dist.location} • {dist.time}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-muted-foreground text-sm">No active disruptions.</div>
              )}
            </CardContent>
          </Card>
          
          <Card className="flex-1">
            <CardHeader className="pb-2">
              <CardTitle>Recent Claims</CardTitle>
              <CardDescription>Auto-triggered events.</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? <div className="space-y-3"><Skeleton className="h-10 w-full" /><Skeleton className="h-10 w-full" /></div> : claims.length > 0 ? (
                <div className="space-y-4">
                  {claims.slice(0, 3).map(claim => (
                    <div key={claim.id} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
                      <div>
                        <p className="text-sm font-medium">{claim.type}</p>
                        <p className="text-xs text-muted-foreground">{claim.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold">{claim.amount}</p>
                        <Badge variant={claim.status === "Paid" ? "success" : claim.status === "Processing" ? "warning" : "default"} className="mt-1">{claim.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-muted-foreground text-sm flex flex-col items-center">
                  <CopyPlus className="mb-2 h-8 w-8 opacity-20" />
                  No claims processed.
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
