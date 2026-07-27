import { Outlet } from 'react-router-dom'
import SuperAdminSidebar from './SuperAdminSidebar'

export default function SuperAdminLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-[var(--dp-page)] text-[var(--dp-body)]">
      <SuperAdminSidebar />
      <main className="min-h-0 flex-1 overflow-y-auto p-6 rounded-[var(--dp-r-panel)] bg-[var(--dp-white)] shadow-[var(--dp-shadow-card)]">
        <Outlet />
      </main>
    </div>
  )
}
