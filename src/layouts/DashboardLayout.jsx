import { Link, Outlet, useLocation, useNavigate, Navigate } from "react-router-dom";
import { 
  Building2, 
  LayoutDashboard, 
  ShieldCheck, 
  Wallet, 
  LineChart, 
  AlertTriangle, 
  Users, 
  ShieldAlert,
  LogOut,
  Sun,
  Moon,
  Menu,
  Bell,
  CheckCircle2,
  CloudRain,
  PlayCircle,
  BookOpen
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../utils/cn";
import { useToast } from "../components/ui/Toast";
import { useAppContext } from "../context/AppContext";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/Avatar";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";

const SIDEBAR_ITEMS = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, role: "user" },
  { name: "How It Works", href: "/dashboard/how-it-works", icon: BookOpen, role: "user" },
  { name: "Policy Management", href: "/dashboard/policy", icon: ShieldCheck, role: "user" },
  { name: "Auto Claims", href: "/dashboard/claims", icon: Wallet, role: "user" },
  { name: "Disruptions", href: "/dashboard/disruptions", icon: AlertTriangle, role: "user" },
  { name: "Analytics", href: "/dashboard/analytics", icon: LineChart, role: "admin" },
  { name: "Admin Panel", href: "/dashboard/admin", icon: Users, role: "admin" },
  { name: "Fraud Detection", href: "/dashboard/fraud", icon: ShieldAlert, role: "admin" },
];

export function DashboardLayout() {
  const { user, sidebarOpen, setSidebarOpen, theme, toggleTheme, logoutUser } = useAppContext();
  const location = useLocation();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Policy Activated", desc: "Your standard coverage is now live.", time: "1h ago", read: false },
    { id: 2, title: "AQI Warning", desc: "Delhi NCR AQI over 350. Drive safe.", time: "3h ago", read: false }
  ]);

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  const simulateEvent = () => {
    addToast({ title: "Simulated Weather Trigger", description: "Heavy Rainfall Detected. Smart contract initiated. ₹850 payouts processing...", variant: "destructive" });
    const newNotif = { id: Date.now(), title: "Payout Disbursed (₹850)", desc: "Instant automated claim paid due to Rain > 50mm.", time: "Just now", read: false };
    setNotifications(prev => [newNotif, ...prev]);
  };

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  // If the user hasn't set up their plan, push them to onboarding
  if (!user.hasActivePlan && location.pathname !== "/onboarding") {
    return <Navigate to="/onboarding" replace />;
  }

  const navItems = SIDEBAR_ITEMS.filter(item => item.role === user.role || user.role === "admin");

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 border-r bg-card shadow-sm transition-transform duration-300 md:relative md:translate-x-0",
          !sidebarOpen && "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center px-6 border-b">
          <Building2 className="mr-2 h-6 w-6 text-primary" />
          <span className="font-bold text-lg tracking-tight">GigGuard AI</span>
        </div>
        <nav className="flex-1 space-y-1 p-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className={cn("mr-3 h-5 w-5", isActive ? "text-primary-foreground" : "text-muted-foreground")} />
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="absolute bottom-4 left-4 right-4">
          <Button variant="outline" className="w-full justify-start text-muted-foreground" onClick={handleLogout}>
            <LogOut className="mr-2 h-5 w-5" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Navbar */}
        <header className="flex h-16 items-center justify-between border-b bg-card px-4 sm:px-6">
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
          <div className="flex flex-1 justify-end items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            
            <Badge variant="outline" className="hidden md:flex border-success/30 bg-success/10 text-success items-center mr-2">
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
              </span>
              AI Oracle Active
            </Badge>

            <Button variant="outline" size="sm" onClick={simulateEvent} className="hidden sm:flex border-warning text-warning hover:bg-warning hover:text-warning-foreground">
              <PlayCircle className="mr-2 h-4 w-4" /> Demo Auto Claim
            </Button>

            <div className="relative">
              <Button variant="ghost" size="icon" onClick={() => setShowNotifications(!showNotifications)} className="relative">
                <Bell className="h-5 w-5" />
                {notifications.some(n => !n.read) && (
                  <span className="absolute top-1 right-2 h-2 w-2 rounded-full bg-destructive animate-pulse" />
                )}
              </Button>

              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-80 rounded-md border bg-card text-card-foreground shadow-lg z-50 p-4"
                  >
                    <div className="flex justify-between items-center mb-4">
                       <h3 className="font-semibold text-sm">Notifications</h3>
                       <button onClick={() => setNotifications(notifications.map(n => ({...n, read: true})))} className="text-xs text-primary hover:underline">Mark all read</button>
                    </div>
                    <div className="space-y-3 max-h-[300px] overflow-auto pr-1">
                      {notifications.length === 0 ? (
                         <div className="text-center text-sm text-muted-foreground py-4">No new notifications</div>
                      ) : (
                         notifications.map(n => (
                           <div key={n.id} className={`flex items-start p-2 rounded-md ${n.read ? "opacity-60" : "bg-primary/5"}`}>
                             <div className="mt-1 mr-3 rounded-full bg-primary/20 p-1">
                                {n.title.includes("Payout") ? <CheckCircle2 className="h-4 w-4 text-success" /> : <CloudRain className="h-4 w-4 text-primary" />}
                             </div>
                             <div>
                                <h4 className="text-sm font-medium leading-none">{n.title}</h4>
                                <p className="text-xs text-muted-foreground mt-1">{n.desc}</p>
                                <span className="text-[10px] text-muted-foreground mt-2 block">{n.time}</span>
                             </div>
                           </div>
                         ))
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex items-center space-x-2 border-l pl-4 border-border">
              <Avatar>
                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="hidden text-sm sm:block">
                <p className="font-medium text-foreground">{user.name}</p>
                <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-background p-4 sm:p-6 md:p-8">
          <Outlet />
        </main>
      </div>
      
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
