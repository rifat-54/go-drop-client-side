import React from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../components/ShareComponents/LoadingSpinner";

const MyRevews = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: myReviews = [], isLoading } = useQuery({
    queryKey: ["myReviews"],
    enabled: !!user.email,
    queryFn: async () => {
      const { data } = await axiosSecure(`/my-revew/${user?.email}`);
      return data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  // console.log(myReviews);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        My Reviews
      </h2>

      {isLoading ? (
        <div className="text-center">Loading reviews...</div>
      ) : myReviews.length === 0 ? (
        <div className="text-center text-gray-500">No reviews found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myReviews.map((review, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl p-5 hover:shadow-lg transition duration-300 space-y-4 border"
            >
              {/* Reviewer Info */}
              <div className="flex items-center space-x-4">
                <img
                  src={review?.photo}
                  alt={review?.userName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold">{review?.userName}</h3>
                  <p className="text-sm text-gray-500">
                    {new Date(
                      parseInt(review?._id.substring(0, 8), 16) * 1000
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
                      i < review.rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.574-.955L10 0l2.938 5.955 6.574.955-4.756 4.635 1.122 6.545z" />
                  </svg>
                ))}
                <span className="text-sm text-gray-600 ml-1">
                  ({review.rating}/5)
                </span>
              </div>

              {/* Feedback */}
              <p className="text-gray-700">{review.feedback}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRevews;
