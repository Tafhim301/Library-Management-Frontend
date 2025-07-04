import { Link } from "react-router";
import { AlertTriangle, ArrowLeftCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ErrorPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-white dark:bg-gray-900 text-center">
      <div className="flex items-center justify-center mb-6">
        <AlertTriangle className="w-16 h-16 text-red-600 dark:text-red-400" />
      </div>
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">
        Something went wrong
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        We couldn’t find the page you were looking for or an unexpected error occurred.
      </p>
      <Button asChild variant="default">
        <Link to="/books" className="flex items-center gap-2">
          <ArrowLeftCircle className="w-5 h-5" />
          Back to Books
        </Link>
      </Button>
    </div>
  );
}
