import { img } from "@/lib/content";

export function Photo({
  file,
  alt,
  className = "",
  imgClassName = "",
  focus,
  priority = false,
  sizes,
  credit = false,
}: {
  file: string;
  alt?: string;
  className?: string;
  imgClassName?: string;
  focus?: string;
  priority?: boolean;
  sizes?: string;
  credit?: boolean;
}) {
  const m = img(file);
  const altText = alt ?? m.alt;
  return (
    <figure className={`group relative overflow-hidden bg-muted ${className}`}>
      <img
        src={m.src}
        width={m.width}
        height={m.height}
        alt={altText}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        sizes={sizes ?? "(max-width: 767px) 100vw, 50vw"}
        style={focus ? { objectPosition: focus } : undefined}
        className={`h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${imgClassName}`}
      />
      {credit && (
        <figcaption className="absolute bottom-0 right-0 bg-background/90 px-2 py-1 font-mono text-[0.62rem] tracking-wide text-muted-foreground backdrop-blur-sm transition-opacity group-hover:opacity-100 md:opacity-0">
          {m.originalFilename} · BTS archive
        </figcaption>
      )}
    </figure>
  );
}
