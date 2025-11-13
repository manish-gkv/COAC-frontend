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
import { useEffect, useState } from "react";
import useProfile from "@/hooks/useProfile";
import useAuth from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
export default function JobTable() {
  const [jobs, setJobs] = useState([]);
  const { profile } = useProfile();
  const { user } = useAuth();
  const navigate = useNavigate();

  async function fetchJobs() {
    try {
      const response = await fetch(API_ENDPOINT + "job?company=" + profile?._id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.token || ''}`
        }
      });
      if (response.ok) {
        const json = await response.json();
        if (json.success) {
          setJobs(json.data);
          console.log("Fetched Jobs:", json);
        }
      } else {
        console.error("Failed to fetch jobs:", response.statusText);
      }
    }
    catch (error) {
      console.error("Failed to fetch jobs:", error);
    }
  }
  useEffect(() => {
    fetchJobs();
  }, []);



  return (
    <div className="w-full p-4 space-y-4 ">
      <div className="flex justify-between items-center mb-4">
        <div className=" justify-between items-center ">
          <h2 className="text-3xl font-semibold">Job Listings</h2>
          <p className="text-sm text-gray-500">Manage your job postings here.</p>
        </div>
        <div className="flex justify-end">
          <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white cursor-pointer" onClick={() => navigate('/new-job')}>
            Create New Job
          </Button>
        </div>
      </div>

      <div className="border rounded-md">
        <Table className="w-full overflow-x-scroll">
          <TableHeader>
            <TableRow className="">
              <TableHead>Job Title</TableHead>
              <TableHead>CTC</TableHead>
              <TableHead>Skills</TableHead>
              <TableHead>Courses</TableHead>
              <TableHead>Passing Year</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Role Type</TableHead>
              <TableHead>Deadline</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs?.map((job) => (
              <TableRow key={job._id} className="cursor-pointer">
                <TableCell>{job.jobTitle}</TableCell>
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
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="cursor-pointer " onClick={() => handleEdit(job._id)}>
                      Edit
                    </Button>
                    <Button size="sm" className="cursor-pointer" onClick={() => handleDelete(job._id)}>
                      Delete
                    </Button>

                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={9} className="text-center text-gray-500">
                {jobs.length === 0 ? "No jobs available." : `${jobs.length} job(s) found.`}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
}