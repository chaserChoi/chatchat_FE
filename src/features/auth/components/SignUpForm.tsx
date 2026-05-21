import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

const SignUpForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Sign-up attempt:', { username, password, nickname });
    navigate('/login');
  };

  return (
    <div className="relative z-10 w-full max-w-md">
      <div className="rounded-3xl border border-white/60 bg-white/90 p-8 shadow-card backdrop-blur-sm sm:p-10">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-surface-900">회원가입</h2>
          <p className="mt-2 text-sm text-surface-500">CHATCHAT에 오신 것을 환영해요</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            label="아이디"
            id="signup-username"
            name="username"
            type="text"
            autoComplete="username"
            required
            placeholder="사용할 아이디"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            label="비밀번호"
            id="signup-password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            placeholder="8자 이상 권장"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            label="닉네임"
            id="nickname"
            name="nickname"
            type="text"
            required
            placeholder="채팅에 표시될 이름"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />

          <Button type="submit" variant="secondary" fullWidth size="lg" className="mt-2">
            가입하기
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-surface-500">
          이미 계정이 있으신가요?{' '}
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="font-semibold text-brand-700 underline-offset-2 hover:underline"
          >
            로그인
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
