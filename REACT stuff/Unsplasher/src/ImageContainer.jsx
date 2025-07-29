import React from "react";

export default function ImageContainer({ images, loading }) {
    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-lg">Loading images...</div>
            </div>
        );
    }

    if (!images || images.length === 0) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-lg text-gray-500">No images found. Try searching for something!</div>
            </div>
        );
    }

    return (
        <div className="flex flex-wrap gap-4">
            {images.map((image, index) => (
                <div key={image.id || index} className="bg-white w-400 h-auto rounded-lg shadow-md overflow-hidden">
                    <img 
                        src={image.urls.small} 
                        alt={image.alt_description || 'Unsplash image'} 
                        className="w-full h-48 object-cover hover:scale-105 transition-transform duration-200"
                    />
                </div>
            ))}
        </div>
    );
}