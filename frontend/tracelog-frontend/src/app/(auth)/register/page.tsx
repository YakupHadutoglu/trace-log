import RegisterLeftPanel from '@/components/auth/register/RegisterLeftPanel'
import RegisterForm from '@/components/auth/register/RegisterForm'

export default function RegisterPage() {
  return (
    <div style={{ background: '#000000', color: '#FFFFFE', height: '100vh', overflow: 'hidden', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
      <RegisterLeftPanel />
      <RegisterForm />
    </div>
  )
}
