"use client"
import { Column, JobApplication } from "@/lib/models/models.types";
import { Card, CardContent } from "./ui/card";
import { Edit2, ExternalLink, MoreVertical, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { updateJobApplication } from "@/lib/actions/job-applications";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle} from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useState } from "react";

interface JobApplicationCardProps {
  job: JobApplication;
  columns: Column[];
}

export default function JobApplicationCard({
  job,
  columns,
}: JobApplicationCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    company: job.company,
    position: job.position,
    location: job.location || "",
    notes: job.notes || "",
    salary: job.salary || "",
    jobUrl: job.jobUrl || "",
    columnId: job.columnId || "",
    tags: job.tags?.join(", ") || "",
    description: job.description || "",
  });


  async function handleUpdate(e: React.FormEvent){
    e.preventDefault();
    try {
      const result = await updateJobApplication(job._id, {
        ...formData,
        tags: formData.tags.split(",").map((tag) => tag.trim()).filter((tag) => tag.length > 0)
      });

      if(!result.error) {
        setIsEditing(false);
      }
    } catch (err) {
      console.error("Failed to move job application: ", err)
    }
  }

  async function handleMove(newColumnId: string){
    try {
      const result = await updateJobApplication(job._id, {
        columnId: newColumnId,
      })
    } catch (err) {
      console.error("Failed to move job application: ", err)
    }
  }


  return (
    <>
      <Card className="group hover:border-indigo-400 transition-all duration-200 shadow-sm hover:shadow-md cursor-grab active:cursor-grabbing">
        <CardContent className="p-4">
          <div className="flex justify-between items-start gap-3">
            {/* Left Side: Content */}
            <div className="flex-1 min-w-0">
              <h3
                className="font-semibold text-gray-900 leading-tight truncate mb-1"
                title={job.position}
              >
                {job.position}
              </h3>
              <p className="text-sm text-gray-600 font-medium mb-2">
                {job.company}
              </p>

              {/* Description Snippet */}
              {job.description && (
                <p className="text-xs text-gray-400 line-clamp-2 mb-3 italic">
                  {job.description}
                </p>
              )}

              {/* Tags Section */}
              {job.tags && job.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-2">
                  {job.tags.map((tag, key) => (
                    <span
                      key={key}
                      className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-[10px] font-semibold rounded-full uppercase tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Links */}
              {job.jobUrl && (
                <a
                  target="_blank"
                  href={job.jobUrl}
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 text-xs text-indigo-600 hover:text-indigo-800 hover:underline font-medium"
                >
                  <ExternalLink className="h-3 w-3" />
                  View Posting
                </a>
              )}
            </div>

            {/* Right Side: Actions */}
            <div className="flex flex-col items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-gray-400 hover:text-gray-900"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem className="cursor-pointer" onClick={() => setIsEditing(true)}>
                    <Edit2 className="mr-2 h-4 w-4" /> Edit Details
                  </DropdownMenuItem>

                  {columns.length > 1 && (
                    <>
                      <div className="h-px bg-gray-100 my-1" />
                      {columns
                        .filter((c) => c._id !== job.columnId)
                        .map((column, key) => (
                          <DropdownMenuItem
                            key={key}
                            className="cursor-pointer pl-6"
                          onClick={() => handleMove(column._id)}>
                        <p className="px-2 py-1.5 text-[10px] font-bold text-gray-400 uppercase">Move to </p>
                       {column.name}
                          </DropdownMenuItem>
                        ))}
                    </>
                  )}

                  <div className="h-px bg-gray-100 my-1" />
                  <DropdownMenuItem className="text-red-600 focus:text-red-600 cursor-pointer">
                    <Trash2 className="mr-2 h-4 w-4" /> Delete Application
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Job Application</DialogTitle>
                <DialogDescription>Track a new job application</DialogDescription>
              </DialogHeader>
              <form className="space-y-4" onSubmit={handleUpdate}>
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
                      <Input id="jobUrl" placeholder="https://..."  value={formData.jobUrl} onChange={(e) => setFormData({...formData, jobUrl: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                     <Label htmlFor="tags">Tags (comma-seperated)</Label>
                      <Input id="tags" placeholder="React, Tailwind, HighPay" value={formData.tags} required onChange={(e) => setFormData({...formData, tags: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                     <Label htmlFor="description">Description</Label>
                      <Textarea id="description" value={formData.description} placeholder="breif description of the role" onChange={(e) => setFormData({...formData, description: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                     <Label htmlFor="notes">Notes</Label>
                      <Textarea id="notes" value={formData.notes} onChange={(e) => setFormData({...formData, notes: e.target.value})} />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setOpen(false)}>Calcel</Button>
                  <Button type="submit">Save Changes</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
    </>
  );
}
