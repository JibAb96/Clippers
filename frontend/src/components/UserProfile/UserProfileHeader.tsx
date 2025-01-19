import React from "react";
import { Profile } from "../../model";
import { Camera } from "lucide-react";
type Props = {
  editing: boolean;
  profile: Profile;
};
const UserProfileHeader = ({ editing, profile }: Props) => {
  return (
    <div className="relative pb-32">
      <div className="absolute inset-0 h-48 bg-[#D20B4E] rounded-xl opacity-95" />
      {/* Profile Header Image*/}
      <div className="relative pt-12">
        <div className="text-center">
          <div className="relative inline-block">
            <div className="w-32 h-32 rounded-full border-4 border-quarternary shadow-lg mx-auto overflow-hidden">
              <img
                src={profile.brandImage}
                alt={profile.name}
                className="w-full h-full object-cover"
              />
            </div>
            {editing && (
              <div className="absolute bottom-0 right-0 bg-quarternary rounded-full p-2 shadow-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <Camera size={20} className="text-[#D20B4E]" />
              </div>
            )}
          </div>
          <h1 className="mt-4 text-3xl font-bold">{profile.brand_name}</h1>
          <p className="text-quarternary/90 text-lg font-medium">
            {profile.niche}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfileHeader;
