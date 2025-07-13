'use client';

import AuthForm from '@/components/login/AuthForm';

export default function LoginPage() {
  const handleLogin = (data: { email: string; password: string }) => {
    console.log('Login data:', data);
    // TODO: enviar para backend NestJS
  };

  return (
    <AuthForm
      title="Entrar na Conta"
      buttonText="Entrar"
      onSubmit={handleLogin}
    />
  );
}
