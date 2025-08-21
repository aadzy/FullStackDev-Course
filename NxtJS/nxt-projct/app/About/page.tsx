import Image from "next/image";

export default function About() {
  return <div>
    <h1 className="text-2xl font-bold text-center">About</h1>
    <Image src="/pluto.jpg" alt="Pluto" width={1000} height={1000} />
  </div>;
}   