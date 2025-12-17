import Form from "next/form"
import {Button} from "@/components/ui/button";

type Prop = {
    path: string;
}

export default function SearchUsers({path}: Prop) {
    return (
        <Form action={path}>
            <div className="flex justify-between items-center mb-5 mt-5 w-3/4 mx-auto">
                <input
                    type="search"
                    name="query"
                    className="border-solid border-2 border-gray-300  focus:border-solid focus:border-indigo-600 focus:outline-none text-black w-full rounded-lg p-3 m-2"
                />
                <Button variant="indigo" size="xlg" type="submit">
                    Search
                </Button>
            </div>
        </Form>
    );
}