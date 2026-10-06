import type { ReactNode } from 'react';
import RootHtml from '@/components/RootHtml';
import '../globals.css';

export default function Layout({ children }: { children: ReactNode }) {
  return <RootHtml lang="pt">{children}</RootHtml>;
}
