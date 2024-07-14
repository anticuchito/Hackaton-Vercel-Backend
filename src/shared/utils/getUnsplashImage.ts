import axios from 'axios';

const unsplashAccessKey = 'fhqERsNVLC9vbRH4rHxK99vR2r8CHplXGmuL5l8W4I4'; 

export async function getUnsplashImages(query: string): Promise<string[]> {
  const numberOfImages = 3;
  const response = await axios.get(`https://api.unsplash.com/search/photos`, {
    params: {
      query,
      per_page: numberOfImages,
      client_id: unsplashAccessKey,
    },
  });

  const imageUrls = response.data.results.map((result: any) => result.urls.regular);
  return imageUrls;
}
