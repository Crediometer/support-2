import { useState, useEffect } from 'react';

function useFetchData(phoneNumber) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`https://credio-api.herokuapp.com/api/v1/send/notifications/single/${phoneNumber}`);
        const json = await response.json();
        setData(json);
      } catch (error) {
        setError(error);
      }

      setLoading(false);
    }

    fetchData();
  }, [phoneNumber]);

  return { data, loading, error };
}

export default useFetchData;