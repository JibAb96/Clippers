"use client";
import React, { useEffect } from "react";
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
import { changePassword } from "@/state/User/profileManagementThunks";
import { clearPasswordUpdateStatus } from "@/state/User/user";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";

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

const PasswordUpdateSection: React.FC = () => {
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const { passwordUpdateLoading, passwordUpdateError } = useAppSelector(
    (state: RootState) => state.user // Assuming these states will be added to userSlice
  );

  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordUpdateSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    return () => {
      dispatch(clearPasswordUpdateStatus()); // Clear errors on unmount
    };
  }, [dispatch]);

  const onSubmit = async (values: PasswordFormValues) => {
    const { newPassword } = values;
    const payload: { newPassword: string } = {
      newPassword,
    };

    try {
      await dispatch(changePassword(payload)).unwrap();
      toast({
        title: "Success",
        description: "Password updated successfully!",
      });
      form.reset();
      dispatch(clearPasswordUpdateStatus());
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update Password</CardTitle>
        <CardDescription>
          Ensure your account is secure with a strong password.
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
              className="w-48 text-black"
            >
              {passwordUpdateLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Changing...
                </>
              ) : (
                "Change Password"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default PasswordUpdateSection;
