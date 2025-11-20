'use client'

import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { cartService, Cart, CartItem, AddToCartData } from '@/services/cartService'

interface CartState {
  cart: Cart | null
  loading: boolean
  error: string | null
}

type CartAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_CART'; payload: Cart }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'UPDATE_ITEM'; payload: { itemId: string; quantity: number } }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'CLEAR_CART' }

interface CartContextType extends CartState {
  addToCart: (productId: string, quantity?: number) => Promise<void>
  updateQuantity: (itemId: string, quantity: number) => Promise<void>
  removeFromCart: (itemId: string) => Promise<void>
  clearCart: () => Promise<void>
  refreshCart: () => Promise<void>
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'SET_CART':
      return { ...state, cart: action.payload, error: null, loading: false }
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false }
    case 'ADD_ITEM':
      if (!state.cart) return state
      return {
        ...state,
        cart: {
          ...state.cart,
          items: [...state.cart.items, action.payload],
          totalItems: state.cart.totalItems + action.payload.quantity,
          totalAmount: state.cart.totalAmount + action.payload.total
        }
      }
    case 'UPDATE_ITEM':
      if (!state.cart) return state
      const updatedItems = state.cart.items.map(item =>
        item.id === action.payload.itemId
          ? {
              ...item,
              quantity: action.payload.quantity,
              total: item.product.price * action.payload.quantity
            }
          : item
      )
      return {
        ...state,
        cart: {
          ...state.cart,
          items: updatedItems,
          totalItems: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
          totalAmount: updatedItems.reduce((sum, item) => sum + item.total, 0)
        }
      }
    case 'REMOVE_ITEM':
      if (!state.cart) return state
      const removedItem = state.cart.items.find(item => item.id === action.payload)
      const filteredItems = state.cart.items.filter(item => item.id !== action.payload)
      return {
        ...state,
        cart: {
          ...state.cart,
          items: filteredItems,
          totalItems: filteredItems.reduce((sum, item) => sum + item.quantity, 0),
          totalAmount: filteredItems.reduce((sum, item) => sum + item.total, 0)
        }
      }
    case 'CLEAR_CART':
      return {
        ...state,
        cart: null,
        error: null
      }
    default:
      return state
  }
}

const initialState: CartState = {
  cart: null,
  loading: false,
  error: null
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  // Load cart on component mount
  useEffect(() => {
    refreshCart()
  }, [])

  const refreshCart = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const response = await cartService.getCart()
      if (response.success && response.data) {
        dispatch({ type: 'SET_CART', payload: response.data })
      }
    } catch (error: any) {
      dispatch({ type: 'SET_ERROR', payload: error.response?.data?.error || 'Failed to load cart' })
    }
  }

  const addToCart = async (productId: string, quantity: number = 1) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const cartData: AddToCartData = { productId, quantity }
      const response = await cartService.addToCart(cartData)
      
      if (response.success && response.data) {
        dispatch({ type: 'SET_CART', payload: response.data })
      }
    } catch (error: any) {
      dispatch({ type: 'SET_ERROR', payload: error.response?.data?.error || 'Failed to add item to cart' })
      throw error
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }

  const updateQuantity = async (itemId: string, quantity: number) => {
    try {
      if (quantity <= 0) {
        await removeFromCart(itemId)
        return
      }

      dispatch({ type: 'SET_LOADING', payload: true })
      const response = await cartService.updateCartItem(itemId, { quantity })
      
      if (response.success && response.data) {
        dispatch({ type: 'SET_CART', payload: response.data })
      }
    } catch (error: any) {
      dispatch({ type: 'SET_ERROR', payload: error.response?.data?.error || 'Failed to update quantity' })
      throw error
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }

  const removeFromCart = async (itemId: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const response = await cartService.removeFromCart(itemId)
      
      if (response.success && response.data) {
        dispatch({ type: 'SET_CART', payload: response.data })
      }
    } catch (error: any) {
      dispatch({ type: 'SET_ERROR', payload: error.response?.data?.error || 'Failed to remove item from cart' })
      throw error
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }

  const clearCart = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      await cartService.clearCart()
      dispatch({ type: 'CLEAR_CART' })
    } catch (error: any) {
      dispatch({ type: 'SET_ERROR', payload: error.response?.data?.error || 'Failed to clear cart' })
      throw error
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }

  const value: CartContextType = {
    ...state,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    refreshCart
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}