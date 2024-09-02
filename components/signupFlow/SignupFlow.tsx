"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface FormData {
  goal: string;
  age: string;
  gender: string;
  activityLevel: string;
  sideProfileImage: File | null;
  frontProfileImage: File | null;
}

const SignupFlow: React.FC = ({}) => {
  const [step, setStep] = useState<number>(1);
  const router = useRouter(); // Initialize useRouter

  const [formData, setFormData] = useState<FormData>({
    goal: "",
    age: "",
    gender: "",
    activityLevel: "",
    sideProfileImage: null,
    frontProfileImage: null,
  });
  const [errors, setErrors] = useState<string[]>([]); // State for storing errors

  const handleSelect = (field: keyof FormData, value: string): void => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
    setErrors([]); // Clear errors on new input
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      setFormData((prevState) => ({
        ...prevState,
        sideProfileImage: files[0] || null,
        frontProfileImage: files[1] || null,
      }));
      setErrors([]); // Clear errors on new input
    }
  };

  const validateStep = (): boolean => {
    const newErrors: string[] = [];

    switch (step) {
      case 1:
        if (!formData.goal) newErrors.push("Please select a fitness goal.");
        break;
      case 2:
        if (!formData.age) newErrors.push("Please enter your age.");
        break;
      case 3:
        if (!formData.gender) newErrors.push("Please select your gender.");
        break;
      case 4:
        if (!formData.activityLevel)
          newErrors.push("Please select your activity level.");
        break;
      case 5:
        if (!formData.sideProfileImage)
          newErrors.push("Please upload a side profile image.");
        if (!formData.frontProfileImage)
          newErrors.push("Please upload a front profile image.");
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return newErrors.length === 0; // Return true if no errors
  };

  const nextStep = (): void => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const prevStep = (): void => setStep(step - 1);

  const submitHandler = () => {
    if (validateStep()) {
      console.log(formData, "formData");
      // Handle form submission, e.g., send to an API
      router.push("/dashboard");
    }
  };

  const canProceedToNextStep = (): boolean => {
    switch (step) {
      case 1:
        return !!formData.goal;
      case 2:
        return !!formData.age;
      case 3:
        return !!formData.gender;
      case 4:
        return !!formData.activityLevel;
      case 5:
        return !!formData.sideProfileImage && !!formData.frontProfileImage;
      default:
        return false;
    }
  };

  const renderStep = (): JSX.Element | null => {
    switch (step) {
      case 1:
        return (
          <>
            <h2 className="mb-6 text-3xl font-bold text-gray-800">
              What's your fitness goal?
            </h2>
            <div className="space-y-4">
              {["Lose weight", "Maintain weight", "Gain muscle"].map((goal) => (
                <button
                  key={goal}
                  onClick={() => handleSelect("goal", goal)}
                  className={`w-full rounded-xl p-4 text-left transition-colors ${
                    formData.goal === goal
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {goal}
                </button>
              ))}
            </div>
          </>
        );
      case 2:
        return (
          <>
            <h2 className="mb-6 text-3xl font-bold text-gray-800">
              How old are you?
            </h2>
            <input
              type="number"
              value={formData.age}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleSelect("age", e.target.value)
              }
              className="w-full rounded-xl border border-gray-300 p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your age"
            />
          </>
        );
      case 3:
        return (
          <>
            <h2 className="mb-6 text-3xl font-bold text-gray-800">
              What's your gender?
            </h2>
            <div className="space-y-4">
              {["Male", "Female", "Other", "Prefer not to say"].map(
                (gender) => (
                  <button
                    key={gender}
                    onClick={() => handleSelect("gender", gender)}
                    className={`w-full rounded-xl p-4 text-left transition-colors ${
                      formData.gender === gender
                        ? "bg-blue-500 text-white"
                        : "bg-white text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {gender}
                  </button>
                ),
              )}
            </div>
          </>
        );
      case 4:
        return (
          <>
            <h2 className="mb-6 text-3xl font-bold text-gray-800">
              What's your activity level?
            </h2>
            <div className="space-y-4">
              {[
                "Sedentary",
                "Lightly active",
                "Moderately active",
                "Very active",
              ].map((level) => (
                <button
                  key={level}
                  onClick={() => handleSelect("activityLevel", level)}
                  className={`w-full rounded-xl p-4 text-left transition-colors ${
                    formData.activityLevel === level
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </>
        );
      case 5: // New step for file upload
        return (
          <>
            <h2 className="mb-6 text-3xl font-bold text-gray-800">
              Upload your side and front profile images
            </h2>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="w-full rounded-xl border border-gray-300 p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="mt-4 space-y-4">
              {formData.sideProfileImage && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">
                    Side Profile Image:
                  </h3>
                  <img
                    src={URL.createObjectURL(formData.sideProfileImage)}
                    alt="Side Profile Preview"
                    className="mt-2 h-40 w-auto rounded-md"
                  />
                </div>
              )}
              {formData.frontProfileImage && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">
                    Front Profile Image:
                  </h3>
                  <img
                    src={URL.createObjectURL(formData.frontProfileImage)}
                    alt="Front Profile Preview"
                    className="mt-2 h-40 w-auto rounded-md"
                  />
                </div>
              )}
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mx-auto mt-10 max-w-md rounded-xl bg-gray-50 p-6 shadow-lg">
      <div className="mb-6 flex items-center">
        {step > 1 && (
          <button
            onClick={prevStep}
            className="mr-4 text-blue-500 hover:text-blue-600"
          >
            <ChevronLeft size={24} />
          </button>
        )}
        <div className="flex-1">
          <div className="h-2 rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-blue-500 transition-all duration-300 ease-in-out"
              style={{ width: `${(step / 5) * 100}%` }} // Update for new step count
            ></div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
          F
        </div>
        <p className="mt-2 font-medium text-blue-600">
          Let's customize your fitness journey!
        </p>
      </div>

      {renderStep()}

      <p className="mt-6 text-center text-sm text-gray-500">
        We use this information to provide you with personalized
        recommendations.
      </p>

      <button
        onClick={() => {
          step === 5 ? submitHandler() : nextStep();
        }}
        disabled={!canProceedToNextStep()} // Disable if validation fails
        className="mt-6 flex w-full items-center justify-center rounded-xl bg-blue-500 p-4 font-semibold text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {step === 5 ? "SUBMIT" : "NEXT"}
        {step !== 5 && <ChevronRight size={20} className="ml-2" />}
      </button>
    </div>
  );
};

export default SignupFlow;
