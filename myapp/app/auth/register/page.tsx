"use client";

import { useState } from "react";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  Facebook,
} from "lucide-react";

import { auth, googleProvider } from "@/app/firebase/config";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // FORM VALUES
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  // ERROR MESSAGE
  const [error, setError] = useState("");

  // LOADING
  const [loading, setLoading] = useState(false);

  //--------------------------------------------------------------------
  // HANDLE EMAIL + PASSWORD REGISTER
  //--------------------------------------------------------------------
  const handleRegister = async (e: any) => {
    e.preventDefault();
    setError("");

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      await createUserWithEmailAndPassword(auth, email, password);

      router.push("/auth/login"); 
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  //--------------------------------------------------------------------
  // GOOGLE REGISTER
  //--------------------------------------------------------------------
  const handleGoogle = async () => {
    try {
      setLoading(true);
      await signInWithPopup(auth, googleProvider);
      router.push("/");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d10] text-white flex flex-col">
      {/* Top Navigation - CLEAN MINIMAL HEADER */}
      <header className="w-full border-b border-white/10 py-4 px-8 flex items-center">
        <h1 className="text-lg font-semibold">LootLakeDavao</h1>
      </header>

      <main className="flex-1 flex flex-col lg:flex-row justify-center items-start gap-12 px-8 py-12 max-w-7xl mx-auto">
        
        {/* LEFT FORM CARD */}
        <div className="bg-[#111114] p-10 rounded-2xl w-full max-w-lg shadow-lg border border-white/5">

          <h2 className="text-3xl font-bold mb-3">Create your account</h2>
          <p className="text-sm text-gray-400 mb-8">
            Join LootLakeDavao to track orders, save favorites, and enjoy exclusive drops.
          </p>

          {/* ERROR MESSAGE */}
          {error && (
            <p className="bg-red-500/20 text-red-400 p-2 rounded mb-4 text-sm">
              {error}
            </p>
          )}

          <form className="space-y-4" onSubmit={handleRegister}>
            
            {/* Full Name */}
            <div>
              <div className="flex items-center gap-2 bg-black rounded-lg px-3 py-2 border border-white/10">
                <User size={18} className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Full Name"
                  className="bg-transparent w-full outline-none text-sm"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <div className="flex items-center gap-2 bg-black rounded-lg px-3 py-2 border border-white/10">
                <Mail size={18} className="text-gray-400" />
                <input
                  type="email"
                  placeholder="Email address"
                  className="bg-transparent w-full outline-none text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center gap-2 bg-black rounded-lg px-3 py-2 border border-white/10">
                <Lock size={18} className="text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="bg-transparent w-full outline-none text-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <div className="flex items-center gap-2 bg-black rounded-lg px-3 py-2 border border-white/10">
                <Lock size={18} className="text-gray-400" />
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm Password"
                  className="bg-transparent w-full outline-none text-sm"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="text-gray-400"
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Agreement */}
            <label className="flex items-center gap-2 text-xs text-gray-400 mt-2">
              <input type="checkbox" className="accent-blue-600" required />
              I agree to the{" "}
              <a className="text-blue-500" href="#">
                Terms & Conditions
              </a>{" "}
              and{" "}
              <a className="text-blue-500" href="#">
                Privacy Policy
              </a>
              .
            </label>

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-2 rounded-lg mt-4"
            >
              {loading ? "Creating account..." : "Register"}
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="border-t border-white/10"></div>
              <p className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#111114] px-4 text-xs text-gray-400">
                or continue with
              </p>
            </div>

            {/* Social Buttons */}
            <div className="flex gap-3 justify-center">
              {/* Google */}
              <button
                type="button"
                onClick={handleGoogle}
                className="p-2 bg-black border border-white/10 rounded-lg hover:bg-white/5 transition flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#4285F4"
                    d="M24 9.5c3.54 0 6.71 1.23 9.21 3.61l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 12.76 17.74 9.5 24 9.5z"
                  />
                  <path
                    fill="#34A853"
                    d="M46.08 24.55c0-1.57-.14-3.08-.41-4.55H24v9h12.68c-.55 2.96-2.18 5.48-4.64 7.14l7.59 5.88C43.9 37.82 46.08 31.61 46.08 24.55z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M10.53 28.41c-.57-1.69-.9-3.49-.9-5.41s.33-3.72.9-5.41l-7.97-6.18C.97 15.02 0 19.38 0 24c0 4.62.97 8.98 2.56 12.59l7.97-6.18z"
                  />
                  <path
                    fill="#EA4335"
                    d="M24 48c6.48 0 11.93-2.13 15.9-5.81l-7.59-5.88C29.93 38.02 27.11 39 24 39c-6.26 0-11.57-3.26-14.46-8.41l-7.98 6.18C6.51 42.62 14.62 48 24 48z"
                  />
                </svg>
              </button>

              {/* Facebook */}
              <button className="p-2 bg-black border border-white/10 rounded-lg hover:bg-white/5 transition">
                <Facebook size={20} className="text-gray-300" />
              </button>
            </div>

            <p className="text-gray-400 text-sm text-center mt-4">
              Already have an account?{" "}
              <a href="/auth/login" className="text-blue-500">
                Log in
              </a>
            </p>
          </form>
        </div>

        {/* RIGHT IMAGE CARD */}
        <div className="hidden lg:block w-full max-w-sm">
          <div className="rounded-2xl overflow-hidden shadow-xl border border-white/10">
            <img
              src="/register-side.jpg"
              alt="Fashion"
              className="w-full h-72 object-cover"
            />

            <div className="bg-[#111114] py-6 px-6 border-t border-white/10">
              <h3 className="text-xl font-semibold mb-2">Elevate your style</h3>
              <p className="text-sm text-gray-400 mb-4">
                Register to unlock exclusive thrift drops, limited picks, and early access.
              </p>

              <div className="flex gap-5 text-gray-400 text-sm">
                <p>🔥 VIP perks</p>
                <p>⚡ Fast shipping</p>
                <p>🔒 Secure checkout</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
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
