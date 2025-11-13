import useAuth from "@/hooks/useAuth";

import Recruiter from "./Recruiter/Recruiter";
import Student from "./Student/Student";
import Admin from "./Admin/Admin";

export default function Home() {
  const { user } = useAuth();
  return (
    <div>
      {user?.role === "company" && <Recruiter />}
      {user?.role === "student" && <Student />}
      {user?.role === "admin" && <Admin />}
    </div>
  );
} 