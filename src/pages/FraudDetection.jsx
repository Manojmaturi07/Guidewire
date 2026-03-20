import { useState, useEffect } from "react";
import { ShieldAlert, AlertOctagon, HelpCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Skeleton } from "../components/ui/Skeleton";
import { api } from "../services/api";

export function FraudDetection() {
  const [flagged, setFlagged] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const flags = await api.getFlaggedClaims();
      setFlagged(flags);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-destructive">Fraud Investigation</h1>
        <p className="text-muted-foreground">AI-flagged claims needing manual underwriter review.</p>
      </div>

      <Card className="border-destructive/30 bg-destructive/5">
        <CardHeader>
           <CardTitle className="text-destructive flex items-center space-x-2">
             <AlertOctagon className="h-5 w-5" />
             <span>Suspicious Claims Queue</span>
           </CardTitle>
           <CardDescription>Claims paused due to confidence score below 80%</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
             <div className="space-y-4">
                {[1,2].map(i => <Skeleton key={i} className="h-24 w-full" />)}
             </div>
          ) : flagged.length > 0 ? (
             <div className="space-y-4">
                {flagged.map((claim) => (
                   <div key={claim.id} className="relative rounded-lg border bg-card p-5">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                           <div className="flex items-center space-x-2 mb-1">
                             <h3 className="font-bold">{claim.id} - {claim.user}</h3>
                             <Badge variant="destructive">Score: {claim.riskScore}/100</Badge>
                           </div>
                           <p className="text-sm font-medium text-destructive mb-1">Trigger: {claim.reason}</p>
                           <p className="text-xs text-muted-foreground">Amount: {claim.amount}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                           <Button variant="outline" className="border-success text-success hover:bg-success hover:text-success-foreground">Approve</Button>
                           <Button variant="destructive">Deny & Ban</Button>
                        </div>
                      </div>
                      <div className="absolute top-2 right-2 text-muted-foreground opacity-50">
                         <HelpCircle className="h-5 w-5" />
                      </div>
                   </div>
                ))}
             </div>
          ) : (
            <div className="text-center py-6 text-muted-foreground">No flagged claims currently. System operating optimally.</div>
          )}
        </CardContent>
      </Card>
      
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
           <CardHeader>
              <CardTitle>AI Fraud Model Parameters</CardTitle>
           </CardHeader>
           <CardContent className="space-y-2 text-sm">
             <div className="flex justify-between border-b pb-1"><span className="text-muted-foreground">Location Spoofing</span> <span className="text-success font-semibold">Active</span></div>
             <div className="flex justify-between border-b pb-1"><span className="text-muted-foreground">Velocity Checks (Multiple Claims)</span> <span className="text-success font-semibold">Active</span></div>
             <div className="flex justify-between pb-1"><span className="text-muted-foreground">Sensor API validation</span> <span className="text-success font-semibold">Active</span></div>
           </CardContent>
        </Card>
      </div>
    </div>
  );
}
