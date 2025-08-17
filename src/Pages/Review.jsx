import React from "react";
import { FaStar } from "react-icons/fa";

const Review = () => {
    const reviews = [
        {
            name: "Sadman Sajib",
            rating: 5,
            comment: "Amazing building and top-notch facilities!",
            avatar: "https://i.pravatar.cc/100?img=1",
        },
        {
            name: "Md. Shyamal Mollah",
            rating: 4,
            comment: "Great experience overall, very satisfied with the services.",
            avatar: "https://i.pravatar.cc/100?img=2",
        },
        {
            name: "Md Rifat Hossain",
            rating: 5,
            comment: "Spacious apartments and excellent management.",
            avatar: "https://i.pravatar.cc/100?img=3",
        },
        {
            name: "Sumon Ahmed",
            rating: 4,
            comment: "Friendly staff and smooth maintenance services.",
            avatar: "https://i.pravatar.cc/100?img=4",
        },
    ];

    return (
        <div className="max-w-6xl mx-auto my-16 px-6">
            <div className="max-w-6xl mx-auto text-center mb-12">
                <h2 className="text-4xl font-bold text-teal-600 mb-2">
                    What Our Residents Say
                </h2>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {reviews.map((review, index) => (
                    <div
                        key={index}
                        className="relative p-6 rounded-2xl shadow-xl transform hover:-translate-y-2 transition-transform duration-300"
                        style={{
                            background:
                                "linear-gradient(135deg, rgba(72, 187, 120,0.1), rgba(72, 187, 120,0.05))",
                        }}
                    >
                        {/* Avatar */}
                        <div className="flex items-center mb-4">
                            <img
                                src={review.avatar}
                                alt={review.name}
                                className="w-14 h-14 rounded-full border-2 border-teal-400 shadow-md"
                            />
                            <div className="ml-4">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                                    {review.name}
                                </h3>
                                <div className="flex mt-1">
                                    {Array(5)
                                        .fill(0)
                                        .map((_, i) => (
                                            <FaStar
                                                key={i}
                                                className={`${i < review.rating
                                                    ? "text-yellow-400"
                                                    : "text-gray-300 dark:text-gray-500"
                                                    }`}
                                            />
                                        ))}
                                </div>
                            </div>
                        </div>

                        {/* Comment */}
                        <p className="text-gray-700 dark:text-gray-200 italic relative pl-6 before:content-['“'] before:absolute before:-left-2 before:-top-2 text-lg">
                            {review.comment}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Review;
