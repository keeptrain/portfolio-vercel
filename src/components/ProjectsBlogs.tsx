import SectionContainer from "@/components/_/SectionContainer";
import React from "react";
import MoreButton from "@/components/ui/button/MoreButton";
import Cards from "@/components/ui/Cards";

const ProjectsBlogs = () => {
  return (
    <section id="projects-blogs" className="min-h-screen bg-[#124170] border-t-4 border-double border-chartreuse">
      <SectionContainer>
        <div className="grid lg:grid-cols-2 lg:h-screen">
          <div className="border-sky-800 space-y-6 lg:h-screen content-center">
            <h1 className="text-5xl font-bold text-chartreuse">
              I build &
              <br/>
              design stuff
            </h1>
            <p className="text-2xl text-lime-100">
              Open source
              projects, web apps
              <br/>
              and experimentals.
            </p>
            <Cards overflowX={true}/>
            <MoreButton route={"projects"} label={'See my projects'}/>
          </div>
          <div className="space-y-6 md:pl-12 h-screen content-center">
            <h1 className="text-5xl font-bold text-chartreuse">
              I write,
              <br/>
              sometimes :V
            </h1>
            <p className="text-2xl text-lime-100">
              About
              <br/>
              learning.
            </p>
            <Cards overflowX={false}/>
            <MoreButton route={"blogs"} label={'See my blogs'}/>
          </div>
        </div>
      </SectionContainer>
    </section>
  )
}

export default ProjectsBlogs;