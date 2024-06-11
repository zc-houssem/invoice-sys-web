import { Test } from '@/components/TestComponent';
import { Layout } from '@/components/layout';
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <div className={`flex min-h-screen flex-col items-center justify-between ${inter.className}`}>
      <Layout>
        <Test text="Home" />
      </Layout>
    </div>
  );
}
