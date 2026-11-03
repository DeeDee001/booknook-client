import { API_BASE_URL } from "./utils";

export interface Book {
  _id: string;
  title: string;
  author: string;
  category: string;
  image: string;
  description: string;
  userName: string;
  userEmail: string;
  totalCopies: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Borrow {
  _id: string;
  bookId: string;
  bookTitle: string;
  bookImage: string;
  userEmail: string;
  userName: string;
  borrowDate: string;
  returnDate: string;
  createdAt?: string;
}

// Request JWT token from Express server
export async function getJwtToken(email: string, name?: string): Promise<string | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/jwt`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name }),
    });

    const data = await res.json();
    if (data.success && data.token) {
      if (typeof window !== "undefined") {
        localStorage.setItem("booknook_jwt", data.token);
      }
      return data.token;
    }
    return null;
  } catch (err) {
    console.error("Failed to obtain JWT token:", err);
    return null;
  }
}

export function getStoredToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem("booknook_jwt");
  }
  return null;
}

export function removeStoredToken() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("booknook_jwt");
  }
}

// 1. GET /books
export async function fetchBooks(params?: {
  category?: string;
  search?: string;
  limit?: number;
  sort?: string;
  email?: string;
}): Promise<{ success: boolean; data: Book[]; count?: number; message?: string }> {
  try {
    const query = new URLSearchParams();
    if (params?.category && params.category !== "All") query.append("category", params.category);
    if (params?.search) query.append("search", params.search);
    if (params?.limit) query.append("limit", params.limit.toString());
    if (params?.sort) query.append("sort", params.sort);
    if (params?.email) query.append("email", params.email);

    const url = `${API_BASE_URL}/books${query.toString() ? `?${query.toString()}` : ""}`;
    const res = await fetch(url, { cache: "no-store" });
    const data = await res.json();
    return data;
  } catch (err: any) {
    return { success: false, data: [], message: err.message || "Failed to fetch books" };
  }
}

// 2. GET /books/:id
export async function fetchBookById(id: string): Promise<{ success: boolean; data?: Book; message?: string }> {
  try {
    const res = await fetch(`${API_BASE_URL}/books/${id}`, { cache: "no-store" });
    const data = await res.json();
    return data;
  } catch (err: any) {
    return { success: false, message: err.message || "Failed to fetch book details" };
  }
}

// 3. POST /books
export async function addBook(
  bookData: Omit<Book, "_id" | "createdAt" | "updatedAt">,
  token: string
): Promise<{ success: boolean; data?: Book; message?: string }> {
  try {
    const res = await fetch(`${API_BASE_URL}/books`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(bookData),
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, message: err.message || "Failed to add book" };
  }
}

// 4. PATCH /books/:id
export async function updateBook(
  id: string,
  bookData: Partial<Book>,
  token: string
): Promise<{ success: boolean; message?: string }> {
  try {
    const res = await fetch(`${API_BASE_URL}/books/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(bookData),
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, message: err.message || "Failed to update book" };
  }
}

// 5. DELETE /books/:id
export async function deleteBook(id: string, token: string): Promise<{ success: boolean; message?: string }> {
  try {
    const res = await fetch(`${API_BASE_URL}/books/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, message: err.message || "Failed to delete book" };
  }
}

// 6. POST /borrows
export async function borrowBook(
  borrowData: {
    bookId: string;
    bookTitle: string;
    bookImage: string;
    userEmail: string;
    userName: string;
    borrowDate: string;
    returnDate: string;
  },
  token: string
): Promise<{ success: boolean; data?: Borrow; message?: string }> {
  try {
    const res = await fetch(`${API_BASE_URL}/borrows`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(borrowData),
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, message: err.message || "Failed to borrow book" };
  }
}

// 7. GET /borrows
export async function fetchUserBorrows(
  email: string,
  token: string
): Promise<{ success: boolean; data: Borrow[]; count?: number; message?: string }> {
  try {
    const res = await fetch(`${API_BASE_URL}/borrows?email=${encodeURIComponent(email)}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, data: [], message: err.message || "Failed to fetch borrows" };
  }
}

// 8. DELETE /borrows/:id
export async function returnBook(id: string, token: string): Promise<{ success: boolean; message?: string }> {
  try {
    const res = await fetch(`${API_BASE_URL}/borrows/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, message: err.message || "Failed to return book" };
  }
}
