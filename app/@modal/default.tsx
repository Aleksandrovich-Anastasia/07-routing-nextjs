'use client';
import { ReactNode } from 'react';

interface ModalLayoutProps {
  children: ReactNode;
}

export default function ModalLayout({ children }: ModalLayoutProps) {
  return <>{children}</>;
}