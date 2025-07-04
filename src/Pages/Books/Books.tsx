import {  useDeleteBookMutation, useGetBooksQuery } from "@/redux/api/baseApi";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import type { IBooks } from "@/types";
import { ClipLoader } from "react-spinners";
import { BookCheck, PencilLine, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

export default function Books() {
  const [deleteBook] = useDeleteBookMutation();
  const handleDelete =async (bookId : string) =>{
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
          onClick={async() => {
            try {
              await deleteBook(bookId).unwrap()
              toast.dismiss(t.id);
              toast.success("Book Has Been Deleted Successfully");

            
           } catch (error) {
            toast.error(`Sorry! An error has occured.`

            );

            console.log(error)

            
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
    
  }

  const { data: books, isLoading, isError } = useGetBooksQuery();

  if (isLoading) return <p><ClipLoader></ClipLoader></p>;
  if (isError) return <p className="text-center font-bold text-red-600 text-3xl">Error loading books.</p>;

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
              <TableCell className="font-bold">{book.title}</TableCell>
              <TableCell className="text-xs font-bold">{book.author}</TableCell>
              <TableCell className="font-bold"><Button variant={"outline"} size={'sm'}>{book.genre}</Button></TableCell>
              <TableCell className="font-bold text-xs">{book.isbn}</TableCell>
              <TableCell className="font-bold text-xs">{book.copies}</TableCell>
              <TableCell>
                <span className={`text-sm font-semibold px-2 py-1 rounded ${book.available ? "bg-green-200" : "bg-red-200"}`}>
                  {book.available ? "Yes" : "No"}
                </span>
              </TableCell>
              <TableCell className="flex justify-center gap-2">
                <Link to={`/edit-book/${book?._id}`}>
                  <Button size="sm" variant="outline"><PencilLine></PencilLine>Edit</Button>
                </Link>
                <Link to={`/borrow/${book?._id}`}>
                  <Button size="sm" variant="secondary"><BookCheck></BookCheck> Borrow</Button>
                </Link>
                <Button onClick={() => handleDelete(`${book?._id}`)} size="sm" variant="destructive"><Trash2></Trash2>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
