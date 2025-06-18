import { useState, useEffect } from "react";

const useFetch = (url: string) => {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error('Network response was not ok!')
        }
        const result = await response.json()
        setData(result)
      } catch (error: any) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    return () => {
      fetchData()
    }
  }, [url])

  return { data, loading, error }
}

export default useFetch