"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
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
import { clearPasswordUpdateStatus } from "@/state/User/usersSlice";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useRouter } from "next/navigation";
import { supabase } from "@/services/supabase";

const passwordUpdateSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, "New password must be at least 8 characters")
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least one letter, one number, and be at least 8 characters long"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "New passwords don't match",
    path: ["confirmPassword"],
  });

type PasswordFormValues = z.infer<typeof passwordUpdateSchema>;

const ResetPassword: React.FC = () => {
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { passwordUpdateLoading, passwordUpdateError } = useAppSelector(
    (state: RootState) => state.user
  );

  const [isSessionLoading, setIsSessionLoading] = useState(true);
  const [sessionError, setSessionError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordUpdateSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Handle authentication session from URL parameters
  useEffect(() => {
    const handleAuthSession = async () => {
      try {
        // Check if we have URL hash fragments (tokens from email link)
        if (window.location.hash) {
          const hashParams = new URLSearchParams(
            window.location.hash.substring(1)
          );
          const accessToken = hashParams.get("access_token");
          const refreshToken = hashParams.get("refresh_token");

          if (accessToken && refreshToken) {
            // Set the session using the tokens from the URL
            const { data, error } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken,
            });

            if (error) {
              console.error("Session error:", error);
              setSessionError(
                "Invalid or expired reset link. Please request a new password reset."
              );
              setIsSessionLoading(false);
              return;
            }

            if (data.session) {
              setIsAuthenticated(true);
              setIsSessionLoading(false);
              // Clear the hash from URL for security
              window.history.replaceState(null, "", window.location.pathname);
            }
          } else {
            setSessionError(
              "Invalid reset link. Missing authentication tokens."
            );
            setIsSessionLoading(false);
          }
        } else {
          // Check if user is already authenticated
          const {
            data: { session },
          } = await supabase.auth.getSession();
          if (session) {
            setIsAuthenticated(true);
          } else {
            setSessionError(
              "No valid session found. Please use the link from your password reset email."
            );
          }
          setIsSessionLoading(false);
        }
      } catch (error) {
        console.error("Auth session error:", error);
        setSessionError("Failed to authenticate. Please try again.");
        setIsSessionLoading(false);
      }
    };

    handleAuthSession();
  }, []);

  useEffect(() => {
    return () => {
      dispatch(clearPasswordUpdateStatus());
    };
  }, [dispatch]);

  const onSubmit = async (values: PasswordFormValues) => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Error",
        description: "You must be authenticated to reset your password.",
        variant: "destructive",
      });
      return;
    }

    const { newPassword } = values;
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Success",
        description:
          "Password updated successfully! You can now sign in with your new password.",
      });

      form.reset();
      dispatch(clearPasswordUpdateStatus());

      // Redirect to signin page after successful password update
      setTimeout(() => {
        router.push("/signin");
      }, 2000);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : typeof error === "string"
          ? error
          : "Failed to update password.";
      toast({
        title: "Error updating password",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  // Loading state while establishing session
  if (isSessionLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Reset Password</CardTitle>
          <CardDescription>Verifying your reset link...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="ml-2">Authenticating...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Error state if session establishment failed
  if (sessionError || !isAuthenticated) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Reset Password</CardTitle>
          <CardDescription>
            Unable to authenticate your reset request.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertDescription>
              {sessionError ||
                "Authentication failed. Please request a new password reset link."}
            </AlertDescription>
          </Alert>
          <div className="mt-4">
            <Button
              onClick={() => router.push("/signin")}
              variant="outline"
              className="w-full"
            >
              Back to Sign In
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Authenticated state - show password reset form
  return (
    <Card>
      <CardHeader>
        <CardTitle>Update Password</CardTitle>
        <CardDescription>
          Create a new secure password for your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter new password"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Minimum 8 characters, including letters and numbers.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm New Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirm new password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {passwordUpdateError && (
              <Alert variant="destructive" className="mt-4">
                <AlertDescription>{passwordUpdateError}</AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              disabled={passwordUpdateLoading}
              className="w-full text-black"
            >
              {passwordUpdateLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating...
                </>
              ) : (
                "Update Password"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ResetPassword;
