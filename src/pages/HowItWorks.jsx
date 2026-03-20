import { motion } from "framer-motion";
import { BookOpen, Zap, ShieldAlert, CloudRain, Cpu, BarChart3, Info, Server, Lock, Globe, Database, ArrowRight, CheckCircle2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";

export function HowItWorks() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
  };

  return (
    <div className="space-y-12 max-w-6xl mx-auto pb-16 px-2 sm:px-6">
      
      {/* 🚀 HERO SECTION */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center space-y-4 pt-8 pb-6"
      >
        <Badge variant="outline" className="px-4 py-1 text-sm bg-primary/10 text-primary border-primary/20 backdrop-blur-md mb-2">
          Technical Deep Dive
        </Badge>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-indigo-500 to-teal-400">
          The Anatomy of GigGuard AI
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
          Gig workers power the modern economy, yet they carry 100% of the civic and environmental risk. We built a proprietary, completely autonomous Parametric Insurance Engine to fix this.
        </p>
      </motion.div>

      <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid gap-8 md:grid-cols-2">
        {/* 🚨 THE CRISIS */}
        <motion.div variants={itemVariants}>
          <Card className="h-full border-destructive/30 bg-gradient-to-br from-destructive/10 to-transparent relative overflow-hidden backdrop-blur-xl transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--destructive)/0.2)]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-destructive/10 rounded-full blur-3xl -mr-10 -mt-10" />
            <CardHeader>
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-3 bg-destructive/20 rounded-xl">
                  <ShieldAlert className="h-7 w-7 text-destructive" />
                </div>
                <CardTitle className="text-2xl font-bold">The Broken Legacy System</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-5 text-[15px] leading-relaxed text-muted-foreground relative z-10">
              <p>
                A delivery rider in Bangalore faces torrential 100mm/hr rains. If they ride, they risk fatal injury. If they stay home, they earn <strong>₹0</strong> for the day and potentially lose their vehicle financing.
              </p>
              <div className="space-y-3 bg-background/50 p-4 rounded-xl border border-destructive/20">
                <h4 className="font-semibold text-foreground flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-destructive"></span> Why legacy insurance fails them:
                </h4>
                <ul className="space-y-2 ml-1">
                  <li className="flex items-start gap-2"><ArrowRight className="h-4 w-4 mt-1 text-destructive flex-shrink-0" /> Requires physical proof of material loss.</li>
                  <li className="flex items-start gap-2"><ArrowRight className="h-4 w-4 mt-1 text-destructive flex-shrink-0" /> Claim investigations take 14 to 30 days.</li>
                  <li className="flex items-start gap-2"><ArrowRight className="h-4 w-4 mt-1 text-destructive flex-shrink-0" /> Only covers hospitalization/accidents, not loss of daily wage due to civic disruption.</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* ⚡ THE SOLUTION */}
        <motion.div variants={itemVariants}>
          <Card className="h-full border-success/30 bg-gradient-to-br from-success/10 to-transparent relative overflow-hidden backdrop-blur-xl transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--success)/0.2)]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-success/10 rounded-full blur-3xl -mr-10 -mt-10" />
            <CardHeader>
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-3 bg-success/20 rounded-xl">
                  <Zap className="h-7 w-7 text-success" />
                </div>
                <CardTitle className="text-2xl font-bold">The Parametric Revolution</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-5 text-[15px] leading-relaxed text-muted-foreground relative z-10">
              <p>
                Parametric insurance completely bypasses human investigation. We do not insure the "loss" itself; we insure the <strong>triggering event</strong> that implicitly causes the loss.
              </p>
              <div className="space-y-3 bg-background/50 p-4 rounded-xl border border-success/20">
                <h4 className="font-semibold text-foreground flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-success"></span> How our smart system solves it:
                </h4>
                <ul className="space-y-2 ml-1">
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 mt-1 text-success flex-shrink-0" /> <strong>Zero Investigation:</strong> We trust APIs, not paperwork.</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 mt-1 text-success flex-shrink-0" /> <strong>Instant Payouts:</strong> Funds hit workers' wallets the moment the API boundary is breached.</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 mt-1 text-success flex-shrink-0" /> <strong>Wage Protection:</strong> Specifically designed to replace their exact daily expected earnings (e.g., ₹850).</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* 🔮 ARCHITECTURE TIMELINE */}
      <motion.div 
        initial={{ opacity: 0 }} 
        whileInView={{ opacity: 1 }} 
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mt-16 pt-8 border-t border-border/50"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">How A Contract Executes</h2>
          <p className="text-muted-foreground mt-3 text-lg">A flawless 4-step pipeline executing in under 300 milliseconds.</p>
        </div>
        
        <div className="relative">
          {/* Vertical connecting line */}
          <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-1 bg-gradient-to-b from-primary/50 via-teal-500/50 to-emerald-500/50 -translate-x-1/2 rounded-full" />

          <div className="space-y-12 relative z-10">
            {/* Step 1 */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="md:w-5/12 text-right order-2 md:order-1 hidden md:block">
                <h3 className="text-xl font-bold text-foreground">1. Policy Tokenization</h3>
                <p className="text-muted-foreground mt-2">
                  When a Gig Worker registers, they are mapped to a distinct geographic polygon (e.g., Koramangala, BLR). Their premium (₹99/wk) is pooled into our liquidity reserves.
                </p>
              </div>
              <div className="w-16 h-16 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center font-bold text-2xl shadow-[0_0_20px_hsl(var(--primary)/0.5)] order-1 md:order-2 shrink-0 z-10">
                1
              </div>
              <div className="md:w-5/12 order-3 md:hidden text-center">
                <h3 className="text-xl font-bold text-foreground">1. Policy Tokenization</h3>
                <p className="text-muted-foreground mt-2">When a Gig Worker registers, they are mapped to a distinct geographic polygon. Their premium is pooled.</p>
              </div>
              <div className="md:w-5/12 order-3 hidden md:block">
                <Card className="border-primary/20 bg-primary/5 p-4"><Lock className="w-8 h-8 text-primary mb-2"/> Smart contracts lock in coverage parameters.</Card>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="md:w-5/12 text-right order-2 hidden md:block">
                <Card className="border-teal-500/20 bg-teal-500/5 p-4 flex flex-col items-end"><Globe className="w-8 h-8 text-teal-500 mb-2"/> Central Pollution Board & IMD live links.</Card>
              </div>
              <div className="w-16 h-16 rounded-2xl bg-teal-500 text-white flex items-center justify-center font-bold text-2xl shadow-[0_0_20px_rgba(20,184,166,0.5)] order-1 md:order-2 shrink-0 z-10">
                2
              </div>
              <div className="md:w-5/12 order-3 md:hidden text-center">
                <h3 className="text-xl font-bold text-foreground">2. Oracle Telemetry</h3>
                <p className="text-muted-foreground mt-2">Live APIs stream weather and civic constraints to our Oracles.</p>
              </div>
              <div className="md:w-5/12 order-3 md:text-left hidden md:block">
                <h3 className="text-xl font-bold text-foreground">2. Oracle Telemetry Monitoring</h3>
                <p className="text-muted-foreground mt-2">
                  Nodes pull 24/7 localized data from the Indian Meteorological Dept (Rain/Heat), CPCB (Air Quality), and civic RSS feeds (Section 144 Curfews).
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="md:w-5/12 text-right order-2 md:order-1 hidden md:block">
                <h3 className="text-xl font-bold text-foreground">3. Automated Threshold Trigger</h3>
                <p className="text-muted-foreground mt-2">
                  If rainfall &gt; 50mm, or AQI &gt; 350 is detected for &gt; 2 hours, the smart contract executes mathematically. No human adjuster can deny or delay the claim.
                </p>
              </div>
              <div className="w-16 h-16 rounded-2xl bg-indigo-500 text-white flex items-center justify-center font-bold text-2xl shadow-[0_0_20px_rgba(99,102,241,0.5)] order-1 md:order-2 shrink-0 z-10">
                3
              </div>
              <div className="md:w-5/12 order-3 md:hidden text-center">
                <h3 className="text-xl font-bold text-foreground">3. Automated Threshold Trigger</h3>
                <p className="text-muted-foreground mt-2">Breaching an API threshold forces mathematically unstoppable smart contract execution.</p>
              </div>
              <div className="md:w-5/12 order-3 hidden md:block">
                <Card className="border-indigo-500/20 bg-indigo-500/5 p-4"><Database className="w-8 h-8 text-indigo-500 mb-2"/> Decentralized verification prevents failure.</Card>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="md:w-5/12 text-right order-2 hidden md:block">
                <Card className="border-emerald-500/20 bg-emerald-500/5 p-4 flex flex-col items-end"><Server className="w-8 h-8 text-emerald-500 mb-2"/> Direct DPI Integration (UPI / NEFT). </Card>
              </div>
              <div className="w-16 h-16 rounded-2xl bg-emerald-500 text-white flex items-center justify-center font-bold text-2xl shadow-[0_0_20px_rgba(16,185,129,0.5)] order-1 md:order-2 shrink-0 z-10">
                4
              </div>
              <div className="md:w-5/12 order-3 md:hidden text-center">
                <h3 className="text-xl font-bold text-foreground">4. Instant Liquidation</h3>
                <p className="text-muted-foreground mt-2">Risk analytics pass DPI systems and disburse funds via UPI immediately.</p>
              </div>
              <div className="md:w-5/12 order-3 md:text-left hidden md:block">
                <h3 className="text-xl font-bold text-foreground">4. Instant Liquidation & UPI Payout</h3>
                <p className="text-muted-foreground mt-2">
                  Funds bypass legacy banks and instantly route through India's Digital Public Infrastructure (UPI), landing directly in the worker's wallet within 2.4 seconds.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 🛡️ DATA SECURITY & FRAUD */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-16 bg-card border border-border/50 rounded-2xl p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        <Server className="w-12 h-12 text-primary mx-auto mb-6 opacity-80" />
        <h2 className="text-3xl font-bold">Uncompromising Fraud Architecture</h2>
        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
          To sustain high payouts, we deploy military-grade behavioral tracking. Even with auto-triggers, we parse:
        </p>
        <div className="grid sm:grid-cols-3 gap-6 mt-10 text-left relative z-10">
          <div className="bg-background/80 backdrop-blur border p-6 rounded-xl shadow-sm">
            <h4 className="font-bold flex items-center gap-2 text-primary"><MapPinIcon /> Geo-Fencing</h4>
            <p className="text-sm text-muted-foreground mt-2">Workers must ping GPS location within the active disruption polygon to receive payout.</p>
          </div>
          <div className="bg-background/80 backdrop-blur border p-6 rounded-xl shadow-sm">
            <h4 className="font-bold flex items-center gap-2 text-primary"><ActivityIcon /> API Consensus</h4>
            <p className="text-sm text-muted-foreground mt-2">No single point of failure. We require 2/3 overlapping Oracle confirmations from distinct APIs.</p>
          </div>
          <div className="bg-background/80 backdrop-blur border p-6 rounded-xl shadow-sm">
            <h4 className="font-bold flex items-center gap-2 text-primary"><UserCheckIcon /> Gig Verification</h4>
            <p className="text-sm text-muted-foreground mt-2">Integration with Swiggy/Zomato APIs to ensure the user is actively "on-shift".</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Inline icons for the grid at the bottom
function MapPinIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
}

function ActivityIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
}

function UserCheckIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg>
}
