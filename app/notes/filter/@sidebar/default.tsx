'use client';

import Link from 'next/link';
import css from './SidebarNotes.module.css';

const TAGS = ['All', 'Work', 'Personal', 'Todo', 'Meeting', 'Shopping', 'Ideas', 'Archive'];

export default function Sidebar() {
  return (
    <aside className={css.sidebar}>
      <nav>
        <ul className={css.tagList}>
          {TAGS.map((tag) => (
            <li key={tag} className={css.tagItem}>
              <Link href={`/notes/filter/${tag}`} className={css.tagLink}>
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
