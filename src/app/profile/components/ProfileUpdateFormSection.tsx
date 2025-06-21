"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // For platform, niche, country
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { RootState } from "@/state/store";
import {
  updateCreatorProfile,
  updateClipperProfile,
} from "@/state/User/profileManagementThunks";
import { clearProfileUpdateStatus } from "@/state/User/usersSlice";
import {
  Creator,
  Clipper,
  IUpdateCreator,
  IUpdateClipper,
} from "../../../model";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Assuming Platform and Niche enums are available or use string if not
// If you have enums like Platform.YOUTUBE, use z.nativeEnum(Platform)
// For simplicity, using string arrays for now. Replace with actual enums.
const platforms = ["instagram", "tiktok", "youtube", "x"];
const niches = [
  "travel",
  "food",
  "entertainment",
  "sport",
  "fashion",
  "technology",
  "gaming",
  "beauty",
  "fitness",
  "other",
];
// You might want a more comprehensive list of countries, or a country select component
const countries = [
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "Germany",
  "France",
]; // Example list

const baseProfileSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(50)
    .optional(),
  brandName: z
    .string()
    .min(2, "Brand name must be at least 2 characters")
    .max(50)
    .optional(),
  socialMediaHandle: z
    .string()
    .min(3)
    .max(50)
    .regex(/^[a-zA-Z0-9_.]+$/, "Invalid characters")
    .optional(),
  platform: z.string().optional(),
  niche: z.string().optional(),
  country: z.string().optional(),
});

const creatorProfileSchema = baseProfileSchema.extend({
  // Creator-specific fields, if any, beyond base (excluding email)
});

const clipperProfileSchema = baseProfileSchema.extend({
  followerCount: z.preprocess(
    (val) =>
      val === "" || val === null || val === undefined ? undefined : Number(val),
    z.number().min(0).max(500000000).optional()
  ),
  pricePerPost: z.preprocess(
    (val) =>
      val === "" || val === null || val === undefined ? undefined : Number(val),
    z.number().min(0).max(500000000).optional()
  ),
});

type CreatorFormValues = z.infer<typeof creatorProfileSchema>;
type ClipperFormValues = z.infer<typeof clipperProfileSchema>;

interface UserProfileCore {
  fullName?: string;
  brandName?: string;
  socialMediaHandle?: string;
  platform?: string;
  niche?: string;
  country?: string;
  // Clipper specific
  followerCount?: number;
  pricePerPost?: number;
  // Add other common fields if necessary
}

interface Props {
  user: (Creator | Clipper) & UserProfileCore;
  userType: "creator" | "clipper";
}

const ProfileUpdateFormSection: React.FC<Props> = ({ user, userType }) => {
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const { profileUpdateLoading, profileUpdateError } = useAppSelector(
    (state: RootState) => state.user
  );

  const isClipper = userType === "clipper";
  const currentSchema = isClipper ? clipperProfileSchema : creatorProfileSchema;

  const form = useForm<CreatorFormValues | ClipperFormValues>({
    resolver: zodResolver(currentSchema),
    defaultValues: {
      // Initialize with current user data, ensure fields match schema
      fullName: user.fullName || "",
      brandName: user.brandName || "",
      socialMediaHandle: user.socialMediaHandle || "",
      platform: user.platform || "",
      niche: user.niche || "",
      country: user.country || "",
      ...(isClipper && {
        followerCount: (user as Clipper).followerCount ?? undefined, // Use undefined for optional numbers
        pricePerPost: (user as Clipper).pricePerPost ?? undefined,
      }),
    },
  });

  useEffect(() => {
    // Reset form with user data if user prop changes (e.g., after initial load)
    form.reset({
      fullName: user.fullName || "",
      brandName: user.brandName || "",
      socialMediaHandle: user.socialMediaHandle || "",
      platform: user.platform || "",
      niche: user.niche || "",
      country: user.country || "",
      ...(isClipper && {
        followerCount: (user as Clipper).followerCount ?? undefined,
        pricePerPost: (user as Clipper).pricePerPost ?? undefined,
      }),
    });
  }, [user, userType, form, isClipper]);

  useEffect(() => {
    // Clear previous submission errors when the component unmounts or user changes
    return () => {
      dispatch(clearProfileUpdateStatus());
    };
  }, [dispatch, user]);

  const onSubmit = async (values: CreatorFormValues | ClipperFormValues) => {
    // Filter out empty optional fields and unchanged password unless explicitly set
    console.log(values)
    const cleanedValues: Record<string, string | number> = {};
    for (const key in values) {
      const typedKey = key as keyof typeof values;
      if (values[typedKey] !== undefined && values[typedKey] !== "") {
        cleanedValues[typedKey] = values[typedKey];
      }
    }
    // Ensure numeric fields are numbers if present
    if (cleanedValues.followerCount !== undefined)
      cleanedValues.followerCount = Number(cleanedValues.followerCount);
    if (cleanedValues.pricePerPost !== undefined)
      cleanedValues.pricePerPost = Number(cleanedValues.pricePerPost);

    if (Object.keys(cleanedValues).length === 0) {
      toast({ title: "Info", description: "No changes to submit." });
      return;
    }

    try {
      if (isClipper) {
        await dispatch(
          updateClipperProfile({
            profileData: cleanedValues as IUpdateClipper,
          })
        ).unwrap();
      } else {
        await dispatch(
          updateCreatorProfile({
            profileData: cleanedValues as IUpdateCreator,
          })
        ).unwrap();
      }
      toast({ title: "Success", description: "Profile updated successfully!" });
      form.reset({ ...form.getValues() }); // Reset form, keep data, password field was already removed
      dispatch(clearProfileUpdateStatus()); // Clear any previous errors on success
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : typeof error === "string"
          ? error
          : "Failed to update profile.";
      toast({
        title: "Error updating profile",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Your Profile</CardTitle>
        <CardDescription>
          Update your personal and professional details. Email cannot be changed
          here.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="brandName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Brand Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your brand name (optional)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="socialMediaHandle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Social Media Handle</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., yourusername" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="platform"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Platform</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a platform" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {platforms.map((p) => (
                          <SelectItem key={p} value={p} className="capitalize">
                            {p}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="niche"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Niche</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your niche" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {niches.map((n) => (
                          <SelectItem key={n} value={n} className="capitalize">
                            {n}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your country" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {/* In a real app, use a proper country list/component */}
                        {countries.map((c) => (
                          <SelectItem key={c} value={c}>
                            {c}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {isClipper && (
                <>
                  <FormField
                    control={form.control}
                    name="followerCount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Follower Count</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="e.g., 10000"
                            {...field}
                            onChange={(e) =>
                              field.onChange(
                                e.target.value === ""
                                  ? undefined
                                  : Number(e.target.value)
                              )
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="pricePerPost"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price Per Post ($)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="e.g., 150"
                            {...field}
                            onChange={(e) =>
                              field.onChange(
                                e.target.value === ""
                                  ? undefined
                                  : Number(e.target.value)
                              )
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
            </div>

            {profileUpdateError && (
              <Alert variant="destructive" className="mt-4">
                <AlertDescription>{profileUpdateError}</AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              disabled={profileUpdateLoading}
              className="w-48 text-black"
            >
              {profileUpdateLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ProfileUpdateFormSection;
