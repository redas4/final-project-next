import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
interface Business {
    businessId: string;
    name: string;
    description: string;
  }

interface Review {
    _id: string;
    title: string;
    comment: string;
    businessName: string;
}


interface BusinessListProps {
    userEmail: string | undefined;
    reviews: Review[]; 
    setReviews: React.Dispatch<React.SetStateAction<Review[]>>;
    businesses: Business[]; 
}
  

export default function BusinessList({ userEmail, reviews, setReviews, businesses }: BusinessListProps){
    const [selectedBusinessId, setSelectedBusinessId] = useState('');
    const [selectedBusinessName, setSelectedBusinessName] = useState('')
    const [showModal, setShowModal] = useState(false);
    const [reviewTitle, setReviewTitle] = useState('');
    const [reviewText, setReviewText] = useState('');
    const [error, setError] = useState('');
    const [reviewStatus, setReviewStatus] = useState('public');
    const router = useRouter();

    const handleWriteReview = (businessId: string, businessName: string) => {
        setSelectedBusinessId(businessId);
        setSelectedBusinessName(businessName)
        setShowModal(true);
      };

    const handleModalSubmit = () => {
        if(!reviewText || !reviewTitle){
            setError('Please fill out all fields')
        } else {
            const addReview = async () =>{
                const res = await fetch('/api/addReview', {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userEmail, reviewText, reviewTitle, reviewStatus, selectedBusinessId })
                });
        
                if (!res.ok) {
                    throw new Error('Failed to fetch business data');
                }
            }
            addReview();
            setShowModal(false);
            setSelectedBusinessId('');
            setSelectedBusinessName('');
            setReviewStatus('public')
            setReviewTitle('');
            setReviewText('');
            const newReview: Review = {
                _id: selectedBusinessId,
                title: reviewTitle, 
                comment: reviewText,
                businessName: selectedBusinessName
            }
            setReviews(prevReviews => [...prevReviews, newReview]);
            // router.refresh();
        }


    };

    const handleModalCancel = () => {
        setShowModal(false);
        setSelectedBusinessId('');
        setSelectedBusinessName('');
        setReviewTitle('');
        setReviewText('');
        setReviewStatus('public')
    };
    

    return (
        <div>
            <div>
                <h1 className="text-3xl font-bold mb-4">Places</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {businesses.map((business: Business) => (
                    <div key={business.businessId} className="border p-4 rounded-md shadow-md">
                    <h2 className="text-2xl font-bold mb-2">{business.name}</h2>
                    <p className="text-gray-600 mb-4">{business.description}</p>
                    <button
                        onClick={() => handleWriteReview(business.businessId, business.name)}
                        className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                    >
                        Write Review
                    </button>
                    </div>
                ))}
                </div>
            </div>


  
            {showModal && (
                <div className="fixed inset-0 overflow-y-auto flex items-center justify-center">
                    <div className="modal bg-white w-96 p-6 rounded shadow-lg">
                    <h2 className="text-2xl font-bold mb-4">Write Review</h2>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-600 mb-1">
                        Title:
                    </label>
                    <input
                        type="text"
                        id="title"
                        className="w-full border border-gray-300 p-2 rounded mb-4 focus:outline-none focus:ring focus:border-blue-300"
                        value={reviewTitle}
                        onChange={(e) => setReviewTitle(e.target.value)}
                    />
                    <label htmlFor="review" className="block text-sm font-medium text-gray-600 mb-1">
                        Description:
                    </label>
                    <textarea
                        id="review"
                        className="w-full border border-gray-200 p-2 bg-zinc-100/70 rounded mb-4 focus:outline-none focus:ring focus:border-blue-300"
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                    />
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600 mb-1">Review Status:</label>
                        <ul className="grid w-full gap-2">
                        <li>
                            <input
                            type="radio"
                            id="public"
                            name="reviewStatus"
                            value="public"
                            className="hidden peer"
                            checked={reviewStatus === 'public'}
                            onChange={() => setReviewStatus('public')}
                            />
                            <label
                            htmlFor="public"
                            className={`inline-flex items-center justify-between w-full p-3 text-gray-800 border border-gray-200 rounded cursor-pointer 
                                ${reviewStatus === 'public' ? 'bg-gray-400' : 'bg-gray-100'}
                                dark:border-gray-700 `}
                            >
                            <div className="block text-sm">
                                <div className="w-full font-semibold">Public</div>
                                <div className="w-full">Anyone can view your review</div>
                            </div>
                            </label>
                        </li>
                        <li>
                            <input
                            type="radio"
                            id="private"
                            name="reviewStatus"
                            value="private"
                            className="hidden peer"
                            checked={reviewStatus === 'private'}
                            onChange={() => setReviewStatus('private')}
                            />
                            <label
                            htmlFor="private"
                            className={`inline-flex items-center justify-between w-full p-3 text-gray-800 border border-gray-200 rounded cursor-pointer 
                            ${reviewStatus === 'private' ? 'bg-gray-400' : 'bg-gray-100'}
                            dark:border-gray-700 `}
                            >
                            <div className="block text-sm">
                                <div className="w-full font-semibold">Private</div>
                                <div className="w-full">Only you can view this review</div>
                            </div>
                            </label>
                        </li>
                        </ul>
                    </div>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <div className="flex justify-end">
                        <button
                        onClick={handleModalSubmit}
                        className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                        >
                        Submit
                        </button>
                        <button
                        onClick={handleModalCancel}
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 focus:outline-none focus:ring focus:border-blue-300"
                        >
                        Cancel
                        </button>
                    </div>
                    </div>
                </div>
                )}

      </div>
    )
}