'use client';

import { useUserStore } from '@/utils/store';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function MyPage() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY as string;

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  const router = useRouter();
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState<{
    name: string ;
    phone: string ;
    organization: string ;
    companyAddress: string ;
    companyBusinessType: string ;
    companyPhone: string ;
  }>({
    name: '',
    phone: '',
    organization: '',
    companyAddress: '',
    companyBusinessType: '',
    companyPhone: '',
  });
  const user = useUserStore((state) => state.user);
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        phone: user.phone || '',
        organization: user.organization || '',
        companyAddress: user.companyAddress || '',
        companyBusinessType: user.companyBusinessType || '',
        companyPhone: user.companyPhone || '',
      });
    }
  }, [user]);
  const updateUser = useUserStore((state) => state.updateUser);

  useEffect(() => {
    const checkLogin = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (!data.user || error) {
        router.push('/login');
      } else {
        setIsLoading(false);
      }
    };

    checkLogin();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePasswordChange = async () => {
    const currentPassword = (document.getElementById('current-password') as HTMLInputElement)?.value;
    const newPassword = (document.getElementById('new-password') as HTMLInputElement)?.value;
    const confirmPassword = (document.getElementById('confirm-password') as HTMLInputElement)?.value;

    if (newPassword !== confirmPassword) {
      alert('새 비밀번호가 일치하지 않습니다.');
      return;
    }

    if (!user || !user.email) {
      alert('사용자 정보가 없습니다.');
      return;
    }

    try {
      // 현재 비밀번호 확인
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: currentPassword,
      });

      if (signInError) {
        alert('현재 비밀번호가 올바르지 않습니다.');
        return;
      }

      // 비밀번호 변경
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (updateError) {
        alert('비밀번호 변경에 실패했습니다.');
      } else {
        alert('비밀번호가 성공적으로 변경되었습니다.');
        setShowPasswordChange(false);
      }
    } catch (error) {
      console.error('비밀번호 변경 중 오류 발생:', error);
      alert('비밀번호 변경 중 오류가 발생했습니다.');
    }
  };

  const handleSave = async () => {
    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          name: formData.name,
          phone: formData.phone,
          organization: formData.organization,
          companyAddress: formData.companyAddress,
          companyBusinessType: formData.companyBusinessType,
          companyPhone: formData.companyPhone,
        },
      });

      if (error) {
        alert('사용자 정보 저장에 실패했습니다.');
      } else {
        alert('사용자 정보가 성공적으로 저장되었습니다.');
        updateUser({
          name: formData.name,
          phone: formData.phone,
          organization: formData.organization,
          companyAddress: formData.companyAddress,
          companyBusinessType: formData.companyBusinessType,
          companyPhone: formData.companyPhone,
        });
      }
    } catch (error) {
      console.error('사용자 정보 저장 중 오류 발생:', error);
      alert('사용자 정보 저장 중 오류가 발생했습니다.');
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto pt-16 pb-24">
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-600">로딩중...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto pt-16 pb-24">
        <div className="flex justify-center items-center h-64">
          <div className="text-red-600">사용자 정보를 불러올 수 없습니다.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto pt-16 pb-24">
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
                value={user.email}
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
                      id="current-password"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">새 비밀번호</label>
                    <input
                      type="password"
                      className="w-full px-4 py-2 border rounded-md"
                      id="new-password"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">새 비밀번호 확인</label>
                    <input
                      type="password"
                      className="w-full px-4 py-2 border rounded-md"
                      id="confirm-password"
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
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">연락처</label>
              <input
                type="tel"
                className="w-full px-4 py-2 border rounded-md"
                placeholder="010-0000-0000"
                value={formData.phone}
                onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
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
                value={formData.organization}
                onChange={(e) => setFormData((prev) => ({ ...prev, organization: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">회사주소</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-md"
                placeholder="회사주소"
                value={formData.companyAddress}
                onChange={(e) => setFormData((prev) => ({ ...prev, companyAddress: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">업태</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-md"
                placeholder="업태"
                value={formData.companyBusinessType}
                onChange={(e) => setFormData((prev) => ({ ...prev, companyBusinessType: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">회사 연락처</label>
              <input
                type="tel"
                className="w-full px-4 py-2 border rounded-md"
                placeholder="02-0000-0000"
                value={formData.companyPhone}
                onChange={(e) => setFormData((prev) => ({ ...prev, companyPhone: e.target.value }))}
              />
            </div>
          </div>
        </div>

        {/* 저장 버튼 */}
        <div className="mt-12 flex justify-center">
          <button className="btn-primary btn-50" style={{width: '240px'}} onClick={handleSave}>
            저장하기
          </button>
        </div>
      </div>
    </div>
  );
} 