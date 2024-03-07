import { localStorageManager } from "./local-storage-manager";

export function retrieveFromStorage<T>(initialState: T, name: string) {
  const existInLocalStorage = localStorageManager.getInLocalStorage(name.toString());
  return existInLocalStorage ? existInLocalStorage as T : initialState;
}