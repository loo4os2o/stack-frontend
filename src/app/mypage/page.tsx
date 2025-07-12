'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface UserData {
  id: string;
  name: string;
  phone: string;
  company: {
    name: string;
    address: string;
    business_type: string;
    phone: string;
  };
}

export default function MyPage() {
  const router = useRouter();
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userLogin = localStorage.getItem('userLogin');
    if (userLogin !== 'true') {
      router.push('/login');
      return;
    }

    // 임시 데이터 - API 연동 시 실제 데이터로 교체
    const mockUserData = {
      id: localStorage.getItem('userEmail') || '',
      name: localStorage.getItem('userName') || '',
      phone: localStorage.getItem('userPhone') || '',
      company: {
        name: localStorage.getItem('userCompanyName') || '',
        address: localStorage.getItem('userCompanyAddress') || '',
        business_type: localStorage.getItem('userCompanyBusinessType') || '',
        phone: localStorage.getItem('userCompanyPhone') || ''
      }
    };

    setUserData(mockUserData);
    setIsLoading(false);
  }, [router]);

  const handlePasswordChange = () => {
    // TODO: 비밀번호 변경 로직 구현
    setShowPasswordChange(false);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 pt-16 pb-24">
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-600">로딩중...</div>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="container mx-auto px-4 pt-16 pb-24">
        <div className="flex justify-center items-center h-64">
          <div className="text-red-600">사용자 정보를 불러올 수 없습니다.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pt-16 pb-24">
      <div className="max-w-3xl mx-auto">
        {/* 개인정보 관리 */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b">개인정보 관리</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">아이디</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-md bg-gray-100"
                value={userData.id}
                disabled
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">비밀번호</label>
                <button 
                  onClick={() => setShowPasswordChange(!showPasswordChange)}
                  className="text-sm text-blue-600 hover:underline"
                >
                  비밀번호 변경
                </button>
              </div>
              {showPasswordChange && (
                <div className="space-y-4 p-4 bg-gray-50 rounded-md">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">현재 비밀번호</label>
                    <input
                      type="password"
                      className="w-full px-4 py-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">새 비밀번호</label>
                    <input
                      type="password"
                      className="w-full px-4 py-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">새 비밀번호 확인</label>
                    <input
                      type="password"
                      className="w-full px-4 py-2 border rounded-md"
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button 
                      onClick={() => setShowPasswordChange(false)}
                      className="btn-secondary px-4 py-1.5"
                    >
                      취소
                    </button>
                    <button 
                      onClick={handlePasswordChange}
                      className="btn-primary px-4 py-1.5"
                    >
                      변경하기
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">이름</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-md"
                placeholder="이름"
                value={userData.name}
                onChange={(e) => setUserData({...userData, name: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">연락처</label>
              <input
                type="tel"
                className="w-full px-4 py-2 border rounded-md"
                placeholder="010-0000-0000"
                value={userData.phone}
                onChange={(e) => setUserData({...userData, phone: e.target.value})}
              />
            </div>
          </div>
        </div>

        {/* 소속정보 관리 */}
        <div>
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b">소속정보 관리</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">회사명</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-md"
                placeholder="회사명"
                value={userData.company.name}
                onChange={(e) => setUserData({
                  ...userData,
                  company: {...userData.company, name: e.target.value}
                })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">회사주소</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-md"
                placeholder="회사주소"
                value={userData.company.address}
                onChange={(e) => setUserData({
                  ...userData,
                  company: {...userData.company, address: e.target.value}
                })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">업태</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-md"
                placeholder="업태"
                value={userData.company.business_type}
                onChange={(e) => setUserData({
                  ...userData,
                  company: {...userData.company, business_type: e.target.value}
                })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">회사 연락처</label>
              <input
                type="tel"
                className="w-full px-4 py-2 border rounded-md"
                placeholder="02-0000-0000"
                value={userData.company.phone}
                onChange={(e) => setUserData({
                  ...userData,
                  company: {...userData.company, phone: e.target.value}
                })}
              />
            </div>
          </div>
        </div>

        {/* 저장 버튼 */}
        <div className="mt-12 flex justify-center">
          <button className="btn-primary btn-large">
            저장하기
          </button>
        </div>
      </div>
    </div>
  );
} 