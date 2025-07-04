import { useGetBooksQuery } from "@/redux/api/baseApi";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import type { IBooks } from "@/types";

export default function Books() {
  const { data: books, isLoading, isError } = useGetBooksQuery();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading books.</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Books</h2>
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
          {books?.map((book: IBooks, index: number) => (
            <TableRow key={index}>
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell>{book.genre}</TableCell>
              <TableCell>{book.isbn}</TableCell>
              <TableCell>{book.copies}</TableCell>
              <TableCell>
                <span className={`text-sm px-2 py-1 rounded ${book.available ? "bg-green-200" : "bg-red-200"}`}>
                  {book.available ? "Yes" : "No"}
                </span>
              </TableCell>
              <TableCell className="flex justify-center gap-2">
                <Link to={`/edit-book/${book?._id}`}>
                  <Button size="sm" variant="outline">Edit</Button>
                </Link>
                <Link to={`/borrow/${book.isbn}`}>
                  <Button size="sm" variant="secondary">Borrow</Button>
                </Link>
                <Button size="sm" variant="destructive">Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
