import useAuth from "@/hooks/useAuth";

import Recruiter from "./Recruiter/Recruiter";

export default function Home() {
  const { user } = useAuth();
  return (
    <div>
      <Recruiter />
    </div>
  );
}
