import React from "react";
import { Profile } from "../../model";

type Props = {
  profile: Profile;
  editing: boolean;
}

const ClipperEngagementImages = ({profile, editing}: Props) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Gallery</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {profile.engagementImages?.map((image, index) => (
          <div key={index} className="relative aspect-square group">
            {editing ? (
              <input
                type="text"
                value={image}
                className="absolute inset-0 w-full h-full border border-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-secondary focus:border-transparent"
                placeholder="Image URL"
              />
            ) : (
              <div className="relative h-full overflow-hidden rounded-xl">
                <img
                  src={image}
                  alt={`Engagement ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClipperEngagementImages;
