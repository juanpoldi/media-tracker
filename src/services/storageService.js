import { STORAGE_KEY, SEED_ITEMS } from '../utils/constants'

class StorageService {
  constructor() {
    this.initializeStorage()
  }

  initializeStorage() {
    if (!localStorage.getItem(STORAGE_KEY)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_ITEMS))
    }
  }

  async getItems() {
    const items = localStorage.getItem(STORAGE_KEY)
    return items ? JSON.parse(items) : []
  }

  async createItem(item) {
    const items = await this.getItems()
    const newItem = {
      ...item,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
    items.push(newItem)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    return newItem
  }

  async updateItem(id, updates) {
    const items = await this.getItems()
    const index = items.findIndex(item => item.id === id)
    
    if (index === -1) {
      throw new Error('Item not found')
    }

    items[index] = {
      ...items[index],
      ...updates,
      updated_at: new Date().toISOString(),
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    return items[index]
  }

  async deleteItem(id) {
    const items = await this.getItems()
    const filteredItems = items.filter(item => item.id !== id)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredItems))
    return id
  }
}

const storageService = new StorageService()

export default storageService
