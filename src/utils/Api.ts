"use client";
import { useState } from "react";

interface Props {
  method: "GET" | "POST" | "PUT" | "DELETE";
  url: string;
}

export const useApi = ({ method, url }: Props) => {
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (body?: any) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: body ? JSON.stringify(body) : undefined,
      });
      const json = await res.json();
      setResponse(json);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { response, loading, error, fetchData };
};
