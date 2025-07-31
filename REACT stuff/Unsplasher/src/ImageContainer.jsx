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
                <div
                    key={image.id || index}
                    className="relative bg-white w-400 h-auto rounded-lg shadow-md overflow-hidden group"
                >
                    <img
                        src={image.urls.regular}
                        alt={image.alt_description || 'Unsplash image'}
                        className="w-full h-48 object-cover hover:scale-105 transition-transform duration-200"
                    />
                    <div
                        className="absolute bottom-0 left-0 w-full p-2 h-10 flex items-center
                                   opacity-0 group-hover:opacity-100 transition-opacity duration-200
                                   bg-gradient-to-t from-black/70 to-transparent text-white"
                        style={{ pointerEvents: 'none' }}
                    >
                        {image.user.name}
                    </div>
                </div>
            ))}
        </div>
    );
}