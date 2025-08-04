'use client';

import "@/app/globals.css";
import TooltipButton from '@/components/common/TooltipButton';
import "@/css/login.css";
import { useUserStore } from '@/utils/store';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY as string;

const supabase = createClient(supabaseUrl, supabaseAnonKey);
// Supabase 클라이언트 초기화

function LoginForm() {
  const setAccessToken = useUserStore((state) => state.setAccessToken);
  const setRefreshToken = useUserStore((state) => state.setRefreshToken);
  const updateUser = useUserStore((state) => state.updateUser);

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect');
  
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState(localStorage.getItem('userEmail') || '');
  // 암호화된 비밀번호를 복호화하여 설정
  const encryptedPassword = localStorage.getItem('userPassword');
  const [rememberPassword, setRememberPassword] = useState(encryptedPassword ? atob(encryptedPassword) : '');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [organization, setOrganization] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [emailCode, setEmailCode] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordMatchError, setPasswordMatchError] = useState('');
  const [rememberMe, setRememberMe] = useState(localStorage.getItem('rememberMe') === 'true');

  useEffect(() => {
    if (rememberMe) {
      const storedEmail = localStorage.getItem('userEmail');
      const storedPassword = localStorage.getItem('userPassword');
      if (storedEmail) setEmail(storedEmail);
      if (storedPassword) setPassword(atob(storedPassword));
    }
  }, [rememberMe]);

  useEffect(() => {
    if (rememberMe) {
      localStorage.setItem('rememberMe', 'true');
    } else {
      localStorage.removeItem('rememberMe');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userPassword');
    }
  }, [rememberMe]);

  // 유저 계정 더미 데이터
  const users = [
    {
      email: 'admin@example.com',
      password: 'admin',
      name: '관리자',
      role: 'admin',
      phone: '010-1111-1111',
      company: {
        name: '(주)브릿지',
        address: '서울특별시 강남구 테헤란로 14길 6 남도빌딩 2층',
        business_type: '소프트웨어 개발',
        phone: '070-7777-7777'
      }
    },
    {
      email: 'test@example.com',
      password: 'test',
      name: '테스트계정',
      role: 'user',
      phone: '010-2222-2222',
      company: {
        name: '(주)브릿지',
        address: '서울특별시 강남구 테헤란로 14길 6 남도빌딩 2층',
        business_type: '소프트웨어 개발',
        phone: '070-7777-7777'
      }
    },
    {
      email: 'joohee@example.com',
      password: '1234',
      name: '이주희',
      role: 'user',
      phone: '010-3333-3333',
      company: {
        name: '(주)브릿지',
        address: '서울특별시 강남구 테헤란로 14길 6 남도빌딩 2층',
        business_type: '소프트웨어 개발',
        phone: '070-7777-7777'
      }
    }
  ];

  const handleSignup = async () => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            organization,
            phone,
          },
        },
      });

      if (error) {
        setError(error.message);
      } else {
        setIsLogin(true);
        setError('회원가입이 완료되었습니다. 이메일을 확인해 주세요.');
      }
    } catch  {
      setError('회원가입 중 오류가 발생했습니다.');
    }
  };

  const handleLogin = async () => {
    try {
      const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        alert('로그인에 실패했습니다. 이메일과 비밀번호를 확인하세요.');
      } else {
        if (rememberMe) {
          localStorage.setItem('userEmail', email);
          localStorage.setItem('userPassword', btoa(password)); // Base64 encoding
        }
        setAccessToken(data.session.access_token);
        setRefreshToken(data.session.refresh_token);
        updateUser({...data.user.user_metadata, email: data.user?.user_metadata?.email ?? data.user.email});
        router.push(redirectTo || '/');
      }
    } catch {
      alert('로그인 중 오류가 발생했습니다.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      handleLogin();
    } else {
      if (password !== passwordCheck) {
        setPasswordMatchError('비밀번호가 일치하지 않습니다.');
        return;
      }
      handleSignup();
    }
  };

  return (
    // <div className={`login-wrap p-8 ${isLogin ? 'bg-white' : 'bg-orange'}`}>
    <div className="login-wrap">
      <h1>{isLogin ? '로그인' : '사용자 등록'}</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">아이디(이메일)<span className="text-red-500 ml-1">*</span></label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일 주소를 입력하세요"
            required
          />
          {!isLogin && (
            <div className="flex gap-2 mt-2">
              <input
                type="text"
                maxLength={6}
                value={emailCode}
                onChange={e => setEmailCode(e.target.value.replace(/[^0-9]/g, ''))}
                placeholder="인증번호 6자리"
              />
              <button type="button" className="btn-basic whitespace-nowrap">인증하기</button>
            </div>
          )}
        </div>
        
        <div className="form-group">
          <label htmlFor="password">비밀번호<span className="text-red-500 ml-1">*</span></label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (!isLogin && passwordCheck && e.target.value !== passwordCheck) {
                setPasswordMatchError('비밀번호가 일치하지 않습니다.');
              } else {
                setPasswordMatchError('');
              }
            }}
            placeholder={isLogin ? "비밀번호를 입력하세요" : "영문, 숫자, 특수문자를 포함한 6-20자리"}
            required
          />
          {!isLogin && (
            <>
              <input
                type="password"
                id="passwordCheck"
                value={passwordCheck}
                onChange={e => {
                  setPasswordCheck(e.target.value);
                  if (password !== e.target.value) {
                    setPasswordMatchError('비밀번호가 일치하지 않습니다.');
                  } else {
                    setPasswordMatchError('');
                  }
                }}
                className="mt-2"
                placeholder="비밀번호 재입력"
                required
              />
              {passwordMatchError && (
                <div className="text-red-500 text-sm mt-1">{passwordMatchError}</div>
              )}
            </>
          )}
        </div>
        
        {!isLogin && (
          <>
            <div className="form-group">
              <label htmlFor="name">이름<span className="text-red-500 ml-1">*</span></label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="이름을 입력하세요"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="organization">소속<span className="text-red-500 ml-1">*</span></label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  id="organization"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  placeholder="소속을 입력하세요"
                  required
                />
                <TooltipButton 
                  tooltipText="소속하신 회사나 조직명을 입력해주세요"
                />
              </div>
            </div>
            
            <div className="form-group" style={{ marginBottom: '0' }}>
              <label htmlFor="phone">연락처<span className="text-red-500 ml-1">*</span></label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="연락처를 입력하세요"
                required
              />
            </div>
          </>
        )}
        
        {isLogin && (
          <div className="flex justify-between checkbox-group">
            <label>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              자동 로그인
            </label>
            <Link href="#" className="login-link-btn">
              비밀번호 찾기
            </Link>
          </div>
        )}
        
        <button
          type="submit"
          className="w-full btn-50 rounded-xl btn-primary mt-8 mb-8"
        >
          {isLogin ? '로그인' : '등록하기'}
        </button>
        
        {isLogin && (
          <div className="text-center">
            <p className="font-15 font-gray-9">아직 계정이 없으신가요?
              <button
                type="button"
                onClick={() => {
                  setIsLogin(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="login-link-btn ml-2"
              >
                사용자등록
              </button>
            </p>
          </div>
        )}

        {!isLogin && (
          <div className="text-center">
            <p className="font-15 font-gray-9">이미 계정이 있으신가요?
              <button
                type="button"
                onClick={() => {
                  setIsLogin(true);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="login-link-btn ml-2"
              >
                로그인하기
              </button>
            </p>
          </div>
        )}
      </form>
      
    </div>
  );
}

// 로딩 상태를 표시할 Fallback 컴포넌트
function LoginFormFallback() {
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded mb-6 mx-auto w-1/2"></div>
        <div className="flex mb-6">
          <div className="flex-1 h-10 bg-gray-200 rounded-lg mr-2"></div>
          <div className="flex-1 h-10 bg-gray-200 rounded-lg"></div>
        </div>
        <div className="h-12 bg-gray-200 rounded mb-4"></div>
        <div className="h-12 bg-gray-200 rounded mb-6"></div>
        <div className="h-12 bg-gray-200 rounded mb-4"></div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="container login">
      {/* 배경 디자인 요소들 */}
      <div className="login-bg-l"></div>
      <div className="login-bg-r"></div>
      <Suspense fallback={<LoginFormFallback />}>
        <LoginForm />
      </Suspense>
    </div>
  );
} 