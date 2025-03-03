import React from "react";
import { Profile } from "../../../../../model";
type Props = {
  profile: Profile;
  onChange?: () => void;
};
const PlatformsSection = ({ profile }: Props) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold flex items-center">Social Media</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {profile.socialMediaHandles.map((handle, index) => (
          <div
            key={index}
            className="bg-quarternary border border-gray-100 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-3">
              <div className="flex-1">
                <p className="text-sm font-medium text-secondary">
                  {handle.platform}
                </p>
                <p className="text-lg mt-1">{handle.handle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlatformsSection;
