import React from "react";
import { Profile } from "../../model";
import { Edit2 } from "lucide-react";
type Props = {
    editing: boolean;
    profile: Profile;
    onChange?: () => void;
}
const ClipperGuidelines = ({editing, profile, onChange}: Props) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold flex items-center">
        Clip Guidlines
        {editing && <Edit2 size={16} className="ml-2 text-secondary" />}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {profile.guidelines?.map((guideline, index) => (
          <div
            key={index}
            className="bg-quarternary border border-gray-100 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            {editing ? (
              <div className="space-y-3">
                <input
                  type="text"
                  value={guideline}
                  onChange={onChange}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-secondary focus:border-transparent"
                  placeholder="Platform"
                />
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <div className="flex-1">
                  <p className="text-lg mt-1 font-semibold">{guideline}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClipperGuidelines;
