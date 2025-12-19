"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ImagePlus, X, Upload, Trash2, Sparkles, Check, ZoomIn } from "lucide-react"
import { useCallback, useState, useRef } from "react"
import { cn } from "@/lib/utils"
// @ts-ignore
import Cropper from "react-easy-crop"
import getCroppedImg from "@/lib/cropImage"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Slider } from "@/components/ui/slider"

interface AdminImageUploadProps {
    onImageSelected: (file: File | null) => void;
    label?: string;
}

export function AdminImageUpload({ onImageSelected, label = "Upload Image" }: AdminImageUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Crop state
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null)
  const [isCropping, setIsCropping] = useState(false)

  const handleThumbnailClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    processFile(file)
  };

  const processFile = (file: File | null) => {
    if (file) {
        const url = URL.createObjectURL(file)
        setOriginalImage(url)
        setFileName(file.name)
        setIsCropping(true)
        // Don't set previewUrl yet, wait for crop
        // Don't call onImageSelected yet
      }
  }

  const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const handleCropConfirm = async () => {
    try {
      if (!originalImage || !croppedAreaPixels) return

      const croppedBlob = await getCroppedImg(originalImage, croppedAreaPixels)
      if (croppedBlob) {
        const croppedFile = new File([croppedBlob], fileName || "image.jpg", { type: "image/jpeg" })
        const croppedUrl = URL.createObjectURL(croppedBlob)
        
        setPreviewUrl(croppedUrl)
        onImageSelected(croppedFile)
        setIsCropping(false)
      }
    } catch (e) {
      console.error(e)
    }
  }

  const handleCropCancel = () => {
    setIsCropping(false)
    setOriginalImage(null)
    setFileName(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleRemove = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }
    setPreviewUrl(null)
    setOriginalImage(null)
    setFileName(null)
    onImageSelected(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)

      const file = e.dataTransfer.files?.[0]
      if (file && file.type.startsWith("image/")) {
        processFile(file)
      }
    },
    [],
  )

  return (
    <div className="w-full space-y-3">
      {/* Crop Dialog */}
      <Dialog open={isCropping} onOpenChange={(open) => !open && handleCropCancel()}>
        <DialogContent className="sm:max-w-xl">
            <DialogHeader>
                <DialogTitle>Crop Image</DialogTitle>
            </DialogHeader>
            <div className="relative w-full h-80 bg-black/5 rounded-lg overflow-hidden">
             {originalImage && (
                <Cropper
                    image={originalImage}
                    crop={crop}
                    zoom={zoom}
                    aspect={450 / 350}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                />
             )}
            </div>
            <div className="py-2 flex items-center gap-4">
                <ZoomIn className="h-4 w-4 text-muted-foreground" />
                <Slider
                    value={[zoom]}
                    min={1}
                    max={3}
                    step={0.1}
                    onValueChange={(value) => setZoom(value[0])}
                    className="flex-1"
                />
            </div>
            <DialogFooter>
                <Button variant="outline" onClick={handleCropCancel}>Cancel</Button>
                <Button onClick={handleCropConfirm}>Crop & Save</Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="flex items-center gap-2">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border border-primary/20">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          <span className="text-xs text-muted-foreground">{label}</span>
        </div>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      <Input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />

      {!previewUrl ? (
        <div
          onClick={handleThumbnailClick}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "group relative flex h-56 cursor-pointer flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed transition-all duration-300 overflow-hidden",
            isDragging 
              ? "border-primary bg-primary/5 scale-[1.02]" 
              : "border-border/50 bg-gradient-to-br from-muted/50 via-background to-muted/30 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5",
          )}
        >
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Floating particles effect */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 delay-100" />
          </div>

          <div className="relative z-10 flex flex-col items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative rounded-2xl bg-gradient-to-br from-background to-muted p-4 shadow-lg border border-border/50 group-hover:border-primary/30 transition-all duration-300 group-hover:scale-110">
                <ImagePlus className="h-8 w-8 text-primary transition-transform duration-300 group-hover:rotate-12" />
              </div>
            </div>
            <div className="text-center space-y-1">
              <p className="font-medium text-foreground/90">Click to upload or drag & drop</p>
              <p className="text-xs text-muted-foreground">
                JPG, PNG or GIF (max. 10MB)
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="group relative h-56 overflow-hidden rounded-2xl border border-border/50 bg-muted shadow-lg">
            <img
              src={previewUrl}
              alt="Preview"
              className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
            />
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Action buttons */}
            <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <Button
                type="button"
                size="sm"
                variant="secondary"
                onClick={handleThumbnailClick}
                className="h-11 w-11 p-0 rounded-xl bg-background/90 backdrop-blur-sm hover:bg-background shadow-xl border border-border/50 hover:scale-110 transition-all duration-200"
              >
                <Upload className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                size="sm"
                variant="destructive"
                onClick={handleRemove}
                className="h-11 w-11 p-0 rounded-xl shadow-xl hover:scale-110 transition-all duration-200"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {fileName && (
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-muted/50 to-muted/30 border border-border/50">
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground mb-0.5">Selected file</p>
                <p className="text-sm truncate text-foreground/90">{fileName}</p>
              </div>
              <button
                type="button"
                onClick={handleRemove}
                className="rounded-lg p-2 hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all duration-200 hover:scale-110"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}