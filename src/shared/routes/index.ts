import { Router } from 'express';
import tripRoutes from '../../modules/trip/routes/TripRoutes';
import accommodationRoutes from '../../modules/accomodation/routes/AccommodationRoutes';
import activityRoutes from '../../modules/activities/routes/ActivityRoutes';
import pointOfInterestRoutes from '../../modules/pointsOfInterest/routes/PointOfInterestRoutes';

const router = Router();

router.use('/trips', tripRoutes);
router.use('/accommodations', accommodationRoutes);
router.use('/activities', activityRoutes);
router.use('/pointsOfInterest', pointOfInterestRoutes);

export default router;
