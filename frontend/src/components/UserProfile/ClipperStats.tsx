import React from "react";
import { Profile } from "../../model";
import { followersDisplay } from "../Cards/ClipperCard";

type Props = {
    profile: Profile;
    editing: boolean;
    onChange?: () => void; 
}
const ClipperStats = ({profile, editing, onChange}: Props) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Clipper Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-quarternary border border-gray-100 p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-medium">Followers</h3>
          {editing ? (
            <input
              type="number"
              value={profile.followers || 0}
              onChange={onChange}
              className="mt-2 w-full border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-secondary focus:border-transparent"
            />
          ) : (
            <p className="mt-2 text-3xl font-bold text-secondary">
              {followersDisplay(profile.followers || 0)}
            </p>
          )}
        </div>
        <div className="bg-quarternary border border-gray-100 p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-medium">Price Per Post</h3>
          {editing ? (
            <input
              type="number"
              value={profile.pricePerPost || 0}
              onChange={onChange}
              className="mt-2 w-full border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-secondary focus:border-transparent"
            />
          ) : (
            <p className="mt-2 text-3xl font-bold text-secondary">
              £{profile.pricePerPost}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClipperStats;
