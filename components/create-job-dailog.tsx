"use client";

import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { createJobApplication } from "@/lib/actions/job-applications";

interface CreateJobApplicationDialogProps {
  columnId: string;
  boardId: string;
}


const INITIAL_FORM_DATA = {
  company: "",
    position: "",
    location: "",
    notes: "",
    salary: "",
    jobUrl: "",
    tags: "",
    description: "",
};

export default function CreateJobApplicationDailog({
  columnId,
  boardId,
}: CreateJobApplicationDialogProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    company: "",
    position: "",
    location: "",
    notes: "",
    salary: "",
    jobUrl: "",
    tags: "",
    description: "",
  });


  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      const result = await createJobApplication({...formData, columnId, boardId, tags: formData.tags.split("").map((tag) => tag.trim()).filter((tag) => tag.length > 0),
      });

      if(!result.error) {
        setFormData(INITIAL_FORM_DATA)
        setOpen(false)
      } else {
        console.error("Failed to create Job", result.error);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button variant="outline">
          <Plus />
          Add Job
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Job Application</DialogTitle>
          <DialogDescription>Track a new job application</DialogDescription>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="compnay"> Company *</Label>
                <Input id="compnay" required value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position"> Position *</Label>
                <Input id="position" required value={formData.position} onChange={(e) => setFormData({...formData, position: e.target.value})} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" required value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="salary">Salary</Label>
                <Input id="salary" required value={formData.salary} onChange={(e) => setFormData({...formData, salary: e.target.value})} />
              </div>
            </div>
            <div className="space-y-2">
               <Label htmlFor="jobUrl">Job URL</Label>
                <Input id="jobUrl" placeholder="https://..." required value={formData.jobUrl} onChange={(e) => setFormData({...formData, jobUrl: e.target.value})} />
            </div>
            <div className="space-y-2">
               <Label htmlFor="tags">Tags (comma-seperated)</Label>
                <Input id="tags" placeholder="React, Tailwind, HighPay" value={formData.tags} required onChange={(e) => setFormData({...formData, tags: e.target.value})} />
            </div>
            <div className="space-y-2">
               <Label htmlFor="description">Description</Label>
                <Textarea id="description" value={formData.description} placeholder="breif description of the role" required onChange={(e) => setFormData({...formData, description: e.target.value})} />
            </div>
            <div className="space-y-2">
               <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" value={formData.notes} required onChange={(e) => setFormData({...formData, notes: e.target.value})} />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>Calcel</Button>
            <Button type="submit">Add Application</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
