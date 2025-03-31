"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const result = await signIn("credentials", {
                redirect: false,
                email,
                password,
            });

            if (result?.error) {
                setError("Invalid email or password");
                setIsLoading(false);
                return;
            }

            router.push("/");
        } catch (error) {
            setError("An error occurred. Please try again.");
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-black text-white min-h-screen">
            <Navbar />
            <div className="flex min-h-screen items-center justify-center p-4">
                <div className="w-full max-w-md space-y-6 bg-gray-900 p-6 rounded-lg shadow-lg">
                    <h2 className="text-center text-2xl font-semibold">Login to continue</h2>
                    <p className="text-center text-sm text-gray-400">Sign in to your account to access this feature</p>

                    {error && (
                        <Alert variant="destructive">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@example.com"
                                className="bg-gray-800 text-white border-gray-600"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">Password</Label>
                                <Link href="/forgot-password" className="text-sm text-blue-400 hover:underline">
                                    Forgot password?
                                </Link>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                className="bg-gray-800 text-white border-gray-600"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                            {isLoading ? "Signing in..." : "Sign in"}
                        </Button>
                    </form>

                    <Separator className="my-4 border-gray-600" />

                    <div className="space-y-4">
                        <Button
                            variant="outline"
                            className="w-full border-gray-600 text-white hover:bg-gray-700"
                            onClick={() => signIn("google")}
                            disabled={isLoading}
                        >
                            Sign in with Google
                        </Button>
                    </div>

                    <div className="text-center text-sm text-gray-400">
                        Don&apos;t have an account?{" "}
                        <Link href="/register" className="text-blue-400 hover:underline">
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
