import React from "react";
import { Profile } from "../../model";
import { Edit2 } from "lucide-react";
type Props = {
    editing: boolean;
    profile: Profile;
    onChange?: () => void;
}
const UserSociaMediaSection = ({editing, profile, onChange}: Props) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold flex items-center">
        Social Media
        {editing && <Edit2 size={16} className="ml-2 text-secondary" />}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {profile.socialMediaHandles.map((handle, index) => (
          <div
            key={index}
            className="bg-quarternary border border-gray-100 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            {editing ? (
              <div className="space-y-3">
                <input
                  type="select"
                  value={handle.platform}
                  onChange={onChange}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-secondary focus:border-transparent"
                  placeholder="Platform"
                />
                <input
                  type="text"
                  value={handle.handle}
                  onChange={onChange}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-secondary focus:border-transparent"
                  placeholder="Handle"
                />
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <div className="flex-1">
                  <p className="text-sm font-medium text-secondary">
                    {handle.platform}
                  </p>
                  <p className="text-lg mt-1">{handle.handle}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserSociaMediaSection;
