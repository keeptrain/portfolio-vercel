type DataItem = {
  title: string;
  desc: string;
}

const data: DataItem[] = [
  {
    title: '01. Clean Code',
    desc: 'Write clean, maintainable, and efficient code following best practices and coding standards'
  },
  {
    title: '02. Collaboration',
    desc: 'Work closely with cross-functional teams including designers, product managers, and other developers'
  },
  {
    title: '03. Continuous Learning',
    desc: 'Stay updated with the latest industry trends, technologies, and best practices to continuously improve skills'
  },
  {
    title: '04. Problem Solving',
    desc: 'Approach challenges with a problem-solving mindset, finding innovative solutions to complex issues'
  },
]

const HowIWork = () => {
  return (
    <>
      <span className="text-xl font-bold font-mono uppercase text-chartreuse">
        How I Work
      </span>
      <div className="grid grid-cols-4 gap-4 mt-6">
        {data.map((item, index) =>
          <div key={index}
               className={index !== data.length - 1 ? "border-r border-chartreuse border-dashed pr-4" : "pr-4"}>
            <h3 className="text-lg font-semibold mb-2 text-chartreuse">{item.title}</h3>
            <p className="text-white">{item.desc}</p>
          </div>
        )}
      </div>
    </>
  )
}

export default HowIWork