import React from "react";
import { Profile } from "../../model";
import { Edit2 } from "lucide-react";
type ProfileKeyWithOutPlatform = Exclude<keyof Profile, "socialMediaHandles">;
type Props = {
  editing: boolean;
  profile: Profile;
  targetKey: ProfileKeyWithOutPlatform; // Excluded platform key since it is an object and it cannot be used in value prop of input
  OnChange?: () => void;
};

const UserProfileSection = ({
  editing,
  profile,
  targetKey,
  OnChange,
}: Props) => {
  const sectionTitle = `${targetKey.charAt(0).toUpperCase()}${targetKey.slice(
    1
  )}`;
  return (
    <div className="bg-quarternary rounded-xl shadow-sm space-y-10">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold flex items-center">
          {sectionTitle}
          {editing && <Edit2 size={16} className="ml-2 text-secondary" />}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-quarternary border border-gray-100 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            {editing ? (
              <div className="space-y-3">
                <input
                  type="text"
                  value={profile[targetKey]}
                  onChange={OnChange}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-secondary focus:border-transparent"
                  placeholder="Role"
                />
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <div className="flex-1">
                  <p className="text-sm font-medium text-secondary">
                    {sectionTitle}
                  </p>
                  <p className="text-lg mt-1">{profile[targetKey]}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileSection;
