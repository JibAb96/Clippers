"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, UploadCloud, Trash2 } from "lucide-react";
import { useAppDispatch } from "@/app/hooks";
import {
  uploadPortfolioImages,
  deletePortfolioImageById,
} from "@/state/User/profileManagementThunks";
import { clearPortfolioStatus } from "@/state/User/user";
import { Clipper, PortfolioImage } from "../../../model";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Props {
  clipperUser: Clipper; // User object, should be a Clipper
  portfolioImages: PortfolioImage[];
  loading: boolean; // This is portfolioLoading from userSlice
  error: string | null; // This is portfolioError from userSlice
}

const MAX_PORTFOLIO_IMAGES = 4;

const PortfolioManagementSection: React.FC<Props> = ({
  portfolioImages,
  loading,
  error,
}) => {
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Selector for the specific loading/error states for portfolio ops from userSlice
  // The props `loading` and `error` are already passed from `state.user.portfolioLoading/Error`
  // const { portfolioLoading, portfolioError } = useAppSelector((state: RootState) => state.user);

  React.useEffect(() => {
    return () => {
      dispatch(clearPortfolioStatus());
    };
  }, [dispatch]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const currentTotal = portfolioImages.length + files.length;
      if (currentTotal > MAX_PORTFOLIO_IMAGES) {
        toast({
          title: "Upload Limit Exceeded",
          description: `You can upload a maximum of ${MAX_PORTFOLIO_IMAGES} images. You have ${portfolioImages.length} and selected ${files.length}.`,
          variant: "destructive",
        });
        if (fileInputRef.current) fileInputRef.current.value = ""; // Clear selection
        setSelectedFiles(null);
        setPreviewUrls([]);
        return;
      }
      setSelectedFiles(files);
      const urls = Array.from(files).map((file) => URL.createObjectURL(file));
      setPreviewUrls(urls);
    } else {
      setSelectedFiles(null);
      setPreviewUrls([]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFiles || selectedFiles.length === 0) {
      toast({
        title: "Error",
        description: "No files selected.",
        variant: "destructive",
      });
      return;
    }
    if (portfolioImages.length + selectedFiles.length > MAX_PORTFOLIO_IMAGES) {
      toast({
        title: "Upload Limit Exceeded",
        description: `Cannot upload. You can have a maximum of ${MAX_PORTFOLIO_IMAGES} images.`,
        variant: "destructive",
      });
      return;
    }

    const formData = new FormData();
    Array.from(selectedFiles).forEach((file) => {
      formData.append("image", file); // Backend expects 'image' key for each file
    });

    try {
      await dispatch(uploadPortfolioImages(formData)).unwrap();
      toast({
        title: "Success",
        description: "Portfolio images uploaded successfully!",
      });
      setSelectedFiles(null);
      setPreviewUrls([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err: unknown) {
      const message =
        typeof err === "string"
          ? err
          : (err as Error)?.message || "Failed to upload portfolio images.";
      toast({
        title: "Upload Error",
        description: message,
        variant: "destructive",
      });
    }
  };

  const handleDeleteImage = async (imageId: string) => {
    try {
      await dispatch(deletePortfolioImageById(imageId)).unwrap();
      toast({
        title: "Success",
        description: "Portfolio image deleted successfully!",
      });
    } catch (err: unknown) {
      const message =
        typeof err === "string"
          ? err
          : (err as Error)?.message || "Failed to delete portfolio image.";
      toast({
        title: "Delete Error",
        description: message,
        variant: "destructive",
      });
    }
  };

  const canUploadMore = portfolioImages.length < MAX_PORTFOLIO_IMAGES;

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Manage Portfolio ({portfolioImages.length} / {MAX_PORTFOLIO_IMAGES})
        </CardTitle>
        <CardDescription>
          Showcase your work. Upload up to {MAX_PORTFOLIO_IMAGES} images (JPG,
          JPEG, PNG, WEBP).
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Display existing portfolio images */}
        {portfolioImages.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {portfolioImages.map((image) => (
              <div key={image.id} className="relative group aspect-square">
                <Image
                  src={image.imageUrl}
                  alt={`Portfolio image ${image.id}`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 h-8 w-8"
                  onClick={() => handleDeleteImage(image.id)}
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                </Button>
              </div>
            ))}
          </div>
        )}
        {portfolioImages.length === 0 && !loading && (
          <p className="text-sm text-muted-foreground">
            No portfolio images yet. Upload some to showcase your work!
          </p>
        )}

        {/* Upload section */}
        {canUploadMore && (
          <div className="space-y-4 pt-4 border-t">
            <div className="flex flex-col items-center space-y-2">
              <Input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".jpg,.jpeg,.png,.webp"
                multiple // Allow multiple file selection
                className="hidden"
                id="portfolioImageInput"
              />
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="w-full max-w-xs"
                disabled={loading}
              >
                <UploadCloud className="mr-2 h-4 w-4" />
                Select Image(s) ({MAX_PORTFOLIO_IMAGES -
                  portfolioImages.length}{" "}
                remaining)
              </Button>
              {selectedFiles && selectedFiles.length > 0 && (
                <p className="text-sm text-muted-foreground">
                  Selected: {selectedFiles.length} file(s)
                </p>
              )}
            </div>

            {/* Preview selected images */}
            {previewUrls.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 pt-2">
                {previewUrls.map((url, index) => (
                  <div key={index} className="relative aspect-square">
                    <Image
                      src={url}
                      alt={`Preview ${index + 1}`}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-md"
                      onLoad={() => URL.revokeObjectURL(url)} // Clean up object URLs
                    />
                  </div>
                ))}
              </div>
            )}

            {selectedFiles && selectedFiles.length > 0 && (
              <Button
                onClick={handleUpload}
                disabled={
                  loading || !selectedFiles || selectedFiles.length === 0
                }
                className="w-full sm:w-auto"
              >
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <UploadCloud className="mr-2 h-4 w-4" />
                )}
                Upload Selected
              </Button>
            )}
          </div>
        )}

        {/* Use the error prop passed from the parent for general portfolio errors */}
        {error && !loading && (
          <Alert variant="destructive" className="mt-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default PortfolioManagementSection;
