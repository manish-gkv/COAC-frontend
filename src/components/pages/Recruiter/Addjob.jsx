import { useState } from "react";
import useAuth from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectGroup, SelectLabel, SelectTrigger, SelectValue, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox";

import { courses } from "@/utils";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

import { API_BASE_URL } from "@/utils";
import { Nav } from "react-day-picker";

function JobForm() {
    const { user } = useAuth();
    const [openCalendar, setOpenCalendar] = useState(false);
    const [loading, setLoading] = useState(false);
    const location = useNavigate();
    const emptyForm = {
        jobTitle: '',
        description: '',
        ctc: '',
        ctcBreakup: '',
        location: '',
        eligibleCourses: [],
        skills: [],
        passingYear: 2026,
        roleType: 'full-time',
        minCgpa: 6.0,
        deadline: new Date(),
    }
    const [formData, setFormData] = useState(emptyForm);
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleSubmit = async (event) => {
        setLoading(true);
        event.preventDefault();
        const jobData = {
            ...formData,
        };
        if(!jobData.eligibleCourses.length) {
            alert("Please select at least one eligible course.");
            setLoading(false);
            return;
        }
        try {
            const response = await fetch(`${API_BASE_URL}/api/v1/job`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                },
                body: JSON.stringify(jobData),
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const json = await response.json();
            if (json.success) {
                setFormData(emptyForm);
                setTimeout(() => {
                    location(`/job/${json.data.jobId}`);
                }, 0);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <form className="w-full max-w-lg" onSubmit={handleSubmit}>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Add New Job</h1>
                <p className="text-muted-foreground text-sm text-balance">
                    Enter the job details below to add a new job
                </p>
            </div>
            <div className="grid gap-4 mt-2">
                <div className="grid gap-3">
                    <Label htmlFor="jobTitle">Job Title<span className="text-primary">*</span></Label>
                    <Input id="jobTitle" type="text" name="jobTitle" placeholder="Software Engineer" required value={formData.jobTitle} onChange={handleChange} />
                </div>
                <div className="grid gap-3">
                    <div className="flex items-center">
                        <Label htmlFor="description">Job Description<span className="text-primary">*</span></Label>
                    </div>
                    <Textarea id="description" name="description" required value={formData.description} onChange={handleChange} />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="ctc">CTC (Cost to Company)<span className="text-primary">*</span></Label>
                    <Input id="ctc" type="number" name="ctc" placeholder="ex: 600000" step="100000" required value={formData.ctc} onChange={handleChange} />
                </div>
                <div className="grid gap-3">
                    <div className="flex items-center">
                        <Label htmlFor="ctcBreakup">CTC Breakup<span className="text-primary">*</span></Label>
                    </div>
                    <Textarea id="ctcBreakup" name="ctcBreakup" required value={formData.ctcBreakup} onChange={handleChange} />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="location">Job Location<span className="text-primary">*</span></Label>
                    <Input id="location" type="text" name="location" placeholder="ex: Bangalore, Gurgaon, Noida" required value={formData.location} onChange={handleChange} />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="eligibleCourses">Eligible Courses<span className="text-primary">*</span></Label>
                    <ScrollArea className="h-32 border rounded-md">
                        <div className="grid gap-2 m-2">
                            {courses.map((course, index) => (
                                <div key={index} className="flex items-center">
                                    <Checkbox
                                        id={course}
                                        name="eligibleCourses"
                                        className="cursor-pointer"
                                        value={course}
                                        checked={formData.eligibleCourses.includes(course)}
                                        onCheckedChange={(checked) => {
                                            const newCourses = checked
                                                ? [...formData.eligibleCourses, course]
                                                : formData.eligibleCourses.filter(c => c !== course);
                                            setFormData({ ...formData, eligibleCourses: newCourses });
                                        }}
                                    />
                                    <Label htmlFor={course} className="ml-2">{course}</Label>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="skills">Skills<span className="text-primary">*</span></Label>
                    <Input id="skills" type="text" name="skills" placeholder="ex: JavaScript, React, Node.js" required value={formData.skills} onChange={handleChange} />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="passingYear">Graduation Year<span className="text-primary">*</span></Label>
                    <Input id="passingYear" type="number" name="passingYear" min={2025} max={2027} step={1} placeholder="ex: 2023" required value={formData.passingYear} onChange={handleChange} />
                </div>
                <div className="flex justify-between gap-2">
                    <div className="grid gap-3">
                        <Label htmlFor="roleType">Job Type<span className="text-primary">*</span></Label>
                        <Select id="roleType" name="roleType" value={formData.roleType} onValueChange={(value) => setFormData({ ...formData, roleType: value })}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Role Type</SelectLabel>
                                    <SelectItem value="full-time">Full-Time</SelectItem>
                                    <SelectItem value="internship">Internship</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="minCgpa">Minimum CGPA<span className="text-primary">*</span></Label>
                        <Input id="minCgpa" type="number" name="minCgpa" min={0} max={10} step={0.1} placeholder="ex: 6.5" required value={formData.minCgpa} onChange={handleChange} />
                    </div>
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="deadline">Application Deadline<span className="text-primary">*</span></Label>
                    <Popover open={openCalendar} onOpenChange={setOpenCalendar}>
                        <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full">
                                {formData.deadline ? formData.deadline.toLocaleDateString() : "Select Date"}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={formData.deadline}
                                onSelect={(date) => {
                                    setFormData({ ...formData, deadline: date });
                                    setOpenCalendar(false);
                                }}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </div>
                <Button type="submit" className="w-full cursor-pointer" disabled={loading}>
                    Add Job
                </Button>
            </div>

        </form>
    )
}

export default function AddJob() {
    return (
        <div className="flex flex-col p-4 items-center justify-center">
            <JobForm />
        </div>
    );
}
