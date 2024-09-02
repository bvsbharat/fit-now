import Card from "@/components/home/card";
import { DEPLOY_URL } from "@/lib/constants";
import { Github, Twitter } from "@/components/shared/icons";
import BodyScan from "@/components/home/BodyScan";
import ComponentGrid from "@/components/home/component-grid";
import Image from "next/image";
import { nFormatter } from "@/lib/utils";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";

import MealPlanTable from "./dataTransformer";

import data from "@/app/mockData/Data.json";

export default async function DashBoard() {
  const session = await getServerSession(authOptions);

  // const mealTable: string[][] =

  return (
    <>
      <div className="z-10 w-full max-w-screen-xl px-5 xl:px-0">
        {/* Goal Description Section */}
        {/* {mealTable} */}
        <section className="mb-8 rounded-lg p-6 ">
          <h2 className="mb-4 text-2xl font-bold">Your Health Goal</h2>
          <p>{data.userGoalDesc}</p>
        </section>

        <div className="my-10 grid w-full max-w-screen-xl animate-fade-up grid-cols-1 gap-5 px-5 md:grid-cols-6 xl:px-0">
          <BodyScan />

          {/* Progress Section */}
          <div className="relative col-span-1 flex h-96 items-baseline justify-center overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md md:col-span-2">
            <section className="mb-8 rounded-lg bg-white p-6  md:col-span-2">
              <h2 className="mb-4 text-2xl font-bold">Current Progress</h2>
              <p>
                <strong> Weight:</strong> {data.progress.currentWeight} kg{" "}
                <strong> Height:</strong> {data.progress.currentHeight} Feet{" "}
                <strong> Age:</strong> {data.progress.CurrentAge} Years{" "}
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
              {/* <div className="mb-4"> */}
              {/* <h3 className="text-xl font-semibold">Dietary Routine</h3> */}
              <MealPlanTable daysData={data.routine.dietary} />
              {/* </div> */}
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
        </div>
      </div>
    </>
  );
}
