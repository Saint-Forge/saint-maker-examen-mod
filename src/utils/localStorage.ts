export const ls = {
    set: (key: string, item: string): void => {
        localStorage.setItem(key, item)
    },
    get: (key: string): string | null => {
        return localStorage.getItem(key)
    },
}
