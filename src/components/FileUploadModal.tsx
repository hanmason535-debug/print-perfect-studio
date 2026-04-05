import { useState, useRef, useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Upload, X, FileText, Image, CheckCircle2, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Progress } from "@/components/ui/progress";

const MAX_FILES = 5;
const MAX_SIZE = 15 * 1024 * 1024;
const ACCEPT = ".pdf,.jpg,.jpeg,.png";
const ACCEPT_TYPES = ["application/pdf", "image/jpeg", "image/png"];

const schema = z.object({
  phone: z
    .string()
    .optional()
    .refine((v) => !v || /^\+?\d[\d\s-]{6,18}$/.test(v), "Enter a valid phone number"),
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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

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

  const onSubmit = () => {
    if (files.length === 0) {
      toast({ title: "Please add at least one file", variant: "destructive" });
      return;
    }
    setUploading(true);
    setProgress(0);
    let current = 0;
    const interval = setInterval(() => {
      current += 2;
      setProgress(Math.min(current, 100));
      if (current >= 100) {
        clearInterval(interval);
        setFiles((f) => f.map((x) => ({ ...x, status: "success" as const })));
        setUploading(false);
        setSent(true);
        toast({ title: "Files uploaded successfully!" });
      }
    }, 40);
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
          <div className="flex flex-col items-center py-10 gap-4">
            <CheckCircle2 size={56} className="text-whatsapp" />
            <h3 className="font-heading font-semibold text-lg">Files Uploaded!</h3>
            <p className="text-muted-foreground text-sm text-center">
              We've received your files and will get back to you shortly.
            </p>
            <button
              onClick={() => handleClose(false)}
              className="mt-2 px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:brightness-110 transition-all"
            >
              Close
            </button>
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
                Phone (optional)
              </label>
              <input
                type="tel"
                {...register("phone")}
                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="+91 XXXXX XXXXX"
                maxLength={20}
              />
              {errors.phone && (
                <p className="text-xs text-destructive mt-1">{errors.phone.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={files.length === 0 || uploading}
              className="w-full px-6 py-3 rounded-full bg-gradient-to-r from-cyan to-primary text-primary-foreground font-semibold text-sm hover:shadow-cyan-glow transition-all active:scale-95 disabled:opacity-50"
            >
              {uploading ? "Uploading…" : "Send Notification"}
            </button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default FileUploadModal;
