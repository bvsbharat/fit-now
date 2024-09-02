"use client";

import Image from "next/image";
import Link from "next/link";
import useScroll from "@/lib/hooks/use-scroll";
import { useSignInModal } from "../layout/sign-in-modal";
import UserDropdown from "../layout/user-dropdown";
import { Session } from "next-auth";

import { useRouter } from "next/navigation";

import { FaGoogle, FaTwitter } from "react-icons/fa";

export default function LoginWrapper({ session }: { session: Session | null }) {
  const { SignInModal, setShowSignInModal } = useSignInModal();

  const router = useRouter();

  return (
    <>
      <SignInModal />

      <div className="flex bg-white">
        <div className="flex flex-col items-center justify-center p-12">
          <div className="w-full max-w-md">
            <div className="space-y-4">
              <button
                onClick={() => setShowSignInModal(true)}
                className="flex w-full items-center justify-center space-x-2 rounded-lg border border-gray-300 px-4 py-3 text-gray-700 hover:bg-gray-50"
              >
                <FaGoogle className="text-red-500" />
                <span>Sign in with Google</span>
              </button>
              <button className="flex w-full items-center justify-center space-x-2 rounded-lg border border-gray-300 px-4 py-3 text-gray-700 hover:bg-gray-50">
                <FaTwitter className="text-blue-400" />
                <span>Sign in with Twitter</span>
              </button>
            </div>

            <div className="my-6 text-center text-sm text-gray-500">Or</div>

            <form className="space-y-4">
              <input
                type="email"
                placeholder="Email address"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-purple-600"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-purple-600"
              />
              <button
                type="submit"
                className="w-full rounded-lg bg-purple-600 px-4 py-3 text-white transition duration-200 hover:bg-purple-700"
                onClick={() => router.push("/dashboard")}
              >
                Sign in
              </button>
            </form>

            <div className="mt-6 space-x-4 text-center text-sm text-gray-600">
              <a href="#" className="hover:underline">
                Forgot your password?
              </a>
              <a href="#" className="hover:underline">
                Sign up
              </a>
              <a href="#" className="hover:underline">
                Customer Dashboard
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
