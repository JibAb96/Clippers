import React from "react";
import ProfileHeader from "./UserSections/ProfileHeader";
import ProfileSection from "./UserSections/ProfileSections";
import ProfileActionButtons from "./UserSections/ProfileActionButtons";
import { Profile } from "../../../../model";
import ClipperSections from "./Clipper/ClipperSections";
const UserProfile = () => {
  const sections: Array<keyof Profile> = ["niche", "role", "email","city", "country", "socialMediaHandles"]

  return (
    <div className="min-h-screen pt-6 md:pt-2 bg-primary">
      <div className="max-w-5xl mx-auto mt-8 bg-quarternary ">
        {/* Header */}
        <ProfileHeader />
        {/* Content */}
        <div className="-mt-32 p-8 flex flex-col gap-8">
          {sections.map((section, index) => { return <ProfileSection
            key={index}
            targetKey={section}
          />})}
          <ClipperSections />
          {/* Action Buttons */}
          <ProfileActionButtons />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
