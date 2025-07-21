import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { NavLink } from "react-router-dom"
import useAuth from "@/hooks/useAuth"
import { useState } from "react";
export function SignUpForm({
  className,
  ...props
}) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  const { signup, loading } = useAuth();
  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      email: formData.email,
      password: formData.password,
      role: props.role
    };
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    signup(userData);
  }
  return (
    <form onSubmit={handleSubmit} className={cn("flex flex-col gap-4", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Register Yourself</h1>
      </div>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" name="email" placeholder="abc@example.com" required value={formData.email} onChange={handleChange} />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Enter Your New Password</Label>
          </div>
          <Input id="password" type="password" name="password" required value={formData.password} onChange={handleChange} />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Confirm Your Password</Label>
          </div>
          <Input id="confirmPassword" type="password" name="confirmPassword" required value={formData.confirmPassword} onChange={handleChange} />
        </div>
        <Button type="submit" className="w-full cursor-pointer" disabled={loading}>
          Create Account
        </Button>
        
      </div>
      <div className="text-center text-sm">
        Already have an account?{" "}
        
        <NavLink to={"/auth/"+props.role+"/login"} className="text-primary"> Log in
        </NavLink>
      </div>
    </form>
  );
}
