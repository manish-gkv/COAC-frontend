import useAuth from "@/hooks/useAuth";
import { SidebarProvider, Sidebar, SidebarTrigger, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter } from "@/components/ui/sidebar";
import { useState } from "react";
import { Link, Routes, Route, useLocation, Navigate } from "react-router-dom";

import { IoMdAddCircleOutline } from "react-icons/io";
import { CgOrganisation } from "react-icons/cg";
import { FaListAlt } from "react-icons/fa";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { MdOutlineDashboardCustomize } from "react-icons/md";

import NotFound from "@/components/pages/NotFound";
import AddJob from "./Addjob";
import JobTable from "./JobTable";
import useProfile from "@/hooks/useProfile";
import CreateProfile from "./CreateProfile";
import Profile from "./Profile";
import Dashboard from "./Dashboard";

export default function Recruiter() {
  const { open, setOpen } = useState(false);
  const { user, logout } = useAuth();
  const { hasProfile , profile} = useProfile();
  const location = useLocation();
  return (
    <div>
      <SidebarProvider open={open} onOpenChange={setOpen}>
        <Sidebar >
          <SidebarHeader>
            <div className="items-center space-x-2 p-2 font-semibold justify-center">
              <div className="text-primary-foreground flex items-center justify-center rounded-md ">
                <img src="/logo.png" alt="gkv-logo"  width={90} />
              </div>
              <div className="text-balance leading-4 text-center">Corporate Affairs & Outreach Cell</div>
            </div>
          </SidebarHeader>
          <SidebarContent className="px-4 ">
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive={location.pathname === "/"}>
                    <Link to="/" className="flex items-center space-x-2 gap-2">
                      <MdOutlineDashboardCustomize />
                      Company Dashboard
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive={location.pathname === "/profile"}>
                    <Link to="/profile" className="flex items-center space-x-2 gap-2">
                      <CgOrganisation />
                      Company Profile
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive={location.pathname === "/new-job"}>
                    <Link to="/new-job" className="flex items-center space-x-2 gap-2">
                      <IoMdAddCircleOutline />
                      Add Job
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive={location.pathname === "/jobs"}>
                    <Link to="/jobs" className="flex items-center space-x-2 gap-2">
                      <FaListAlt />
                      Your Jobs
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <div className="flex items-center px-2">
                  <img src={profile?.logoUrl || "/company.png"} alt="Profile" className="w-8 h-8 rounded-full mr-2" />
                  <div>
                    <div className="font-semibold text-sm">
                      {profile?.companyName || "Guest"}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {user?.email || "abc@gmail.com"}
                    </div>
                  </div>
                </div >
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={logout}>
                  <RiLogoutBoxRLine />
                  Logout
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <main className="w-full">
          <SidebarTrigger className="md:hidden" />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            {!hasProfile && <Route path="create-profile" element={<CreateProfile />} />}
            <Route path="new-job" element={<AddJob />} />
            <Route path="jobs" element={<JobTable />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </SidebarProvider>
      
    </div>
  )
}

