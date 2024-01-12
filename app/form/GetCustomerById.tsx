"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { UserData } from "@/types";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";
import JobCard from "../card/JobCard";
import { MdOutlineError } from "react-icons/md";
import { useRouter } from "next/navigation";

const GetCustomerById = () => {
  const [jobs, setJobs] = useState<UserData[]>([]);
  const [customerId, setCustomerId] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const docRef = doc(db, "jobs", customerId);
      const docSnap = await getDoc(docRef);
      const newJob = docSnap.data() as UserData;

      setJobs([newJob]);
      setSubmissionStatus("success");
    } catch (error) {
      // console.error("Error fetching data:", error);
      setSubmissionStatus("error");
    }
  };

  const handleCustomerIdChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCustomerId(event.target.value);
  };

  const handleBackButtonClick = () => {
    window.history.back();
    // router.push("/");
  };

  if (submissionStatus === "success") {
    return <JobCard jobs={jobs} />;
  } else if (submissionStatus === "error") {
    return (
      <div className="h-96 w-full flex flex-col justify-center items-center">
        <p className="text-2xl">Error retrieving data. Please try again.</p>
        <MdOutlineError className="h-16 w-16" />
        <Button onClick={handleBackButtonClick}>Go Back</Button>
      </div>
    );
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col justify-center items-center mt-[6rem]"
      >
        <h1 className="font-bold text-3xl mb-12">Get Customer by Id</h1>
        <div className="w-full flex items-center justify-center gap-6 max-sm:flex-col">
          <div className="input max-sm:w-[80%]">
            <svg
              fill="#000000"
              spacing="4"
              className="svg"
              height="30px"
              width="30px"
              version="1.1"
              id="Capa_1"
              viewBox="-48.84 -48.84 586.08 586.08"
              stroke="#000000"
            >
              <g id="SVGRepo_bgCarrier"></g>
              <g id="SVGRepo_tracerCarrier"></g>
              <g id="SVGRepo_iconCarrier">
                <g>
                  <g>
                    <path d="M0,203.25c0,112.1,91.2,203.2,203.2,203.2c51.6,0,98.8-19.4,134.7-51.2l129.5,129.5c2.4,2.4,5.5,3.6,8.7,3.6 s6.3-1.2,8.7-3.6c4.8-4.8,4.8-12.5,0-17.3l-129.6-129.5c31.8-35.9,51.2-83,51.2-134.7c0-112.1-91.2-203.2-203.2-203.2 S0,91.15,0,203.25z M381.9,203.25c0,98.5-80.2,178.7-178.7,178.7s-178.7-80.2-178.7-178.7s80.2-178.7,178.7-178.7 S381.9,104.65,381.9,203.25z"></path>
                  </g>
                </g>
              </g>
            </svg>
            <Input
              type="search"
              name=""
              id=""
              className="mx-3"
              placeholder="Search By Customer Id"
              value={customerId}
              onChange={handleCustomerIdChange}
            />
          </div>
          <Button type="submit">Get Customer</Button>
        </div>
      </form>
    </div>
  );
};

export default GetCustomerById;
