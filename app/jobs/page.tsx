"use client";

import { columns } from "./Columns";
import { DataTable } from "./DataTable";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import * as z from "zod";

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

async function getUsers(): Promise<z.infer<typeof formSchema>[]> {
  try {
    const querySnapshot = await getDocs(collection(db, "jobs"));
    const dataSnap: z.infer<typeof formSchema>[] = querySnapshot.docs.map(
      (doc) => ({
        id: doc.id,
        ...doc.data(),
      })
    );
    return dataSnap;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

export default async function JobsData() {
  const datas = await getUsers();
  return (
    <section className="py-4">
      <div className="container">
        <div></div>
        <h1 className="text-3xl font-bold text-center">Registered Customers</h1>

        <DataTable columns={columns} data={datas} />
      </div>
    </section>
  );
}
