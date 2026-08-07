export interface Customer {
  id: string
  name: string
  photo?: string
  phone: string
  address: string
  email?: string
  type: 'manual' | 'auto'
  status: 'new' | 'regular' | 'vip'
  totalOrders: number
  totalSpent: number
  createdAt: string
  lastPurchaseAt: string
}

const CUSTOMERS_STORAGE_KEY = 'posCustomers'

const writeCustomers = (customers: Customer[]): void => {
  localStorage.setItem(CUSTOMERS_STORAGE_KEY, JSON.stringify(customers))
  window.dispatchEvent(new Event(CUSTOMERS_STORAGE_KEY))
}

export const initialCustomers: Customer[] = [
  {
    id: 'customer-1',
    name: 'គីម ឆេង',
    photo: 'គីម ឆេង.svg',
    phone: '+855 12 345 678',
    address: 'Phnom Penh, Toul Kork',
    email: 'kim.cheng@example.com',
    type: 'auto',
    status: 'vip',
    totalOrders: 24,
    totalSpent: 1250.5,
    createdAt: '2025-11-15T10:30:00Z',
    lastPurchaseAt: '2026-08-01T14:20:00Z',
  },
  {
    id: 'customer-2',
    name: 'គីម តារ៉ា',
    photo: 'គីម តារ៉ា.svg',
    phone: '+855 98 765 432',
    address: 'Phnom Penh, BKK1',
    email: 'kim.dara@example.com',
    type: 'auto',
    status: 'regular',
    totalOrders: 12,
    totalSpent: 480.75,
    createdAt: '2026-01-20T09:15:00Z',
    lastPurchaseAt: '2026-07-28T16:45:00Z',
  },
  {
    id: 'customer-3',
    name: 'គីម សុខ',
    photo: 'គីម សុខ.svg',
    phone: '+855 77 123 456',
    address: 'Phnom Penh, Mean Chey',
    email: 'kim.sok@example.com',
    type: 'manual',
    status: 'new',
    totalOrders: 2,
    totalSpent: 85.0,
    createdAt: '2026-07-10T11:00:00Z',
    lastPurchaseAt: '2026-07-25T10:30:00Z',
  },
  {
    id: 'customer-4',
    name: 'សុខ កញ្ញា',
    photo: 'សុខ កញ្ញា.svg',
    phone: '+855 16 555 789',
    address: 'Kandal, Ta Khmau',
    email: 'sok.khanya@example.com',
    type: 'auto',
    status: 'regular',
    totalOrders: 8,
    totalSpent: 320.25,
    createdAt: '2026-03-05T14:45:00Z',
    lastPurchaseAt: '2026-07-20T18:10:00Z',
  },
  {
    id: 'customer-5',
    name: 'សុខ នីតា',
    photo: 'សុខ នីតា.svg',
    phone: '+855 92 222 333',
    address: 'Phnom Penh, Sen Sok',
    email: 'sok.nita@example.com',
    type: 'manual',
    status: 'new',
    totalOrders: 1,
    totalSpent: 45.0,
    createdAt: '2026-07-30T08:20:00Z',
    lastPurchaseAt: '2026-07-30T08:20:00Z',
  },
]

export const loadCustomers = (): Customer[] => {
  if (typeof window === 'undefined') return initialCustomers

  const stored = localStorage.getItem(CUSTOMERS_STORAGE_KEY)

  if (!stored) {
    localStorage.setItem(CUSTOMERS_STORAGE_KEY, JSON.stringify(initialCustomers))
    return initialCustomers
  }

  try {
    const parsed = JSON.parse(stored)
    if (!Array.isArray(parsed)) return initialCustomers

    // If stored customers don't have photos, they're old data — replace with new initial customers
    const hasPhotos = parsed.some((c: Customer) => c.photo)
    if (!hasPhotos) {
      localStorage.setItem(CUSTOMERS_STORAGE_KEY, JSON.stringify(initialCustomers))
      return initialCustomers
    }

    return parsed
  } catch {
    return initialCustomers
  }
}

export const saveCustomers = async (customers: Customer[]): Promise<void> => {
  writeCustomers(customers)
}

export const addCustomer = async (input: Omit<Customer, 'id' | 'type' | 'status' | 'totalOrders' | 'totalSpent' | 'createdAt' | 'lastPurchaseAt'>): Promise<Customer> => {
  const customers = loadCustomers()
  const newCustomer: Customer = {
    ...input,
    id: `customer-${Date.now()}`,
    type: 'manual',
    status: 'new',
    totalOrders: 0,
    totalSpent: 0,
    createdAt: new Date().toISOString(),
    lastPurchaseAt: new Date().toISOString(),
  }
  customers.unshift(newCustomer)
  await saveCustomers(customers)
  return newCustomer
}

export const deleteCustomer = async (id: string): Promise<void> => {
  const customers = loadCustomers().filter((c) => c.id !== id)
  await saveCustomers(customers)
}