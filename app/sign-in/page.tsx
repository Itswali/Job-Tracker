"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "@/lib/auth/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignIn() {
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
        const result = await signIn.email({
          email,
          password,
        });
        if(result.error) {
          setError(result.error.message ?? "Failed to sign In ")
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
          <CardTitle className="text-3xl font-bold tracking-tight">Sign In</CardTitle>
          <CardDescription className="text-base">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit} className="space-y-2">
          <CardContent className="grid gap-5">
            {error && (
              <div className="rounded-md bg-destructive/15 text-sm text-destructive">{error}</div>
            )}
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
                onChange={(e)=> setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 pt-2">
            <Button type="submit" className="w-full h-11 text-base font-medium" disabled={loading}>
              {loading ?  "Signing in...."  : "Sign In"}
            </Button>
            <div className="text-center text-sm text-muted-foreground">
             <p>
               Dont have an account?{" "}
              <Link
                href="/sign-up"
                className="font-semibold text-primary underline-offset-4 hover:underline"
                >
                Sign Up
              </Link>
                </p>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
