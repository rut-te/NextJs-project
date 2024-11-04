"use client"

import React, { useEffect, useState } from 'react';
import booksService from '../../services/books';
import styles from './books.module.css';
import { ClipLoader } from 'react-spinners';

function Page() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newBook, setNewBook] = useState({ title: "", price: "", image: "" });

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        setLoading(true);
        try {
            const data = await booksService.getAllBooks();
            setBooks(data);
        } catch (error) {
            console.error("Error fetching books:", error);
            alert("Failed to fetch books. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const handleAddBook = async () => {
        if (!newBook.title || !newBook.price || !newBook.image) {
            alert("Please fill in all fields");
            return;
        }

        try {
            const addedBook = await booksService.addBook(newBook);
            setBooks(books => [...books, addedBook]);
            setNewBook({ title: "", price: "", image: "" });
        } catch (error) {
            console.error("Error adding book:", error);
            alert("Failed to add book. Please try again later.");
        }
    };

    const handleDeleteBook = async (id) => {
        try {
            await booksService.deleteBook(id);
            setBooks(books => books.filter(book => book.id !== id));
        } catch (error) {
            console.log("Error deleting book:", error.message);
        }
    };

    return (
        <div>
            {loading ? (
                <div>
                    <ClipLoader color="orange" loading={loading} size={50} />
                </div>
            ) : (
                <div>
                    <h2 className={styles.title}>BOOKS</h2>
                    <div className={styles.prodContainer}>
                        {books.map((product) => (
                            <div key={product.id} className={styles.prod}>
                                <h4>{product.title}</h4>
                                <p>Price: ${product.price}</p>
                                <img src={product.image} alt={product.title} />
                                <button onClick={() => handleDeleteBook(product.id)}>Delete</button>
                            </div>
                        ))}
                    </div>

                    <div className={styles.addBookForm}>
                        <h3>Add New Book</h3>
                        <input
                            type="text"
                            placeholder="Title"
                            value={newBook.title}
                            onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Price"
                            value={newBook.price}
                            onChange={(e) => setNewBook({ ...newBook, price: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Image URL"
                            value={newBook.image}
                            onChange={(e) => setNewBook({ ...newBook, image: e.target.value })}
                        />
                        <button onClick={handleAddBook}>Add Book</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Page;