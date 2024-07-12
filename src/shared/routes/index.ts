import { Router } from 'express';
import tripRoutes from '../../modules/trip/routes/TripRoutes';
import accommodationRoutes from '../../modules/accomodation/routes/AccommodationRoutes';
import activityRoutes from '../../modules/activities/routes/ActivityRoutes';
import pointOfInterestRoutes from '../../modules/pointsOfInterest/routes/PointOfInterestRoutes';
import flightRoutes from '../../modules/flights/routes/FlightRoutes';

const router = Router();

router.use('/trips', tripRoutes);
router.use('/accommodations', accommodationRoutes);
router.use('/activities', activityRoutes);
router.use('/pointsOfInterest', pointOfInterestRoutes);
router.use('/flights', flightRoutes);

export default router;
