import { localStorageUtility } from "./local-storage";

export function set<T>(initialState: T, name: string) {
  const existInLocalStorage = localStorageUtility.getInLocalStorage(name.toString());
  return existInLocalStorage ? existInLocalStorage as T : initialState;
}