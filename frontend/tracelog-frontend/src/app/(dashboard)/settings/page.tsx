import Navbar from '@/components/layout/Navbar'
import SettingsSidebar from '@/components/settings/SettingsSidebar'
import ChangePasswordCard from '@/components/settings/ChangePasswordCard'

export default function SettingsPage() {
  return (
    <div style={{ background: '#000000', color: '#FFFFFE', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '48px 48px 100px', display: 'grid', gridTemplateColumns: '220px 1fr', gap: '48px', alignItems: 'start' }}>
        <div style={{ position: 'sticky', top: '80px' }}>
          <SettingsSidebar />
        </div>
        <ChangePasswordCard />
      </div>
    </div>
  )
}
