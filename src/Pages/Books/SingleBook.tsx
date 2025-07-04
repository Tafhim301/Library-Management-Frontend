import { useGetBookQuery } from "@/redux/api/baseApi";
import { useParams, Link } from "react-router";
import { ClipLoader } from "react-spinners";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookKey, BookOpen,  CircleArrowLeft,  Info, NotebookPen, PencilLine, } from "lucide-react";

export default function SingleBook() {
  const { bookId } = useParams();
  const { data, isLoading, isError } = useGetBookQuery(bookId);

  if (isLoading)
    return (
      <p className="text-center py-10">
        <ClipLoader />
      </p>
    );

  if (isError || !data?.data)
    return (
      <p className="text-center text-3xl text-red-600 font-bold py-10">
        Book Not Found
      </p>
    );

  const book = data.data;

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <Card className="shadow-xl rounded-2xl">
        <CardHeader className="border-b pb-4">
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-indigo-600" />
            {book.title}
          </CardTitle>
          <CardDescription className="flex items-center font-bold gap-2 text-sm text-gray-500 mt-1">
            <NotebookPen className="w-4 h-4" />
            {book.author}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <p>
                <span className="font-medium">ISBN:</span> <span className="font-semibold text-xs rounded bg-gray-100 p-1">{book.isbn}</span>
              </p>
              <p>
                <span className="font-medium">Genre:</span>{" "}
                <Badge variant="outline">{book.genre}</Badge>
              </p>
              <p>
                <span className="font-medium">Copies:</span> <span className="font-bold">{book.copies}</span>
              </p>
            </div>

            <div className="space-y-2">
              <p className="flex items-center gap-2">
                <span className="font-medium">Available:</span>
                <Badge variant={book.available ? "default" : "destructive"}>
                  {book.available ? "Yes" : "No"}
                </Badge>
              </p>
              <p>
                <span className="font-medium">Book ID:</span>{" "}
                <code className="text-xs font-semibold bg-gray-100 rounded p-1">
                  {book._id}
                </code>
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-1 flex items-center gap-2">
              <Info className="w-4 h-4" /> Description:
            </h3>
            <p className="text-gray-700 text-sm font-semibold  leading-relaxed">
              {book.description || "No description provided."}
            </p>
          </div>

          <div className="mt-6 flex gap-4 justify-start border-t pt-4">
           <Button asChild variant="default">
              <Link to={`/borrow/${book._id}`}> <BookKey/>Borrow Book</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link to={`/edit-book/${book._id}`}><PencilLine></PencilLine>Edit Book</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/books"><CircleArrowLeft/>Back to List</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
