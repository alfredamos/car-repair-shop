import {Button} from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-dvh flex justify-center items-center">
     <div className="max-w-md font-bold p-10 bg-white ring-1 dark:ring-red-200 rounded-lg shadow-lg text-black mx-auto">
        <h1 className="text-center">Ben Car Repair Shop</h1>

        <p className="mt-20 break-words">
            This is the home page of Ben Car repair shop. We specialize in all kinds of japanese and german cars. Please log in to enjoy our world class service.
        </p>

     </div>
    </div>
  );
}
