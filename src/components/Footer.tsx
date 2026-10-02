import Image from "next/image";

const opportunities = [
  {
    title: "Citrus Hack",
    href: "http://instagram.com/citrushack_ucr",
  },
  {
    title: "ACM at UCR",
    href: "http://instagram.com/acm_ucr",
  },
  // {
  //   title: "Feedback Survey",
  //   href: "",
  // },
];

const socialCards = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/cutiehack_ucr/",
    card: "/footer/instagram.svg",
    offset: "translate-y-8",
    offset2: "-translate-x-0",
    offset3: "-translate-y-3",
    offset4: "-translate-x-0",
  },
  {
    label: "Discord",
    href: "https://www.discord.gg/33JTAhGHuu",
    card: "/footer/discord.svg",
    offset: "translate-y-0",
    offset2: "-translate-x-5",
    offset3: "-translate-y-4",
    offset4: "-translate-x-1",
  },
  {
    label: "Devpost",
    href: "https://cutie-hack-2026.devpost.com",
    card: "/footer/devpost.svg",
    offset: "translate-y-4",
    offset2: "-translate-x-8",
    offset3: "-translate-y-6",
    offset4: "-translate-x-2",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/cutie-hack",
    card: "/footer/linkedin.svg",
    offset: "translate-y-16",
    offset2: "-translate-x-10",
    offset3: "-translate-y-5",
    offset4: "-translate-x-2",
  },
  {
    label: "GitHub",
    href: "https://github.com/cutiehack-ucr",
    card: "/footer/github.svg",
    offset: "translate-y-23",
    offset2: "-translate-x-14",
    offset3: "-translate-y-4",
    offset4: "-translate-x-3",
  },
  {
    label: "Email",
    href: "mailto:cutiehack@gmail.com",
    card: "/footer/email.svg",
    offset: "translate-y-35",
    offset2: "-translate-x-20",
    offset3: "-translate-y-2",
    offset4: "-translate-x-4",
  },
];

const SocialCards = ({ mobile = false }: { mobile?: boolean }) => (
  <div
    className={`relative z-20 flex items-end ${mobile ? "w-full translate-x-3 justify-center gap-0 pb-[4vw]" : "ml-1 pb-38"}`}
  >
    {socialCards.map(
      ({ label, href, card, offset, offset2, offset3, offset4 }) => {
        const isMail = href.startsWith("mailto:");
        return (
          <div
            key={label}
            className={`relative shrink-0 hover:z-40 ${mobile ? `${offset3} ${offset4}` : `${offset} ${offset2}`}`}
          >
            <a
              href={href}
              target={isMail ? undefined : "_blank"}
              rel={isMail ? undefined : "noopener noreferrer"}
              aria-label={label}
              className={`block transition-transform duration-300 ease-out ${mobile ? "" : "hover:-translate-y-8"}`}
            >
              <Image
                src={card}
                alt=""
                width={126}
                height={168}
                className={`w-auto ${mobile ? "h-[21.5vw]" : "z-31 h-44"}`}
              />
            </a>
          </div>
        );
      },
    )}
  </div>
);

const Footer = () => {
  return (
    <footer
      id="footer"
      className="relative z-10 overflow-x-clip max-lg:z-0"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[-100%] bottom-0 -z-10 max-lg:bg-[linear-gradient(to_bottom,var(--color-green-100),var(--color-blue-500)_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[-100%] bottom-0 -z-10 opacity-20 max-lg:bg-[radial-gradient(circle_at_0%_0%,var(--color-green-100)_0%,var(--color-green-100)_50%,var(--color-green-900)_100%)] lg:hidden"
      />
      <div className="relative z-10 flex flex-col items-center lg:flex-row lg:items-start lg:justify-end lg:gap-[5vw]">
        {/*opportunities */}
        <div className="mt-30 flex w-full flex-col items-center gap-5 lg:mt-[10vw] lg:w-auto">
          <h2 className="font-fraunces text-white-100 w-full text-center text-4xl lg:text-[2.5vw]">
            More Opportunities
          </h2>

          <div className="font-fraunces flex flex-col gap-4 text-xl lg:gap-[1vw] lg:text-[1.5vw]">
            {opportunities.map(({ title, href }) => (
              <a
                key={title}
                href={href}
                target="_blank"
                className="border-white-100 text-white-100 hover:from-white-100 rounded-2xl border-2 bg-blue-950/50 px-15 py-2 text-center shadow-xl transition-colors duration-300 ease-out hover:bg-linear-to-b hover:to-blue-100 hover:text-blue-900 min-[400px]:px-20 lg:rounded-[1vw] lg:px-[6vw] lg:py-[0.6vw]"
              >
                {title}
              </a>
            ))}
          </div>
        </div>
        {/*castle */}
        <div className="relative z-20 mt-10 w-[80vw] shrink-0 self-end lg:mt-[5vw] lg:mb-[0vw] lg:w-[45vw]">
          <Image
            src="/footer/footer castle.svg"
            alt="castle"
            width={619.51}
            height={670.15}
            className="pointer-events-none h-auto w-full"
          />
        </div>
      </div>
      {/* mobile ground */}
      <div className="relative z-5 -mt-[3vw] lg:hidden">
        <Image
          src="/footer/mobileGrassland.svg"
          alt=""
          width={320}
          height={179}
          className="pointer-events-none h-auto w-full select-none"
        />
        <div className="absolute bottom-0 left-0 w-full">
          <SocialCards mobile />
        </div>
        <Image
          src="/footer/mobileBushes.svg"
          alt=""
          width={320}
          height={48}
          className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-auto w-full select-none"
        />
        <p className="font-labrada text-sm absolute inset-x-0 bottom-2 z-40 text-center text-white-100">
          {`© ${new Date().getFullYear()} Cutie Hack • Made with 💗 and 🫖 by ACM Hacks`}
        </p>
      </div>
      {/* desktop ground */}
      <div className="relative -mt-6 hidden lg:-mt-[4vw] lg:block xl:-mt-15">
        <Image
          src="/footer/footer grassland.svg"
          alt=""
          width={1440}
          height={171}
          className="pointer-events-none h-auto w-full select-none"
        />
        <div className="absolute bottom-0 left-0 w-[min(100%,704px)]">
          <SocialCards />
          <Image
            src="/footer/cloud v1.svg"
            alt=""
            width={704}
            height={216}
            className="pointer-events-none absolute bottom-0 left-0 z-30 h-auto w-full select-none"
          />
        </div>
        <p className="font-labrada text-md text-blue-900 absolute inset-x-0 bottom-2 z-40 text-center lg:inset-x-auto lg:right-4 2xl:text-xl">
          {`© ${new Date().getFullYear()} Cutie Hack • Made with 💗 and 🫖 by ACM Hacks`}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
