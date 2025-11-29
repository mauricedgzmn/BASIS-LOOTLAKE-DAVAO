"use client"; // This marks this file as a client-side component

import { useState } from "react";
import Image from "next/image";
import { Mail, Lock, Eye, EyeOff, Facebook } from "lucide-react";
import { auth } from "@/app/firebase/config";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter(); // Using useRouter for navigation

  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ------------------------------
  // EMAIL / PASSWORD LOGIN
  // ------------------------------
  const handleLogin = async (e: any) => {
    e.preventDefault();
    setError(""); // Reset the error message
    try {
      await signInWithEmailAndPassword(auth, form.email, form.password);
      router.push("/home"); // Redirect to home page after successful login
    } catch (err: any) {
      console.log(err);
      if (err.code === "auth/invalid-email") {
        setError("Invalid email address.");
      } else if (err.code === "auth/wrong-password") {
        setError("Incorrect password.");
      } else if (err.code === "auth/user-not-found") {
        setError("User not found.");
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  // ------------------------------
  // GOOGLE LOGIN
  // ------------------------------
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push("/home"); // Redirect after Google login
    } catch (err: any) {
      console.log(err);
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d10] text-white flex flex-col">
      {/* Minimal header */}
      <header className="w-full border-b border-white/10 py-4 px-8 flex items-center">
        <h1 className="text-lg font-semibold">LootLakeDavao</h1>
      </header>

      <main className="flex-1 flex flex-col lg:flex-row justify-center items-start gap-12 px-8 py-12 max-w-7xl mx-auto w-full">
        {/* LEFT IMAGE CARD */}
        <div className="hidden lg:block w-full max-w-md">
          <div className="rounded-2xl overflow-hidden shadow-xl border border-white/5">
            <div className="relative w-full h-[420px]">
              <Image
                src="/login-side.jpg"
                alt="Login Image"
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="bg-[#111114] py-4 px-6 border-t border-white/10">
              <div className="text-sm text-gray-400 flex justify-between items-center">
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-300" viewBox="0 0 24 24" fill="none">
                    <path d="M4 12h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M12 4v16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  Elevate your cart experience
                </span>
                <a href="#" className="text-sm text-blue-500">Explore Collection</a>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT FORM CARD */}
        <div className="w-full max-w-lg">
          <div className="bg-[#111114] p-8 rounded-2xl w-full shadow-lg border border-white/5">
            <div className="mb-4">
              <h2 className="text-3xl font-bold">Welcome back</h2>
              <p className="text-sm text-gray-400 mt-2">
                Sign in to continue shopping, track orders, and access your saved lists.
              </p>
            </div>

            {error && (
              <p className="text-red-400 text-sm mb-3">{error}</p>
            )}

            <form className="space-y-4" onSubmit={handleLogin}>
               {/* Email */}
              <div>
                <label className="text-sm text-gray-300 mb-2 block">Email</label>
                <div className="flex items-center gap-2 bg-black rounded-lg px-3 py-2 border border-white/10">
                  <Mail size={18} className="text-gray-400" />
                  <input
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    className="bg-transparent w-full outline-none text-sm"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="text-sm text-gray-300 mb-2 block">Password</label>
                <div className="flex items-center gap-2 bg-black rounded-lg px-3 py-2 border border-white/10">
                  <Lock size={18} className="text-gray-400" />
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={form.password}
                    onChange={handleChange}
                    className="bg-transparent w-full outline-none text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="text-gray-400"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Remember / forgot */}
              <div className="flex items-center justify-between text-sm text-gray-400">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="accent-blue-600" />
                  Remember me
                </label>
                <a href="#" className="text-blue-500">Forgot Password?</a>
              </div>

              {/* Login */}
              <button className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-lg mt-2 font-medium">
                Login
              </button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="border-t border-white/10"></div>
                <p className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#111114] px-4 text-xs text-gray-400">
                  or
                </p>
              </div>

             {/* GOOGLE LOGIN */}
              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 py-2 border border-white/10 rounded-lg bg-black hover:bg-white/5 transition"
                onClick={handleGoogleLogin}
              >
                <svg width="20" height="20" viewBox="0 0 48 48" className="flex-shrink-0">
                  <path fill="#4285F4" d="M24 9.5c3.54 0 6.71 1.23 9.21 3.61l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 12.76 17.74 9.5 24 9.5z"/>
                  <path fill="#34A853" d="M46.08 24.55c0-1.57-.14-3.08-.41-4.55H24v9h12.68c-.55 2.96-2.18 5.48-4.64 7.14l7.59 5.88C43.9 37.82 46.08 31.61 46.08 24.55z"/>
                  <path fill="#FBBC05" d="M10.53 28.41c-.57-1.69-.9-3.49-.9-5.41s.33-3.72.9-5.41l-7.97-6.18C.97 15.02 0 19.38 0 24c0 4.62.97 8.98 2.56 12.59l7.97-6.18z"/>
                  <path fill="#EA4335" d="M24 48c6.48 0 11.93-2.13 15.9-5.81l-7.59-5.88C29.93 38.02 27.11 39 24 39c-6.26 0-11.57-3.26-14.46-8.41l-7.98 6.18C6.51 42.62 14.62 48 24 48z"/>
                </svg>
                <span className="text-sm text-gray-200">Login with Google</span>
              </button>

              {/* FACEBOOK LOGIN */}
              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 py-2 border border-white/10 rounded-lg bg-black hover:bg-white/5 transition"
              >
                <Facebook size={18} className="text-gray-300 flex-shrink-0" />
                <span className="text-sm text-gray-200">Login with Facebook</span>
              </button>

              {/* bottom link */}
              <p className="text-center text-gray-400 text-sm mt-3">
                New here? <a href="/auth/register" className="text-blue-500">Create an account</a>
              </p>
            </form>
          </div>
        </div>
      </main>
      {/* Bottom feature row */}
      <div className="max-w-7xl mx-auto w-full px-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-[#111114] rounded-xl p-6 border border-white/5 shadow-sm">
            <h4 className="text-white font-medium">Secure & Encrypted</h4>
            <p className="text-sm text-gray-400 mt-2">Modern auth with session protection</p>
          </div>
          <div className="bg-[#111114] rounded-xl p-6 border border-white/5 shadow-sm">
            <h4 className="text-white font-medium">Fast Checkout</h4>
            <p className="text-sm text-gray-400 mt-2">Save details for one-click buys</p>
          </div>
          <div className="bg-[#111114] rounded-xl p-6 border border-white/5 shadow-sm">
            <h4 className="text-white font-medium">Wishlist Sync</h4>
            <p className="text-sm text-gray-400 mt-2">Access across devices</p>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="border-t border-white/10 py-10 px-8 text-sm text-gray-400 flex flex-col lg:flex-row justify-between max-w-7xl mx-auto w-full gap-8">
        <div>
          <h3 className="text-white font-semibold mb-2">LootLakeDavao</h3>
          <p>Modern thrift essentials curated for you.</p>
        </div>
        <div>
          <h4 className="text-white font-medium mb-2">Account</h4>
          <ul className="space-y-1">
            <li><a href="/auth/login" className="hover:text-blue-500">Login</a></li>
            <li><a href="/auth/register" className="hover:text-blue-500">Register</a></li>
            <li><a href="#" className="hover:text-blue-500">Orders</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-medium mb-2">Stay in the loop</h4>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="bg-black border border-white/10 rounded-lg px-3 py-2 text-sm"
            />
            <button className="bg-blue-600 hover:bg-blue-700 px-4 rounded-lg text-white text-sm">
              Subscribe
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
