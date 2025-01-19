import React, { useState } from "react";
import { Profile } from "../../model";
import { useSearchContext } from "../../context/SearchContext";
import UserProfileHeader from "./UserProfileHeader";
import UserProfileSection from "./UserProfileSection";
import UserSociaMediaSection from "./UserSociaMediaSection";
import ClipperEngagementImages from "./ClipperEngagementImages";
import ClipperStats from "./ClipperStats";
import UserProfileActionButtons from "./UserProfileActionButtons";
import ClipperGuidelines from "./ClipperGuidlines";

const UserProfile = () => {
  const { user } = useSearchContext();

  const [editing, setEditing] = useState(false);

  const defaultUser: Profile = {
    id: 100,
    role: "creator",
    name: "default",
    brand_name: "default",
    brandImage: "default",
    socialMediaHandles: [{ platform: "default", handle: "default" }],
    email: "default",
    niche: "default",
  };
  const [profile, setProfile] = useState(defaultUser);

  setProfile(user ? user : defaultUser);
  
  return (
    <div className="min-h-screen pt-16 bg-primary">
      <div className="max-w-5xl mx-auto mt-8 bg-quarternary ">
        {/* Header */}
        <UserProfileHeader editing={editing} profile={profile} />
        {/* Content */}
        <div className="-mt-32 p-8 flex flex-col gap-8">
          {/*User Role*/}
          <UserProfileSection
            editing={editing}
            profile={profile}
            targetKey="role"
          />
          {/*User niche*/}
          <UserProfileSection
            editing={editing}
            profile={profile}
            targetKey="niche"
          />
          {/*User Email*/}
          <UserProfileSection
            editing={editing}
            profile={profile}
            targetKey="email"
          />
          {/* Social Media Section */}
          <UserSociaMediaSection editing={editing} profile={profile} />
          {/* Engagement Images */}
          {profile.role === "clipper" && (
            <>
              <ClipperEngagementImages editing={editing} profile={profile} />
              <ClipperGuidelines editing={editing} profile={profile} />
              <ClipperStats editing={editing} profile={profile} />
            </>
          )}
          {/* Action Buttons */}
          <UserProfileActionButtons editing={editing} setEditing={setEditing} />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
