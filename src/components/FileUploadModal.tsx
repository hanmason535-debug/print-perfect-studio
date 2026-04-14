import { useState, useRef, useCallback, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Upload, X, FileText, Image, CheckCircle2, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/lib/supabase";

const MAX_FILES = 5;
const MAX_SIZE = 15 * 1024 * 1024;
const ACCEPT = ".pdf,.jpg,.jpeg,.png";
const ACCEPT_TYPES = ["application/pdf", "image/jpeg", "image/png"];
const COOLDOWN_MS = 60 * 60 * 1000; // 1 hour

const schema = z.object({
  phone: z
    .string()
    .min(10, "Phone number is required")
    .refine((v) => /^(?:\+91|91|0)?[6-9]\d{9}$/.test(v), "Enter a valid 10-digit Indian mobile number"),
});

type FormData = z.infer<typeof schema>;

interface UploadFile {
  file: File;
  id: string;
  status: "pending" | "success" | "error";
}

interface FileUploadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const FileUploadModal = ({ open, onOpenChange }: FileUploadModalProps) => {
  const { toast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [sent, setSent] = useState(false);
  const [lastPhone, setLastPhone] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  
  // Rate Limit / Timer State
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    const checkCooldown = () => {
      const last = localStorage.getItem("pp_last_upload");
      if (last) {
        const diff = Date.now() - parseInt(last);
        if (diff < COOLDOWN_MS) {
          setTimeLeft(COOLDOWN_MS - diff);
        } else {
          setTimeLeft(0);
        }
      }
    };

    checkCooldown();
    const interval = setInterval(checkCooldown, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTimeLeft = (ms: number) => {
    const mins = Math.floor(ms / 60000);
    const secs = Math.floor((ms % 60000) / 1000);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ 
    resolver: zodResolver(schema),
    defaultValues: {
      phone: localStorage.getItem("pp_customer_phone") || ""
    }
  });

  const addFiles = useCallback(
    (incoming: FileList | File[]) => {
      const arr = Array.from(incoming);
      const valid: UploadFile[] = [];
      for (const file of arr) {
        if (files.length + valid.length >= MAX_FILES) {
          toast({ title: `Maximum ${MAX_FILES} files allowed`, variant: "destructive" });
          break;
        }
        if (!ACCEPT_TYPES.includes(file.type)) {
          toast({ title: `${file.name} — unsupported format`, variant: "destructive" });
          continue;
        }
        if (file.size > MAX_SIZE) {
          toast({ title: `${file.name} exceeds 15MB limit`, variant: "destructive" });
          continue;
        }
        valid.push({ file, id: crypto.randomUUID(), status: "pending" });
      }
      setFiles((prev) => [...prev, ...valid]);
    },
    [files.length, toast]
  );

  const removeFile = (id: string) => setFiles((f) => f.filter((x) => x.id !== id));

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      addFiles(e.dataTransfer.files);
    },
    [addFiles]
  );

  const onSubmit = async (data: FormData) => {
    if (files.length === 0) {
      toast({ title: "Please add at least one file", variant: "destructive" });
      return;
    }
    setUploading(true);
    setProgress(0);

    try {
      const uploadedNames: string[] = [];
      let completedCount = 0;

      // Upload each file
      for (const f of files) {
        const fileExt = (f.file.name.split('.').pop() ?? "").toLowerCase().replace(/[^a-z0-9]/g, "");
        // create cryptographically random filename to prevent collisions and path traversal
        const uniqueName = `upload_${crypto.randomUUID()}.${fileExt}`;
        const filePath = `public/${uniqueName}`;

        const { error: uploadError } = await supabase.storage
          .from('client-uploads')
          .upload(filePath, f.file);

        if (uploadError) throw uploadError;

        // Save original name for email rendering mapping
        uploadedNames.push(f.file.name);
        
        // Update local progress visually
        completedCount++;
        setProgress(Math.round((completedCount / files.length) * 100));
        
        // Mark file UI as success
        setFiles(prev => prev.map(x => x.id === f.id ? { ...x, status: "success" } : x));
      }

      // Record in DB (This triggers the Resend Email via DB Webhook!)
      const { error: dbError } = await supabase
        .from('client_uploads')
        .insert([{
          phone: data.phone || null,
          file_names: uploadedNames
        }]);

      if (dbError) throw dbError;

      // Set cooldown in localStorage
      localStorage.setItem("pp_last_upload", Date.now().toString());
      localStorage.setItem("pp_customer_phone", data.phone);
      
      setLastPhone(data.phone);
      setUploadedFiles(uploadedNames);
      setUploading(false);
      setSent(true);
      toast({ title: "Files uploaded securely!" });

    } catch (err: unknown) {
      setUploading(false);
      toast({ title: "Upload Failed", description: (err as Error).message, variant: "destructive" });
      setFiles(prev => prev.map(x => x.status === "pending" ? { ...x, status: "error" } : x));
    }
  };

  const handleWhatsAppConfirm = () => {
    const msg = encodeURIComponent(`Hi PrintPerfect! I just uploaded ${uploadedFiles.length} files (${uploadedFiles.slice(0,2).join(", ")}${uploadedFiles.length > 2 ? "..." : ""}) for printing. My phone number is ${lastPhone}. Please process my order.`);
    window.open(`https://wa.me/919377476343?text=${msg}`, "_blank", "noopener,noreferrer");
    handleClose(false);
  };

  const handleClose = (v: boolean) => {
    if (!v) {
      setFiles([]);
      setSent(false);
      setProgress(0);
      setUploading(false);
      reset();
    }
    onOpenChange(v);
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-heading">Upload Your Files</DialogTitle>
        </DialogHeader>

        {sent ? (
          <div className="flex flex-col items-center py-10 gap-4 text-center">
            <div className="w-16 h-16 rounded-full bg-whatsapp/10 flex items-center justify-center mb-2">
              <CheckCircle2 size={40} className="text-whatsapp" />
            </div>
            <h3 className="font-heading font-semibold text-xl">Upload Successful!</h3>
            <p className="text-muted-foreground text-sm max-w-[280px]">
              Files are saved. Now, please **Confirm on WhatsApp** to verify your number and process your order.
            </p>
            <button
              onClick={handleWhatsAppConfirm}
              className="mt-4 px-8 py-3 rounded-full bg-whatsapp text-white font-bold flex items-center gap-2 hover:brightness-110 transition-all shadow-lg shadow-whatsapp/20 scale-105 active:scale-100"
            >
              Confirm on WhatsApp
            </button>
            <button
              onClick={() => handleClose(false)}
              className="mt-1 text-muted-foreground hover:text-foreground text-xs font-medium transition-colors border-b border-transparent hover:border-muted-foreground pb-0.5"
            >
              Skip and Close
            </button>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-2">Required for order verification</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Dropzone */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              onClick={() => inputRef.current?.click()}
              className={`border-2 rounded-xl p-8 text-center cursor-pointer transition-all ${
                dragging
                  ? "border-solid border-cyan bg-cyan/5"
                  : "border-dashed border-border hover:border-cyan/50"
              }`}
            >
              <Upload size={32} className="mx-auto text-muted-foreground mb-3" />
              <p className="text-sm font-medium text-foreground">
                Drag & drop files here, or <span className="text-cyan">browse</span>
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                PDF, JPEG, PNG · Max {MAX_FILES} files, 15MB each
              </p>
              <input
                ref={inputRef}
                type="file"
                accept={ACCEPT}
                multiple
                className="hidden"
                onChange={(e) => e.target.files && addFiles(e.target.files)}
              />
            </div>

            {/* File list */}
            {files.length > 0 && (
              <div className="space-y-2">
                {files.map((f) => (
                  <div
                    key={f.id}
                    className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border"
                  >
                    {f.file.type === "application/pdf" ? (
                      <FileText size={20} className="text-destructive flex-shrink-0" />
                    ) : (
                      <Image size={20} className="text-cyan flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{f.file.name}</p>
                      <p className="text-xs text-muted-foreground">{formatSize(f.file.size)}</p>
                    </div>
                    {f.status === "success" ? (
                      <CheckCircle2 size={18} className="text-whatsapp flex-shrink-0" />
                    ) : f.status === "error" ? (
                      <AlertCircle size={18} className="text-destructive flex-shrink-0" />
                    ) : (
                      <button
                        type="button"
                        onClick={() => removeFile(f.id)}
                        className="text-muted-foreground hover:text-destructive transition-colors flex-shrink-0"
                      >
                        <X size={18} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Upload progress */}
            {uploading && (
              <div className="space-y-2">
                <Progress value={progress} className="h-2" />
                <p className="text-xs text-muted-foreground text-center">Uploading… {progress}%</p>
              </div>
            )}

            {/* Phone */}
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">
                Your WhatsApp Number
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm border-r border-border pr-2">+91</span>
                <input
                  type="tel"
                  {...register("phone")}
                  className="w-full pl-14 pr-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-cyan/50"
                  placeholder="XXXXXXXXXX"
                  maxLength={10}
                />
              </div>
              {errors.phone && (
                <p className="text-xs text-destructive mt-1">{errors.phone.message}</p>
              )}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={files.length === 0 || uploading || timeLeft > 0}
                className="w-full px-6 py-3 rounded-full bg-gradient-to-r from-cyan to-primary text-primary-foreground font-bold text-sm hover:shadow-cyan-glow transition-all active:scale-95 disabled:opacity-50 disabled:grayscale relative overflow-hidden"
              >
                {uploading ? (
                  "Uploading..."
                ) : timeLeft > 0 ? (
                  <span className="flex items-center justify-center gap-2">
                    Wait {formatTimeLeft(timeLeft)} to upload again
                  </span>
                ) : (
                  "Send Files & Request Quote"
                )}
              </button>
              {timeLeft > 0 && (
                <p className="text-[10px] text-center text-muted-foreground mt-2 uppercase tracking-tight">Rate limited: 1 upload per hour per device</p>
              )}
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default FileUploadModal;
