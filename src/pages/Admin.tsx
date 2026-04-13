import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { useToast } from "@/hooks/use-toast";
import { Loader2, LogOut, Plus, Image as ImageIcon, Trash2, Video } from "lucide-react";
import SEO from "@/components/SEO";

// Custom Admin Sub-components
import PortfolioManager from "@/components/admin/PortfolioManager";
import ServicesManager from "@/components/admin/ServicesManager";

export default function Admin() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState<"portfolio" | "services">("portfolio");

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for changes on auth state
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast({ title: "Login Failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Logged in successfully" });
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({ title: "Logged out" });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center text-white">
        <Loader2 className="w-8 h-8 animate-spin text-cyan" />
      </div>
    );
  }

  // LOGIN SCREEN
  if (!user) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center p-4">
        <SEO title="Admin Login — Paras Graphics" description="Secure admin access." />
        <div className="bg-card w-full max-w-md p-8 rounded-2xl shadow-xl border border-border">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-heading font-bold text-foreground">Admin Portal</h1>
            <p className="text-muted-foreground text-sm mt-2">Sign in to manage your site content</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground block mb-1">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-background border border-input rounded-lg px-4 py-2 text-foreground focus:ring-2 focus:ring-cyan focus:border-transparent outline-none"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-background border border-input rounded-lg px-4 py-2 text-foreground focus:ring-2 focus:ring-cyan focus:border-transparent outline-none"
                required
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-cyan text-navy font-semibold rounded-lg px-4 py-3 hover:bg-cyan/90 transition-colors mt-6"
            >
              Sign In
            </button>
            <p className="text-xs text-center text-muted-foreground mt-4">
              If you don't have an account, create a User inside your Supabase Dashboard under Authentication.
            </p>
          </form>
        </div>
      </div>
    );
  }

  // DASHBOARD SCREEN
  return (
    <div className="min-h-screen bg-background">
      <SEO title="Admin Dashboard — Paras Graphics" description="Manage site content." />
      
      {/* Admin Navbar */}
      <nav className="bg-card border-b border-border sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <span className="font-heading font-bold text-lg text-foreground tracking-tight">PG <span className="text-cyan">Admin</span></span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground hidden sm:block">{user.email}</span>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 text-sm text-destructive hover:text-destructive/80 font-medium transition-colors"
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Tabs */}
        <div className="flex space-x-1 bg-muted p-1 rounded-xl w-fit mb-8 border border-border">
          <button
            onClick={() => setActiveTab("portfolio")}
            className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === "portfolio" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Portfolio Manager
          </button>
          <button
            onClick={() => setActiveTab("services")}
            className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === "services" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Services Manager
          </button>
        </div>

        {/* Dynamic Managers */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm min-h-[500px]">
          {activeTab === "portfolio" ? <PortfolioManager /> : <ServicesManager />}
        </div>
          
      </main>
    </div>
  );
}
