// useLocations.ts
import { useEffect, useState } from 'react';
import axios from 'axios';

interface District {
  _id: string;
  district: string;
  localities: string[];
}

interface User {
  _id: string;
  name: string;
}

interface Location {
  _id: string;
  state: string;
  districts: District[];
  user: User | null;  // `user` can be `null` or an object
}

interface UseLocationsResult {
  locations: Location[];
  loading: boolean;
  error: string | null;
}

const useLocations = (): UseLocationsResult => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get('https://localdata-inix.onrender.com/api/v1/gloc');
        setLocations(response.data.locations);
      } catch (err) {
        setError('Error fetching locations');
        console.error('Error fetching locations:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  return { locations, loading, error };
};

export default useLocations;
