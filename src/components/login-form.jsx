import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { NavLink } from "react-router-dom"
import useAuth from "@/hooks/useAuth"
import { useState } from "react";
export function LoginForm({
  className,
  isSignUpDisabled = false,
  ...props
}) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { login, loading } = useAuth();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      email: formData.email,
      password: formData.password
    };
    login(userData);
  }
  return (
    <form onSubmit={handleSubmit} className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" name="email" placeholder="m@example.com" required value={formData.email} onChange={handleChange} />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a href="" className="ml-auto text-primary text-sm underline-offset-4 hover:underline">
              Forgot your password?
            </a>
          </div>
          <Input id="password" type="password" name="password" required value={formData.password} onChange={handleChange} />
        </div>
        <Button type="submit" className="w-full cursor-pointer" disabled={loading}>
          Login
        </Button>
        
      </div>
      {isSignUpDisabled || (<div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        
        <NavLink to={"/auth/"+props.role+"/signup"} className="text-primary"> Sign up
        </NavLink>
      </div>)}
    </form>
  );
}
