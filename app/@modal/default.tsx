'use client';

import { ReactNode } from 'react';

interface ModalLayoutProps {
  children?: ReactNode;
}

export default function ModalLayout({ children }: ModalLayoutProps) {
  if (!children) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: 'white',
          padding: '24px',
          borderRadius: '8px',
          maxWidth: '90%',
          maxHeight: '90%',
          overflow: 'auto',
        }}
      >
        {children}
      </div>
    </div>
  );
}
