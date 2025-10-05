import { ReactNode } from 'react';
import SidebarNotes from '../filter/@sidebar/SidebarNotes';
import css from './FilterLayout.module.css';

interface FilterLayoutProps {
  children: ReactNode;
}

export default function FilterLayout({ children }: FilterLayoutProps) {
  return (
    <div className={css.container}>
      <aside className={css.sidebar}>
        <SidebarNotes />
      </aside>
      <main className={css.main}>{children}</main>
    </div>
  );
}
