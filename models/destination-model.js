import mongoose from "mongoose";


const destinationSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    location: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        require: true,
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "review",
        }
    ],
},{
    timestamps: true
})

export default mongoose.model("destination", destinationSchema);