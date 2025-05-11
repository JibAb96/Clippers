"use client"
import React from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { LogOut } from 'lucide-react';
import { useAppDispatch, useAppSelector } from "../hooks";
import { setIsSignedIn } from "@/state/isSignedIn/isSignedIn";
import { setLogout } from "@/state/Modal/isOpen";
import { useRouter } from "next/navigation";

const LogoutModal = () => {
  const open = useAppSelector((state) => state.isOpen.logout)
  const dispatch = useAppDispatch();
  const router = useRouter();
  return (
    <AlertDialog open={open} >
      <AlertDialogContent className="bg-[#FAFAFA] max-w-[400px] rounded-lg p-0 overflow-hidden">
        <AlertDialogHeader className="p-6 pb-2">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-full bg-[#D20B4E]/10">
              <LogOut className="w-5 h-5 text-[#D20B4E]" />
            </div>
            <AlertDialogTitle className="text-xl font-semibold text-[#101010]">
              Sign Out
            </AlertDialogTitle>
          </div>
          <AlertDialogDescription className="text-[#101010]/80 text-base">
            Are you sure you want to sign out? You will need to sign in again to access your account.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="p-6 pt-2">
          <div className="flex w-full gap-3">
            <AlertDialogCancel
            onClick={() => {dispatch(setLogout())}} 
              className="flex-1 px-4 py-2.5 rounded-lg border border-[#101010]/10 bg-white text-[#101010] hover:bg-[#101010]/5 transition-colors"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              className="flex-1 px-4 py-2.5 rounded-lg bg-[#D20B4E] text-white hover:bg-[#D20B4E]/90 transition-colors"
              onClick={() => {
                dispatch(setIsSignedIn())
                dispatch(setLogout())
                router.push("/")
              }
                }
            >
              Sign Out
            </AlertDialogAction>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LogoutModal;