import { Link, Route, Routes, useLocation } from "react-router-dom";
import { useState } from "react";
import useAuth from "@/hooks/useAuth";
import { SidebarProvider, Sidebar, SidebarTrigger, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter } from "@/components/ui/sidebar";

import { CgOrganisation } from "react-icons/cg";
import { FaClipboardCheck } from "react-icons/fa6";
import { FaListAlt } from "react-icons/fa";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import NotFound from "@/components/pages/NotFound";
import StudentDashboard from "./Dashboard";
import StudentProfile from "./Profile";
import CreateStudentProfile from "./CreateProfile";
import AvailableJobs from "./Jobs";
import useProfile from "@/hooks/useProfile";
import JobDetails from "./JobDetail";
import AppliedJobs from "./AppliedJobs";

export default function Student() {
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
                                    Student Dashboard
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton isActive={location.pathname === "/profile"}>
                                <Link to="/profile" className="flex items-center space-x-2 gap-2">
                                    <CgOrganisation />
                                    Student Profile
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton isActive={location.pathname === "/jobs"}>
                                <Link to="/jobs" className="flex items-center space-x-2 gap-2">
                                    <FaListAlt />
                                    Available Jobs
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton isActive={location.pathname === "/applied-jobs"}>
                                <Link to="/applied-jobs" className="flex items-center space-x-2 gap-2">
                                    <FaClipboardCheck />
                                    Applied Jobs
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarContent>
                <SidebarFooter>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <div className="flex items-center px-2">
                                <button
                                    onClick={logout}
                                    className="flex items-center w-full space-x-2 rounded-md px-2 py-2 hover:bg-accent hover:text-accent-foreground">
                                    <RiLogoutBoxRLine />
                                    <span>Logout</span>
                                </button>
                            </div>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarFooter>
            </Sidebar>
            <main className="w-full">
                <SidebarTrigger className="md:hidden" />
                <Routes>
                    <Route path="/" element={<StudentDashboard />} />
                    <Route path="/profile" element={<StudentProfile />} />
                    <Route path="/create-profile" element={<CreateStudentProfile />} />
                    <Route path="/jobs" element={<AvailableJobs />} />
                    <Route path="/job/:jobId" element={<JobDetails />} />
                    <Route path="/applied-jobs" element={<AppliedJobs />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
        </SidebarProvider>
      </div>
    );
  }