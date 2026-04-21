import AuthFormLayout from '@/components/auth/AuthFormLayout'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'


export default async function AuthLayout() {
  // check user are logged in
    const session = await getServerSession(authOptions)
    if (session) redirect('/user')
      
  return (
    <div>
      <AuthFormLayout />
    </div>
  )
}
