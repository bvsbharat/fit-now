import DashBoardWrapper from "@/components/dashBoardWrapper/DashBoardWrapper";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";

export default async function DashBoard() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <div className="z-10 w-full max-w-xl px-5 xl:px-0">
        <DashBoardWrapper />
      </div>
    </>
  );
}
