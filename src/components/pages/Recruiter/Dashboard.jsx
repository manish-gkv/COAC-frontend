import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import useProfile from "@/hooks/useProfile";
import JobTable from "./JobTable";

export default function Dashboard() {
    const { hasProfile, profile } = useProfile();
    return (
        <div className="flex flex-col h-full p-4 bg-accent">
            <h1 className="text-2xl font-bold mb-4 text-center">Dashboard</h1>
            {hasProfile ? (
                <div>
                    <div className="flex flex-row justify-center mb-4">
                        <div className="flex flex-col items-center">
                            {profile.logoUrl ? (
                                <img src={profile.logoUrl} alt="Company Logo" className="w-32 h-32 object-cover rounded-full mb-4" />
                            ) : (
                                <div className="w-32 h-32 bg-gray-200 flex items-center justify-center rounded-full mb-4">
                                    <span className="text-gray-500">Logo</span>
                                </div>
                            )}
                        </div>
                        
                    </div>
                    <div className="flex flex-row gap-1 sm:gap-2 md:gap-4 px-4 mt-6 w-full justify-center text-[clamp(1rem, 2vw + 0.5rem, 2.5rem)]">
                       <Card className="w-full max-w-sm p-4 ">
                           <CardTitle className="text-sm">Open Jobs</CardTitle>
                           <CardTitle className="text-xl sm:text-2xl md:text-4xl text-primary">4</CardTitle>
                       </Card>
                       <Card className="w-full max-w-sm p-4 ">
                           <CardTitle className="text-sm">Active Candidates</CardTitle>
                           <CardTitle className="text-xl sm:text-2xl md:text-4xl text-primary">4</CardTitle>
                       </Card>
                       <Card className="w-full max-w-sm p-4 ">
                           <CardTitle className="text-sm">Offer Out/Accepted</CardTitle>
                           <CardTitle className="text-xl sm:text-2xl md:text-4xl text-primary">10/4</CardTitle>

                       </Card>
                       
                    </div>
                    <div className="bg-white rounded-2xl w-full mt-8">
                        <JobTable />
                    </div>
                </div>
            ) : (
                <p>Please complete your profile to get started.</p>
            )}
        </div>
    );
}