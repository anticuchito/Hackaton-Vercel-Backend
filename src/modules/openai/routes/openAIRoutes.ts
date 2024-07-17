import { Router } from 'express';
import { container } from 'tsyringe';
import { OpenAIController } from '../controllers/OpenAIController';

const router = Router();
const openAIController = container.resolve(OpenAIController);

router.post('/generate-text', (req, res, next) => openAIController.generateText(req, res, next));
router.get('/generated-texts', (req, res, next) => openAIController.getGeneratedTexts(req, res, next));
router.get('/generated-texts/:id', (req, res, next) => openAIController.getGeneratedTextById(req, res, next));
router.post('/chat', (req, res, next) => openAIController.streamChatResponse(req, res, next));

export default router;
