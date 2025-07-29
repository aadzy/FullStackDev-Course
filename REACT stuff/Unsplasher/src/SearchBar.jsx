import React from "react";
import { useState } from "react";

export default function SearchBar({ onSearch }) {
    const [term, setTerm] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (term.trim()) {
            onSearch(term);
        }
    }
    
    return(
        <div className="flex justify-center mb-6">
            <form onSubmit={handleSubmit} className="flex gap-2">
                <input 
                    className="border-2 border-gray-300 rounded-md p-2 w-64" 
                    value={term} 
                    onChange={(e) => setTerm(e.target.value)}
                    placeholder="Search for images..."
                />
                <button className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600" type="submit">
                    Search
                </button>
            </form>
        </div>
    )
}