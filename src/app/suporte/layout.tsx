import type { ReactNode } from 'react';

import styles from './support.module.css';
import { SupportSideBar } from '@/components/Support';

async function Layout({ children }: { children: ReactNode }) {
  return (
    <main className={styles.main}>
      <SupportSideBar />
      {children}
    </main>
  );
}

export default Layout;
