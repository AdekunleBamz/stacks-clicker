import { useState, useEffect } from 'react';

export function usePrice() {
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=blockstack&vs_currencies=usd');
        const data = await response.json();
        setPrice(data.blockstack.usd);
      } catch (err) {
        console.error('Failed to fetch STX price:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPrice();
    const interval = setInterval(fetchPrice, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  return { price, loading };
}
