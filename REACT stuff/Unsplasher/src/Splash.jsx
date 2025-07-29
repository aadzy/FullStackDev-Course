import axios from 'axios';

export default async function SearchImages(term) {
    try {
        const response = await axios.get('https://api.unsplash.com/search/photos', {
            headers: {
                Authorization: 'Client-ID wLjaMBzSwWV5HCiKF_-a0yoXy1UJu5iAuIud262j2A8',
            },
            params: {
                query: term,
            },
        });
        console.log(response.data);
        return response.data.results;
    } catch (error) {
        console.error('Error fetching images:', error);
        return [];
    }
} 