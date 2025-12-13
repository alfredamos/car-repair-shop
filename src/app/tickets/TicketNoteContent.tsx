"use client"

import {JSX, useState} from "react";
import {Button} from "@/components/ui/button";
import {ChevronDown, ChevronUp} from "lucide-react";

type Prop = {
    content: string;
}

export default function TicketNoteContent({content}: Prop): JSX.Element {
    const [showFullContent, setShowFullContent] = useState(false);
    const truncatedLength = 10; // Define your desired truncation length

    const displayedContent = showFullContent ? content : content.substring(0, truncatedLength) + '...';

    const toggleContent = () => {
        setShowFullContent(!showFullContent);
    };

    return (
        <div className="py-2 border-blue-100 flex justify-between items-center">
            <p className="break-words">
                {displayedContent}
            </p>
            {content.length > truncatedLength && ( // Only show button if content is longer than truncated length
                <Button onClick={toggleContent} variant="link">
                    {showFullContent ? <span className="flex items-center gap-2 text-indigo-900 font-bold">Show less<ChevronUp/></span>  : <span className="flex gap-2 items-center text-indigo-900 font-bold">Show more<ChevronDown/></span> }
                </Button>
            )}
        </div>
    );
}