"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Loader2, ShieldAlert } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { RootState } from "@/state/store";
import { deleteCurrentUserAccount } from "@/state/User/profileManagementThunks";
import { logout } from "@/state/User/usersSlice"; // To log out after successful deletion
import { useToast } from "@/hooks/use-toast"; // Import custom hook
import { useRouter } from "next/navigation"; // To redirect after account deletion



const AccountSettingsSection = () => {
  const { toast } = useToast(); // Use the custom hook
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { loading: accountDeletionLoading, error: accountDeletionError } =
    useAppSelector((state: RootState) => state.user); // Using general loading/error for this

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDeleteAccount = async () => {
    try {
      // The thunk deleteCurrentUserAccount now takes void as arg
      await dispatch(deleteCurrentUserAccount()).unwrap();
      toast({
        title: "Account Deleted",
        description: "Account deleted successfully. You will be logged out.",
      });
      // Dispatch logout action from userSlice to clear local state and localStorage immediately
      router.push("/");
       dispatch(logout());
      // Redirect to home or login page after a short delay to allow toast to be seen
      setTimeout(() => {
        router.push("/"); // Or your login page
      }, 1500);
    } catch (error) {
      const message =
        typeof error === "string"
          ? error
          : (error as Error)?.message || "Failed to delete account.";
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
      // Error is also set in Redux state (state.user.error) and could be displayed
    } finally {
      setIsDialogOpen(false);
    }
  };

  return (
    <Card className="border-destructive">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <ShieldAlert className="h-6 w-6 text-destructive" />
          <CardTitle className="text-destructive">Danger Zone</CardTitle>
        </div>
        <CardDescription>
          Manage critical account settings. These actions are irreversible.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold mb-1">Delete Your Account</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Once you delete your account, all your data will be permanently
            removed. This action cannot be undone.
          </p>
        </div>

        <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" disabled={accountDeletionLoading}>
              {accountDeletionLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Delete Account
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove all your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={accountDeletionLoading}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteAccount}
                disabled={accountDeletionLoading}
                className="bg-destructive hover:bg-destructive/90"
              >
                {accountDeletionLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                    Deleting...
                  </>
                ) : (
                  "Yes, delete my account"
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {accountDeletionError && (
          <p className="text-sm text-destructive mt-2">
            Error: {accountDeletionError}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default AccountSettingsSection;
