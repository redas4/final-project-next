
interface Review {
    _id: string;
    title: string;
    comment: string;
}
  
interface ReviewListProps {
    reviews: Review[] | undefined;
}

export default function BusinessReviewList({ reviews }: ReviewListProps) {
    return (
        <div>
        {reviews && reviews.length > 0 ? (
            <div className="mt-6">
              {reviews.map((review) => (
                <div key={review._id} className="mb-4 p-4 bg-white rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold mb-2">{review.title}</h3>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-gray-600">No reviews available</p>
          )}
        </div>
      );
  }