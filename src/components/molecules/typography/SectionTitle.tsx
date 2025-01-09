interface SectionTitleProps {
  title: string;
}

export default function SectionTitle({ title }: SectionTitleProps) {
  return (
    <>
      <div className="pad-x-xl pt-8">
        <h1 className="font-bold text-xl md:text-4xl">{title}</h1>
      </div>
    </>
  );
}
