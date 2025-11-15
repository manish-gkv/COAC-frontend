import { useState, useEffect } from "react";
import { API_ENDPOINT } from "@/utils";
import useAuth from "@/hooks/useAuth";
import {useNavigate} from "react-router-dom";
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
function AppliedJobsTable() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [appliedJobs, setAppliedJobs] = useState([]);
    const fetchAppliedJobs = async () => {
        try{
            const response = await fetch(API_ENDPOINT+"job/applied", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${user?.token || ''}`
                }
            });
            const data = await response.json();
            setAppliedJobs(data.data);
        } catch (error) {
            console.error("Error fetching applied jobs:", error);
        }
    };
    useEffect(() => {
        
        fetchAppliedJobs();
    }, []);
    return (
        <div className="bg-white p-2 border rounded-md">
            <Table className="w-full overflow-x-scroll">
                <TableCaption>List of applied jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Application ID </TableHead>
                        <TableHead>Job Title</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Date Applied</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {/* Map through applied jobs data here */}
                    {appliedJobs.map((job) => (
                        <TableRow key={job.applicationId} className="cursor-pointer" onClick={() => {
                            navigate(`/job/${job.jobId}`);
                        }}>
                            <TableCell>{job.applicationId}</TableCell>
                            <TableCell>{job.jobTitle}</TableCell>
                            <TableCell>{job.companyName}</TableCell>
                            <TableCell>{new Date(job.dateApplied).toLocaleDateString()}</TableCell>
                            <TableCell>{job.status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default function AppliedJobs() {
    return (
        <div className="w-full bg-accent min-h-full p-4">
            <div className="w-full p-4">
                <h1 className="text-2xl text-center font-bold mb-4">Applied Jobs</h1>
            </div>
            <AppliedJobsTable />
        </div>
    );
}