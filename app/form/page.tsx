"use client";

import { useEffect, useState } from "react";
import { Container, Card } from "@radix-ui/themes";
import { collection, addDoc } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { UserData } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import JobCard from "../card/JobCard";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SelectTrigger } from "@radix-ui/react-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  fullName: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  phone: z.string().min(11).max(11),
  email: z.string().email(),
  gadgetDesc: z.string(),
  jobType: z.enum(["Repair", "Diagnosis"]),
  fault: z.string(),
  acessoriesIncluded: z.string(),
  diagnosis: z.string(),
  amountCharged: z.string(),
  amountPaid: z.string(),
  status: z.string(),
  notes: z.string(),
  id: z.string(),
  CreatedAt: z.string(),
});

const JobRegistration: React.FC = () => {
  // Defining the form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      gadgetDesc: "",
      fault: "",
      acessoriesIncluded: "",
      diagnosis: "",
      amountCharged: "",
      amountPaid: "",
      status: "",
      notes: "",
      id: "",
      CreatedAt: "",
    },
  });

  const [submissionStatus, setSubmissionStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const { toast } = useToast();

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let seconds = date.getSeconds();

    try {
      const docRef = await addDoc(collection(db, "jobs"), {
        fullName: values.fullName,
        phone: values.phone,
        email: values.email,
        gadgetDesc: values.gadgetDesc,
        jobType: values.jobType,
        fault: values.fault,
        acessoriesIncluded: values.acessoriesIncluded,
        diagnosis: values.diagnosis,
        amountCharged: values.amountCharged,
        amountPaid: values.amountPaid,
        status: values.status,
        notes: values.notes,
        CreatedAt: `${day}-${month}-${year}  Time: ${hour}:${minute}:${seconds}`,
      });

      setSubmissionStatus("success");

      toast({
        title: "Done",
        description: "Job Created Successfully",
        variant: "destructive",
      });

      const docId = docRef.id;
      // console.log(docId);
      getPost(docId);
    } catch (error) {
      setSubmissionStatus("error");

      console.error("Error:", error);
    }

    // console.log(values);
  };

  const [jobs, setJobs] = useState<UserData[]>([]);

  const getPost = async (docId: string) => {
    try {
      const docRef = doc(db, "jobs", docId);
      const docSnap = await getDoc(docRef);
      const newJob = docSnap.data() as UserData;

      setJobs([newJob]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  if (submissionStatus === "success") {
    return <JobCard jobs={jobs} />;
  }

  return (
    <div className="mx-8">
      <Card size="5" my="5">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="max-sm:flex-col w-full flex gap-8">
              <div className="max-w-md w-full flex flex-col gap-4">
                <h1 className="text-xl font-semibold">Customer Details</h1>
                {/* fullName section */}
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>FullName:</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="FullName"
                            type="text"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                {/* Phone Section */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Phone Number:</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Phone Number"
                            type="tel"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                {/* email section */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Email:</FormLabel>
                        <FormControl>
                          <Input placeholder="Email" type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>

              <div className="max-w-md w-full flex flex-col gap-4">
                {/* Gadget Description section */}
                <h1 className="text-xl font-semibold">Gadget Details</h1>
                <FormField
                  control={form.control}
                  name="gadgetDesc"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Phone type and Model:</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Model-Name/SN"
                            type="text"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                {/* Job Description section */}

                <FormField
                  control={form.control}
                  name="jobType"
                  render={({ field }) => {
                    return (
                      <FormItem className="flex flex-col">
                        <FormLabel>Job Type:</FormLabel>
                        <Select onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger className="border h-9 rounded-md">
                              <SelectValue placeholder="Select JobType" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Repair">Repair</SelectItem>
                            <SelectItem value="Diagnosis">Diagnosis</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                {/* Fault section */}
                <FormField
                  control={form.control}
                  name="fault"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Phone Problems:</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Problems With Phone"
                            type="text"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                {/* Accessories Included Section */}
                <FormField
                  control={form.control}
                  name="acessoriesIncluded"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>
                          Any Other Accessories Included if any:
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Accessories Included"
                            type="text"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                {/* Additional Notes Section */}
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Additional Notes:</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Other Phone Functionality"
                            type="text"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>

              <div className="max-w-md w-full flex flex-col gap-4">
                {/* Diagnosis Section */}
                <h1 className="text-xl font-semibold">Payment Details</h1>
                <FormField
                  control={form.control}
                  name="diagnosis"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Diagnosis Fee:</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Diagnosis Fee"
                            type="text"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                {/* Amount Charged section */}
                <FormField
                  control={form.control}
                  name="amountCharged"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Amount Charged:</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Amount Charged"
                            type="text"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                {/* Amount Paid Section */}
                <FormField
                  control={form.control}
                  name="amountPaid"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Paid Amount:</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Amount Paid"
                            type="text"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                {/* Job Status Section */}
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Job Satus:</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Pending / Done"
                            type="text"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-8">
              <Button type="submit" className="w-1/2 m-auto">
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default JobRegistration;
