import { useEffect, useState } from "react";
import { API_ENDPOINT } from "@/utils";
import {
    Table,
    TableHeader,
    TableBody,
    TableFooter,
    TableHead,
    TableRow,
    TableCell,
    TableCaption
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import useAuth from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
export function JobTable() {
    const [jobs, setJobs] = useState([]);
    const [companies, setCompanies] = useState({});
    const { user } = useAuth();
    const navigate = useNavigate();
    const fetchJobs = async () => {
        try{
            const response = await fetch(API_ENDPOINT+"job", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user?.token || ''}`
                }
            });
            if (!response.ok) {
                throw new Error("Failed to fetch jobs");
            }
            const json = await response.json();
            setJobs(json.data);
        }
        catch (error) {
            console.error("Failed to fetch jobs:", error);
        }
    }
    const fetchCompanies = async () => {
        try{
            const response = await fetch(API_ENDPOINT+"company", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user?.token || ''}`
                }
            });
            if (!response.ok) {
                throw new Error("Failed to fetch companies");
            }
            let json = await response.json();
            
            const companyMap = {};
            json.data.forEach((company) => {
                companyMap[company._id] = company.companyName;
            });
            setCompanies((prevCompanies) => ({...companyMap }));
            
        }
        catch (error) {
            console.error("Failed to fetch companies:", error);
        }
    }
    useEffect(() => {
        fetchJobs();
    }, []);
    useEffect(() => {
        fetchCompanies();
    }, [jobs]);
    return (
        <div className="bg-white p-2 border rounded-md">
            <Table className="w-full overflow-x-scroll">
                <TableCaption>List of job openings</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Job Title</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>CTC</TableHead>
                        <TableHead>Skills</TableHead>
                        <TableHead>Courses</TableHead>
                        <TableHead>Passing Year</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Role Type</TableHead>
                        <TableHead>Deadline</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {jobs?.map((job) => (
              <TableRow key={job._id} className="cursor-pointer" onClick={() => navigate(`/job/${job.jobId}`)}>
                <TableCell>{job.jobTitle}</TableCell>
                <TableCell>{companies[job.company]}</TableCell>
                <TableCell>{job.ctc}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-2">
                    {job.skills?.split(',').map((skill, index) => (
                      <Badge key={index} variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">{skill}</Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell >
                  <div className="flex flex-wrap gap-2">
                    {job.eligibleCourses?.map((course, index) => (
                      <Badge key={index} variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">{course}</Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>{job.passingYear || "N/A"}</TableCell>
                <TableCell>{job.location}</TableCell>
                <TableCell>{job.roleType}</TableCell>
                <TableCell>{new Date(job.deadline).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default function Jobs() {
    return (
        <div className="w-full bg-accent min-h-full p-4">
            <div className="w-full p-4">
                <h1 className="text-2xl text-center font-bold mb-4">Job Openings</h1>
            </div>
            <JobTable />
        </div>
    )
}