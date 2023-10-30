import { PersonTransformedType } from "../commonTypes"
import { useEffect, useState } from "react"

export function createObj(obj: any): PersonTransformedType {
  return {
    name: obj.name,
    height: obj.height,
    mass: obj.mass,
    hair_color: obj.hair_color,
    id: obj.url.replace(/.*\/([^\/]+)\/?$/, "$1"),
  }
}

export const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState<string>("")
  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue((prev) => value), delay)
    return () => clearTimeout(timeout)
  }, [value])
  return debouncedValue
}
