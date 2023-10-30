import { PersonTransformedType } from "../../commonTypes"

function getAllFavorite(): [] | PersonTransformedType[] {
  const ids = localStorage.getItem("ids")?.split(",")
  if (!ids || ids.length === 0) return []
  const res = []
  for (let id of ids) {
    const el = JSON.parse(localStorage.getItem(id)!)
    res.push(el)
  }
  return res as [] | PersonTransformedType[]
}

function addFavorite(key: string, state: PersonTransformedType) {
  const stateAsString = JSON.stringify(state)
  const ids = localStorage.getItem("ids")
  if (ids) {
    localStorage.setItem("ids", `${ids},${key}`)
  } else {
    localStorage.setItem("ids", `${key}`)
  }
  localStorage.setItem(key, stateAsString)
}

export function deleteFavorite(key: string) {
  const ids = localStorage
    .getItem("ids")!
    .split(",")
    .filter((i) => i !== key)
  localStorage.setItem("ids", `${ids}`)
  localStorage.removeItem(key)
}

export function hasItem(key:string): boolean {
  const ids = localStorage.getItem("ids")?.split(",")
  if (!ids) return false
  return ids.includes(key)
}

export const cls = {
  getAllFavorite,
  addFavorite,
  deleteFavorite,
  hasItem,
}
