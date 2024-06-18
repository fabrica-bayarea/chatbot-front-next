import type { ReactNode } from 'react';

import SupportSideBar from '@/components/SupportSideBar';

import styles from './support.module.css';

async function Layout({ children }: { children: ReactNode }) {

  return (
    <main className={styles.main}>
      <SupportSideBar />
      {children}
    </main>
  );
}

export default Layout;
