import { useGetBorrowSummaryQuery } from "@/redux/api/baseApi";
import { ClipLoader } from "react-spinners";
import {
    Table,
    TableHeader,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
} from "@/components/ui/table";

export default function BorrowSummary() {
    const { data, isLoading, isError } = useGetBorrowSummaryQuery(undefined);
    

    if (isLoading)
        return (
            <p className="text-center py-10">
                <ClipLoader />
            </p>
        );

    if (isError)
        return (
            <p className="text-center text-red-600 text-3xl font-bold py-10">
                Book Summary Not Found
            </p>
        );
    const BorrowSummary  = data.data;

    return (
        <div className="p-6  mx-auto">
            <h2 className="text-2xl font-bold mb-4">Borrow Summary</h2>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[50%]">Book Title</TableHead>
                        <TableHead>ISBN</TableHead>
                        <TableHead className="text-right">Total Borrowed</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {BorrowSummary?.map((book: { book : {title: string; isbn: string}; totalQuantity: number }, idx: number) => (
                        <TableRow key={idx}>
                            <TableCell className="font-bold text-lg">{book.book.title}</TableCell>
                            <TableCell className="font-semibold">{book.book.isbn}</TableCell>
                            <TableCell className="text-right font-bold">
                                {book.totalQuantity}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
