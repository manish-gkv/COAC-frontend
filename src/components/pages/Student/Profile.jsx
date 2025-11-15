import { Button } from "@/components/ui/button";
import { MdCloudUpload } from "react-icons/md";
import useProfile from "@/hooks/useProfile";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useState, useRef } from "react";
import { Select, SelectContent, SelectGroup, SelectLabel, SelectTrigger, SelectValue, SelectItem } from "@/components/ui/select";
import useAuth from "@/hooks/useAuth";
import { API_ENDPOINT } from "@/utils";

function PersonalDetailsSection() {
  const { profile, fetchProfile } = useProfile();
  const user  = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: profile?.name || "",
    rollNumber: profile?.rollNumber || "",
    phone: profile?.phone || "",
    email: user?.user?.email || "",
    alternateEmail: profile?.alternateEmail || "",
    gender: profile?.gender || "",
  });
  const [editingError, setEditingError] = useState(null);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleEditMode = () => setEditMode((v) => !v);

  const handleSave = async (e) => {
    e?.preventDefault?.();
    try{
        const response = await fetch(`${API_ENDPOINT}student/${profile.rollNumber}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user?.user?.token || ""}`
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      console.error("Failed to update profile");
      return;
    }
    const json = await response.json();
    if(!json.success){
        setEditingError(json.message || "Failed to update profile");
        return;
    }
    await fetchProfile();
    setEditMode(false);
    }
    catch(err){
        console.error("Failed to update profile", err);
        setEditingError("An error occurred while updating the profile.");
    }
  };
  return (
    <div className="p-4 w-full">
      <form className="flex flex-col sm:flex-row sm:gap-10 w-full space-y-4" onSubmit={(e)=>e.preventDefault()}>
        <div>
          <div>
            <Label className="block mb-1 font-medium">Full Name</Label>
            {/* make readOnly depend on editMode */}
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              readOnly
              className="w-full"
            />
          </div>

          <div>
            <Label className="block mb-1 font-medium">Roll Number</Label>
            <Input
              type="text"
              name="rollNumber"
              value={formData.rollNumber}
              onChange={handleChange}
              readOnly
              className="w-full"
            />
          </div>

          <div>
            <Label className="block mb-1 font-medium">Mobile</Label>
            <Input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              readOnly={!editMode}
              className="w-full"
            />
          </div>
        </div>

        <div>
          <div>
            <Label className="block mb-1 font-medium">Email</Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              readOnly
              className="w-full"
            />
          </div>

          <div>
            <Label className="block mb-1 font-medium">Alternate Email</Label>
            <Input
              type="email"
              name="alternateEmail"
              value={formData.alternateEmail}
              onChange={handleChange}
              readOnly={!editMode}
              className="w-full"
              
            />
          </div>

          <div>
            <Label className="block mb-1 font-medium">Gender</Label>

            {/* make Select name "gender" to match formData */}
            <Select
              id="gender"
              name="gender"
              disabled={!editMode}
              value={formData.gender}
              onValueChange={(value) => setFormData((p) => ({ ...p, gender: value }))}
            >
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Select Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Gender</SelectLabel>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="w-fit sm:self-end">
          {editMode ? (
            // set type="button" to avoid accidental form submit or page reload
            <div className="flex gap-2 mt-6">
              <Button type="button" onClick={handleSave}>
                Save
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setFormData({
                    name: profile?.name || "",
                    rollNumber: profile?.rollNumber || "",
                    phone: profile?.phone || "",
                    email: user?.user.email || "",
                    alternateEmail: profile?.alternateEmail || "",
                    gender: profile?.gender || "",
                  });
                  setEditMode(false);
                }}
              >
                Cancel
              </Button>
            </div>
          ) : (
            <Button type="button" className="mt-6" onClick={toggleEditMode}>
              Edit
            </Button>
          )}
            {editingError}
        </div>
      </form>
    </div>
  );
}
export default function Profile() {
    const { profile } = useProfile();
    const user = useAuth();
    const [profileImage, setProfileImage] = useState(profile?.profileImage || 'student.png');
    const [profileImageChanged, setProfileImageChanged] = useState(false);

    const fileInputRef = useRef(null);

    const handleProfileImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result);
            };
            reader.readAsDataURL(file);
            setProfileImageChanged(true);
        }
    };
    const handleCancel = () => {
        setProfileImage(profile?.profileImage || "student.png");
        setProfileImageChanged(false);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleSave = async () => {
        try {
            setProfileImageChanged(false);

            if (fileInputRef.current) fileInputRef.current.value = "";
        } catch (err) {
            console.error("Upload failed", err);
        }
    };
    return (

        <div className="flex flex-col  h-full bg-accent p-4">
            <h1 className="text-2xl text-center font-bold mb-4">Student Profile</h1>
            <div className="flex justify-between items-center mb-4 text-xl">
                Personal Details
            </div>
            <div className="flex flex-col md:flex-row space-x-1 bg-white p-4 rounded shadow-md">
                <div className="flex flex-col items-center p-4">
                    <div className="h-50 w-50  border rounded overflow-hidden flex items-center justify-center">
                        <img src={profileImage} className="h-50 w-50" />
                    </div>
                    <Label htmlFor="profileImage" className="flex items-center justify-center mt-2 py-1 px-4 border  rounded cursor-pointer hover:bg-gray-100">
                        <MdCloudUpload className="mr-2 text-2xl" />
                        <span>Upload</span>
                    </Label>
                    <Input type="file" id="profileImage" className="hidden" onChange={handleProfileImageChange} />
                    {profileImageChanged && (
                        <div>
                            <Button className="mt-2 cursor-pointer" onClick={handleSave}>
                                Save
                            </Button>
                            <Button variant="outline" className="mt-2 ml-2 cursor-pointer" onClick={handleCancel}>
                                Cancel
                            </Button>
                        </div>
                    )}
                </div>
                <div className="sm:border-l">
                    <PersonalDetailsSection profile={profile} user={user} />
                </div>
            </div>
        </div>

    )
}