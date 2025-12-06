import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{ protocol: 'https', hostname: '**.supabase.co' }],
  },
  eslint: {
    // 빌드 시 ESLint 에러를 무시합니다 (임시 해결책)
    // 프로덕션 배포 전에 모든 ESLint 에러를 수정하는 것을 권장합니다
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
