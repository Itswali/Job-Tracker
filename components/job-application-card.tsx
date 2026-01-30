import { Column, JobApplication } from "@/lib/models/models.types";
import { Card } from "./ui/card";

interface JobApplicationCardProps {
  job: JobApplication;
  columns: Column[];
}

export default function JobApplicationCard({job, columns}: JobApplicationCardProps) {

  return (
    <>
    <Card></Card>
    </>
  );
}
