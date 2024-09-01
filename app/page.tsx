
import Card from "@/components/home/card";
import { DEPLOY_URL } from "@/lib/constants";
import LoginWrapper from '../components/layout/loginWrapper'
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

import { Github, Twitter } from "@/components/shared/icons";
import WebVitals from "@/components/home/web-vitals";
import ComponentGrid from "@/components/home/component-grid";
import Image from "next/image";
import { nFormatter } from "@/lib/utils";

import { getServerSession } from "next-auth/next";

export default async function Home() {

  const session = await getServerSession(authOptions);

  return (
    <>
      <div className="z-10 w-full max-w-xl px-5 xl:px-0">
        
        <h1
          className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm [text-wrap:balance] md:text-7xl md:leading-[5rem]"
          style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
        >
         Transform Your Fitness Journey with Coach AI
        </h1>
        <p
          className="mt-6 animate-fade-up text-center text-gray-500 opacity-0 [text-wrap:balance] md:text-xl"
          style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
        >
         Start Your Personalized Coaching Adventure and Crush Your Goals with AI Support!
        </p>
        <div
          className="mx-auto mt-6 flex animate-fade-up items-center justify-center space-x-5 opacity-0"
          style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
        >

        {/* <LoginWrapper session={session}/> */}
          
        </div>
      </div>
    </>
  );
}
