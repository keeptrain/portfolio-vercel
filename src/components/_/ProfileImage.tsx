import Image from "next/image";

export default function ProfileImage() {
    return (
        <div
            className="
        inline-block
        rounded-[30%]
        p-1
        bg-white
        shadow-md
        mb-6
      "
            style={{
                boxShadow: "0 2px 10px rgba(0,0,0,0.08)"
            }}
        >
            <Image
                src="/img.png"
                alt="Profile"
                width={100} height={100}
                className="rounded-[30%] object-cover"
            />
        </div>
    );
}
