export interface Shop {
  id: string
  name: string
  owner: string
  email: string
  phone: string
  password: string
  status: 'pending' | 'approved' | 'rejected'
  createdAt: string
}

const SHOPS_STORAGE_KEY = 'posShops'

const readShops = (): Shop[] => {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem(SHOPS_STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

const writeShops = (shops: Shop[]): void => {
  localStorage.setItem(SHOPS_STORAGE_KEY, JSON.stringify(shops))
}

export const getShops = (): Shop[] => readShops()

export const getShopByPhone = (phone: string): Shop | undefined =>
  readShops().find((s) => s.phone === phone)

export const registerShop = (name: string, owner: string, email: string, phone: string, password: string): Shop => {
  const shops = readShops()
  const newShop: Shop = {
    id: `shop-${Date.now()}`,
    name,
    owner,
    email,
    phone,
    password,
    status: 'pending',
    createdAt: new Date().toISOString(),
  }
  shops.push(newShop)
  writeShops(shops)
  return newShop
}

export const getPendingShops = (): Shop[] =>
  readShops().filter((s) => s.status === 'pending')

export const approveShop = (shopId: string): void => {
  const shops = readShops().map((s) =>
    s.id === shopId ? { ...s, status: 'approved' as const } : s,
  )
  writeShops(shops)
}

export const rejectShop = (shopId: string): void => {
  const shops = readShops().map((s) =>
    s.id === shopId ? { ...s, status: 'rejected' as const } : s,
  )
  writeShops(shops)
}

export const loginShop = (phone: string, password: string): Shop | null => {
  const shop = getShopByPhone(phone)
  if (!shop || shop.password !== password) return null
  return shop
}