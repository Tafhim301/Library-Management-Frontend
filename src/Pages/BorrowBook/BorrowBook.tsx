import { useParams, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";

import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { useGetBookQuery, useBorrowBookMutation } from "@/redux/api/baseApi";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ClipLoader } from "react-spinners";

const BorrowSchema = z.object({
    quantity: z.number().min(1, "Minimum 1 copy required"),
    dueDate: z.date(),
});

type BorrowFormType = z.infer<typeof BorrowSchema>;

export default function BorrowBook() {
    const { bookId } = useParams();
    const navigate = useNavigate();
    const { data, isLoading } = useGetBookQuery(bookId);
    const [borrowBook] = useBorrowBookMutation();
    const [calendarOpen, setCalendarOpen] = useState(false);

    const form = useForm<BorrowFormType>({
        resolver: zodResolver(BorrowSchema),
        defaultValues: {
            quantity: 1,
            dueDate: new Date(),
        },
    });

    const onSubmit = async (values: BorrowFormType) => {
        if (values.quantity > book.copies) {
            toast.error("Quantity exceeds available copies.");
            return;
        }

        try {
            await borrowBook({
                payload: {
                    book: bookId,
                    quantity: values.quantity,
                    dueDate: values.dueDate.toISOString(),
                }
            }).unwrap();



            toast.success("Book borrowed successfully!");
            navigate("/borrow-summary");
        } catch (err) {
            toast.error("Borrowing failed.");
            console.error(err);
        }
    };

    if (isLoading) return <p className="text-center"><ClipLoader></ClipLoader></p>;
    if (!data) return <p className="text-center text-3xl font-bold text-red-600">Book not found</p>;

    const book = data.data;


    return (
        <div className="max-w-md mx-auto py-10">
            <Card>
                <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-4">Borrow : <span className="text-lg">{book.title}</span></h2>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="quantity"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Quantity (Max: {book.copies})</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                min={1}
                                                max={book.copies}
                                                {...field}
                                                onChange={(e) => field.onChange(parseInt(e.target.value))}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="dueDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Due Date</FormLabel>
                                        <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                                            <PopoverTrigger asChild>
                                                <Button variant="outline" className="w-full text-left font-normal">
                                                    {field.value ? format(field.value, "PPP") : "Pick a date"}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={(date) => {
                                                        field.onChange(date);
                                                        setCalendarOpen(false);
                                                    }}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" className="w-full">
                                Borrow Now
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
