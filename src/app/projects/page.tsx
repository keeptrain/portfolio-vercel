import Link from "next/link";
import Header from "@/components/Header";

export default function ProjectsPage() {
  return <main>
    <Header/>
    <div className="mt-24">
      <h1>Projects Page</h1>
      <Link href={`/`}>
        Back
      </Link>
      <Link href={`/projects/my-project`}>
        Go to project detail
      </Link>
    </div>
  </main>
}
