import { useState, useEffect } from 'react';

/**
 * Custom hook to fetch and monitor the live STX (Stacks) price in USD.
 * Utilizes the CoinGecko public API with an automatic 60-second refresh cycle.
 *
 * @returns {Object} { price, loading, error }
 * @property {number|null} price - The current STX price in USD, or null if not yet fetched
 * @property {boolean} loading - True if the initial price fetch is in progress
 * @property {Error|null} error - Contains any error object encountered during the fetch
 */
export function usePrice() {
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchPrice = async () => {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=blockstack&vs_currencies=usd',
          { signal: controller.signal }
        );
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();

        if (isMounted) {
          setPrice(data.blockstack?.usd ?? null);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          console.error('Failed to fetch STX price:', err);
          setError(err);
        }
      } finally {
        clearTimeout(timeout);
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchPrice();
    const interval = setInterval(fetchPrice, 60000); // Update every minute

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return { price, loading, error };
}
