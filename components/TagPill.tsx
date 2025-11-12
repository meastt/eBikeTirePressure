interface TagPillProps {
  tag: string;
}

export function TagPill({ tag }: TagPillProps) {
  return (
    <span className="inline-block px-2.5 py-1 text-xs font-medium bg-surface-light text-muted rounded-full border border-line">
      {tag}
    </span>
  );
}

