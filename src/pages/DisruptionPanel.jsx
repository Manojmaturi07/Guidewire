import { useState, useEffect } from "react";
import { CloudRain, Wind, AlertTriangle, Search } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Skeleton } from "../components/ui/Skeleton";
import { api } from "../services/api";
import { MapContainer, TileLayer, Circle, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export function DisruptionPanel() {
  const [disruptions, setDisruptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await api.getDisruptions();
      setDisruptions(data);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Real-Time Disruptions</h1>
          <p className="text-muted-foreground">Live tracking of environmental and civic factors.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {loading ? (
          [1,2,3].map(i => <Skeleton key={i} className="h-32 w-full" />)
        ) : (
          disruptions.map(d => (
            <Card key={d.id} className={d.severity === "critical" ? "border-destructive border-2" : d.severity === "warning" ? "border-warning border-2" : ""}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  {d.type === "weather" ? <CloudRain className="h-5 w-5 text-primary" /> : 
                   d.type === "aqi" ? <Wind className="h-5 w-5 text-warning" /> : 
                   <AlertTriangle className="h-5 w-5 text-destructive" />}
                  <Badge variant={d.severity === "critical" ? "destructive" : d.severity === "warning" ? "warning" : "default"}>
                    {d.severity.toUpperCase()}
                  </Badge>
                </div>
                <CardTitle className="text-lg mt-2">{d.title}</CardTitle>
                <CardDescription>{d.location}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-medium text-muted-foreground mb-1">Trigger Active</p>
                <p className="text-xs">{d.time} — Claims process automatically initiated against standard parameters.</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Disruption Map Simulation</CardTitle>
          <CardDescription>Live map showing active parameter thresholds.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full h-[400px] rounded-lg relative overflow-hidden z-0 border border-border">
            <MapContainer 
              center={[20.5937, 78.9629]} 
              zoom={4} 
              scrollWheelZoom={false} 
              style={{ height: '100%', width: '100%', zIndex: 0 }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
              />
              
              {/* Delhi NCR - AQI Warning Zone */}
              <Circle 
                center={[28.6139, 77.2090]} 
                pathOptions={{ color: 'hsl(var(--warning))', fillColor: 'hsl(var(--warning))', fillOpacity: 0.4 }} 
                radius={50000}
              >
                <Popup>
                  <strong>Severe AQI 350+</strong><br/>Location: Delhi NCR<br/>Trigger: Claims Validation Initiated
                </Popup>
              </Circle>

              {/* Bangalore - Rain Critical Zone */}
              <Circle 
                center={[12.9716, 77.5946]} 
                pathOptions={{ color: 'hsl(var(--destructive))', fillColor: 'hsl(var(--destructive))', fillOpacity: 0.4 }} 
                radius={30000}
              >
                <Popup>
                  <strong>Heavy Rain Alert</strong><br/>Location: Koramangala<br/>Trigger: 100mm/hr Rainfall
                </Popup>
              </Circle>

              {/* Mumbai - Curfew Zone */}
              <Circle 
                center={[19.0760, 72.8777]} 
                pathOptions={{ color: 'hsl(var(--primary))', fillColor: 'hsl(var(--primary))', fillOpacity: 0.3 }} 
                radius={25000}
              >
                <Popup>
                  <strong>Section 144 Imposed</strong><br/>Location: Central Zone<br/>Trigger: Government Civic Alert
                </Popup>
              </Circle>
            </MapContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
