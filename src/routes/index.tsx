import App from "@/App";
import AddBooks from "@/Pages/AddBooks/AddBooks";
import Books from "@/Pages/Books/Books";
import BorrowSummary from "@/Pages/BorrowSummary/BorrowSummary";
import EditBook from "@/Pages/EditBook/EditBook";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: '/books',
                element: <Books></Books>
            },
            {
                path: '/create-book',
                element: <AddBooks/>
            },

            {
                path: '/borrow-summary',
                element: <BorrowSummary/>
            },
            
            {
                path: '/edit-book/:bookId',
                element: <EditBook></EditBook>
            },
            


        ]
    },
])