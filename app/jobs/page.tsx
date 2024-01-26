import { columns } from "./Columns";
import { DataTable } from "./DataTable";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import * as z from "zod";

const jobSchema = z.object({
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

async function getJobs(): Promise<z.infer<typeof jobSchema>[]> {
  try {
    const querySnapshot = await getDocs(collection(db, "jobs"));
    const jobData: z.infer<typeof jobSchema>[] = querySnapshot.docs.map(
      (doc) => ({
        id: doc.id,
        ...doc.data(),
      })
    ) as z.infer<typeof jobSchema>[];
    return jobData;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
}

export default async function JobsData() {
  const jobs = await getJobs();

  return (
    <section className="py-4">
      <div className="container">
        <div></div>
        <h1 className="text-3xl font-bold text-center">Registered Customers</h1>

        <DataTable columns={columns} data={jobs} />
      </div>
    </section>
  );
}
