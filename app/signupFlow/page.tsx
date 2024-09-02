import { DEPLOY_URL } from "@/lib/constants";
import DashBoardWrapper from "@/components/dashBoardWrapper/DashBoardWrapper";
import { Routes } from "react-router-dom";

import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import SignupFlow from "@/components/signupFlow/SignupFlow";

import { getServerSession } from "next-auth/next";

export default async function DashBoard() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <div className="z-10 w-full max-w-xl px-5 xl:px-0">
        <SignupFlow />
      </div>
    </>
  );
}
