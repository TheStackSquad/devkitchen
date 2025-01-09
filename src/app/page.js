//import Image from "next/image";
import HomePageLayout from '@/components/ui/homeLayout';
import Snap from "@/components/Snap";

export default function Home() {
  return (
    <div className="Home">
      <HomePageLayout /> 
      <div className="section2">
      <Snap />
      </div>
    </div>
  );
}
