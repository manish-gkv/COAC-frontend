import { TfiMenu } from "react-icons/tfi";
import { TfiClose } from "react-icons/tfi";
import { PiStudentFill } from "react-icons/pi";
import { RiAdminFill } from "react-icons/ri";
import { FaSuitcase } from "react-icons/fa";
import { BiSolidReport } from "react-icons/bi";
import { FaCircle } from "react-icons/fa";
import { Goal } from 'lucide-react';

import { useState } from "react";

import { Badge } from "@/components/ui/badge"
import { Button } from "../ui/button";
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { NavLink } from "react-router-dom";

function Nav() {
    const [isOpen, setIsOpen] = useState(false);
    const navBarList = [
        { id: "overview", label: "Overview" },
        { id: "whyRecruit", label: "Why Recruit" },
        { id: "recuitmentProcess", label: "Recruitment Process" },
        { id: "contactUs", label: "Contact Us" }
    ];
    const handleClickScroll = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };
    return (
        <nav className="flex items-center justify-between p-4 ">
            <div className="flex items-center space-x-2">
                <img src="/gkvlogo.png" alt="Logo" className="h-12" />
                <h1 className="company-name text-lg md:text-xl">Placement Cell</h1>
            </div>
            <div className="hidden sm:flex space-x-4 text-sm md:text-lg text-nowrap">
                {navBarList.map((item, index) => {
                    return (
                        <div
                            key={index}
                            className="font-semibold cursor-pointer hover:bg-primary/10 rounded-xl px-2"
                            onClick={() => handleClickScroll(item.id)}
                        >{item.label}
                        </div>
                    )
                })}
            </div>
            <div className="sm:hidden ">
                {isOpen ? (
                    <TfiClose className="text-xl cursor-pointer" onClick={() => setIsOpen(false)} />
                ) : (<TfiMenu className="text-2xl cursor-pointer" onClick={() => setIsOpen(true)} />)}
                {isOpen && (
                    <div className="absolute top-16 right-4 bg-white shadow-lg rounded-lg p-4">
                        {navBarList.map((item, index) => (
                            <div
                                key={index}
                                className="font-semibold cursor-pointer hover:bg-primary/10 rounded-xl px-2 py-1"
                                onClick={() => {
                                    handleClickScroll(item.id);
                                    setIsOpen(false);
                                }}
                            >
                                {item.label}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </nav>
    )
}

function Hero() {
    return (
        <div id="hero" className="bg-[url('/hero.png')] bg-blend-multiply bg-cover bg-center justify-center items-center h-[87vh]">
            <div className="bg-primary/50 bg-blend-overlay flex flex-col px-4 justify-center items-center py-10 h-full">
                <Badge variant={"secondary"} className="w-fit mx-auto mt-4">
                    Corporate Affairs & Outreach Cell </Badge>
                <h4 className="text-center font-semibold text-white text-balance">A One-Stop Portal for Placements & Internships</h4>
                <h1 className="font-bold text-4xl text-white text-balance tracking-tighter text-center">Welcome to the official recruitment gateway for Gurukul Kangri (Deemed to be University), Haridwar.</h1>
                <p className="hidden sm:block text-center text-lg text-gray-200 text-balance">
                    GKV is a distinguished center of learning where heritage meets innovation. Rooted in the timeless motto “Tamso Ma Jyotirgamaya” (“From darkness, lead me to light”), our students blend academic excellence, integrity, and perseverance. Guided by Vedic values and equipped with modern skills, GKV graduates are prepared to excel, create value, and illuminate the world around them. Let your journey begin here.
                </p>
                <div className="flex flex-col sm:flex-row justify-center w-full px-10 gap-1 sm:gap-4 mt-4">
                    <NavLink to="/auth/student" >
                    <Button variant={"outline"} className="cursor-pointer w-full" >
                        <PiStudentFill className="mr-2" />
                        <div>Student</div>
                    </Button>
                    </NavLink>
                    <NavLink to="/auth/recruiter">
                    <Button variant={"outline"} className="cursor-pointer w-full">
                        <FaSuitcase className="mr-2" />
                        <div>Recruiter</div>
                    </Button>
                    </NavLink>
                    <NavLink to="/auth/admin">
                    <Button variant={"outline"} className="cursor-pointer w-full">
                        <RiAdminFill className="mr-2" />
                        <div>Admin</div>
                    </Button>
                    </NavLink>
                </div>
            </div>
        </div>
    );
}

function Overview(){
    const placementReport =[
        {
            year: "2024-25",
            link: "https://www.gkv.ac.in/wp-content/uploads/2025/07/Total-Selection-2024-2025.pdf"
        },
        {
            year: "2023-24",
            link: "https://www.gkv.ac.in/wp-content/uploads/2024/08/TotalSelection2023_2024.pdf"
        },
        {
            year: "2022-23",
            link: "https://www.gkv.ac.in/wp-content/uploads/2023/07/Total-Selection-2022-2023.pdf"
        },
        {
            year: "2021-22",
            link: "https://www.gkv.ac.in/wp-content/uploads/2022/07/Total-Selection-2021-2022.pdf"
        },
        {
            year: "2020-21",
            link: "https://www.gkv.ac.in/wp-content/uploads/2021/07/Total-Selection-2020-2021.pdf"
        },
        {
            year: "2019-20",
            link: "https://www.gkv.ac.in/wp-content/uploads/2020/07/Total-Selection-2019-2020.pdf"
        }
    ]
    return (
        <div id="overview" className="flex flex-col md:flex-row  gap-4 px-4 py-20 w-fit mx-auto bg-white">
            <div className="flex flex-col sm:flex-row gap-4">
                <Card className="">
                    <CardHeader>
                        <CardTitle className="text-center text-3xl ">About CAOC</CardTitle>
                    </CardHeader>
                    <CardContent>
                        Corporate Affairs & Outreach Cell (CAOC) has an important role to play in the student’s career path. This cell continuously strives to help students in pursuing their career goals by acquiring employment skills and ultimately to attain desired employment. This is accomplished through building a strong partnership amongst industries, students, alumni, and faculty.
                    </CardContent>
                </Card>
                <Card className="">
                    <CardHeader>
                        <CardTitle className="text-center text-3xl">Corporate Connect</CardTitle>
                    </CardHeader>
                    <CardContent>
                        The companies listed in “Fortune-500 Companies”, continues to hunt talent from GKV, despite its popularity as Vedic University. Withholding its Gurukula approach of teaching, Gurukula Kangri (Deemed to be University) is running many professional courses like MCA, MBA, M.Sc., B.Tech., B.Pharma., BBA, B.Sc., etc. with different specialization in addition to its conventional courses. With the sincere efforts of Corporate Affairs and Outreach Cell headed by Dr. Suyash Bhardwaj in strong coordination and support of the University Administration specially Hon’ Vice-Chancellor and The Registrar of University, the cell continues its support to the students by providing a strong platform to start with their career and arranging worthwhile compensation packages.
                    </CardContent>
                </Card>
            </div>
            <div className="flex flex-col gap-2 justify-center items-center">
                {placementReport.map((report, index) => (
                    <a href={report.link} target="_blank" key={index}><div  className="flex items-center w-full gap-2 bg-primary text-white px-4 py-4 text-md font-semibold rounded cursor-pointer text-nowrap">
                        <BiSolidReport/>
                        <div>Placement Report {report.year}</div>
                    </div></a>
                ))}
            </div>
        </div>
    );
}

function WhyRecruit() {
    return (
        <div id="whyRecruit" className="flex flex-col items-center justify-center px-4 py-20 bg-gray-800 text-white max-full mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-balance text-center">Why Recruit from Gurukul?</h2>
            <p className="text-lg text-gray-50 text-center max-w-2xl">
                Gurukul Kangri (Deemed to be University) is a distinguished center of learning where heritage meets innovation. Rooted in the timeless motto “Tamso Ma Jyotirgamaya” (“From darkness, lead me to light”), our students blend academic excellence, integrity, and perseverance. Guided by Vedic values and equipped with modern skills, GKV graduates are prepared to excel, create value, and illuminate the world around them. Let your journey begin here.
            </p>
        </div>
    );
}

function RecruitmentProcess() {
    return (
        <div id="recuitmentProcess" className="flex flex-col items-center justify-center px-4 py-20 bg-white text-black max-w-2xl h-screen max-h-150 mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-balance text-center">Recruitment Process</h2>
            <Card className="w-full h-full ">
                <ScrollArea className="w-full h-full p-2 ">
                    <div className="flex w-full ">
                        <div className="basis-1/2 "></div>
                        <div className="relative flex w-14  bg-white justify-center ">
                            <div
                                className="before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:w-px before:h-full before:bg-black"
                            ><FaCircle></FaCircle></div>
                        </div>
                        <div className="basis-1/2 space-y-2 ">
                            <Badge  >Step 01</Badge>
                            <Card className="py-1 px-4 text-wrap w-fit gap-2">
                                Recruiters interested in hiring will create their online account <span><NavLink to="/auth/recruiter/signup"><Button className="h-auto px-3 py-1 text-xs whitespace-nowrap cursor-pointer">Create</Button></NavLink></span>
                            </Card>
                        </div>
                    </div>
                    <div className="flex w-full">
                        <div className="basis-1/2 flex flex-col space-y-2 items-end">
                            <Badge  >Step 02</Badge>
                            <Card className="py-1 px-4 text-wrap w-fit">
                                Recruiters can now create jobs / internships containing the details of opportunity as required by the Placement Office
                            </Card>
                        </div>
                        <div className="relative flex w-14  bg-white justify-center ">
                            <div
                                className="before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:w-px before:h-full before:bg-black"
                            ><FaCircle></FaCircle></div>
                        </div>
                        <div className="basis-1/2 "></div>
                    </div>
                    <div className="flex w-full">
                        <div className="basis-1/2 "></div>
                        <div className="relative flex w-14  bg-white justify-center ">
                            <div
                                className="before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:w-px before:h-full before:bg-black"
                            ><FaCircle></FaCircle></div>
                        </div>
                        <div className="basis-1/2 space-y-2 ">
                            <Badge  >Step 03</Badge>
                            <Card className="py-1 px-4 text-wrap w-fit">
                                The details of the job are verified by the executive officers.
                            </Card>
                        </div>
                    </div>
                    <div className="flex w-full">
                        <div className="basis-1/2 flex flex-col space-y-2 items-end">
                            <Badge  >Step 04</Badge>
                            <Card className="py-1 px-4 text-wrap w-fit">
                                After successful verification, the job is made available online to the students, as per dates decided by the Placement Office
                            </Card>
                        </div>
                        <div className="relative flex w-14  bg-white justify-center ">
                            <div
                                className="before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:w-px before:h-full before:bg-black"
                            ><FaCircle></FaCircle></div>
                        </div>
                        <div className="basis-1/2 "></div>
                    </div>
                    <div className="flex w-full">
                        <div className="basis-1/2 "></div>
                        <div className="relative flex w-14  bg-white justify-center ">
                            <div
                                className="before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:w-px before:h-full before:bg-black"
                            ><FaCircle></FaCircle></div>
                        </div>
                        <div className="basis-1/2 space-y-2 ">
                            <Badge  >Step 05</Badge>
                            <Card className="py-1 px-4 text-wrap w-fit">
                                Interested students show their willingness to appear for the recruitment process of a company by applying for its Job
                            </Card>
                        </div>
                    </div>
                    <div className="flex w-full">
                        <div className="basis-1/2 flex flex-col space-y-2 items-end">
                            <Badge  >Step 06</Badge>
                            <Card className="py-1 px-4 text-wrap w-fit">
                                Companies can view resumes of interested students and shortlist students using their online account.
                            </Card>
                        </div>
                        <div className="relative flex w-14  bg-white justify-center ">
                            <div
                                className="before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:w-px before:h-full before:bg-black"
                            ><FaCircle></FaCircle></div>
                        </div>
                        <div className="basis-1/2 "></div>
                    </div>
                    <div className="flex w-full">
                        <div className="basis-1/2 "></div>
                        <div className="relative flex w-14  bg-white justify-center ">
                            <div
                                className="before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:w-px before:h-full before:bg-black"
                            ><FaCircle></FaCircle></div>
                        </div>
                        <div className="basis-1/2 space-y-2 ">
                            <Badge  >Step 07</Badge>
                            <Card className="py-1 px-4 text-wrap w-fit">
                                Companies shortlist the selected students for final interview process
                            </Card>
                        </div>
                    </div>
                    <div className="flex w-full">
                        <div className="basis-1/2 flex flex-col space-y-2 items-end">
                            <Badge  >Step 08</Badge>
                            <Card className="py-1 px-4 text-wrap w-fit">
                                Placement Office allots dates to organization for campus interviews based on various details given by companies
                            </Card>
                        </div>
                        <div className="relative flex w-14  bg-white justify-center ">
                            <div
                                className="before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:w-px before:h-full before:bg-black"
                            ><FaCircle></FaCircle></div>
                        </div>
                        <div className="basis-1/2 "></div>
                    </div>
                    <div className="flex w-full">
                        <div className="basis-1/2 "></div>
                        <div className="relative flex w-14  bg-white justify-center ">
                            <div
                                className="before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:w-px before:h-full before:bg-black"
                            ><FaCircle></FaCircle></div>
                        </div>
                        <div className="basis-1/2 space-y-2 ">
                            <Badge  >Step 09</Badge>
                            <Card className="py-1 px-4 text-wrap w-fit ">
                                Organization provide the list of students, they are extending offers to at the end of their interview slot
                            </Card>
                        </div>
                    </div>
                    <div className="flex w-full">
                        <div className="basis-1/2 "></div>
                        <div className="relative flex w-14  bg-white justify-center ">
                            <div
                                className="before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:w-px before:h-full "
                            ><div className="bg-primary rounded-full p-3">
                                <Goal className="text-white text-2xl -mt-1"/>
                            </div></div>
                        </div>
                        <div className="basis-1/2 space-y-2 ">
                            
                        </div>
                    </div>
                </ScrollArea>
            </Card>
        </div>
    );
}

function ContactUs() {
    return (
        <div id="contactUs" className="bg-gray-800 py-20 px-4">
            <div>
                <h2 className="text-3xl font-bold text-white text-center py-10">Contact Us</h2>
            </div>
            <div className="flex flex-col sm:flex-row sm:w-4xl mx-auto gap-6">
                <div className="sm:w-1/2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-center text-2xl"> In-charge of CAOC and Training & Placement Officer</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center">
                            <img src="/suyash.jpg" className="w-100"></img>
                            <p className="text-gray-800 font-semibold text-xl">Dr.Suyash Bhardwaj</p>
                            <p className="text-sm text-gray-500 ">Assistant Professor in the Department of Computer Science & Engineering </p>
                            <p className="text-md text-gray-600 mt-2 font-semibold">Phone: +91 9719580076</p>
                            <p className="text-md text-gray-600 font-semibold">Email: suyash.bhardwaj@gkv.ac.in</p>
                        </CardContent>
                    </Card>
                </div>
                <div className="sm:w-1/2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-center text-2xl">Placement Office</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center">
                            <img src="/suyash.jpg" className="w-100"></img>
                            <p className="text-gray-800 font-semibold text-xl">Gurukul Kangdi Deemed to be University Haridwar</p>
                            <p className="text-sm text-gray-500 ">P.O. Gurukula Kangri, Haridwar-249404</p>
                            <p className="text-md text-gray-600 mt-2 font-semibold">Phone: +91 7300761244, 9719580167</p>
                            <p className="text-md text-gray-600 font-semibold">Email: placement@gkv.ac.in</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

function PastRecruiters() {
    const recruiters = [
        { name: "TCS", logo: "/TCS.png" },
        { name: "Axis Bank", logo: "/Axis-Bank.png" },
        { name: "Deltax", logo: "/Deltax.png" },
        { name: "Wipro", logo: "/Wipro.jpeg" },
        {name: "Hexaview", logo: "/Hexaview.png" },
        { name: "Dhampur Sugar Mills Ltd.", logo: "/Dhampur-Sugar-Mills-Ltd.jpeg" },
        { name: "Unify Cloud", logo: "/download.png" },
        { name: "ITC-LTD", logo: "/ITC-LTD.png" },
        { name: "Learning Routes", logo: "/Learning-Routes.png" },
        { name: "Panasonic", logo: "/Panasonic.jpeg" },
        { name: "godrej-and-boyce-manufacturing", logo: "godrej-and-boyce-manufacturing.webp" },
        { name: "Lloyds", logo: "/Lloyds.png" },
        { name: "Q-Technologies", logo: "/Q-Technologies.png" },
        { name: "Rubico-IT", logo: "/Rubico-IT.png" },
        { name: "Source-InfoTech-Inc.", logo: "/Source-InfoTech-Inc.png" }
        
    ]
    return (
        <div className="flex flex-col items-center justify-center py-20 bg-white text-black">
  <h2 className="text-3xl font-bold mb-4 text-center">Past Recruiters</h2>

  <div className="w-full overflow-hidden">
    <div className="flex animate-scroll-x whitespace-nowrap w-max">
      {/* Repeat recruiters list 2 times for smooth loop */}
      {[...Array(2)].flatMap(() => recruiters).map((recruiter, index) => (
        <div
          key={index}
          className="flex-shrink-0 h-12 px-6 flex items-center justify-center"
        >
          <img
            src={`companies/${recruiter.logo}`}
            alt={recruiter.name}
            className="h-10 object-contain"
          />
        </div>
      ))}
    </div>
  </div>
</div>

    );
}

function Footer() {
    return (
        <div className="bg-gray-800 text-white p-4 text-center">
            <p>&copy; {new Date().getFullYear()} Gurukul Kangri (Deemed to be University). All rights reserved.</p>
        </div>
    );
}

export default function LandingPage() {
    return (
        <div>
            <Nav />
            <Hero />
            <Overview />
            <WhyRecruit />
            <RecruitmentProcess />
            <ContactUs />
            <PastRecruiters />
            <Footer />
        </div>
    )
}