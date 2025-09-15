import SectionContainer from "@/components/_/SectionContainer";
import React from "react";
import MoreButton from "@/components/ui/button/MoreButton";
import Image from "next/image";
import Link from "next/link";

const ProjectsBlogs = () => {
  return (
    <section id="projects-blogs" className="min-h-screen bg-zinc-50 dark:bg-black">
      <SectionContainer>
        <div className="md:h-screen space-y-6">
          <div className="space-y-6">
            <h1 className="text-5xl font-bold text-black dark:text-chartreuse">
              I build &
              <br/>
              design stuff
            </h1>
            <div className="flex flex-col md:flex-row md:justify-between">
              <p className="text-2xl text-black dark:text-lime-100">
                Open source
                projects, web apps
                <br/>
                and experimentals.
              </p>
              <p className="text-2xl text-black dark:text-lime-100 underline">
                Latest
              </p>
            </div>
            <div onClick={() => Link.name}
                 className="flex flex-row border-b border-gray-200 space-y-6 gap-6 text-black/60 hover:text-black opacity-95 hover:opacity-100 hover:cursor-pointer transition-colors duration-300">
              <div className="relative h-[150px] w-[200px]">
                <Image alt={"logo"} src={"/test-png.jpg"} fill className="rounded-lg opacity-90"/>
              </div>
              <div className="flex flex-col justify-center pl-6 space-y-2">
                <div className="flex gap-2 text-zinc-500 dark:text-lime-100">
                  <p>Laravel</p>
                  <p>Livewire</p>
                </div>
                <h2 className="text-3xl dark:text-lime-100">A apps for bla bla bla bla</h2>
              </div>
            </div>
            <div onClick={() => Link.name}
                 className="flex flex-row border-b border-gray-200 space-y-6 gap-6 text-black/60 hover:text-black opacity-95 hover:opacity-100 hover:cursor-pointer transition-colors duration-300">
              <div className="relative h-[150px] w-[200px]">
                <Image alt={"logo"} src={"/test-png.jpg"} fill className="rounded-lg opacity-90"/>
              </div>
              <div className="flex flex-col justify-center pl-6 space-y-2">
                <div className="flex gap-2 text-zinc-500 dark:text-lime-100">
                  <p>Laravel</p>
                </div>
                <h2 className="text-3xl dark:text-lime-100">A apps for bla bla bla bla</h2>
              </div>
            </div>
            {/*<Cards overflowX={true}/>*/}
            <MoreButton route={"projects"} label={'See my projects'}/>
          </div>
          {/*<div className="space-y-6 md:pl-12 h-screen content-center">*/}
          {/*  <h1 className="text-5xl font-bold text-black dark:text-chartreuse">*/}
          {/*    I write,*/}
          {/*    <br/>*/}
          {/*    sometimes :V*/}
          {/*  </h1>*/}
          {/*  <p className="text-2xl text-black dark:text-lime-100">*/}
          {/*    About*/}
          {/*    <br/>*/}
          {/*    learning.*/}
          {/*  </p>*/}
          {/*  /!*<Cards overflowX={false}/>*!/*/}
          {/*  <MoreButton route={"blogs"} label={'See my blogs'}/>*/}
          {/*</div>*/}
        </div>
      </SectionContainer>
    </section>
  )
}

export default ProjectsBlogs;