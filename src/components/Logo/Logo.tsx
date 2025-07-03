import { BookCopy } from "lucide-react";

export function Logo() {
    return (
        <div className="flex items-center ">
            <div className="m-2" >
               <BookCopy />
            </div>
            <span className="font-bold text-2xl text-center">
                Mini<span className="text-muted-foreground">Library</span>
            </span>
        </div>
    );
}
