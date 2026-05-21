import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Login attempt:', { username, password });
    navigate('/rooms');
  };

  return (
    <div className="relative z-10 w-full max-w-md">
      <div className="rounded-3xl border border-white/60 bg-white/90 p-8 shadow-card backdrop-blur-sm sm:p-10">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-surface-900">로그인</h2>
          <p className="mt-2 text-sm text-surface-500">아이디와 비밀번호로 시작하세요</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <Input
            label="아이디"
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            required
            placeholder="아이디를 입력하세요"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            label="비밀번호"
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button type="submit" variant="primary" fullWidth size="lg" className="mt-2">
            로그인
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-surface-500">
          계정이 없으신가요?{' '}
          <button
            type="button"
            onClick={() => navigate('/signup')}
            className="font-semibold text-brand-700 underline-offset-2 hover:underline"
          >
            회원가입
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
