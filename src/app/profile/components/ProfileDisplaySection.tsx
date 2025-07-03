import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Creator, Clipper } from "../../../model";
import {
  Mail,
  UserCircle,
  LinkIcon,
  Briefcase,
  Globe,
  Users,
  DollarSign,
  Tag,
} from "lucide-react"; // Icons

interface Props {
  user: Creator | Clipper | Record<string, string>;
  userType: "creator" | "clipper";
}

const DetailItem: React.FC<{
  icon: React.ElementType;
  label: string;
  value?: string | number | null;
}> = ({ icon: Icon, label, value }) => {
  if (!value && typeof value !== "number") return null;
  return (
    <div className="flex items-start space-x-3">
      <Icon className="h-5 w-5 text-muted-foreground mt-1" />
      <div>
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <p className="text-base font-semibold">{value}</p>
      </div>
    </div>
  );
};

const ProfileDisplaySection: React.FC<Props> = ({ user, userType }) => {
  const getInitials = (name: string = "") => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  // Common fields
  const commonDetails = (
    <>
      <DetailItem icon={Mail} label="Email" value={user.email} />
      <DetailItem icon={UserCircle} label="Full Name" value={user.fullName} />
      {user.brandName && (
        <DetailItem
          icon={Briefcase}
          label="Brand Name"
          value={user.brandName}
        />
      )}
      {user.socialMediaHandle && (
        <DetailItem
          icon={LinkIcon}
          label="Social Media"
          value={`${user.platform ? user.platform + ": " : ""}${
            user.socialMediaHandle
          }`}
        />
      )}
      {user.country && (
        <DetailItem icon={Globe} label="Country" value={user.country} />
      )}
      {user.niche && <DetailItem icon={Tag} label="Niche" value={user.niche} />}
    </>
  );

  // Clipper specific fields
  const clipperDetails = userType === "clipper" && (
    <>
      {(user as Clipper).followerCount !== undefined && (
        <DetailItem
          icon={Users}
          label="Follower Count"
          value={(user as Clipper).followerCount.toLocaleString()}
        />
      )}
      {(user as Clipper).pricePerPost !== undefined && (
        <DetailItem
          icon={DollarSign}
          label="Price Per Post"
          value={`$${(user as Clipper).pricePerPost.toLocaleString()}`}
        />
      )}
    </>
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-start space-x-4">
        <Avatar className="h-20 w-20">
          <AvatarImage
            src={(user as Clipper | Creator).brandProfilePicture || undefined}
            alt={user.brandName || user.fullName || "Profile"}
          />
          <AvatarFallback className="text-2xl">
            {getInitials(user.brandName || user.fullName)}
          </AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-2xl font-bold">
            {user.brandName || user.fullName || "User Profile"}
          </CardTitle>
          <CardDescription className="mt-1">
            <Badge
              variant={userType === "creator" ? "default" : "secondary"}
              className={`capitalize text-sm px-3 py-1 ${
                userType === "clipper"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {userType}
            </Badge>
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 pt-4">
        {commonDetails}
        {clipperDetails}
      </CardContent>
    </Card>
  );
};

export default ProfileDisplaySection;
