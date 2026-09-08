import Image from "next/image";

const opportunities = [
  {
    title: "Citrus Hack",
    href: "https://www.citrushack.com/",
  },
  {
    title: "ACM at UCR",
    href: "https://acmucr.org/",
  },
  {
    title: "Feedback Survey",
    href: "idk",
  },
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
    className={`relative z-20 flex items-end ${mobile ? "w-full translate-x-3 justify-center gap-0 pb-3 min-[400px]:gap-2" : "ml-1 pb-38"}`}
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
                className={`w-auto ${mobile ? "h-20" : "z-31 h-44"}`}
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
    <footer id="footer" className="relative overflow-hidden">
      <div className="flex flex-col items-center lg:flex-row lg:items-start lg:justify-end lg:gap-[clamp(50px,calc(50vw-462px),200px)]">
        {/*opportunities */}
        <div className="mt-30 flex w-full flex-col items-center gap-5 lg:w-auto">
          <h2 className="font-fraunces text-white-100 w-full text-center text-4xl">
            More Opportunities
          </h2>

          <div className="font-fraunces flex flex-col gap-4 text-xl">
            {opportunities.map(({ title, href }) => (
              <a
                key={title}
                href={href}
                target="_blank"
                className="border-white-100 text-white-100 hover:from-white-100 rounded-2xl border-2 bg-linear-to-b from-blue-900 to-blue-900 px-15 py-2 text-center shadow-xl transition-colors duration-300 ease-out hover:bg-linear-to-b hover:to-blue-100 hover:text-blue-900 min-[400px]:px-20"
              >
                {title}
              </a>
            ))}
          </div>
        </div>
        {/*castle */}
        <div className="relative z-20 mt-10 w-[min(92vw,320px)] shrink-0 self-end lg:mt-5 lg:w-[619.51px]">
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
      <div className="relative z-10 -mt-[5vw] lg:hidden">
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
        <p className="font-fraunces text-md absolute inset-x-0 bottom-2 z-40 text-center text-blue-900">
          {`© ${new Date().getFullYear()} Cutie Hack • Made with 💗 and  by ACM Hacks`}
        </p>
      </div>
      {/* desktop ground */}
      <div className="relative -mt-6 hidden lg:-mt-15 lg:block">
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
        <p className="font-fraunces text-md text-white-100 absolute inset-x-0 bottom-2 z-40 text-center lg:inset-x-auto lg:right-4 lg:text-blue-900 2xl:text-xl">
          {`© ${new Date().getFullYear()} Cutie Hack • Made with 💗 and  by ACM Hacks`}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
