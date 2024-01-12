"use client";

import { Container, Box, Text, Separator } from "@radix-ui/themes";
import JobNotice from "./JobNotice";
import { BsTools } from "react-icons/bs";
import { UserData } from "@/types";
import { useEffect, useRef } from "react";
import { AiFillPrinter } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { useReactToPrint } from "react-to-print";

const JobCard: React.FC<{ jobs: UserData[] }> = ({ jobs }) => {
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <div className="mx-10">
      <Button onClick={handlePrint} className="ml-32 my-4">
        Print <AiFillPrinter className="ml-2" />
      </Button>
      <Box
        style={{
          background: "var(--gray-a2)",
          borderRadius: "var(--radius-3)",
        }}
        ref={componentRef}
      >
        <Container>
          {jobs.map((job) => (
            <div key={job.id}>
              <div className="flex justify-between my-4 items-center px-4">
                <Text className="font-bold text text-2xl">
                  ALABERE INTEGRITY STRUCTURED SOLUTIONS
                </Text>

                <div className="flex items-center max-md:hidden">
                  <BsTools />
                  <p className="text-xl">REPAIR CENTER</p>
                </div>
                <Text className="">JOB CARD</Text>
              </div>

              <div className="bg-black h-8 text-white flex items-center pl-4">
                <small>
                  TABLET & PHONE REPAIRE | I.T.CONSULTANCY SERVICES |
                  ELECTRONICS | PC DIAGNOSIS & REPAIR | DATA RECOVERY
                </small>
              </div>

              <div className="py-4 mx-10">
                <div className="flex justify-between">
                  <p>CUSTOMER : </p>
                  <p>{job.fullName}</p>
                </div>

                <div className="flex justify-between">
                  <p>PHONE : </p>
                  <p>{job.phone}</p>
                </div>
                <div className="flex justify-between">
                  <p className="">EMAIL : </p>
                  <p>{job.email}</p>
                </div>
                <div className="flex items-center justify-between pt-4">
                  <p>CARD ID : {job.id}</p>
                  <p>DATE : {job.CreatedAt} </p>
                </div>
              </div>

              <div className="bg-black h-8 text-white flex items-center justify-around pl-4">
                <small>JOB DUE DATE: </small>
                <small>RECIEVED BY:</small>
                <small>TECHNICAL INCHARGE:</small>
              </div>

              <div>
                <p className="text-center my-2">CARD DETAILS</p>
                <div className="flex flex-col gap-4 mx-10">
                  <div className="flex justify-between">
                    <p>Gadget Description (Model-name/sn): </p>
                    <p>{job.gadgetDesc}</p>
                  </div>

                  <div className="flex justify-between">
                    <p>Job Type: </p>
                    <p>{job.jobType}</p>
                  </div>

                  <div className="flex justify-between">
                    <p>Fault(s) Reported & Confirmed: </p>
                    <p>{job.fault}</p>
                  </div>

                  <div className="flex justify-between">
                    <p>Accessories included (if any):</p>
                    <p>{job.acessoriesIncluded}</p>
                  </div>

                  <div className="flex justify-between">
                    <p>Diagnosis Fee (Non-refundable): </p>
                    <p>{job.diagnosis}</p>
                  </div>

                  <div className="flex justify-between">
                    <p>Amount Charged: </p>
                    <p>{job.amountCharged}</p>
                  </div>

                  <div className="flex justify-between">
                    <p>Job Status: </p>
                    <p>{job.status}</p>
                  </div>

                  <div className="flex justify-between">
                    <p>Additional Notes: </p>
                    <p>{job.notes}</p>
                  </div>
                </div>
              </div>
              <Separator my="6" size="4" />
              <div className="mx-10">
                <JobNotice />
              </div>
            </div>
          ))}
        </Container>
      </Box>
    </div>
  );
};

export default JobCard;
