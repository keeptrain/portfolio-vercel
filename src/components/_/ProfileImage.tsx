import Image from "next/image";

export default function ProfileImage() {
  return (
    <div className="relative h-full w-full">
      <Image
        src="/images/photos.png"
        alt="Profile"
        fill
        sizes="(max-width: 768px) 160px, 320px"
        className="rounded-4xl bg-white object-cover object-top p-1 shadow-md md:rounded-4xl md:p-2 dark:bg-zinc-800"
      />
    </div>
  );
}
