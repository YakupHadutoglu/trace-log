import LoginForm from '@/components/auth/login/LoginForm'
import LoginRightPanel from '@/components/auth/login/LoginRightPanel'

export default function LoginPage() {
  return (
    <div style={{ background: '#000000', color: '#FFFFFE', height: '100vh', overflow: 'hidden', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
      <LoginForm />
      <LoginRightPanel />
    </div>
  )
}
