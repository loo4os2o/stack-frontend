'use client';

import React, { useState } from 'react';

export default function ServiceRequestPage() {
  const [form, setForm] = useState<{
    org: string;
    name: string;
    position: string;
    email: string;
    phone: string;
    inquiryType: string;
    message: string;
    agree: boolean;
    file: File | null;
  }>({
    org: '',
    name: '',
    position: '',
    email: '',
    phone: '',
    inquiryType: '',
    message: '',
    agree: false,
    file: null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
    const { name, type } = target;
    if (type === 'checkbox') {
      setForm({ ...form, [name]: (target as HTMLInputElement).checked });
    } else if (type === 'file') {
      setForm({ ...form, file: (target as HTMLInputElement).files ? (target as HTMLInputElement).files![0] : null });
    } else {
      setForm({ ...form, [name]: target.value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 실제 제출 로직 구현
    alert('문의가 접수되었습니다.');
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-100 py-20 px-4">
      <div className="w-full max-w-5xl flex flex-col md:flex-row shadow-2xl rounded-2xl overflow-hidden bg-white relative">
        {/* 왼쪽 파란 배경 카드 */}
        <div className="w-full md:w-2/5 bg-gradient-to-b from-blue-700 to-blue-500 text-white p-8 md:pt-10 md:pb-10 flex flex-col justify-start relative z-10">
          <div style={{wordBreak: 'keep-all'}}>
            <h2 className="text-2xl font-bold mb-4">
              엔지니어링 서비스 요청 및 문의하기
            </h2>
            <p className="mb-8 leading-relaxed text-blue-100">
              언제든 연돌현상을 빠르게 평가하고 효과적인 해결방안을 확인하세요.<br />
              복잡한 시뮬레이션을 하지 않고도 건물연돌현상 영향도를 평가하고, 문제요소를 파악하고, 개선안을 확인할 수 있습니다.
            </p>
            <div className="mb-6">
              <div className="text-lg font-semibold mb-1">궁금한점이 있으신가요?</div>
              <div className="text-blue-100 mb-1">전화나 메일로 문의하세요.</div>
              <div className="text-white font-bold text-xl mb-1 mt-4">
                <a href="tel:0328738747" className="text-white font-bold text-xl mb-1">032) 873-8747</a>
              </div>
              <div className="text-white mb-1">so2park@btairtech.co.kr</div>
              <div className="text-blue-100 text-sm">9:00~18:00(월~금)</div>
            </div>
          </div>
          <div className="absolute inset-0 shadow-2xl" 
            style={{ filter: 'blur(8px)', opacity: 0.25, zIndex: -1 }} />
        </div>
        {/* 오른쪽 흰색 카드 */}
        <div className="w-full md:w-3/5 bg-white p-8 md:pt-10 md:pb-10 flex flex-col justify-start">
          <h3 className="text-xl font-bold mb-6 text-gray-800">정보를 입력해 주세요.</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center">
              <label className="block font-medium text-gray-700 w-20 mr-4 text-left mb-1 sm:mb-0">
                소속 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="org"
                value={form.org}
                onChange={handleChange}
                required
                className="w-full sm:flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center">
              <label className="block font-medium text-gray-700 w-20 mr-4 text-left mb-1 sm:mb-0">
                담당자명 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full sm:flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center">
              <label className="block font-medium text-gray-700 w-20 mr-4 text-left mb-1 sm:mb-0">직위</label>
              <input
                type="text"
                name="position"
                value={form.position}
                onChange={handleChange}
                className="w-full sm:flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center">
              <label className="block font-medium text-gray-700 w-20 mr-4 text-left mb-1 sm:mb-0">
                이메일 <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full sm:flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center">
              <label className="block font-medium text-gray-700 w-20 mr-4 text-left mb-1 sm:mb-0">
                연락처 <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                className="w-full sm:flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="flex flex-col sm:flex-row items-start">
              <label className="block font-medium text-gray-700 w-20 mr-4 text-left mb-1 sm:mb-0 pt-2 sm:pt-0">
                문의내용 <span className="text-red-500">*</span>
              </label>
              <div className="flex-1">
                <select
                  name="inquiryType"
                  value={form.inquiryType}
                  onChange={handleChange}
                  required
                  className="w-full sm:flex-1 border border-gray-300 rounded-md px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">문의 유형을 선택하세요</option>
                  <option value="Online">Online - 연돌현상 예측평가</option>
                  <option value="Basic">Basic - 연돌현상 개선전략</option>
                  <option value="Pro">Pro - 연돌현상 개선설계</option>
                  <option value="ProPlus">ProPlus - 연돌현상 최적설계</option>
                  <option value="etc">기타</option>
                </select>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="문의 내용을 입력해 주세요."
                  className="w-full sm:flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center">
              <label className="block font-medium text-gray-700 w-20 mr-4 text-left mb-1 sm:mb-0">첨부파일</label>
              <input
                type="file"
                name="file"
                onChange={handleChange}
                className="w-full sm:flex-1"
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="agree"
                checked={form.agree}
                onChange={handleChange}
                required
                className="mr-2"
              />
              <span className="text-gray-700 text-sm">
                개인정보 수집 및 이용에 동의합니다. 
                <a href="#" className="underline text-blue-500 ml-2">약관보기</a>
              </span>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition"
            >
              문의하기
            </button>
          </form>
        </div>
      </div>
    </div>
  );
} 