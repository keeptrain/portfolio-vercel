import Image from "next/image";

type Props = {
  index: number | null;
  onClear: () => void;
};

type Item = {
  description: string;
};
const items: Item[] = [
  { description: "Test 1" },
  { description: "Test 2" },
  { description: "Test 3" },
  { description: "Test 4" },
];

const ExperienceDescription = ({ index, onClear }: Props) => {
  if (index === null) {
    return (
      <>
        <p>
          Fresh graduate Information Systems, Very interested and enthusiastic
          about programming. Passionate to innovative projects while expanding
          knowledge.
        </p>
      </>
    );
  }

  const selected = items[index];
  if (!selected) return null;

  return (
    <div className="relative flex items-center space-x-4">
      <a onClick={onClear}>X</a>
      <Image alt="logo" width={50} height={50} src="/dinas_jakarta.ico" />
      <p>{selected.description}</p>
    </div>
  );
};

export default ExperienceDescription;
