import React from 'react'
import { Edit2, Save, X } from 'lucide-react';
type Props = {
    editing: boolean;
    setEditing: React.Dispatch<React.SetStateAction<boolean>>;
    saveProfile?: () => void;
}
const UserProfileActionButtons = ({editing, setEditing, saveProfile}: Props) => {
  return (
    <div className="flex justify-end space-x-4 pt-8 border-t border-gray-100">
                {editing ? (
                  <>
                    <button
                      onClick={() => setEditing(false)}
                      className="flex items-center px-6 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <X size={16} className="mr-2" />
                      Cancel
                    </button>
                    <button
                      onClick={saveProfile}
                      className="flex items-center px-6 py-2 bg-secondary text-quarternary rounded-lg hover:bg-secondary/90 transition-colors"
                    >
                      <Save size={16} className="mr-2" />
                      Save Changes
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setEditing(true)}
                    className="flex items-center px-6 py-2 bg-secondary text-quarternary rounded-lg hover:bg-secondary/90 transition-colors"
                  >
                    <Edit2 size={16} className="mr-2" />
                    Edit Profile
                  </button>
                )}
              </div>
  )
}
export default UserProfileActionButtons