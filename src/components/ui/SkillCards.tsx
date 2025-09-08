import {ReactNode} from "react";

type Props = {
  icons: ReactNode,
  title: string,
  description: string,
}

const SkillCards = ({icons, title, description}: Props) => {
  return (
    <>
      {icons}
      <h1 className="text-white font-semibold">{title}</h1>
      <p className="text-sm text-white/80">
        {description}
      </p>
    </>
  )
}

export default SkillCards