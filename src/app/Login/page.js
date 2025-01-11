//src/app/Login/page.js
'use client'
import LoginForm from '@/components/ui/LoginForm';
import '@/styles/uiStyle/login_form.css';

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <LoginForm />
    </div>
  );
}