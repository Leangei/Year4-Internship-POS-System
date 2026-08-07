import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { loadCustomers, addCustomer, deleteCustomer } from './CustomerData'
import type { Customer } from './CustomerData'
import CustomerHeader from './CustomerList/CustomerHeader'
import CustomerSearch from './CustomerList/CustomerSearch'
import CustomerTable from './CustomerList/CustomerTable'

export default function CustomerPage() {
  const { t } = useTranslation('customer')
  const [customers, setCustomers] = useState<Customer[]>(() => loadCustomers())
  const [query, setQuery] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [newCustomer, setNewCustomer] = useState({ name: '', phone: '', address: '', email: '' })

  useEffect(() => {
    const refresh = () => setCustomers(loadCustomers())
    const handleStorage = () => refresh()

    refresh()
    window.addEventListener('posCustomers', refresh)
    window.addEventListener('storage', handleStorage)

    return () => {
      window.removeEventListener('posCustomers', refresh)
      window.removeEventListener('storage', handleStorage)
    }
  }, [])

  const filteredCustomers = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    if (!normalizedQuery) return customers

    return customers.filter((customer) =>
      [customer.name, customer.phone, customer.email || ''].some((value) =>
        value.toLowerCase().includes(normalizedQuery)
      )
    )
  }, [customers, query])

  const handleAddCustomer = async () => {
    if (!newCustomer.name.trim() || !newCustomer.phone.trim()) return
    await addCustomer({
      name: newCustomer.name.trim(),
      phone: newCustomer.phone.trim(),
      address: newCustomer.address.trim() || '—',
      email: newCustomer.email.trim() || undefined,
    })
    setCustomers(loadCustomers())
    setNewCustomer({ name: '', phone: '', address: '', email: '' })
    setShowAddModal(false)
  }

  const handleDeleteCustomer = async (customer: Customer) => {
    if (!window.confirm(`${t('list.delete')} ${customer.name}?`)) return
    await deleteCustomer(customer.id)
    setCustomers(loadCustomers())
  }

  return (
    <div className="cat-page">
      <CustomerHeader total={customers.length} onAddCustomer={() => setShowAddModal(true)} />

      {/* Search */}
      <CustomerSearch query={query} onQueryChange={setQuery} />

      {/* Customer Table */}
      {filteredCustomers.length === 0 ? (
        <div className="dp-card text-center py-16 text-[var(--dp-muted)]">
          {t('list.noCustomers')}
        </div>
      ) : (
        <CustomerTable customers={filteredCustomers} onDelete={handleDeleteCustomer} />
      )}

      {/* Add Customer Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-[20px] bg-white p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">{t('list.addCustomer')}</h2>
            <div className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">{t('list.title')} *</label>
                <input
                  type="text"
                  value={newCustomer.name}
                  onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                  placeholder="Customer name"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-300"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">{t('list.phone')} *</label>
                <input
                  type="text"
                  value={newCustomer.phone}
                  onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                  placeholder="+855XXXXXXXX"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-300"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">{t('list.address')}</label>
                <input
                  type="text"
                  value={newCustomer.address}
                  onChange={(e) => setNewCustomer({ ...newCustomer, address: e.target.value })}
                  placeholder="Address"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-300"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Email</label>
                <input
                  type="email"
                  value={newCustomer.email}
                  onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-300"
                />
              </div>
            </div>
            <div className="mt-5 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAddCustomer}
                disabled={!newCustomer.name.trim() || !newCustomer.phone.trim()}
                className="rounded-lg bg-[#BAF911] px-4 py-2 text-sm font-semibold text-[#00351B] hover:bg-[var(--dp-lime-400)] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {t('list.addCustomer')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}