type LogoProps = {
  className?: string;
};

export default function Logo({ className = 'h-12 w-auto' }: LogoProps) {
  return (
    <img
      src="/aty-logo-new.jpg"
      alt="Automation To You"
      width={724}
      height={724}
      className={`${className} rounded-full object-cover`}
    />
  );
}
