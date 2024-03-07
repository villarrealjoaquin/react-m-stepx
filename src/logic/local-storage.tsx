export const localStorageUtility = {
  setInLocalStorage<T>(name: string, data: T): void {
    localStorage.setItem(name.toString(), JSON.stringify(data));
  },
  getInLocalStorage<T>(name: string): T | null {
    const data = localStorage.getItem(name);
    return data ? JSON.parse(data) as T : null;
  },
  clearLocalStorage(): void {
    localStorage.clear();
  },
  existInLocalStorage(name: string): boolean {
    return !!localStorage.getItem(name.toString());
  },
};
