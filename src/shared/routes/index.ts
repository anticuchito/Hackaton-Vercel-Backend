import { Router } from 'express';
import openAIRoutes from '../../modules/openai/routes/openAIRoutes';
import tripRoutes from '../../modules/trip/routes/TripRoutes';
import accommodationRoutes from '../../modules/accomodation/routes/AccommodationRoutes';
import activityRoutes from '../../modules/activities/routes/ActivityRoutes';
import pointOfInterestRoutes from '../../modules/pointsOfInterest/routes/PointOfInterestRoutes';
import restaurantRoutes from '../../modules/restaurant/routes/restaurantRoutes';
import flightRoutes from '../../modules/flights/routes/FlightRoutes';
import itineraryRoutes from '../../modules/itinerary/routes/itineraryRoutes';
import userRoutes from '../../modules/user/routes/userRoutes';
import cityRoutes from '../../modules/city/routes/cityRoutes';

const router = Router();

router.use('/openAi', openAIRoutes);
router.use('/trips', tripRoutes);
router.use('/accommodations', accommodationRoutes);
router.use('/activities', activityRoutes);
router.use('/pointsOfInterest', pointOfInterestRoutes);
router.use('/restaurants', restaurantRoutes);
router.use('/flights', flightRoutes);
router.use('/itinerary', itineraryRoutes);
router.use('/user', userRoutes);
router.use('/city', cityRoutes);

export default router;
