import Image from "next/image";

export default function ProfileImage() {
  return (
    <div className="relative h-full w-full">
      <Image
        src="/photos.png"
        alt="Profile"
        fill
        className="object-cover object-top rounded-full md:rounded-none"
      />
    </div>
  );
}
