import { Routes, Route, NavLink, Navigate, useLocation } from "react-router-dom"
import { PiStudentFill } from "react-icons/pi";
import { RiAdminFill } from "react-icons/ri";
import { FaSuitcase } from "react-icons/fa";
import { LoginForm } from "@/components/login-form"
import { SignUpForm } from "@/components/signup-form";

function Tabs() {
    const location = useLocation();
    const activeClassName = ({ isActive }) => isActive ? "bg-primary text-white rounded-lg px-4 py-2" : "px-4 py-2 hover:bg-primary/40 hover:rounded-lg rounded-lg transition-colors duration-200";
    return (
        <div className="flex gap-2 mx-auto  border rounded-lg p-2 items-center">
            <NavLink 
                to="/auth/student/login" 
                className={({ isActive }) => {
                    const isStudentActive = location.pathname.includes('/auth/student');
                    return isStudentActive ? "bg-primary text-white rounded-lg px-4 py-2" : "px-4 py-2 hover:bg-primary/40 hover:rounded-lg rounded-lg transition-colors duration-200";
                }}
            >
                <div className="flex items-center text-xs sm:text-md"><PiStudentFill />Student</div>
            </NavLink>
            <NavLink 
                to="/auth/recruiter/login" 
                className={({ isActive }) => {
                    const isRecruiterActive = location.pathname.includes('/auth/recruiter');
                    return isRecruiterActive ? "bg-primary text-white rounded-lg px-4 py-2" : "px-4 py-2 hover:bg-primary/40 hover:rounded-lg rounded-lg transition-colors duration-200";
                }}
            >
                <div className="flex items-center gap-1 text-xs sm:text-md"><FaSuitcase />Recruiter</div>
            </NavLink>
            <NavLink 
                to="/auth/admin/login" 
                className={({ isActive }) => {
                    const isAdminActive = location.pathname.includes('/auth/admin');
                    return isAdminActive ? "bg-primary text-white rounded-lg px-4 py-2" : "px-4 py-2 hover:bg-primary/40 hover:rounded-lg rounded-lg transition-colors duration-200";
                }}
            >
                <div className="flex items-center gap-1 text-xs sm:text-md"><RiAdminFill />Admin</div>
            </NavLink>
        </div>
    )
}

function Student(){
    return (
        <div className="w-full">
            <Routes>
                <Route path="/" element={<Navigate to="/auth/student/login" replace />} />
                <Route path="login" element={<LoginForm  signuplink="student/signup"/>} />
                <Route path="signup" element={<SignUpForm loginlink="student/login"/>} />
            </Routes>
        </div>
    )
}

function Recruiter(){
    return (
        <div className="w-full">
            <Routes>
                <Route path="/" element={<Navigate to="/auth/recruiter/login" replace />} />
                <Route path="login" element={<LoginForm  signuplink="recruiter/signup"/>} />
                <Route path="signup" element={<SignUpForm loginlink="recruiter/login"/>} />
            </Routes>
        </div>
    )
}

function Admin(){
    return (
        <div className="w-full">
            <Routes>
                <Route path="/" element={<Navigate to="/auth/admin/login" replace />} />
                <Route path="login" element={<LoginForm  isSignUpDisabled/>} />
            </Routes>
        </div>
    )
}

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2 overflow-hidden">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <NavLink to="/" className="flex items-center gap-2 font-medium">
            <div className="text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <img src="/gkvlogo.png" alt="gkv-logo" />
            </div>
            Corporate Affairs & Outreach Cell
          </NavLink>
        </div>
        <div className="flex flex-col gap-10 items-center justify-center pt-10">
            <Tabs></Tabs>
                <Routes>
                <Route path="/" element={<Navigate to="/auth/student" replace />} />
                <Route path="student/*" element={<Student />} />
                <Route path="recruiter/*" element={<Recruiter/>} />
                <Route path="admin/*" element={<Admin/>} />
            </Routes>
            
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="/logo.png"
          alt="Image"
          className="absolute p-8 inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
