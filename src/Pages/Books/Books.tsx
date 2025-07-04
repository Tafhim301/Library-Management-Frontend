import { useDeleteBookMutation, useGetBooksQuery } from "@/redux/api/baseApi";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import type { IBooks } from "@/types";
import { ClipLoader } from "react-spinners";
import { BookCheck, BookOpen, Filter, PencilLine, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
const genres = ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"];
export default function Books() {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("");
  const limit = 10;

  const { data, isLoading, isError, isFetching } = useGetBooksQuery({ page, limit, filter });
  const [deleteBook] = useDeleteBookMutation();
  const navigate = useNavigate();

  const handleBorrow = (book: IBooks) => {
    if (book.copies > 0) {
      navigate(`/borrow/${book._id}`);
    } else {
      toast.error(`"${book.title}" is not available for borrowing.`);
    }
  };

  const handleDelete = async (book: IBooks) => {
    toast.custom((t) => (
      <div className="bg-white p-4 rounded shadow-md border flex flex-col gap-2 max-w-xs">
        <span className="font-medium text-sm">Are you sure you want to delete?</span>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="text-sm px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={async () => {
              try {
                await deleteBook(book._id).unwrap();
                toast.success(`"${book.title}" Has Been Deleted Successfully`);
              } catch (error) {
                toast.error(`Failed To Delete Book`);
                console.log(error);
              }
              toast.dismiss(t.id);
            }}
            className="text-sm px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Confirm
          </button>
        </div>
      </div>
    ));
  };

  if (isLoading || isFetching) return <p className="text-center"><ClipLoader /></p>;
  if (isError || !data) return <p className="text-center text-red-600 text-lg">Failed to load books.</p>;

  const { data: books, meta } = data;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold mb-4">All Books</h2>
        <div className="mb-6 min-4/5">
          <Select onValueChange={(value) => setFilter(value)} value={filter}>
            <SelectTrigger className="min-w-4/5">
             <Filter></Filter><SelectValue placeholder="Filter by Genre" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Genres</SelectItem>
              {genres.map((genre) => (
                <SelectItem key={genre} value={genre}>
                  {genre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Genre</TableHead>
            <TableHead>ISBN</TableHead>
            <TableHead>Copies</TableHead>
            <TableHead>Available</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {books.map((book: IBooks, index: number) => (
            <TableRow key={index}>
              <TableCell className="font-bold">{book.title}</TableCell>
              <TableCell className="text-xs font-bold">{book.author}</TableCell>
              <TableCell className="font-bold">
                <Button className="w-32" variant={"outline"}>{book.genre}</Button>
              </TableCell>
              <TableCell className="font-bold text-xs">{book.isbn}</TableCell>
              <TableCell className="font-bold text-xs">{book.copies}</TableCell>
              <TableCell>
                <span className={`text-sm font-semibold px-2 py-1 rounded ${book.available ? "bg-green-200 dark:bg-green-400" : "bg-red-200 dark:bg-red-400"}`}>
                  {book.available ? "Yes" : "No"}
                </span>
              </TableCell>
              <TableCell className="flex flex-wrap gap-2">
                <Link to={`/books/${book?._id}`}>
                  <Button size="sm" variant="outline"><BookOpen />See Details</Button>
                </Link>
                <Link to={`/edit-book/${book?._id}`}>
                  <Button size="sm" variant="outline"><PencilLine /> Edit</Button>
                </Link>
                <Button onClick={() => handleBorrow(book)} size="sm" variant="secondary">
                  <BookCheck /> Borrow
                </Button>
                <Button onClick={() => handleDelete(book)} size="sm" variant="destructive">
                  <Trash2 /> Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>


      <div className="flex justify-center items-center mt-6 gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage((prev) => Math.max(1, prev - 1))}
          disabled={page === 1}
        >
          Previous
        </Button>
        <span className="text-sm font-medium">
          Page {meta.page} of {meta.totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage((prev) => Math.min(meta.totalPages, prev + 1))}
          disabled={page === meta.totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
