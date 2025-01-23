import React, { useState } from "react";
import UserProfileHeader from "./UserProfileHeader";
import UserProfileSection from "./UserProfileSection";
import UserSociaMediaSection from "./UserSociaMediaSection";
import ClipperEngagementImages from "./ClipperEngagementImages";
import ClipperStats from "./ClipperStats";
import UserProfileActionButtons from "./UserProfileActionButtons";
import ClipperGuidelines from "./ClipperGuidlines";
import { userProfiles } from "../../database/userProfiles";

const UserProfile = () => {
  const user = userProfiles[0];
  const [editing, setEditing] = useState(false);




  return (
    <div className="min-h-screen pt-16 bg-primary">
      <div className="max-w-5xl mx-auto mt-8 bg-quarternary ">
        {/* Header */}
        <UserProfileHeader editing={editing} profile={user} />
        {/* Content */}
        <div className="-mt-32 p-8 flex flex-col gap-8">
          {/*User Role*/}
          <UserProfileSection
            editing={editing}
            profile={user}
            targetKey="role" 
          />
          {/*User niche*/}
          <UserProfileSection
            editing={editing}
            profile={user}
            targetKey="niche"
          />
          {/*User Email*/}
          <UserProfileSection
            editing={editing}
            profile={user}
            targetKey="email"
          />
          {/* Social Media Section */}
          <UserSociaMediaSection editing={editing} profile={user} />
          {/* Engagement Images */}
          {user.role === "clipper" && (
            <>
              <ClipperEngagementImages editing={editing} profile={user} />
              <ClipperGuidelines editing={editing} profile={user} />
              <ClipperStats editing={editing} profile={user} />
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
