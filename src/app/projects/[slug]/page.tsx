export default function ProjectDetailPage(
  {params}: { params: { slug: string } }
) {
  return <h1>Detail Project: {params.slug}</h1>
}