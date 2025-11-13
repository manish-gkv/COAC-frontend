import { useState,useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useNavigate } from "react-router-dom";
import { API_ENDPOINT } from "@/utils";
import useProfile from "@/hooks/useProfile";
import { cn } from "@/lib/utils";


export default function CreateProfile(
  { className, ...props }
){
    const [formData, setFormData] = useState({
        name: '',
        rollNumber: '',
        course: '',
        stream: '',
        yearOfPassing: '',
        cgpa: '',
        resumeLink: ''
    });

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { fetchProfile } = useProfile();

    const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  const handleSubmit =async (event) => {
    setIsLoading(true);
    event.preventDefault();
    const user = localStorage.getItem('user');
    const userData = {
      ...formData,
      user: JSON.parse(user)
    };
    try{
      const response = await fetch(API_ENDPOINT+"student", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${JSON.parse(user).token}`
        },
        body: JSON.stringify(userData)
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const json = await response.json();
      if (json.success) {
        setIsLoading(false);
        await fetchProfile();
        navigate("/");
      }
    } catch (error) {
      setIsLoading(false);
    }
  }


    useEffect(() => {
        const sidebar = document.querySelector('[data-slot="sidebar"]');
        const sidebarTrigger = document.querySelector('[data-slot="sidebar-trigger"]');
        if (sidebarTrigger) sidebarTrigger.style.display = "none";
        if (sidebar) sidebar.style.display = "none";
    
        return () => {
          if (sidebar) sidebar.style.display = ""; // Restore when unmounting
          if (sidebarTrigger) sidebarTrigger.style.display = ""; // Restore when unmounting
        };
      }, []);
    return (
        <div className="flex flex-col items-center justify-center w-full p-4">
      <div className="flex items-center justify-center w-fit gap-2">
        <img src="gkvlogo.png" alt="logo" className="w-15" />
        <h1 className="text-xl font-bold">Corporate Affairs & OutReach Cell</h1>
      </div>
      <form onSubmit={handleSubmit} className={cn("flex flex-col gap-6 mt-10", className)} {...props}>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Create Student profile</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your details below to create your student profile
          </p>
        </div>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="name">Full Name<span className="text-primary">*</span></Label>
            <Input id="name" type="text" name="name" placeholder="Your Full Name" required value={formData.name} onChange={handleChange} />
          </div>
          <div className="grid gap-3">
            <div className="flex items-center">
              <Label htmlFor="industryType">Industry Type<span className="text-primary">*</span></Label>
            </div>
            <Input id="industryType" type="text" name="industryType" required value={formData.industryType} onChange={handleChange} />
          </div>
          <div className="grid gap-3">
            <div className="flex items-center">
              <Label htmlFor="contactPerson">Contact Person<span className="text-primary">*</span></Label>
            </div>
            <Input id="contactPerson" type="text" name="contactPerson" required value={formData.contactPerson} onChange={handleChange} />
          </div>
          <div className="grid gap-3">
            <div className="flex items-center">
              <Label htmlFor="contactEmail">Contact Email<span className="text-primary">*</span></Label>
            </div>
            <Input id="contactEmail" type="email" name="contactEmail" required value={formData.contactEmail} onChange={handleChange} />
          </div>
          <Button type="submit" className="w-full cursor-pointer" disabled={isLoading}>
            Create Profile
          </Button>

        </div>

      </form>

    </div>
    )
}