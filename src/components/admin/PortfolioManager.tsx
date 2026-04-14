import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Plus, Loader2, Video, Image as ImageIcon } from "lucide-react";

type PortfolioItem = {
  id: string;
  title: string;
  category: string;
  media_url: string;
  is_video: boolean;
};

export default function PortfolioManager() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  
  // Form State
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Business Cards");
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();

  const fetchPortfolio = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.auth.getSession();
    if (!data.session) {
      setLoading(false);
      return;
    }

    const { data: dbData, error: dbError } = await supabase
      .from("portfolio")
      .select("*")
      .order("created_at", { ascending: false });

    if (dbError) {
      toast({ title: "Error fetching", description: dbError.message, variant: "destructive" });
    } else {
      setItems(dbData || []);
    }
    setLoading(false);
  }, [toast]);

  useEffect(() => {
    fetchPortfolio();
  }, [fetchPortfolio]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast({ title: "Please select a file", variant: "destructive" });
      return;
    }
    setAdding(true);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `public/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('portfolio-media')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: publicUrlData } = supabase.storage
        .from('portfolio-media')
        .getPublicUrl(filePath);

      const isVideo = file.type.startsWith("video/");

      const { error: insertError } = await supabase
        .from("portfolio")
        .insert([{
          title,
          category,
          media_url: publicUrlData.publicUrl,
          is_video: isVideo
        }]);

      if (insertError) throw insertError;

      toast({ title: "Item added successfully" });
      setTitle("");
      setFile(null);
      fetchPortfolio();
    } catch (err: unknown) {
      toast({ title: "Failed to add", description: (err as Error).message, variant: "destructive" });
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async (id: string, url: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    
    try {
      // 1. Extract path from URL to delete from storage
      const pathMatch = url.match(/\/portfolio-media\/(public\/.*)$/);
      if (pathMatch && pathMatch[1]) {
        await supabase.storage.from('portfolio-media').remove([pathMatch[1]]);
      }

      // 2. Delete DB row
      const { error } = await supabase.from("portfolio").delete().eq("id", id);
      if (error) throw error;

      toast({ title: "Item deleted" });
      fetchPortfolio();
    } catch (err: unknown) {
      toast({ title: "Failed to delete", description: (err as Error).message, variant: "destructive" });
    }
  };

  return (
    <div className="space-y-8">
      {/* ADD NEW FORM */}
      <div className="bg-muted/30 p-6 rounded-xl border border-border">
        <h3 className="font-heading font-semibold text-lg mb-4 flex items-center gap-2"><Plus size={18}/> Add New Portfolio Item</h3>
        <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div className="space-y-1">
            <label className="text-sm font-medium text-muted-foreground">Title</label>
            <input 
              required value={title} onChange={e => setTitle(e.target.value)}
              className="w-full bg-background border border-input rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-cyan" 
              placeholder="e.g. Premium Flyers"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-muted-foreground">Category</label>
            <select 
              value={category} onChange={e => setCategory(e.target.value)}
              className="w-full bg-background border border-input rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-cyan"
            >
              <option>Business Cards</option>
              <option>Banners</option>
              <option>Stickers</option>
              <option>Apparel</option>
              <option>Brochures</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-muted-foreground">Image/Video File</label>
            <input 
              required type="file" accept="image/*,video/mp4,video/webm"
              onChange={e => setFile(e.target.files?.[0] || null)}
              className="w-full bg-background border border-input rounded-lg px-3 py-1.5 file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan/10 file:text-cyan hover:file:bg-cyan/20 cursor-pointer"
            />
          </div>
          <button 
            type="submit" disabled={adding}
            className="w-full bg-cyan text-navy font-semibold px-4 py-2 rounded-lg hover:bg-cyan/90 transition disabled:opacity-50 h-[42px] flex items-center justify-center gap-2"
          >
            {adding ? <Loader2 className="w-5 h-5 animate-spin" /> : "Upload Item"}
          </button>
        </form>
      </div>

      {/* LIST */}
      <div>
        <h3 className="font-heading font-semibold text-lg mb-4">Current Items ({items.length})</h3>
        {loading ? (
          <div className="flex justify-center p-8"><Loader2 className="w-6 h-6 animate-spin text-muted-foreground" /></div>
        ) : items.length === 0 ? (
          <p className="text-muted-foreground text-sm text-center p-8 bg-muted/10 rounded-xl border border-dashed border-border">No items uploaded yet. Start by adding one above.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {items.map(item => (
              <div key={item.id} className="relative group bg-muted/5 rounded-xl border border-border overflow-hidden">
                <div className="aspect-square bg-black">
                  {item.is_video ? (
                    <video src={item.media_url} className="w-full h-full object-cover" autoPlay muted loop />
                  ) : (
                    <img src={item.media_url} className="w-full h-full object-cover" alt={item.title} />
                  )}
                </div>
                <div className="p-3">
                  <div className="flex items-center gap-1.5 mb-1">
                    {item.is_video ? <Video size={12} className="text-magenta"/> : <ImageIcon size={12} className="text-cyan"/>}
                    <span className="text-xs text-muted-foreground uppercase">{item.category}</span>
                  </div>
                  <h4 className="font-semibold text-sm truncate pr-8">{item.title}</h4>
                </div>
                
                <button 
                  onClick={() => handleDelete(item.id, item.media_url)}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-destructive/90 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive shadow-lg"
                  title="Delete Item"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
