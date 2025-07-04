import { useParams, useNavigate } from "react-router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-hot-toast";
import { ClipLoader } from "react-spinners";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useGetBookQuery, useUpdateBookMutation } from "@/redux/api/baseApi";

const bookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  genre: z.enum([
    "FICTION",
    "NON_FICTION",
    "SCIENCE",
    "HISTORY",
    "BIOGRAPHY",
    "FANTASY",
  ]),
  isbn: z.string().min(5, "ISBN must be at least 5 characters"),
  description: z.string().optional(),
  copies: z.preprocess((val) => Number(val), z.number().nonnegative()),
});

type BookFormType = z.infer<typeof bookSchema>;

export default function EditBook() {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();

  const { data: book, isLoading, isError } = useGetBookQuery(bookId);
  const [updateBook] = useUpdateBookMutation();

  const form = useForm<BookFormType>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: "",
      author: "",
      genre: "FICTION",
      isbn: "",
      description: "",
      copies: 1,
    },
  });

  useEffect(() => {
    if (book?.data) {
      form.reset({
        title: book.data.title,
        author: book.data.author,
        genre: book.data.genre,
        isbn: book.data.isbn,
        description: book.data.description,
        copies: book.data.copies,
      });
    }
  }, [book, form]);

  const onSubmit = async (values: BookFormType) => {
    try {
      await updateBook({ id: bookId!, payload: values }).unwrap();
      toast.success("Book updated successfully!");
      navigate("/books");
    } catch (error) {
      toast.error("Failed to update book");
      console.error("Update failed", error);
    }
  };

  if (isLoading)
    return (
      <p className="text-center mt-10">
        <ClipLoader />
      </p>
    );

  if (isError)
    return (
      <p className="text-center mt-10 text-red-600 dark:text-red-400 font-semibold text-lg">
        Failed to load book.
      </p>
    );

  return (
    <div className="max-w-xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-2xl shadow">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
        Edit Book
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="dark:text-gray-200">Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter book title"
                    {...field}
                    className="dark:bg-gray-800 dark:text-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="dark:text-gray-200">Author</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Author name"
                    {...field}
                    className="dark:bg-gray-800 dark:text-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="genre"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="dark:text-gray-200">Genre</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="dark:bg-gray-800 dark:text-white">
                      <SelectValue placeholder="Select a genre" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="FANTASY">Fantasy</SelectItem>
                      <SelectItem value="SCIENCE">Science</SelectItem>
                      <SelectItem value="NON_FICTION">Non Fiction</SelectItem>
                      <SelectItem value="HISTORY">History</SelectItem>
                      <SelectItem value="BIOGRAPHY">Biography</SelectItem>
                      <SelectItem value="FICTION">Fiction</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isbn"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="dark:text-gray-200">ISBN</FormLabel>
                <FormControl>
                  <Input
                    placeholder="ISBN number"
                    {...field}
                    className="dark:bg-gray-800 dark:text-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="dark:text-gray-200">Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Short description"
                    {...field}
                    className="dark:bg-gray-800 dark:text-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="copies"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="dark:text-gray-200">Copies</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    {...field}
                    className="dark:bg-gray-800 dark:text-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Updating..." : "Update Book"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
