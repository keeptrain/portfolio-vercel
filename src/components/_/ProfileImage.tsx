import Image from "next/image";

export default function ProfileImage() {
  return (
    <div className="relative h-full w-full">
      <Image
        src="/photos.png"
        alt="Profile"
        fill
        className="object-cover object-top rounded-4xl md:rounded-4xl shadow-md bg-white p-1 md:p-2"
      />
    </div>
  );
}
