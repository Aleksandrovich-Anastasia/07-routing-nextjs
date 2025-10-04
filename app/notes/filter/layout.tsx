import { ReactNode } from 'react';

interface FilterLayoutProps {
  children: ReactNode;
}

export default function FilterLayout({ children }: FilterLayoutProps) {
  return <div className="filter-layout">{children}</div>;
}
