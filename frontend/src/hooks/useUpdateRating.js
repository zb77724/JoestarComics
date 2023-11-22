import axios from '../api/axios';
import { useState } from 'react';

export const useUpdateRating = () => {
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const updateRating = async (product_id, star) => {

        setIsLoading(true);
        setError(null);

        const UPD_RATING_URL = `/ratings/${product_id}`;

        let payload;

        switch(star) {
            case 1:
                payload = { one_star: 1 }
                break;
            case 2:
                payload = { two_stars: 1 }
                break;
            case 3:
                payload = { three_stars: 1 }
                break;
            case 4:
                payload = { four_stars: 1 }
                break;
            case 5:
                payload = { five_stars: 1 }
                break;
            default:
                setError("Invalid star");
                break;
        }

        if (!error) {
            try {

                console.log(payload);

                await axios.put(UPD_RATING_URL, payload, {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                });

                setIsLoading(false);

            } catch (err) {
                
                setIsLoading(false);

                if (!err?.response) {
                    setError("Something went wrong");
                } else {
                    setError(err.response.data.message);
                }

            }
        }
        

    }

    return { error, isLoading, updateRating };
};