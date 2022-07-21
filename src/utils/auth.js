// Authorization
import storage from './storage'
const TOKEN = 'TOUTIAO_TOKEN'

export const getToken = () => storage.get(TOKEN)

export const setToken = (token) => storage.set(TOKEN, token)

export const removeToken = () => storage.remove(TOKEN)
