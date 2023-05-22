export function getLocalStorageItem(key: string): unknown {
  return JSON.parse(window.localStorage.getItem(key) || '{}');
}

export function setLocalStorageItem(key: string, data: unknown): void {
  window.localStorage.setItem(key, JSON.stringify(data));
}
