import mongoose from "mongoose";

const reviewsSchema = new mongoose.Schema({
    destinationId : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "destination",
        require: true
    },
    userId : {
        type: String,
        require: true
    },
    text: {
        type: String,
        require: true,
    },
    rating: {
        type : Number,
        max: 5,
        min: 0,
        require: true
    }
},{
    timestamps: true,
})

export default mongoose.model("review",reviewsSchema);