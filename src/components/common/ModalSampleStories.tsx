import { useState } from 'react';
import Modal from './Modal';

export default function ModalSampleStories() {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);

  return (
    <div style={{ padding: 40 }}>
      <h2>Modal 샘플 스토리</h2>
      <button className="btn-primary btn-large" onClick={() => setOpen1(true)}>기본 모달</button>
      <button className="btn-primary btn-large ml-2" onClick={() => setOpen2(true)}>폼 모달</button>
      <button className="btn-primary btn-large ml-2" onClick={() => setOpen3(true)}>커스텀 모달</button>

      {/* 기본 모달 */}
      <Modal open={open1} onClose={() => setOpen1(false)} title="기본 모달">
        <div>이것은 기본 모달입니다.<br/>내용을 자유롭게 넣을 수 있습니다.</div>
      </Modal>

      {/* 폼 모달 */}
      <Modal
        open={open2}
        onClose={() => setOpen2(false)}
        title="폼 입력 모달"
        footer={
          <>
            <button className="btn-large" onClick={() => setOpen2(false)}>취소</button>
            <button className="btn-primary btn-large ml-2">제출</button>
          </>
        }
        width={400}
      >
        <div>
          <label className="block mb-2">이메일</label>
          <input type="email" className="w-full px-3 py-2 border rounded mb-4" placeholder="이메일을 입력하세요" />
          <label className="block mb-2">비밀번호</label>
          <input type="password" className="w-full px-3 py-2 border rounded" placeholder="비밀번호를 입력하세요" />
        </div>
      </Modal>

      {/* 커스텀 모달 (타이틀/닫기버튼 숨김) */}
      <Modal
        open={open3}
        onClose={() => setOpen3(false)}
        hideCloseButton
        width={320}
        footer={<button className="btn-primary btn-large w-full" onClick={() => setOpen3(false)}>확인</button>}
      >
        <div style={{ textAlign: 'center', padding: '2rem 0' }}>
          <div style={{ fontSize: 32, marginBottom: 16 }}>🎉</div>
          <div>완료되었습니다!</div>
        </div>
      </Modal>
    </div>
  );
}
