import { ReactNode } from 'react';

interface ProseProps {
  children: ReactNode;
}

export function Prose({ children }: ProseProps) {
  return <div className="prose-content">{children}</div>;
}
