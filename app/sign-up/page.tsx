"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { signUp } from '@/lib/auth/auth-client';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    async function handleSubmit(e: React.FormEvent) {
      e.preventDefault();

      setError("");
      setLoading(true);

      try {
        const result = await signUp.email({
          name,
          email,
          password,
        });
        if(result.error) {
          setError(result.error.message ?? "Failed to sign Up ")
        } else {
          router.push("/dashboard");
        }
      } catch (err) {
        setError("An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    }
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-slate-50/50 p-4">
      <Card className="w-full max-w-md border-slate-200 shadow-xl">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold tracking-tight">Create an account</CardTitle>
          <CardDescription className="text-base">
            Enter your details below to start tracking your job applications
          </CardDescription>
        </CardHeader>
                <form onSubmit={handleSubmit} className="space-y-2">
          <CardContent className="grid gap-5">
            {error && (
              <div className="rounded-md bg-destructive/15 text-sm text-destructive">{error}</div>
            )}
             <div className="grid gap-2">
              <Label htmlFor="name" className="text-sm font-semibold">Name</Label>
              <Input
                id="name"
                type="name"
                placeholder="John D"
                className="h-11"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-sm font-semibold">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                className="h-11"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password" className="text-sm font-semibold">Password</Label>
              <Input
                id="password"
                minLength={8}
                type="password"
                placeholder="••••••••"
                className="h-11"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 pt-2">
            <Button type="submit" disabled={loading} className="w-full h-11 text-base font-medium">
            {loading ? "Creating account..." : "Sign Up"}
            </Button>
            <div className="text-center text-sm text-muted-foreground">
             <p>
               Dont have an account?{" "}
              <Link
                href="/sign-in"
                className="font-semibold text-primary underline-offset-4 hover:underline"
                >
                Sign In
              </Link>
                </p>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
