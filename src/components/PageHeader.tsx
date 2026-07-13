type PageHeaderProps = {
  title: string;
  subtitle?: string;
};

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="mx-auto max-w-3xl px-4 pt-14 pb-8 text-center sm:px-6">
      <h1 className="font-serif text-4xl text-ink">{title}</h1>
      {subtitle && <p className="mt-3 text-ink-soft">{subtitle}</p>}
    </div>
  );
}
