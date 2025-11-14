import { IoBag } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { Badge } from "@/components/ui/badge";
import { FaRupeeSign } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { API_ENDPOINT } from "@/utils";
import useAuth from "@/hooks/useAuth";
export default function JobDetails() {
    const {jobId} = useParams();
    const { user } = useAuth();
    const [jobDetails, setJobDetails] = useState(null);
    const [companyDetails, setCompanyDetails] = useState(null);
    const fetchJobDetails = async (jobId) => {
        const response = await fetch(`${API_ENDPOINT}job/${jobId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user?.token || ''}`
            }
        });
        const json = await response.json();
        setJobDetails(json.data);
        console.log("Job Details:", json.data);
        const companyResponse = await fetch(`${API_ENDPOINT}company/${json.data.company}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user?.token || ''}`
            }
        });
        const companyJson = await companyResponse.json();
        setCompanyDetails(companyJson.data);
        
        console.log("Company Details:", companyJson.data);
    }
    
    useEffect(() => {
        fetchJobDetails(jobId);
    }, [jobId]);
    
    return (
        <div className="flex flex-col md:flex-row h-full p-4 bg-accent">
            <div className="flex flex-col md:w-3/5 bg-white md:ml-4 mt-4 md:mt-0 p-6 rounded-lg">
                <div className="text-xl font-bold  text-left text-gray-500">Job Details</div>
                <div>
                    <h2 className="text-4xl font-semibold mb-2">{jobDetails?.jobTitle}</h2>
                </div>
                <div className="w-full overflow-x-auto space-x-2 space-y-2 mb-4 ">
                    <Badge variant="outline text-sm">
                        <IoBag className=" text-gray-600" />
                            <span className="ml-2 text-sm text-gray-600">{jobDetails?.roleType}</span>
                    </Badge>
                    <Badge variant="outline text-sm">
                        <FaLocationDot className=" text-gray-600" />
                            <span className="ml-2 text-sm text-gray-600">{jobDetails?.location}</span>
                    </Badge>
                    <Badge variant="outline text-sm">
                        <FaRupeeSign className=" text-gray-600" />
                            <span className="ml-2 text-sm text-gray-600">{jobDetails?.ctc}</span>
                    </Badge>
                </div>
                <div className="mt-4">
                    <div className="text-xl font-bold  text-left text-gray-500">Job Description</div>
                    <p className="text-black mt-2">
                        {jobDetails?.description}
                    </p>

                </div>
                                
                <div className="mt-4">
                    <div className="text-xl font-bold  text-left text-gray-500">Requirements</div>
                    <ul className="list-disc list-inside mt-2 text-black">
                        <li>CGPA above {jobDetails?.minCgpa}</li>
                        <li>{jobDetails?.passingYear} passouts only</li>
                        <li>Skills: {jobDetails?.skills}</li>
                        <li>Courses: {jobDetails?.eligibleCourses.join(', ')}</li>
                    </ul>

                </div>
                <div className="mt-4">
                    <div className="text-xl font-bold  text-left text-gray-500">CTC Breakdown</div>
                    <p className="text-black mt-2">
                        {jobDetails?.ctcBreakdown || "No breakdown available."}
                    </p>

                </div>
            </div>
            <div className="md:w-2/5 bg-white md:ml-4 mt-4 md:mt-0 p-4 rounded-lg">
                <div className="text-xl font-bold  text-left text-gray-500">Company</div>
                <div className="mt-2 justify-center items-center flex flex-col">
                    <img src={companyDetails?.logoUrl || "/company.png"} alt="Company Logo" className="w-24 h-24 object-cover rounded-full mb-4" />
                    <h3 className="text-2xl font-semibold">{companyDetails?.companyName}</h3>
                    <p className="text-gray-600">{companyDetails?.industryType}</p>
                </div>
                <div>
                    <div className="text-xl font-bold  text-left text-gray-500 mt-4">About Us</div>
                    <p className="text-black mt-2">
                        {companyDetails?.companyDescription || "No description available."}
                    </p>
                </div>
                <div>
                    <div className="text-xl font-bold  text-left text-gray-500 mt-4">Website</div>
                    <p className="text-black mt-2">
                        {companyDetails?.website || "No website available."}
                    </p>
                </div>
            </div>
        </div>
    );
}