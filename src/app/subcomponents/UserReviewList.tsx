import React from 'react';

interface Review {
  _id: string;
  title: string;
  comment: string;
  businessName: string;
}

interface ReviewListProps {
  reviews: Review[] | undefined;
}

export default function UserReviewList({ reviews }: ReviewListProps) {
  return (
    <div>
      {reviews && reviews.length > 0 ? (
        <div className="mt-6">
          {reviews.map((review) => (
            <div key={review._id} className="mb-4 p-4 bg-white rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">{review.title}</h3>
              <p className="text-gray-700">{review.comment}</p>
              <p className="text-gray-500 mt-2">Business: {review.businessName}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-4 text-gray-600">No reviews available</p>
      )}
    </div>
  );
}
