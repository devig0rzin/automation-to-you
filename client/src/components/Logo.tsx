type LogoProps = {
  className?: string;
};

export default function Logo({ className = 'h-12 w-auto' }: LogoProps) {
  return (
    <img
      src="/logo-transparent.png"
      alt="ATY"
      className={`${className} object-contain`}
    />
  );
}
