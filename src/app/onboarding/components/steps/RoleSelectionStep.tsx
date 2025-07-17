"use client";
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Video } from "lucide-react";

interface RoleSelectionStepProps {
  onRoleSelect: (role: 'creator' | 'clipper') => void;
  submitting: boolean;
}

const RoleSelectionStep: React.FC<RoleSelectionStepProps> = ({ onRoleSelect, submitting }) => {
  return (
    <Card className="bg-white shadow-xl border-0">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-gray-900">
          Choose Your Role
        </CardTitle>
        <CardDescription className="text-gray-600">
          Select how you want to use the platform
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button
          onClick={() => onRoleSelect('creator')}
          disabled={submitting}
          variant="outline"
          className="w-full h-auto p-6 flex flex-col items-center space-y-3 hover:bg-gray-50 border-2 hover:border-gray-300 transition-colors"
        >
          <Users className="w-8 h-8 text-gray-600" />
          <div className="text-center">
            <div className="font-semibold text-lg text-gray-900">Creator</div>
            <div className="text-sm text-gray-600">
              Share your content and find clippers
            </div>
          </div>
        </Button>

        <Button
          onClick={() => onRoleSelect('clipper')}
          disabled={submitting}
          variant="outline"
          className="w-full h-auto p-6 flex flex-col items-center space-y-3 hover:bg-gray-50 border-2 hover:border-gray-300 transition-colors"
        >
          <Video className="w-8 h-8 text-gray-600" />
          <div className="text-center">
            <div className="font-semibold text-lg text-gray-900">Clipper</div>
            <div className="text-sm text-gray-600">
              Create clips and earn money
            </div>
          </div>
        </Button>
      </CardContent>
    </Card>
  );
};

export default RoleSelectionStep;