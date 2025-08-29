import { useState, useEffect } from "react";
import axios from "axios";

interface UseFetchResult<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
}

export function useFetch<T = unknown>(url: string | null): UseFetchResult<T> {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!url) return;

        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await axios.get<T>(url);
                console.log(res)
                setData(res.data);
                setError(null);
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    setError(err.message);
                } else {
                    setError("Error desconocido");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, loading, error };
}
