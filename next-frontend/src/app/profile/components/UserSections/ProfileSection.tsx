import React from "react";
type Props = {
    sectionTitle: string;
    value: string | number;
}
const ProfileSections = ({sectionTitle, value}: Props) => {
  return (
    <div className="bg-quarternary rounded-xl shadow-sm space-y-10">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold flex items-center">
          {sectionTitle}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-quarternary border border-gray-100 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            {" "}
            <div className="flex items-center space-x-3">
              <div className="flex-1">
                <p className="text-sm font-medium text-secondary">
                  {sectionTitle}
                </p>
                <p className="text-lg mt-1">{value}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSections;
