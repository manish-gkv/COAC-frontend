import useAuth from "@/hooks/useAuth";
import useProfile from "@/hooks/useProfile";

export default function Profile() {
    const { hasProfile, profile } = useProfile();
    console.log("Profile Data:", profile);
    return (
        <div className="flex flex-col  h-full bg-accent p-4">
            <h1 className="text-2xl text-center font-bold mb-4">Recruiter Profile</h1>
            {hasProfile ? (
                <div className="p-4 w-full">
                    <div className="grid grid-cols-1 w-full md:grid-cols-3 bg-white rounded-2xl p-6 gap-4 ">
                        <div className="flex flex-col items-center">
                            {profile.logoUrl ? (
                                <img src={profile.logoUrl} alt="Company Logo" className="w-32 h-32 object-cover rounded-full mb-4" />
                            ) : (
                                <div className="w-32 h-32 bg-gray-200 flex items-center justify-center rounded-full mb-4">
                                    <span className="text-gray-500">Logo</span>
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col justify-center gap-2">
                            <p className="text-sm font-semibold">Company Name: {profile.companyName}</p>
                            <p className="text-sm font-semibold">Industry Type: {profile.industryType}</p>
                            <p className="text-sm font-semibold">Contact Person: {profile.contactPerson}</p>
                            <p className="text-sm font-semibold">Contact Email: {profile.contactEmail}</p>
                        </div>
                        <div className="flex flex-col md:items-end mt-2">
                            <div className={`px-2 py-1 rounded-sm w-fit text-white ${profile.isApproved ? 'bg-green-500' : 'bg-yellow-500'}`}>
                                {profile.isApproved ? 'Verified' : 'Pending Approval'}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Please complete your profile to get started.</p>
            )}
        </div>
    );

    
}