import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Plus, Loader2, Image as ImageIcon } from "lucide-react";

type ServiceItem = {
  id: string;
  title: string;
  description: string;
  media_url: string;
};

export default function ServicesManager() {
  const [items, setItems] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  
  // Form State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();

  const fetchServices = useCallback(async () => {
    if (!supabase) { setLoading(false); return; }
    setLoading(true);
    const { data: dbData, error: dbError } = await supabase
      .from("services")
      .select("*")
      .order("created_at", { ascending: true });

    if (dbError) {
      toast({ title: "Error fetching", description: dbError.message, variant: "destructive" });
    } else {
      setItems(dbData || []);
    }
    setLoading(false);
  }, [toast]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const ALLOWED_SERVICE_TYPES = ["image/jpeg", "image/png", "image/webp"];
  const ALLOWED_SERVICE_EXTENSIONS = ["jpg", "jpeg", "png", "webp"];

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast({ title: "Please select an image", variant: "destructive" });
      return;
    }
    if (!ALLOWED_SERVICE_TYPES.includes(file.type)) {
      toast({ title: "Unsupported file type", description: "Please upload a JPEG, PNG, or WebP image.", variant: "destructive" });
      return;
    }
    const rawExt = (file.name.split('.').pop() ?? "").toLowerCase().replace(/[^a-z0-9]/g, "");
    if (!ALLOWED_SERVICE_EXTENSIONS.includes(rawExt)) {
      toast({ title: "Unsupported file extension", variant: "destructive" });
      return;
    }
    setAdding(true);

    try {
      const fileExt = rawExt;
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      const filePath = `public/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('services-media')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: publicUrlData } = supabase.storage
        .from('services-media')
        .getPublicUrl(filePath);

      const { error: insertError } = await supabase
        .from("services")
        .insert([{
          title,
          description,
          media_url: publicUrlData.publicUrl
        }]);

      if (insertError) throw insertError;

      toast({ title: "Service added successfully" });
      setTitle("");
      setDescription("");
      setFile(null);
      fetchServices();
    } catch (err: unknown) {
      toast({ title: "Failed to add", description: (err as Error).message, variant: "destructive" });
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async (id: string, url: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    
    try {
      // Extract path to delete image
      const pathMatch = url.match(/\/services-media\/(public\/.*)$/);
      if (pathMatch && pathMatch[1]) {
        await supabase.storage.from('services-media').remove([pathMatch[1]]);
      }

      const { error } = await supabase.from("services").delete().eq("id", id);
      if (error) throw error;

      toast({ title: "Service deleted" });
      fetchServices();
    } catch (err: unknown) {
      toast({ title: "Failed to delete", description: (err as Error).message, variant: "destructive" });
    }
  };

  return (
    <div className="space-y-8">
      {/* ADD NEW FORM */}
      <div className="bg-muted/30 p-6 rounded-xl border border-border">
        <h3 className="font-heading font-semibold text-lg mb-4 flex items-center gap-2"><Plus size={18}/> Add New Service</h3>
        <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
          <div className="space-y-1">
            <label className="text-sm font-medium text-muted-foreground">Title</label>
            <input 
              required value={title} onChange={e => setTitle(e.target.value)}
              className="w-full bg-background border border-input rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-cyan" 
              placeholder="e.g. Letterheads"
            />
          </div>
          <div className="space-y-1 md:col-span-2">
            <label className="text-sm font-medium text-muted-foreground">Short Description</label>
            <textarea 
              required value={description} onChange={e => setDescription(e.target.value)} rows={1}
              className="w-full bg-background border border-input rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-cyan resize-none" 
              placeholder="Premium quality stationery for your brand..."
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-muted-foreground">Image</label>
            <input 
              required type="file" accept="image/*"
              onChange={e => setFile(e.target.files?.[0] || null)}
              className="w-full bg-background border border-input rounded-lg px-3 py-1.5 file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan/10 file:text-cyan hover:file:bg-cyan/20 cursor-pointer"
            />
          </div>
          <div className="md:col-span-4 flex justify-end mt-2">
            <button 
              type="submit" disabled={adding}
              className="bg-cyan text-navy font-semibold px-6 py-2 rounded-lg hover:bg-cyan/90 transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {adding ? <Loader2 className="w-5 h-5 animate-spin" /> : "Publish Service"}
            </button>
          </div>
        </form>
      </div>

      {/* LIST */}
      <div>
        <h3 className="font-heading font-semibold text-lg mb-4">Current Services ({items.length})</h3>
        {loading ? (
          <div className="flex justify-center p-8"><Loader2 className="w-6 h-6 animate-spin text-muted-foreground" /></div>
        ) : items.length === 0 ? (
          <p className="text-muted-foreground text-sm text-center p-8 bg-muted/10 rounded-xl border border-dashed border-border">No services added yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map(item => (
              <div key={item.id} className="group bg-card rounded-xl border border-border flex flex-col relative overflow-hidden">
                <div className="h-40 bg-muted/20 relative">
                  <img src={item.media_url} className="w-full h-full object-cover" alt={item.title} />
                </div>
                <div className="p-4 flex-1">
                  <h4 className="font-heading font-bold text-foreground mb-1">{item.title}</h4>
                  <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                </div>
                
                <button 
                  onClick={() => handleDelete(item.id, item.media_url)}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-destructive/90 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive shadow-lg"
                  title="Delete Service"
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
