# 📚 MiniLibrary Frontend

A minimalist React + TypeScript + Redux + Tailwind-based frontend project for managing books and borrow records.


## 🌟 Features

- ✅ View all books with live data from the backend API
- ✅ Filter books by genre using a dropdown
- ✅ Borrow books and view borrow summary
- ✅ Loader and error state handling
- ✅ Responsive, accessible UI with `shadcn/ui`
- ✅ Clean Redux Toolkit Query setup
- ✅ Type-safe components and API responses
- ✅ Modern and minimal component architecture

---

## 🧰 Tech Stack

- React (Vite)
- TypeScript
- Redux Toolkit + RTK Query
- React Router DOM
- Tailwind CSS
- shadcn/ui (Radix-based components)
- React Spinners
- Vercel (deployment)

---

## 📺 Pages Overview

### 📗 All Books  
`/books`

- Displays all books
- Genre filter (FICTION, SCIENCE, FANTASY, etc.)
- Loading spinner
- Minimal book cards
- Pagination

---

### 📕 Borrow Summary  
`/borrow-summary`

- Lists borrowed books
- Aggregated total quantity
- Clean layout

---

### ➕ Add Book  
`/add-book`

- Form for adding new books
- Validation for inputs

---

## 🧪 Sample Code

### 🔍 Filtering Books by Genre

```
<Select onValueChange={(value) => setFilter(value)} value={filter}>
  <SelectTrigger>
    <SelectValue placeholder="Filter by Genre" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="ALL">All Genres</SelectItem>
    {genres.map((genre) => (
      <SelectItem key={genre} value={genre}>
        {genre}
      </SelectItem>
    ))}
  </SelectContent>
</Select>
```

---

## 🔄 Project Setup

**Clone the repo**

```
git clone https://github.com/Tafhim301/Library-Management-Frontend
cd Library-Management-Frontend
```

**Install dependencies**

```
npm install
```

**Run the project**

```
npm run dev
```


**Backend Repo**
Check This Out for Backend Support:
**https://github.com/Tafhim301/Library_Management_Backend**

> ⚠️ Make sure your backend server is running before launching the frontend.

---

## 🌐 Live App

Frontend URL:  
**https://library-management-frontend-alpha.vercel.app/**


Try routes like:  
`/books`, `/summary`

---

## 📂 Folder Structure

```
src/
├── components/       → Reusable UI components
├── pages/            → Route-level views
├── redux/            → RTK Query setup
├── routes/           → Router definitions
├── types/            → TypeScript interfaces
└── App.tsx           → Root layout
```

---

## 📌 Submission Checklist

- ✅ Genre filter implemented  
- ✅ RTK Query setup complete  
- ✅ Borrow summary functional  
- ✅ Tailwind and shadcn integrated  
- ✅ Responsive layout  
- ✅ Deployed to Vercel  
- ✅ README written  

---

## 👨‍💻 Author

**Tafhimul Islam**  
GitHub: [@tafhim301](https://github.com/tafhim301)

---

