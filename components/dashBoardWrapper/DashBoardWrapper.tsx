import Card from "@/components/home/card";
import { DEPLOY_URL } from "@/lib/constants";
import { Github, Twitter } from "@/components/shared/icons";
import BodyScan from "@/components/home/BodyScan";
import ComponentGrid from "@/components/home/component-grid";
import Image from "next/image";
import { nFormatter } from "@/lib/utils";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";

import data from "@/app/mockData/Data.json";

export default async function DashBoard() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <div className="z-10 w-full max-w-screen-xl px-5 xl:px-0">
        {/* Goal Description Section */}
        <div className="h-25 relative col-span-1 flex items-baseline justify-center overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md md:col-span-2">
          <section className="mb-8 rounded-lg p-6 ">
            <h2 className="mb-4 text-2xl font-bold">Your Health Goal</h2>
            <p>{data.userGoalDesc}</p>
          </section>
        </div>

        <div className="my-10 grid w-full max-w-screen-xl animate-fade-up grid-cols-1 gap-5 px-5 md:grid-cols-6 xl:px-0">
          <BodyScan />

          {/* Progress Section */}
          <div className="relative col-span-1 flex h-96 items-baseline justify-center overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md md:col-span-2">
            <section className="mb-8 rounded-lg bg-white p-6  md:col-span-2">
              <h2 className="mb-4 text-2xl font-bold">Current Progress</h2>
              <p>
                <strong>Current Weight:</strong> {data.progress.currentWeight}{" "}
                kg
              </p>
              <p>{data.progress.currentBodyMarkers}</p>
            </section>
          </div>

          {/* BMI Information Section */}
          <div className="h-100 relative col-span-1 flex items-baseline justify-center overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md md:col-span-2">
            <section className="mb-8 rounded-lg bg-white p-6  md:col-span-2">
              <h2 className="mb-4 text-2xl font-bold">BMI Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p>
                    <strong>BMI Index:</strong> {data.bmi.index}
                  </p>
                  <p>
                    <strong>Fat Percentage:</strong> {data.bmi.fatPercentage}%
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Category:</strong> {data.bmi.category}
                  </p>
                  <p>
                    <strong>Indicators:</strong> {data.bmi.indicators}
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Recommendations Section */}
          <div className="h-100 relative col-span-1 flex items-baseline justify-center overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md md:col-span-3">
            <section className="mb-8 rounded-lg bg-white p-6  md:col-span-2">
              <h2 className="mb-4 text-2xl font-bold">Recommendations</h2>
              <div className="mb-4">
                <h3 className="text-xl font-semibold">Dietary</h3>
                <ul className="list-inside list-disc">
                  {data.recommendation.dietary.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="mb-4">
                <h3 className="text-xl font-semibold">Exercises</h3>
                <ul className="list-inside list-disc">
                  {data.recommendation.exercises.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold">Tips</h3>
                <ul className="list-inside list-disc">
                  {data.recommendation.tips.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </section>
          </div>

          {/* Routine Section */}
          <div className="h-100 relative col-span-1 flex items-baseline justify-center overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md md:col-span-3">
            <section className="mb-8 rounded-lg bg-white p-6">
              <h2 className="mb-4 text-2xl font-bold">Weekly Routine</h2>
              <div className="mb-4">
                <h3 className="text-xl font-semibold">Dietary Routine</h3>
                <ul className="list-inside list-disc">
                  {data.routine.dietary.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold">Exercise Routine</h3>
                <ul className="list-inside list-disc">
                  {data.routine.exercises.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </section>
          </div>

          {/* {features.map(({ title, description, demo, size }) => (
            <Card
              key={title}
              title={title}
              description={description}
              demo={
                title === "Beautiful, reusable components" ? (
                  <ComponentGrid />
                ) : (
                  demo
                )
              }
              size={size}
            />
          ))} */}
        </div>
      </div>
    </>
  );
}

const features = [
  {
    title: "One-click Deploy",
    description:
      "Jumpstart your next project by deploying Precedent to [Vercel](https://vercel.com/) in one click.",
    demo: (
      <a href={DEPLOY_URL}>
        <Image
          src="https://vercel.com/button"
          alt="Deploy with Vercel"
          width={120}
          height={30}
          unoptimized
        />
      </a>
    ),
    size: "md:col-span-4",
  },
  {
    title: "Built-in Auth + Database",
    description:
      "Precedent comes with authentication and database via [Auth.js](https://authjs.dev/) + [Prisma](https://prisma.io/)",
    demo: (
      <div className="flex items-center justify-center space-x-20">
        <Image alt="Auth.js logo" src="/authjs.webp" width={50} height={50} />
        <Image alt="Prisma logo" src="/prisma.svg" width={50} height={50} />
      </div>
    ),
    size: "md:col-span-3",
  },
  {
    title: "Beautiful, reusable components",
    description:
      "Pre-built beautiful, a11y-first components, powered by [Tailwind CSS](https://tailwindcss.com), [Radix UI](https://www.radix-ui.com), and [Framer Motion](https://framer.com/motion). Used in production on [Dub.co](https://dub.co).",
    size: "md:col-span-3",
  },
];
