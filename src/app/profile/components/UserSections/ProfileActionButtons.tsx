"use client";
import React from "react";
import { Edit2 } from "lucide-react";
import Form from "../Form/Form";
import Modal from "@/components/Modal";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { setProfileForm } from "@/state/Modal/isOpen";

const UserProfileActionButtons = () => {
  const open = useAppSelector((state) => state.isOpen.profileForm);
  const profile = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch();
 
  return (
    <div className="flex justify-end space-x-4 pt-8 border-t border-gray-100">
      <button
        onClick={() => {
          dispatch(setProfileForm());
          console.log(profile)
        }}
        className="flex items-center px-6 py-2 bg-secondary text-quarternary rounded-lg hover:bg-secondary/90 transition-colors"
      >
        <Edit2 size={16} className="mr-2" />
        Edit Profile
      </button>
      <Modal isOpen={open}>
        <Form />
      </Modal>
    </div>
  );
};
export default UserProfileActionButtons;
