import { Router } from "express";
import { addReview, createTravelDestination, deleteTravelDestination, filterDestinationsByRating, getAllTravelDestinations, getDestinationReviewsWithUserDetails, getTravelDestinationByName, getTravelDestinationsByLocation, readTravelDestinationsByRating, updateTravelDestination } from "../controllers/tripAdvisor-controllers.js";

const route = Router();


route.post("/destinations" , createTravelDestination);
route.get("/destinations/get-all" , getAllTravelDestinations);
route.get("/destinations/:name" , getTravelDestinationByName);
route.get("/destinations/location/:location" , getTravelDestinationsByLocation);
route.get("/destinations/sort/rating" , readTravelDestinationsByRating);
route.put("/destinations/update/:destinationId" , updateTravelDestination);
route.delete("/destinations/delete/:destinationId" , deleteTravelDestination);
route.get("/destinations/filter/:minRating" , filterDestinationsByRating);
route.post("/destinations/:destinationId/reviews" , addReview);
route.get("/destinations/:destinationId/reviews" , getDestinationReviewsWithUserDetails);


export default route;