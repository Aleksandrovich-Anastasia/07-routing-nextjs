'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import css from './TagsMenu.module.css';

const TAGS = ['All', 'Work', 'Personal', 'Ideas', 'Archive'];

const TagsMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null; // поки компонент не на клієнті — нічого не рендеримо

  const toggleMenu = () => setIsOpen(prev => !prev);

  return (
    <div className={css.menuContainer}>
      <button className={css.menuButton} onClick={toggleMenu}>
        Notes ▾
      </button>

      {isOpen && (
        <ul className={css.menuList}>
          {TAGS.map(tag => (
            <li key={tag} className={css.menuItem}>
              <Link
                href={tag === 'All' ? '/notes/filter' : `/notes/filter/${tag}`}
                className={css.menuLink}
                onClick={() => setIsOpen(false)}
              >
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TagsMenu;
