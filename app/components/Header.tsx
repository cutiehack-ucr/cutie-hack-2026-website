"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronDown, X } from "lucide-react";
import {
  FaInstagram,
  FaDiscord,
  FaLinkedin,
  FaGithub,
  FaRegEnvelope,
} from "react-icons/fa";
import {useState, useEffect, useRef} from "react";

const navLinks = [
  { href: "#register", label: "Register" },
  {
    href: "#about",
    label: "About",
    dropdown: [
      { href: "#about", label: "About Cutie Hack" },
      { href: "#past-projects", label: "Past Projects" },
    ],
  },
  { href: "#tracks", label: "Tracks" },
  { href: "#schedule", label: "Schedule" },
  {
    href: "#people",
    label: "People",
    dropdown: [
      { href: "#sponsors", label: "Sponsors" },
      { href: "#industry", label: "Industry" },
      { href: "#team", label: "Team" },
    ],
  },
  { href: "#faq", label: "FAQ" },
];

const sections = [
  "register",
  "about",
  "past-projects",
  "tracks",
  "schedule",
  "team",
  "faq",
  "sponsors",
  "industry",
];

const socialLinks = [
  {
    href: "https://www.instagram.com/cutiehack_ucr/",
    label: "Instagram",
    icon: FaInstagram,
  },
  {
    href: "https://www.discord.gg/33JTAhGHuu",
    label: "Discord",
    icon: FaDiscord,
  },
  {
    href: "mailto:cutiehack@gmail.com",
    label: "Email",
    icon: FaRegEnvelope,
  },
];

const fadeIn =
  "opacity-100 transition-opacity duration-300 ease-out starting:opacity-0";

const Header = () => {
  const [activeSection, setActiveSection] = useState("register");
  const [menuOpen, setMenuOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);
  const scrollingTo = useRef<string | null>(null);


  const scrollToSection = (
    event: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    event.preventDefault();
  
    const section = document.getElementById(id);
  
    if (section) {
      scrollingTo.current = id;
      const isSmall = window.matchMedia("(max-width: 1023px)").matches;
      const offset = isSmall ? 60 : id === "faq" ? 200 : 120;
      const top =
        section.getBoundingClientRect().top + window.scrollY - offset;
  
      window.scrollTo({
        top,
        behavior: "smooth",
      });
    }
  
    setActiveSection(id);
    setMenuOpen(false);
    setOpenMobileDropdown(null);
  };

  useEffect(() => {
    const user = new IntersectionObserver((entries) => {
      if (scrollingTo.current) {
        return;
      }

      const visibleSections = entries.filter(
        (entry) => entry.isIntersecting
      );

      if (visibleSections.length > 0) {
        const closestSection = visibleSections.reduce(
          (closest, current) => {
            return Math.abs(current.boundingClientRect.top) <
              Math.abs(closest.boundingClientRect.top)
              ? current
              : closest;
          }
        );

        setActiveSection(closestSection.target.id);
      }
    }, {
      rootMargin: "-120px 0px -100% 0px",
    });

    sections.forEach((id) => {
      const section = document.getElementById(id);
      if (section) {
        user.observe(section);
      }

    });

    const unlock = () => {
      scrollingTo.current = null;
    };

    let scrollTimeout: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      if (!scrollingTo.current) {
        return;
      }

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(unlock, 150);
    };

    window.addEventListener("scrollend", unlock);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      user.disconnect();
      window.removeEventListener("scrollend", unlock);
      window.removeEventListener("scroll", onScroll);
      clearTimeout(scrollTimeout);
    };

  }, []);

  useEffect(() => {
    const closeOpenDropdowns = (event: MouseEvent) => {
      document.querySelectorAll("header details[open]").forEach((details) => {
        if (!details.contains(event.target as Node)) {
          details.removeAttribute("open");
        }
      });
    };

    document.addEventListener("mousedown", closeOpenDropdowns);
    return () => document.removeEventListener("mousedown", closeOpenDropdowns);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);


  return (
    <header className="sticky top-0 z-50 w-full text-2xl font-fraunces text-blue-900">
      {/*large screen version*/}
      <div className="hidden lg:block lg:px-15 xl:px-20 pt-5">
        <div className="bg-gradient-to-b from-gold-500 to-brown-700 p-[3px] shadow-sm rounded-[30px]">
          <div className="flex h-18 w-full min-w-0 justify-between items-center rounded-[27px] bg-white-100 gap-[clamp(8px,1.5vw,24px)] px-[clamp(8px,1.2vw,20px)]">
            <Link
              href="/"
              className="transition-transform duration-300 ease-out hover:scale-110 shrink-0"
              onClick = {(event) => scrollToSection(event, "hero")}
            >
              <Image
              src="/logo.svg"
              alt="Cutie Hack 2026 Logo"
              width={66}
              height={57}
              className="h-auto w-[clamp(42px,4vw,66px)]"
            />
            </Link>

            <nav className="relative flex min-w-0 flex-1 self-stretch items-center justify-center gap-[clamp(16px,calc(6.3vw-40px),50px)] text-[clamp(18px,1.5vw,22px)]" aria-label="Main">
              {navLinks.map(({ href, label, dropdown }) => {
                const active =
                activeSection === href.slice(1) ||
                (href === "#about" && activeSection === "past-projects") ||
                (href === "#people" && ["sponsors", "industry", "team"].includes(activeSection));

                if (dropdown) {
                  return (
                    <details
                      key={href}
                      className="group relative flex h-full items-center"
                      onMouseLeave={(event) => {
                        event.currentTarget.removeAttribute("open");
                      }}
                    >
                      <summary className={`relative inline-flex cursor-pointer list-none items-center gap-1 whitespace-nowrap transition-transform duration-300 ease-out after:transition-opacity after:duration-300 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-gradient-to-r after:from-gold-500 after:to-brown-700 ${active ? "after:opacity-100" : "after:opacity-0 hover:after:opacity-50"}`}>
                        {label}
                        <ChevronDown className="size-3.5" aria-hidden="true" />
                      </summary>
                      <div className="absolute -left-4 top-[calc(100%)] z-10 min-w-[clamp(200px,13vw,290px)] rounded-b-[25px] bg-gradient-to-b from-gold-500 to-brown-700 p-[3px] shadow-md text-[clamp(14px,1.3vw,22px)]">
                        <div className="rounded-b-[22px] bg-white-100 px-[clamp(12px,1.2vw,20px)] py-[clamp(8px,1vw,16px)]">
                          {dropdown.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={(event) => {
                                scrollToSection(event, item.href.slice(1));
                                event.currentTarget
                                  .closest("details")
                                  ?.removeAttribute("open");
                              }}
                              className="relative inline-flex whitespace-nowrap rounded-md px-[clamp(8px,0.5vw,16px)] py-[clamp(4px,0.6vw,8px)] after:transition-opacity after:duration-300 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-gradient-to-r after:from-gold-500 after:to-brown-700 after:opacity-0 hover:after:opacity-50"
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </details>
                  );
                }

                return (
                  <Link
                    key={href}
                    href={href}
                    onClick = {(event) => scrollToSection(event, href.slice(1))}
                    className={`relative inline-flex items-center gap-1 whitespace-nowrap transition-transform duration-300 ease-out after:transition-opacity after:duration-300 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-gradient-to-r after:from-gold-500 after:to-brown-700 ${active ? "after:opacity-100": "after:opacity-0 hover:after:opacity-50"}`}
                  >
                    {label}
                  </Link>
                );
              })}
              <div className="bg-gradient-to-b from-gold-500 to-brown-700 p-[1.5px] rounded-[12px]">
              <a
                href="https://athena-wheat.vercel.app/cutiehack/live/dashboard"
                target="_blank"
                className="inline-flex items-center whitespace-nowrap rounded-[10px] bg-white-100 px-[clamp(8px,0.8vw,12px)] py-[clamp(4px,0.5vw,8px)] ease-out hover:bg-gold-500 duration-300"
              >
                Dashboard
              </a>
              </div>
            </nav>

            <div className="h-12 w-[3px] shrink-0 bg-gradient-to-b from-gold-500 to-brown-700" aria-hidden="true" />

            <div className="flex shrink-0 items-center justify-end gap-[clamp(6px,1.2vw,20px)]">
              {socialLinks.map(({ href, label, icon: Icon }) => {
                const isMail = href.startsWith("mailto:");

                return (
                  <a
                    key={label}
                    href={href}
                    target={isMail ? undefined : "_blank"}
                    rel={isMail ? undefined : "noopener noreferrer"}
                    aria-label={label}
                    className="inline-flex items-center justify-center text-blue-900 transition-transform duration-300 ease-out hover:scale-110"
                  >
                    <Icon className="size-[clamp(20px,2.4vw,35px)]" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {/**small screen version*/}
      <div className="lg:hidden">
        <div className="relative z-50 flex items-start justify-between px-4 pt-4">
          <Link
            href="/"
            className="shrink-0 transition-transform duration-300 ease-out hover:scale-110"
            onClick={(event) => scrollToSection(event, "hero")}
          >
            <Image
              src="/logo.svg"
              alt="Cutie Hack 2026 Logo"
              width={45.5}
              height={39}
              className="h-auto w-full"
            />
          </Link>

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => {
              setMenuOpen((open) => !open);
              setOpenMobileDropdown(null);
            }}
            className="inline-flex shrink-0 items-center justify-center pt-2"
          >
            {menuOpen ? (
              <span className="flex items-center justify-center">
                <X className="size-[35px] text-blue-900" strokeWidth={1} />
              </span>
            ) : (
              <Image
                src="/quill_hamburger.svg"
                alt=""
                width={39}
                height={39}
                className="h-auto"
              />
            )}
          </button>
        </div>

        {menuOpen && (
          <div className={`fixed inset-x-0 top-0 z-40 flex h-1/2 flex-col bg-white-100 ${fadeIn}`}>
          <nav
            className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto px-6 pb-6 pt-24 text-xl"
            aria-label="Main"
          >
            {navLinks.map(({ href, label, dropdown }, index) => {
              const active =
                activeSection === href.slice(1) ||
                (href === "#about" && activeSection === "past-projects") ||
                (href === "#people" &&
                  ["sponsors", "industry", "team"].includes(activeSection));
              const openIndex = navLinks.findIndex(
                (link) => link.href === openMobileDropdown
              );
              const fadeBelow =
                openMobileDropdown !== null &&
                openIndex !== -1 &&
                index > openIndex;

              if (dropdown) {
                const isOpen = openMobileDropdown === href;

                return (
                  <div
                    key={fadeBelow ? `${href}-${openMobileDropdown}` : href}
                    className={fadeBelow ? fadeIn : ""}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setOpenMobileDropdown(isOpen ? null : href)
                      }
                      className={`relative inline-flex cursor-pointer items-center gap-1 py-2 ${
                        active
                          ? "after:opacity-100"
                          : "after:opacity-0 hover:after:opacity-50"
                      } after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-gradient-to-r after:from-gold-500 after:to-brown-700 after:transition-opacity after:duration-300`}
                    >
                      {label}
                      <ChevronDown
                        className={`size-4 transition-transform duration-300 ease-out ${
                          isOpen ? "rotate-0" : "-rotate-90"
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                    {isOpen && (
                      <div className={`mb-1 ml-3 flex flex-col gap-1 text-lg ${fadeIn}`}>
                        {dropdown.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={(event) =>
                              scrollToSection(event, item.href.slice(1))
                            }
                            className="rounded-md px-2 py-1.5"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={fadeBelow ? `${href}-${openMobileDropdown}` : href}
                  href={href}
                  onClick={(event) => scrollToSection(event, href.slice(1))}
                  className={`relative inline-flex w-fit py-2 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-gradient-to-r after:from-gold-500 after:to-brown-700 after:transition-opacity after:duration-300 ${
                    fadeBelow ? fadeIn : ""
                  } ${
                    active
                      ? "after:opacity-100"
                      : "after:opacity-0 hover:after:opacity-50"
                  }`}
                >
                  {label}
                </Link>
              );
            })}

              <a
                key={openMobileDropdown ?? "dashboard"}
                href="https://athena-wheat.vercel.app/cutiehack/live/dashboard"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center rounded-[10px] ${
                  openMobileDropdown ? fadeIn : ""
                }`}
              >
                <span className="bg-gradient-to-b from-gold-500 to-brown-700 bg-clip-text text-transparent">
                  Dashboard
                </span>
              </a>
            
          </nav>
          <div className="flex shrink-0 items-center gap-4 px-6 pb-4">
              {socialLinks.map(({ href, label, icon: Icon }) => {
                const isMail = href.startsWith("mailto:");

                return (
                  <a
                    key={label}
                    href={href}
                    target={isMail ? undefined : "_blank"}
                    rel={isMail ? undefined : "noopener noreferrer"}
                    aria-label={label}
                    className="inline-flex items-center justify-center text-blue-900"
                  >
                    <Icon className="size-7" />
                  </a>
                );
              })}
          </div>
          <div
            className="h-[3px] w-full shrink-0 bg-gradient-to-b from-gold-500 to-brown-700"
            aria-hidden="true"
          />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;