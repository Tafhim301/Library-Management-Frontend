import App from "@/App";
import AddBooks from "@/Pages/AddBooks/AddBooks";
import Books from "@/Pages/Books/Books";
import SingleBook from "@/Pages/Books/SingleBook";
import BorrowBook from "@/Pages/BorrowBook/BorrowBook";
import BorrowSummary from "@/Pages/BorrowSummary/BorrowSummary";
import EditBook from "@/Pages/EditBook/EditBook";
import { createBrowserRouter, Navigate } from "react-router";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true, 
                element: <Navigate to="/books" replace />,
            },

            {
                path: '/books',
                element: <Books></Books>
            },
            {
                path: '/create-book',
                element: <AddBooks />
            },

            {
                path: '/borrow-summary',
                element: <BorrowSummary />
            },

            {
                path: '/edit-book/:bookId',
                element: <EditBook></EditBook>
            },
            {
                path: '/borrow/:bookId',
                element: <BorrowBook></BorrowBook>
            },
            {
                path: '/books/:bookId',
                element:<SingleBook></SingleBook>
            },



        ]
    },
])