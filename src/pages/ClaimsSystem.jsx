import { useState, useEffect } from "react";
import { FileText, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Skeleton } from "../components/ui/Skeleton";
import { api } from "../services/api";

export function ClaimsSystem() {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await api.getRecentClaims();
      setClaims(data);
      setLoading(false);
    }
    load();
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case "Paid": return <CheckCircle2 className="h-5 w-5 text-success" />;
      case "Processing": return <Clock className="h-5 w-5 text-warning" />;
      case "Approved": return <CheckCircle2 className="h-5 w-5 text-primary" />;
      default: return <AlertCircle className="h-5 w-5 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Auto Claim System</h1>
        <p className="text-muted-foreground">Track your automated parametric triggers and payouts.</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <span>Claim History</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                 {[1,2,3].map(i => <Skeleton key={i} className="h-20 w-full" />)}
              </div>
            ) : claims.length > 0 ? (
              <div className="space-y-4">
                {claims.map((claim) => (
                  <div key={claim.id} className="relative rounded-lg border p-4 sm:p-6 overflow-hidden">
                    {/* Stepper logic visualization */}
                    <div className="absolute top-0 right-0 p-4">
                       <span className="font-bold text-lg">{claim.amount}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 mb-4">
                      <div className="bg-secondary/50 rounded-md p-3 flex flex-col justify-center items-center h-16 w-16">
                         {getStatusIcon(claim.status)}
                      </div>
                      <div>
                        <h3 className="font-semibold flex items-center gap-2">
                          {claim.type} Trigger 
                          <Badge variant={claim.status === "Paid" ? "success" : claim.status === "Processing" ? "warning" : "default"}>
                            {claim.status}
                          </Badge>
                        </h3>
                        <p className="text-sm text-muted-foreground">Claim ID: {claim.id} • {claim.date}</p>
                      </div>
                    </div>
                    
                    {/* Timeline Tracker */}
                    <div className="relative mt-6 ms-2">
                      <div className="absolute top-3 left-3 w-[calc(100%-24px)] border-t-2 border-dashed border-border -z-10" />
                      <div className="flex justify-between relative z-10 w-full">
                        <div className="flex flex-col items-center">
                          <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                            <CheckCircle2 className="h-4 w-4" />
                          </div>
                          <span className="text-xs mt-2 font-medium">Event Detected</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className={`h-6 w-6 rounded-full flex items-center justify-center ${claim.status !== "Processing" ? "bg-primary text-primary-foreground" : "bg-warning text-warning-foreground"}`}>
                             {claim.status !== "Processing" ? <CheckCircle2 className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                          </div>
                          <span className="text-xs mt-2 font-medium">Validating</span>
                        </div>
                        <div className="flex flex-col items-center">
                           <div className={`h-6 w-6 rounded-full flex items-center justify-center ${claim.status === "Paid" ? "bg-success text-success-foreground" : "bg-secondary text-muted-foreground"}`}>
                             {claim.status === "Paid" && <CheckCircle2 className="h-4 w-4" />}
                          </div>
                          <span className="text-xs mt-2 font-medium text-center">Payout Disbursed</span>
                        </div>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            ) : (
               <div className="text-center py-10 text-muted-foreground">No claims history found.</div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
