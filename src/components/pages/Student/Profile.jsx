import { Button } from "@/components/ui/button";
import { MdCloudUpload } from "react-icons/md";
import useProfile from "@/hooks/useProfile";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useState, useRef } from "react";
import { Select, SelectContent, SelectGroup, SelectLabel, SelectTrigger, SelectValue, SelectItem } from "@/components/ui/select";
import useAuth from "@/hooks/useAuth";
import { API_ENDPOINT } from "@/utils";

function EducationDetailsSection() {
  const { profile, fetchProfile } = useProfile();
  const user = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    course: profile?.course || "",
    stream: profile?.stream || "",
    yearOfPassing: profile?.yearOfPassing || "",
    cgpa: profile?.cgpa || "",
    resumeLink: profile?.resumeLink || "",
  });
  const [editingError, setEditingError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const toggleEditMode = () => setEditMode((v) => !v);

  const handleSave = async (e) => {
    e?.preventDefault?.();
    try {
      const payload = {
        course: formData.course,
        stream: formData.stream,
        yearOfPassing: formData.yearOfPassing,
        cgpa: formData.cgpa,
        resumeLink: formData.resumeLink,
      };
      const response = await fetch(`${API_ENDPOINT}student/${profile.rollNumber}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user?.user?.token || ""}`,
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        console.error("Failed to update education details");
        setEditingError("Failed to update education details");
        return;
      }
      const json = await response.json();
      if (!json.success) {
        setEditingError(json.message || "Failed to update education details");
        return;
      }
      await fetchProfile();
      setEditMode(false);
    } catch (err) {
      console.error("Error updating education details", err);
      setEditingError("An error occurred while updating education details.");
    }
  };

  return (
    <div className="p-4 w-full border-t sm:border-t-0 sm:pt-6">
      <form className="flex flex-col sm:flex-row sm:gap-10 w-full space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="w-full">
          <div>
            <Label className="block mb-1 font-medium">Course</Label>
            <Input
              type="text"
              name="course"
              value={formData.course}
              onChange={handleChange}
              readOnly={!editMode}
              className="w-full"
            />
          </div>

          <div className="mt-3">
            <Label className="block mb-1 font-medium">Stream / Specialization</Label>
            <Input
              type="text"
              name="stream"
              value={formData.stream}
              onChange={handleChange}
              readOnly={!editMode}
              className="w-full"
            />
          </div>
        </div>

        <div className="w-full">
          <div>
            <Label className="block mb-1 font-medium">Year of Passing</Label>
            <Input
              type="number"
              name="yearOfPassing"
              value={formData.yearOfPassing || ""}
              onChange={handleChange}
              readOnly={!editMode}
              className="w-full"
            />
          </div>

          <div className="mt-3">
            <Label className="block mb-1 font-medium">CGPA</Label>
            <Input
              type="number"
              step="0.01"
              name="cgpa"
              value={formData.cgpa || ""}
              onChange={handleChange}
              readOnly={!editMode}
              className="w-full"
            />
          </div>

          <div className="mt-3">
            <Label className="block mb-1 font-medium">Resume Link</Label>
            <Input
              type="text"
              name="resumeLink"
              value={formData.resumeLink}
              onChange={handleChange}
              readOnly={!editMode}
              className="w-full"
            />
          </div>
        </div>

        <div className="w-fit sm:self-end">
          {editMode ? (
            <div className="flex gap-2 mt-6">
              <Button type="button" onClick={handleSave}>
                Save
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setFormData({
                    course: profile?.course || "",
                    stream: profile?.stream || "",
                    yearOfPassing: profile?.yearOfPassing || "",
                    cgpa: profile?.cgpa || "",
                    resumeLink: profile?.resumeLink || "",
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

  // store the currently-displayed image URL (initial fallback)
  const [profileImage, setProfileImage] = useState(profile?.profileImage || "student.png");

  // store a selected File object (no preview)
  const [selectedFile, setSelectedFile] = useState(null);
  const [profileImageChanged, setProfileImageChanged] = useState(false);
  const [uploading, setUploading] = useState(false);

  const fileInputRef = useRef(null);

  // on file selection — we DO NOT create a preview, only keep the File
  const handleProfileImageChange = (e) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) return;
    // optional: validate type/size here
    // if (!file.type.startsWith('image/')) return alert('Please select an image');
    setSelectedFile(file);
    setProfileImageChanged(true);
  };

  const handleCancel = () => {
    setSelectedFile(null);
    setProfileImage(profile?.profileImage || "student.png");
    setProfileImageChanged(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // minimal fetch-based upload to Cloudinary (unsigned preset)
  const handleSave = async () => {
    if (!selectedFile) return alert("No file selected");
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      // Replace below with your unsigned preset
      formData.append("upload_preset", "grain_pallet");

      const cloudName = "dq0joztmo"; // replace
      const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

      const res = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Upload failed: ${res.status} ${errText}`);
      }

      const data = await res.json();
      // data.secure_url is the uploaded image URL
      setProfileImage(data.secure_url);
      setSelectedFile(null);
      setProfileImageChanged(false);

      // clear file input
      if (fileInputRef.current) fileInputRef.current.value = "";
      const body = {
        "profileImage":data.secure_url
      }
      const response = await fetch(`${API_ENDPOINT}student/${profile.rollNumber}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user?.user?.token || ""}`,
        },
        body: JSON.stringify(body),
      });

      if(!response.ok){
        const errText = await response.text();
        throw new Error(`Upload failed: ${response.status} ${errText}`);
      }

    } catch (err) {
      console.error("Upload failed", err);
      alert("Upload failed. See console for details.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col  h-full bg-accent p-4">
      <h1 className="text-2xl text-center font-bold mb-4">Student Profile</h1>
      <div className="flex justify-between items-center mb-4 text-xl">Personal Details</div>

      <div className="flex flex-col md:flex-row space-x-1 bg-white p-4 rounded shadow-md">
        <div className="flex flex-col items-center p-4">
          <div className="h-50 w-50 border rounded overflow-hidden flex items-center justify-center">
            {/* profileImage is a URL (no base64 preview used) */}
            <img src={profileImage} alt="profile" className="h-50 w-50 object-cover" />
          </div>

          <label
            htmlFor="profileImage"
            className="flex items-center justify-center mt-2 py-1 px-4 border rounded cursor-pointer hover:bg-gray-100"
          >
            <MdCloudUpload className="mr-2 text-2xl" />
            <span>Upload</span>
          </label>

          {/* Hidden input, but we connect the ref so we can clear it */}
          <input
            ref={fileInputRef}
            type="file"
            id="profileImage"
            accept="image/*"
            className="hidden"
            onChange={handleProfileImageChange}
          />

          {profileImageChanged && (
            <div>
              <button
                className="mt-2 cursor-pointer bg-blue-600 text-white px-4 py-1 rounded"
                onClick={handleSave}
                disabled={uploading}
              >
                {uploading ? "Uploading..." : "Save"}
              </button>

              <button
                className="mt-2 ml-2 cursor-pointer border px-4 py-1 rounded"
                onClick={handleCancel}
                disabled={uploading}
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        <div className="sm:border-l">
          <PersonalDetailsSection profile={profile} user={user} />
        </div>
      </div>

      <div className="flex justify-between items-center mb-4 mt-4 text-xl">Educational Details</div>

      <div className="flex flex-col md:flex-row space-x-1 bg-white p-4 rounded shadow-md">
        <div className="sm:border-l">
          <EducationDetailsSection />
        </div>
      </div>
    </div>
  );
}
