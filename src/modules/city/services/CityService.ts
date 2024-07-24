import { injectable, inject } from 'tsyringe';
import { ICityService } from '../interfaces/ICityService';
import { ICityRepository } from '../interfaces/ICityRepository';
import { IOpenAIService } from '../../openai/interfaces/IOpenAIService';
import { City } from '@prisma/client';

@injectable()
export class CityService implements ICityService {
  constructor(
    @inject('CityRepository') private cityRepository: ICityRepository,
    @inject('OpenAIService') private openAIService: IOpenAIService
  ) {}

  async createCity(data: { name: string; country: string }): Promise<City> {
    const prompt = `Proporciona información detallada sobre la ciudad de ${data.name} en ${data.country}. Incluye lo siguiente:
    1. Información general de la ciudad: una descripción extensa que abarque la historia, la cultura, la población, el idioma, la moneda y la ubicación. Escribe esto como un texto descriptivo.
    2. El mejor momento para visitar la ciudad: una descripción detallada de las mejores épocas del año para visitarla y por qué. Escribe esto como un texto descriptivo.
    3. Razones para visitar la ciudad: una lista detallada de razones por las que es una gran idea visitar la ciudad. Escribe esto como un texto descriptivo.

    Separa cada sección con el título correspondiente, seguido por el texto descriptivo.`;

    const aiResponse = await this.openAIService.generateText(prompt);

    // console.log('AI Response:', aiResponse); 

    const generalInfoMatch = aiResponse.match(/\*\*Información general de la ciudad:\*\*(.*?)\*\*El mejor momento para visitar la ciudad:\*\*/s);
    const bestTravelTimeMatch = aiResponse.match(/\*\*El mejor momento para visitar la ciudad:\*\*(.*?)\*\*Razones para visitar la ciudad:\*\*/s);
    const reasonToVisitMatch = aiResponse.match(/\*\*Razones para visitar la ciudad:\*\*(.*)/s);

    if (!generalInfoMatch || !bestTravelTimeMatch || !reasonToVisitMatch) {
      throw new Error('Failed to parse AI response. Please check the response format.');
    }

    const formatText = (text: string) => text.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();

    const generalInfo = formatText(generalInfoMatch[1]);
    const bestTravelTime = formatText(bestTravelTimeMatch[1]);
    const reasonToVisit = formatText(reasonToVisitMatch[1]);

    return this.cityRepository.create({
      name: data.name,
      country: data.country,
      description: generalInfo,
      bestTravelTime: bestTravelTime,
      reasonToVisit: reasonToVisit,
    });
  }

  async getCityById(id: string): Promise<City | null> {
    return this.cityRepository.findById(id);
  }

  async getAllCities(): Promise<City[]> {
    return this.cityRepository.findAll();
  }
}
