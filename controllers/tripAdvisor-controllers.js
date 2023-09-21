import destinationModel from "../models/destination-model.js";
import reviewsModel from "../models/reviews-model.js";


export const createTravelDestination = async (req , res) => {
    try {
        const {name , location , description , rating} = req.body;

        //checking if required feilds are not present 

        if(!name || !location || !description || !rating) {
            return res.status(400).json({
            status : "failed",
            method: "POST",
            message : `error occured due to required feilds is not present`,
            data: null
            })
        }

        //checking that destination is already exits 

        const found = await destinationModel.findOne({name : name});

        //returing if already exites 
        if(found || found?.length === 1) {
            return res.status(403).json({
                status : "failed",
                method: "POST",
                message: `error occured due to data is already registered try with another dataset!`,
                data:null
            })
        }

        //creating new destination model
        const destination = new destinationModel({
            name,
            location,
            description,
            rating
        })

        //saving to database
        const result = await destination.save();


        //returing the res
        return res.status(201).json({
            status : "Success",
            method: "POST",
            message: `destination is successfully added to the collection`,
            data: result
        })



    }catch (error) {
        return res.status(500).json({
            status : "failed",
            method: "POST",
            message : `error occured due to ${error.message}`,
            data: null
        })
    }
}

export const getTravelDestinationByName = async (req , res) => {
    try {
        //geting name as params
        const { name } = req.params;

        //checking for the parmas 
        if(!name) {
            return res.status(400).json({
                status : "failed",
                method: "GET",
                message : `error occured due to name is missing`,
                data: null
            })
        }

        //checking for the 
        const found = await destinationModel.find({name}).populate("reviews").select("-__v -updatedAt");

        //checking if found
        if(!found || found.length < 1) {
            return res.status(404).json({
                status : "failed",
                method: "GET",
                message : `error occured due destination is not found`,
                data: null
            })
        }

        //returing response 
        return res.status(200).json({
            status : "Success",
            method: "GET",
            message : `Destination Found Successfuly`,
            data: found
        })


    }catch (error) {
        return res.status(500).json({
            status : "failed",
            method: "GET",
            message : `error occured due to ${error.message}`,
            data: null
        })
    }
}

export const getAllTravelDestinations = async (req , res) => {
    try {
        //finding all the destination
        const found = await destinationModel.find().populate("reviews").select("-__v -updatedAt");

        // checking if not found
        if(!found || found.length < 1) {
            return res.status(404).json({
                status: "failed",
                method: "GET",
                message: `error due to no destinatons is found`,
                data: null
            })
        }

        //returing the response
        return res.status(200).json({
            status: "Success",
            method: "GET",
            message: `Destination found Successfully`,
            data: found
        })
        

    }catch (error) {
        return res.status(500).json({
            status: "failed",
            method: "GET",
            message: `error due to ${error.message}`,
            data: null
        })
    }
}

export const getTravelDestinationsByLocation = async (req , res) => {
    try {
        // geting location as params
        const {location} = req.params;

        // checking if location is not present
        if(!location) {
            return res.status(403).json({
                status: "failed",
                method: "GET",
                message: `error due to loaction as a params is required`,
                data: null
            })
        }

        // finding the destination from the database
        const found = await destinationModel.find({location : location}).populate("reviews").select("-__v -updatedAt");

        // checking if destination is not found
        if(!found || found.length < 1) {
            return res.status(404).json({
                status: "failed",
                method: "GET",
                message: `error due to destination is not found`,
                data: null
            })
        }

        //returing the response
        return res.status(200).json({
            status: "Success",
            method: "GET",
            message: `Destination found Successfully`,
            data: found,
        })

    }catch (error) {
        return res.status(500).json({
            status: "failed",
            method: "GET",
            message: `error due to ${error.message}`,
            data: null
        })
    }
}
export const readTravelDestinationsByRating = async (req , res) => {
    try {
        
        // finding the destination 
        const foundRating = await destinationModel.find().populate("reviews").select("-__v -updatedAt").sort({rating : -1});

        // checking if destination is not found
        if(!foundRating || foundRating.length < 1) {
            return res.status(404).json({
                status: "failed",
                method: "GET",
                message: `error due to destination is not found`,
                data: null
            })
        }

        //returning the response
        return res.status(200).json({
            status: "Success",
            method: "GET",
            message: `Destination found Successfully and rating is sorted in a dec order`,
            data: foundRating,
        })

    }catch (error) {
        return res.status(500).json({
            status: "failed",
            method: "GET",
            message: `error due to ${error.message}`,
            data: null
        })
    }
}

export const updateTravelDestination = async (req , res) => {
    try {

        //getting destinationId as params
        const {destinationId} = req.params;

        //getting name location description rating as req body
        const {name , location , description, rating} = req.body

        //checking destination id is there or not
        if(!destinationId) {
            return res.status(403).json({
                status: "failed",
                method: "PUT",
                message: `error due to destinationId is missing as param`,
                data: null
            })
        }

        //find destination from database
        const found = await destinationModel.findById({_id : destinationId}).populate("reviews").select("-__v -updatedAt");

        //checking that destination is present
        if(!found || found.length < 1) {
            return res.status(404).json({
                status: "failed",
                method: "PUT",
                message: `error due to destination not found`,
                data: null
            })
        }

        // creating a updated restination object
        const newDestination = {
            name : name || found.name,
            location : location || found.location,
            description : description || found.description,
            rating : rating || found.rating
        }


        // updating the destination
        const result = await destinationModel.findByIdAndUpdate({_id : found._id},newDestination,{new : true});


        // checking tha resul have something
        if(!result || result.length < 1) {
            return res.status(404).json({
                status: "failed",
                method: "PUT",
                message: `error due to destination is not updated`,
                data: null
            })
        }

        //returning the response
        return res.status(201).json({
            status: "Sucess",
            method: "PUT",
            message: `destination is updated Successfully`,
            data: result
        })



    }catch (error) {
        return res.status(500).json({
            status: "failed",
            method: "PUT",
            message: `error due to ${error.message}`,
            data: null
        })
    }
}

export const deleteTravelDestination = async (req , res) => {
    try {

        // getting the destination id from params
        const {destinationId} = req.params;

        // checking that params are present 
        if(!destinationId) {
            return res.status(403).json({
                status: "failed",
                method: "DELETE",
                message: `error due to destination id is missing as a params`,
                data: null
            }) 
        }

        // finding the destination from the database
        const found = await destinationModel.findOneAndDelete({_id : destinationId}).populate("reviews").select("-__v -updatedAt");

        //checking the destination is present 
        if(!found || found?.length < 1) {
            return res.status(400).json({
                status: "failed",
                method: "DELETE",
                message: `error due to destination is not deleted`,
                data: null
            }) 
        }

        // returing the response
        return res.status(200).json({
            status: "Success",
            method: "DELETE",
            message: `Destination is deleted Successfully`,
            data: found
        }) 


    }catch (error) {
        return res.status(500).json({
            status: "failed",
            method: "DELETE",
            message: `error due to ${error.message}`,
            data: null
        }) 
    }
}
export const filterDestinationsByRating = async (req , res) => {
    try {

        // getting the min rating as a params
        const {minRating} = req.params;

        // checking that min rating is present
        if(!minRating) {
            return res.status(403).json({
                status: "failed",
                method: "GET",
                message: `error due to minRating is missing as a params`,
                data: null
            }) 
        }

        // checking the rating is not greater then 5 and not less than 0
        if(+minRating < 0 || +minRating > 5) {
            return res.status(403).json({
                status: "failed",
                method: "GET",
                message: `error due to minRating is less then 0 or greater then 5`,
                data: null
            }) 
        }

        // finding the destination from the database
        const found = await destinationModel.find({rating : {$gte : +minRating , $lte : 5}}).populate("reviews").select("-__v -updatedAt").sort({rating : -1});

        // checking that destination is not found
        if(!found || found.length < 1) {
            return res.status(404).json({
                status: "failed",
                method: "GET",
                message: `error due to destination is not found`,
                data: null
            }) 
        }

        //return the response
        return res.status(200).json({
            status: "Success",
            method: "GET",
            message: `Destination is found by min rating Successfully and sort the rating in dec order`,
            data: found
        }) 


    }catch (error) {
        return res.status(500).json({
            status: "failed",
            method: "GET",
            message: `error due to ${error.message}`,
            data: null
        }) 
    }
}
export const addReview = async (req , res) => {
    try {

        // getting the destination id as a params
        const {destinationId} = req.params;

        // getting userId text and rating as req body
        const {userId , text , rating} = req.body;
        
        // checking that all the required feild is present
        if(!destinationId || !userId || !text || !rating) {
            return res.status(403).json({
                status: "failed",
                method: "POST",
                message: `error due to required feild  is missing! userid , text , rating is required!`,
                data: null
            }) 
        }

        // finding the destination from database
        const found = await destinationModel.findById({_id : destinationId}).populate("reviews").select("-__v -updatedAt")

        // checking that destination is not found
        if( !found || found.length < 1) {
            return res.status(404).json({
                status: "failed",
                method: "POST",
                message: `error due to destination is not found`,
                data: null
            }) 
        }

        // new reviews model data created
        const reviews = new reviewsModel({
            userId,
            text,
            rating,
            destinationId
        }); 

        // saving data to database
        const result = await reviews.save();

        //PUSING the reviews to the database
        await destinationModel.updateOne({_id : destinationId} , {
            $push : {
                reviews : result._id
            }
        })
        
        //returin the response
        return res.status(200).json({
            status: "Success",
            method: "POST",
            message: `Destination is found Successfully and reviews added Successfully`,
            data: result
        }) 


    }catch (error) {
        return res.status(500).json({
            status: "failed",
            method: "POST",
            message: `error due to ${error.message}`,
            data: null
        }) 
    }
}
export const getDestinationReviewsWithUserDetails = async (req , res) => {
    try {
        // getting the destination id as params 
        const {destinationId} = req.params;
        
        //checking tha destination is present
        if(!destinationId) {
            return res.status(400).json({
                status: "failed",
                method: "GET",
                message: `error due to required feild  is missing! destinationId`,
                data: null
            }) 
        }

        // finding the destination from database
        const found = await destinationModel.findById({_id : destinationId}).populate("reviews").select("-__v -updatedAt")

        // checkin that destination is not found
        if( !found || found.length < 1) {
            return res.status(400).json({
                status: "failed",
                method: "GET",
                message: `error due to destination is not found`,
                data: null
            }) 
        }

        // returin the response
        return res.status(200).json({
            status: "Success",
            method: "GET",
            message: `reviews is found Successfully`,
            data: found.reviews
        }) 


    }catch (error) {
        return res.status(500).json({
            status: "failed",
            method: "GET",
            message: `error due to ${error.message}`,
            data: null
        }) 
    }
}

