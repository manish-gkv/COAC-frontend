import { Card, CardTitle } from "@/components/ui/card";
import useProfile from "@/hooks/useProfile";
import { JobTable } from "./Jobs";
import { useState, useEffect } from "react";
export default function Dashboard() {
    const { profile } = useProfile();
    const [profileImageUrl, setProfileImageUrl] = useState(profile?.profileImage || "student.png");
    return (
        <div className="flex flex-col h-full p-4 bg-accent">
            <h1 className="text-2xl font-bold mb-4 text-center">Student Dashboard</h1>
            <div>
                <div className="flex flex-row justify-center mb-4">
                    <div className="flex flex-col items-center">
                        <div className="w-32 h-32 mb-4 bg-white rounded-full overflow-hidden">
                            <img src={profileImageUrl} alt="Profile" className="w-32 h-32 object-cover rounded-full" />
                        </div>
                        <h2 className="text-2xl font-semibold text-center text-balance bg-white rounded px-2">{profile?.name || "Student Name"}</h2>
                        <p className="text-xl font-semibold text-center text-balance text-gray-500 bg-white rounded px-2 mt-2">{profile?.rollNumber || "rollNumber"}</p>
                    </div>

                </div>
                <div className="flex flex-row gap-1 sm:gap-2 md:gap-4 px-4 mt-6 w-full justify-center text-[clamp(1rem, 2vw + 0.5rem, 2.5rem)]">
                    <Card className="w-full max-w-sm p-4 ">
                        <CardTitle className="text-sm">Open Jobs</CardTitle>
                        <CardTitle className="text-xl sm:text-2xl md:text-4xl text-primary">4</CardTitle>
                    </Card>
                    <Card className="w-full max-w-sm p-4 ">
                        <CardTitle className="text-sm">Company Listed</CardTitle>
                        <CardTitle className="text-xl sm:text-2xl md:text-4xl text-primary">4</CardTitle>
                    </Card>
                    <Card className="w-full max-w-sm p-4 ">
                        <CardTitle className="text-sm">Applied/Rejected</CardTitle>
                        <CardTitle className="text-xl sm:text-2xl md:text-4xl text-primary">10/4</CardTitle>
                    </Card>
                </div>
                <div className="bg-white rounded-2xl w-full mt-8">

                </div>
            </div>
            <div>
                <div className="flex justify-between items-center mb-4">
                    <div className=" justify-between items-center ">
                        <h2 className="text-3xl font-semibold">Job Listings</h2>
                        <p className="text-sm text-gray-500">See Job Openings here.</p>
                    </div>

                </div>
                <JobTable />
            </div>
        </div>
    )
}