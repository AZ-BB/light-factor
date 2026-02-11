import type { Footer as FooterContent } from "@/types/content";

function Icon({ type }: { type: string }) {
  const className = "w-4 h-4 shrink-0 text-accent";
  switch (type) {
    case "phone":
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      );
    case "location":
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      );
    case "email":
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
    case "box":
    case "doc":
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
    default:
      return null;
  }
}

interface FooterProps {
  content: FooterContent;
}

export default function Footer({ content }: FooterProps) {
  return (
    <footer className="bg-charcoal border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-soft-white uppercase tracking-tight mb-12">
          {content.title}
        </h2>

        <div className="grid md:grid-cols-3 gap-10 md:gap-12 mb-14">
          {content.branches.map((branch) => (
            <div key={branch.name}>
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span className="font-display font-semibold text-soft-white">{branch.name}</span>
              </div>
              <ul className="space-y-3">
                {branch.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-soft-white/80 text-sm">
                    <Icon type={item.icon} />
                    <span className="break-words">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-6 pb-12 border-b border-white/10">
          {content.emails.map((email) => (
            <a
              key={email}
              href={`mailto:${email}`}
              className="flex items-center gap-3 text-soft-white/90 hover:text-accent transition-colors"
            >
              <Icon type="email" />
              <span>{email}</span>
            </a>
          ))}
        </div>

        <p className="font-display text-2xl md:text-3xl font-semibold text-soft-white uppercase tracking-tight text-center pt-10">
          {content.closing}
        </p>
      </div>
    </footer>
  );
}
