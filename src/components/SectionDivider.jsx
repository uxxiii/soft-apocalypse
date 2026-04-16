export default function SectionDivider({ className = '', align = 'center' }) {
  const alignment = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
  };

  return (
    <div className={`flex py-2 ${alignment[align]} ${className}`} role="separator">
      <div className="flex items-center gap-4">
        <span className="h-px w-10 bg-gradient-to-r from-transparent to-warm-sand/80 sm:w-16" />
        <span className="h-2.5 w-2.5 rotate-45 border border-warm-sand/80 bg-warm-sand/20" />
        <span className="h-px w-10 bg-gradient-to-l from-transparent to-warm-sand/80 sm:w-16" />
      </div>
    </div>
  );
}
