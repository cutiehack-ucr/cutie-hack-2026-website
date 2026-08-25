import Link from "next/link";
import { ChevronDown } from "lucide-react";
import {
  FaInstagram,
  FaDiscord,
  FaLinkedin,
  FaGithub,
  FaRegEnvelope,
} from "react-icons/fa";

const navLinks = [
  { href: "#register", label: "Register" },
  { href: "#about", label: "About", hasDropdown: true },
  { href: "#tracks", label: "Tracks" },
  { href: "#schedule", label: "Schedule" },
  { href: "#people", label: "People", hasDropdown: true },
  { href: "#team", label: "Team" },
  { href: "#faq", label: "FAQ" },
];

const socialLinks = [
  {
    href: "https://instagram.com",
    label: "Instagram",
    icon: FaInstagram,
  },
  {
    href: "https://discord.com",
    label: "Discord",
    icon: FaDiscord,
  },
  {
    href: "https://linkedin.com",
    label: "LinkedIn",
    icon: FaLinkedin,
  },
  {
    href: "https://github.com",
    label: "GitHub",
    icon: FaGithub,
  },
  {
    href: "mailto:hello@example.com",
    label: "Email",
    icon: FaRegEnvelope,
  },
];

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white text-2xl font-medium text-black">
      <div className="grid h-20 w-full grid-cols-[1fr_auto_1fr] items-center gap-8 px-10 sm:px-14 lg:px-20">
        <Link
          href="/"
          className="justify-self-start transition-transform duration-300 ease-out hover:scale-110"
        >
          [Logo]
        </Link>

        <div className="flex items-center gap-7" aria-label="Main">
          {navLinks.map(({ href, label, hasDropdown }) => (
            <Link
              key={href}
              href={href}
              className="inline-flex items-center gap-1 transition-transform duration-300 ease-out hover:scale-110"
            >
              {label}
              {hasDropdown && (
                <ChevronDown className="size-3.5" aria-hidden="true" />
              )}
            </Link>
          ))}
        </div>

        <div className="flex items-center justify-end gap-4">
          {socialLinks.map(({ href, label, icon: Icon }) => {
            const isMail = href.startsWith("mailto:");

            return (
              <a
                key={label}
                href={href}
                target={isMail ? undefined : "_blank"}
                rel={isMail ? undefined : "noopener noreferrer"}
                aria-label={label}
                className="inline-flex size-7 items-center justify-center text-black transition-transform duration-300 ease-out hover:scale-110"
              >
                <Icon className="size-full" />
              </a>
            );
          })}
        </div>
      </div>
    </header>
  );
};

export default Header;
