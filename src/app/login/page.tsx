'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import "@/app/globals.css";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect');
  
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [organization, setOrganization] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [emailCode, setEmailCode] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordMatchError, setPasswordMatchError] = useState('');

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      // 로그인 체크
      const user = users.find(user => user.email === email && user.password === password);
      
      if (user) {
        // 로그인 성공
        localStorage.setItem('userLogin', 'true');
        localStorage.setItem('userName', user.name);
        localStorage.setItem('userRole', user.role);
        localStorage.setItem('userEmail', user.email);
        localStorage.setItem('userPhone', user.phone);
        localStorage.setItem('userCompanyName', user.company.name);
        localStorage.setItem('userCompanyAddress', user.company.address);
        localStorage.setItem('userCompanyBusinessType', user.company.business_type);
        localStorage.setItem('userCompanyPhone', user.company.phone);
        
        if (user.role === 'admin' && redirectTo === 'admin') {
          router.push('/admin');
        } else {
          router.push('/');
        }
        return;
      }
      
      // 로그인 실패
      setError('이메일 또는 비밀번호가 올바르지 않습니다.');
    } else {
      // 비밀번호 일치 확인
      if (password !== passwordCheck) {
        setPasswordMatchError('비밀번호가 일치하지 않습니다.');
        return;
      }
      // 회원가입 처리 (실제 구현에서는 API 호출 등이 필요함)
      console.log('회원가입 시도', { email, password, name, organization, phone });
      // 회원가입 성공 후 로그인 화면으로 전환
      setIsLogin(true);
      setError('');
    }
  };

  return (
    <div className={`max-w-md mx-auto rounded-lg shadow-md p-8 ${isLogin ? 'bg-white' : 'bg-orange'}`}>
      <h1 className="text-2xl font-bold mb-6 text-center">
        {isLogin ? '로그인' : '회원가입'}
      </h1>
      
      <div className="flex mb-6">
        <button
          className={`flex-1 py-2 text-center ${
            isLogin ? 'login-active' : 'login-inactive'
          }`}
          onClick={() => setIsLogin(true)}
        >
          로그인
        </button>
        <button
          className={`flex-1 py-2 text-center ${
            !isLogin ? 'login-active' : 'login-inactive'
          }`}
          onClick={() => setIsLogin(false)}
        >
          회원가입
        </button>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">
            아이디(이메일)<span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
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
                className="flex-1 px-4 py-2 border rounded-md"
                placeholder="인증번호 6자리"
              />
              <button type="button" className="px-4 py-2 btn-basic whitespace-nowrap">인증하기</button>
            </div>
          )}
        </div>
        
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2">
            비밀번호<span className="text-red-500 ml-1">*</span>
          </label>
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
            className="w-full px-4 py-2 border rounded-md"
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
                className="w-full px-4 py-2 border rounded-md mt-2"
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
            <div className="mb-4">
              <label htmlFor="name" className="block mb-2">
                이름<span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border rounded-md"
                placeholder="이름을 입력하세요"
                required
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="organization" className="block mb-2">
                소속<span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                id="organization"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                className="w-full px-4 py-2 border rounded-md"
                placeholder="소속을 입력하세요"
                required
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="phone" className="block mb-2">
                연락처<span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2 border rounded-md"
                placeholder="연락처를 입력하세요"
                required
              />
            </div>
          </>
        )}
        
        {isLogin && (
          <div className="flex justify-between mb-6">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-sm">자동 로그인</span>
            </label>
            <Link href="#" className="text-sm text-[var(--primary-color)]">
              비밀번호 찾기
            </Link>
          </div>
        )}
        
        <button
          type="submit"
          className="w-full py-2 px-4 btn-basic mb-4"
        >
          {isLogin ? '로그인' : '회원가입'}
        </button>
        
        {isLogin && (
          <div className="text-center mt-4">
            <p className="text-sm">
              아직 계정이 없으신가요?{' '}
              <button
                type="button"
                onClick={() => setIsLogin(false)}
                className="text-[var(--primary-color)]"
              >
                회원가입
              </button>
            </p>
          </div>
        )}
      </form>
      
      {isLogin && (
        <div className="mt-6 pt-6 border-t">
          <div className="wireframe-section">
            <p className="text-center mb-4 text-sm text-gray-600">비회원으로 이용 가능한 서비스</p>
            <div className="grid grid-cols-2 gap-4">
              <Link
                href="/intro"
                className="text-center py-2 px-4 btn-basic"
              >
                연돌현상 소개
              </Link>
              <Link
                href="/service-request"
                className="text-center py-2 px-4 btn-basic"
              >
                서비스 요청하기
              </Link>
            </div>
          </div>
        </div>
      )}
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
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<LoginFormFallback />}>
        <LoginForm />
      </Suspense>
    </div>
  );
} 