import { useState, useEffect } from 'react'
import storageService from '../services/storageService'

export function useMediaItems() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadItems()
  }, [])

  async function loadItems() {
    try {
      setLoading(true)
      const data = await storageService.getItems()
      setItems(data)
    } catch (error) {
      console.error('Error loading items:', error)
    } finally {
      setLoading(false)
    }
  }

  async function createItem(item) {
    try {
      const newItem = await storageService.createItem(item)
      setItems(prev => [...prev, newItem])
      return newItem
    } catch (error) {
      console.error('Error creating item:', error)
      throw error
    }
  }

  async function updateItem(id, updates) {
    try {
      const updatedItem = await storageService.updateItem(id, updates)
      setItems(prev => prev.map(item => 
        item.id === id ? updatedItem : item
      ))
      return updatedItem
    } catch (error) {
      console.error('Error updating item:', error)
      throw error
    }
  }

  async function deleteItem(id) {
    try {
      await storageService.deleteItem(id)
      setItems(prev => prev.filter(item => item.id !== id))
    } catch (error) {
      console.error('Error deleting item:', error)
      throw error
    }
  }

  return {
    items,
    loading,
    createItem,
    updateItem,
    deleteItem,
    refetch: loadItems,
  }
}
