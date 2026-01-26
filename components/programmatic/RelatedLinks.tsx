import Link from 'next/link';

interface RelatedLink {
  title: string;
  href: string;
  description?: string;
  icon?: string;
}

interface RelatedLinksProps {
  heading?: string;
  links: RelatedLink[];
}

export function RelatedLinks({ heading = 'Related Guides', links }: RelatedLinksProps) {
  return (
    <section className="mt-12">
      <h2 className="text-xl font-heading font-bold text-text mb-4">{heading}</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {links.map((link, index) => (
          <Link key={index} href={link.href} className="card card-hover p-5 bg-white group">
            <div className="flex items-start gap-3">
              {link.icon && <span className="text-2xl">{link.icon}</span>}
              <div>
                <h3 className="font-heading font-bold text-text group-hover:text-brand transition-colors">
                  {link.title}
                </h3>
                {link.description && <p className="text-sm text-muted mt-1">{link.description}</p>}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
