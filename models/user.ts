import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        type: {
            type: String,
            default: 'user', 
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        },
        reviews: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Review'
            }
        ]
    },
    {timestamps: true}
)

const User = mongoose.models.User || mongoose.model('User', userSchema);

const businessSchema = new Schema(
    {
        type: {
            type: String,
            default: 'business',
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        reviews: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Review'
            }
        ]
    },
    {timestamps: true}
);
const Business = mongoose.models.Business || mongoose.model('Business', businessSchema);

const reviewSchema = new Schema(
    {
      type: {
        type: String,
        default: 'review',
      },
      title: {
        type: String,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      businessId: {
        type: Schema.Types.ObjectId,
        ref: 'Business',
        required: true,
      },
      status: {
        type: String,
        enum: ['public', 'private'], 
        default: 'public', 
        required: true,
      },
    },
    { timestamps: true }
  );
const Review = mongoose.models.Review || mongoose.model('Review', reviewSchema);


export {User, Business, Review};
