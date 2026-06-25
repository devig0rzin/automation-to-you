type LogoProps = {
  className?: string;
};

export default function Logo({ className = 'h-12 w-auto' }: LogoProps) {
  return (
    <img
      src="/aty-logo-new.jpg"
      alt="ATY"
      className={`${className} rounded-full object-cover`}
    />
  );
}
