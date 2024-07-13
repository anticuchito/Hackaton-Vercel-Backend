import axios from 'axios';

export async function getUnsplashImage(query: string): Promise<string> {
  const unsplashAccessKey = 'fhqERsNVLC9vbRH4rHxK99vR2r8CHplXGmuL5l8W4I4'; 
  const response = await axios.get(`https://api.unsplash.com/photos/random`, {
    params: {
      query,
      client_id: unsplashAccessKey,
    },
  });

  return response.data.urls.regular;
}
