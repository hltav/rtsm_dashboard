// src/app/register/page.tsx
'use client';

import AuthForm from '@/components/login/AuthForm';

export default function RegisterPage() {
  const handleRegister = (data: { email: string; password: string }) => {
    console.log('Registro data:', data);
    // TODO: enviar para endpoint de registro
  };

  return (
    <AuthForm
      title="Criar Conta"
      buttonText="Registrar"
      onSubmit={handleRegister}
    />
  );
}
