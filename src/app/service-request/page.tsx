'use client';

import React, { useState } from 'react';
import '@/css/login.css';
import Image from 'next/image';
import tel from '@/assets/icons/icon-tel.png';
import mail from '@/assets/icons/icon-email.png';
import Link from 'next/link';

export default function ServiceRequestPage() {
  const [form, setForm] = useState<{
    name: string;
    position: string;
    email: string;
    phone: string;
    buildingName: string;
    buildingHeight: string;
    projectNumber: string;
    inquiryType: string;
    message: string;
    agree: boolean;
    file: File | null;
  }>({
    name: '',
    position: '',
    email: '',
    phone: '',
    buildingName: '',
    buildingHeight: '',
    projectNumber: '',
    inquiryType: '',
    message: '',
    agree: false,
    file: null,
  });
  const fieldClass =
    'w-full rounded-lg border border-[#1a4b8c] bg-white px-3.5 py-1.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1f5aa7]';
  const radioOptionClass =
    'flex cursor-pointer items-center gap-3 rounded-lg border border-[#1a4b8c] bg-[#1f5aa7] px-3.5 py-1.5 text-sm leading-snug text-white';
  const messageDisabledClass = 'cursor-not-allowed opacity-50';

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
    const { name, type } = target;
    if (type === 'checkbox') {
      setForm({ ...form, [name]: (target as HTMLInputElement).checked });
      return;
    }

    if (type === 'file') {
      setForm({
        ...form,
        file: (target as HTMLInputElement).files ? (target as HTMLInputElement).files![0] : null,
      });
      return;
    }

    if (name === 'inquiryType' && target.value !== 'etc') {
      setForm({ ...form, inquiryType: target.value, message: '' });
      return;
    }

    setForm({ ...form, [name]: target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 실제 제출 로직 구현
    alert('문의가 접수되었습니다.');
  };

  return (
    <div className="container py-20">
      <div className="service-request-wrap flex flex-col md:flex-row gap-10">
        {/* 왼쪽 파란 배경 카드 */}
        <div className="left-card md:w-2/4 flex flex-col">
          <div className="inner">
            <h2>엔지니어링 서비스 요청 및 문의하기</h2>
            <p>
              언제든 연돌현상을 빠르게 평가하고
              <br />
              효과적인 해결방안을 확인하세요.
              <br />
              복잡한 시뮬레이션을 하지 않고도 건물연돌현상 영향도를
              <br />
              평가하고, 문제요소를 파악하고, 개선안을 확인할 수 있습니다.
            </p>
            <div className="contact-box">
              <div className="flex items-center gap-2 mb-3">
                <div className="image-wrap" style={{ width: '24px', height: '24px' }}>
                  <Image src={tel} alt="tel" />
                </div>
                <a href="tel:0328738747">032) 873-8747</a>
              </div>
              <div className="flex items-center gap-2">
                <div className="image-wrap" style={{ width: '24px', height: '24px' }}>
                  <Image src={mail} alt="mail" />
                </div>
                <a href="mailto:stackengineering@gmail.com">stackengineering@gmail.com</a>
              </div>
            </div>
          </div>
          <div
            className="absolute inset-0 shadow-2xl"
            style={{ filter: 'blur(8px)', opacity: 0.25, zIndex: -1 }}
          />
        </div>

        {/* 오른쪽 흰색 카드 */}
        <div className="right-card md:w-2/4 flex flex-col">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-y-1 md:grid-cols-2 md:gap-x-2.5">
              <div className="form-group !mb-0">
                <label htmlFor="name" className="mb-0 block text-xs font-semibold text-[#1f5aa7]">
                  담당자명 <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="예: 홍길동"
                  className={fieldClass}
                />
              </div>

              <div className="form-group !mb-0">
                <label
                  htmlFor="position"
                  className="mb-0 block text-xs font-semibold text-[#1f5aa7]"
                >
                  직위 <span className="text-red-500">*</span>
                </label>
                <input
                  id="position"
                  type="text"
                  name="position"
                  value={form.position}
                  onChange={handleChange}
                  required
                  placeholder="예: 대리"
                  className={fieldClass}
                />
              </div>

              <div className="form-group !mb-0">
                <label htmlFor="email" className="mb-0 block text-xs font-semibold text-[#1f5aa7]">
                  이메일 <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="예: stack@company.com"
                  className={fieldClass}
                />
              </div>

              <div className="form-group !mb-0">
                <label htmlFor="phone" className="mb-0 block text-xs font-semibold text-[#1f5aa7]">
                  연락처 <span className="text-red-500">*</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  placeholder="예: 010-1234-5678"
                  className={fieldClass}
                />
              </div>

              <div className="form-group !mb-0">
                <label
                  htmlFor="buildingName"
                  className="mb-0 block text-xs font-semibold text-[#1f5aa7]"
                >
                  건물명
                </label>
                <input
                  id="buildingName"
                  type="text"
                  name="buildingName"
                  value={form.buildingName}
                  onChange={handleChange}
                  placeholder="예: 스택타워"
                  className={fieldClass}
                />
              </div>

              <div className="form-group !mb-0">
                <label
                  htmlFor="buildingHeight"
                  className="mb-0 block text-xs font-semibold text-[#1f5aa7]"
                >
                  건물높이
                </label>
                <input
                  id="buildingHeight"
                  type="text"
                  name="buildingHeight"
                  value={form.buildingHeight}
                  onChange={handleChange}
                  placeholder="예: 150m"
                  className={fieldClass}
                />
              </div>

              <div className="form-group !mb-0 md:col-span-2">
                <label
                  htmlFor="projectNumber"
                  className="mb-0 block text-xs font-semibold text-[#1f5aa7]"
                >
                  STACK 예측평가 프로젝트번호
                </label>
                <input
                  id="projectNumber"
                  type="text"
                  name="projectNumber"
                  value={form.projectNumber}
                  onChange={handleChange}
                  placeholder="예: STACK-2024-001"
                  className={fieldClass}
                />
              </div>

              <div className="form-group !mb-0 md:col-span-2">
                <label className="mb-0.5 block text-xs font-semibold text-[#1f5aa7]">
                  문의내용 <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="grid gap-1.5 md:grid-cols-2">
                  <label className={radioOptionClass}>
                    <input
                      type="radio"
                      name="inquiryType"
                      value="techReview"
                      checked={form.inquiryType === 'techReview'}
                      onChange={handleChange}
                      required
                      className="accent-white"
                    />
                    <span>연돌효과 기술검토서</span>
                  </label>
                  <label className={radioOptionClass}>
                    <input
                      type="radio"
                      name="inquiryType"
                      value="designReview"
                      checked={form.inquiryType === 'designReview'}
                      onChange={handleChange}
                      className="accent-white"
                    />
                    <span>연돌효과 설계검토</span>
                  </label>
                  <label className={radioOptionClass}>
                    <input
                      type="radio"
                      name="inquiryType"
                      value="simulation"
                      checked={form.inquiryType === 'simulation'}
                      onChange={handleChange}
                      className="accent-white"
                    />
                    <span>연돌효과 시뮬레이션</span>
                  </label>
                  <label className={radioOptionClass}>
                    <input
                      type="radio"
                      name="inquiryType"
                      value="etc"
                      checked={form.inquiryType === 'etc'}
                      onChange={handleChange}
                      className="accent-white"
                    />
                    <span>기타문의사항</span>
                  </label>
                </div>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required={form.inquiryType === 'etc'}
                  disabled={form.inquiryType !== 'etc'}
                  placeholder="예: 추가 문의 사항을 작성해 주세요."
                  className={`${fieldClass} mt-0.5 h-32 resize-none ${form.inquiryType !== 'etc' ? messageDisabledClass : ''}`}
                />
              </div>

              <div className="form-group !mb-0 md:col-span-2">
                <label className="mb-0.5 block text-xs font-semibold text-[#1f5aa7]">첨부파일</label>
                <p className="text-xs text-gray-500 mt-0.5 leading-tight">
                  (건물의 개요, 도면, 단면도 등 관련 자료를 함께 제출하시면 보다 정확하고 신속한 검토 및 회신이
                  가능합니다.)
                </p>
                <input
                  type="file"
                  name="file"
                  onChange={handleChange}
                  className="mt-1 w-full rounded-lg border border-dashed border-[#1a4b8c] bg-white px-4 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1f5aa7]"
                />
              </div>
            </div>

            <div className="checkbox-group mt-3 flex flex-col gap-1.5 text-sm text-gray-700 md:flex-row md:items-center md:justify-between">
              <label className="flex items-start gap-2">
                <input
                  type="checkbox"
                  name="agree"
                  checked={form.agree}
                  onChange={handleChange}
                  required
                  className="mt-1 accent-[#1f5aa7]"
                />
                <span>
                  개인정보 수집 및 이용에 동의합니다.
                  <span className="ml-1 inline-block text-red-500">*</span>
                </span>
              </label>
              <Link href="#" className="login-link-btn text-[#1f5aa7]">
                약관보기
              </Link>
            </div>

            <button type="submit" className="w-full btn-50 rounded-xl btn-primary mt-8">
              문의하기
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
