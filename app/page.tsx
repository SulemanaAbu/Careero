"use client"
import Image from "next/image";

import { SignIn, SignInButton, UserButton, useUser } from "@clerk/nextjs";

export default function Home() {
  // const user = useAuthContext();
  // console.log(user?.user)

  const { user } = useUser();

  return (
    <div>
      {/* Header */}
      <header className="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-white border-b border-gray-200 text-sm py-3 sm:py-0 dark:bg-neutral-900 dark:border-neutral-700">
        <nav className="relative p-4 max-w-[85rem] w-full mx-auto sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8" aria-label="Global">
          <div className="flex items-center justify-between w-full sm:w-auto">
            <Image src="/logo.png" alt="logo" width={140} height={40} />
          </div>

          {/* Auth Buttons */}
          <div className="hs-collapse hidden sm:block basis-full grow overflow-hidden transition-all duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end cursor-pointer sm:ps-7">
              {!user ? (
                <SignInButton mode="modal">
                  <div className="flex items-center gap-x-2 font-medium text-gray-600 hover:text-blue-600 sm:border-s sm:border-gray-300 py-2 sm:py-0 sm:ms-4 sm:my-6 sm:ps-6 dark:border-neutral-700 dark:text-neutral-300 dark:hover:text-blue-500">
                    <svg className="size-4" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4z" />
                    </svg>
                    Sign In
                  </div>
                </SignInButton>
              ) : (
                <UserButton />
              )}
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden before:absolute before:top-0 before:start-1/2 before:bg-[url('https://preline.co/assets/svg/examples/polygon-bg-element.svg')] dark:before:bg-[url('https://preline.co/assets/svg/examples-dark/polygon-bg-element.svg')] before:bg-no-repeat before:bg-top before:bg-cover before:size-full before:-z-[1] before:transform before:-translate-x-1/2">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10">
          {/* CTA Banner */}
          <div className="flex justify-center">
            <a
              className="inline-flex items-center gap-x-2 bg-white border border-gray-200 text-sm text-gray-800 p-1 ps-3 rounded-full transition hover:border-gray-300 dark:bg-neutral-800 dark:border-neutral-700 dark:hover:border-neutral-600 dark:text-neutral-200"
              href="/dashboard"
              target="_blank"
            >
              🚀 Join Our AI Career Community
              <span className="py-1.5 px-2.5 inline-flex items-center gap-x-2 rounded-full bg-gray-200 font-semibold text-sm text-gray-600 dark:bg-neutral-700 dark:text-neutral-400">
                <svg className="size-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </span>
            </a>
          </div>

          {/* Hero Content */}
          <div className="mt-6 text-center max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white">
              Get Ultimate AI Powered Career Guidance with 
              <span className="bg-clip-text bg-gradient-to-tr from-blue-600 to-purple-600 text-transparent"> CAREERO</span>
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-neutral-400">
              AI Career Chatbot, Resume Analyzer and AI Guidance for every career level.
            </p>

            {/* CTA Button */}
            <div className="mt-8 flex justify-center">
              <a
                href="/dashboard"
                className="inline-flex items-center gap-x-2 px-6 py-3 text-sm font-medium text-white bg-gradient-to-tr from-blue-600 to-purple-600 rounded-md hover:from-purple-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
              >
                Start Now...
                <svg className="size-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      {/* Features Section */}
      <section className="max-w-[85rem] px-4 py-12 sm:px-6 lg:px-8 mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "AI Career Chat Q&A",
              desc: "Ask career-related questions and get instant AI guidance on jobs, skills, and trends.",
              icon: (
                <path d="M4 4h16v2H4zm0 4h12v2H4zm0 4h10v2H4zm0 4h8v2H4z" />
              )
            },
            {
              title: "AI Resume Analyzer",
              desc: "Get real-time feedback and improvements for your resume using AI.",
              icon: (
                <path d="M6 2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
              )
            },
            {
              title: "AI Roadmap Generator",
              desc: "Receive a personalized career roadmap based on the career path you choose.",
              icon: (
                <path d="M3 10h2a2 2 0 0 1 2 2v4h12v2H7a2 2 0 0 1-2-2v-4H3v-2z" />
              )
            },
            {
              title: "AI Cover Letter Generator",
              desc: "Instantly create compelling and customized cover letters with AI.",
              icon: (
                <path d="M4 4h16v16H4V4zm2 4h12v2H6V8zm0 4h8v2H6v-2z" />
              )
            }
          ].map((feature, idx) => (
            <div key={idx} className="group p-6 bg-white dark:bg-neutral-800 rounded-xl border border-gray-200 dark:border-neutral-700 hover:shadow-md transition">
              <div className="flex justify-center items-center w-12 h-12 bg-blue-600 text-white rounded-xl">
                <svg className="size-6" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  {feature.icon}
                </svg>
              </div>
              <h3 className="mt-5 text-lg font-semibold text-gray-800 dark:text-white group-hover:text-blue-600">{feature.title}</h3>
              <p className="mt-2 text-gray-600 dark:text-neutral-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
