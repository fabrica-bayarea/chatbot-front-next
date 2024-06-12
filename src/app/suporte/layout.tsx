import type { ReactNode } from 'react';

import { fetchSupport } from '@/app/actions';
import SupportSideBar from '@/components/SupportSideBar';

import styles from './support.module.css';

async function Layout({ children }: { children: ReactNode }) {
  const { data } = await fetchSupport();

  return (
    <main className={styles.main}>
      <SupportSideBar data={data} />
      {children}
    </main>
  );
}

export default Layout;
