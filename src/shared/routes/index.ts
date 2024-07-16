import { Router } from 'express';
import tripRoutes from '../../modules/trip/routes/TripRoutes';
import accommodationRoutes from '../../modules/accomodation/routes/AccommodationRoutes';
import activityRoutes from '../../modules/activities/routes/ActivityRoutes';
import pointOfInterestRoutes from '../../modules/pointsOfInterest/routes/PointOfInterestRoutes';
import restaurantRoutes from '../../modules/restaurant/routes/restaurantRoutes';
import flightRoutes from '../../modules/flights/routes/FlightRoutes';
import userRoutes from '../../modules/user/routes/userRoutes';

const router = Router();

router.use('/trips', tripRoutes);
router.use('/accommodations', accommodationRoutes);
router.use('/activities', activityRoutes);
router.use('/pointsOfInterest', pointOfInterestRoutes);
router.use('/restaurants', restaurantRoutes);
router.use('/flights', flightRoutes);
router.use('/user', userRoutes);

export default router;
