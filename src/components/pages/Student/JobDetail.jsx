import { IoBag } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { Badge } from "@/components/ui/badge";
import { FaRupeeSign } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { API_ENDPOINT } from "@/utils";
import useAuth from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
export default function JobDetails() {
    const [applied, setApplied] = useState(false);
    const [applyError, setApplyError] = useState(null);
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
        const companyResponse = await fetch(`${API_ENDPOINT}company/${json.data.company}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user?.token || ''}`
            }
        });
        const companyJson = await companyResponse.json();
        setCompanyDetails(companyJson.data);
    }
    const applyForJob = async () => {
        setApplied(true);
        const response = await fetch(`${API_ENDPOINT}job/${jobId}/apply`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user?.token || ''}`
            }
        });
        const json = await response.json();
        if (!response.ok) {
            setApplyError(json.message);
            setApplied(false);
            console.error("Error applying for job:", json.message);
        }
    }
    const fetchApplicationStatus = async () => {
        const response = await fetch(`${API_ENDPOINT}job/${jobId}/apply-status`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user?.token || ''}`
            }
        });
        const json = await response.json();
        if (response.ok && json.data === "applied") {
            setApplied(true);
        }
    };

    useEffect(() => {
        fetchJobDetails(jobId);
        fetchApplicationStatus();
    }, [jobId]);
    
    return (
        <div className="flex flex-col md:flex-row h-full gap-0 p-3 bg-accent">
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
                    <div className="text-md font-bold  text-left text-gray-500">Job Description</div>
                    <p className="text-black text-sm mt-2">
                        {jobDetails?.description}
                    </p>

                </div>
                                
                <div className="mt-4">
                    <div className="text-md font-bold  text-left text-gray-500">Requirements</div>
                    <ul className="list-disc list-inside mt-2 text-sm text-black">
                        <li>CGPA above {jobDetails?.minCgpa}</li>
                        <li>{jobDetails?.passingYear} passouts only</li>
                        <li>Skills: {jobDetails?.skills}</li>
                        <li>Courses: {jobDetails?.eligibleCourses.join(', ')}</li>
                    </ul>

                </div>
                <div className="mt-4">
                    <div className="text-md font-bold  text-left text-gray-500">CTC Breakdown</div>
                    <p className="text-black text-sm mt-2">
                        {jobDetails?.ctcBreakup.split('\n').map((line, index) => (
                            <span key={index}>
                                {line}
                                <br />
                            </span>
                        )) || "No breakdown available."}
                    </p>

                </div>
            </div>
            <div className="md:w-2/5 md:min-h-[580px] bg-white md:ml-4 mt-4 md:mt-0 p-4 rounded-lg sticky top-3 h-fit">
                <div className="text-xl font-bold  text-left text-gray-500">Company</div>
                <div className=" justify-center items-center flex flex-col">
                    <img src={companyDetails?.logoUrl || "/company.png"} alt="Company Logo" className="w-24 h-24 mb-4" />
                    <h3 className="text-2xl font-semibold">{companyDetails?.companyName}</h3>
                    <p className="text-gray-600">{companyDetails?.industryType}</p>
                </div>
                <div>
                    <div className="text-lg font-bold  text-left text-gray-500 ">About Us</div>
                    <p className="text-black text-sm mt-2">
                        {companyDetails?.companyDescription || "No description available."}
                    </p>
                </div>
                <div>
                    <div className="text-lg font-bold  text-left text-gray-500 mt-4">Website</div>
                    <a href={companyDetails?.website || "#"} className="text-blue-600 text-sm mt-2" target="_blank" rel="noopener noreferrer">
                        {companyDetails?.website || "No website available."}
                    </a>
                </div>
                <div className="flex mt-3 justify-center items-center w-full">
                    {applied? (
                        <Button className="w-full px-10 hover:cursor-pointer border" disabled variant="secondary">Already Applied</Button>
                    ) : (
                    <Button className="w-full px-10 hover:cursor-pointer" onClick={applyForJob}>Apply</Button>
                    )}
                    {applyError && <p className="text-red-500 text-sm mt-2">{applyError}</p>}
                </div>
            </div>
        </div>
    );
}