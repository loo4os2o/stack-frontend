'use client';

import React, { useState } from 'react';
import '@/css/login.css';
import Image from 'next/image';
import tel from '@/assets/icons/icon-tel.png';
import mail from '@/assets/icons/icon-email.png';
import Link from 'next/link';

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
      setForm({
        ...form,
        file: (target as HTMLInputElement).files ? (target as HTMLInputElement).files![0] : null,
      });
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
            <div className="form-group">
              <label>
                소속 <span className="text-red-500 ml-1">*</span>
              </label>
              <input type="text" name="org" value={form.org} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>
                담당자명 <span className="text-red-500">*</span>
              </label>
              <input type="text" name="name" value={form.name} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>직위</label>
              <input type="text" name="position" value={form.position} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>
                이메일 <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>
                연락처 <span className="text-red-500 ml-1">*</span>
              </label>
              <input type="tel" name="phone" value={form.phone} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>
                문의내용 <span className="text-red-500 ml-1">*</span>
              </label>
              <select
                name="inquiryType"
                value={form.inquiryType}
                onChange={handleChange}
                required
                className="mb-2"
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
              />
            </div>

            <div className="form-group">
              <label>첨부파일</label>
              <p className="text-sm text-gray-500 mt-1">
                (건물의 개요, 도면, 단면도 등 관련 자료를 함께 제출하시면 보다 정확하고 신속한 검토 및 회신이 가능합니다.)
              </p>
              <input type="file" name="file" onChange={handleChange} />
            </div>

            <div className="flex justify-between checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="agree"
                  checked={form.agree}
                  onChange={handleChange}
                  required
                />
                <span>개인정보 수집 및 이용에 동의합니다.</span> <span className="text-red-500 ml-1">*</span>
              </label>
              <Link href="#" className="login-link-btn">
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
