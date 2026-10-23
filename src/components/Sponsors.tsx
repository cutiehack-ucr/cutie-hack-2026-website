import Image from "next/image";
import { SPONSORS } from "../data/sponsors";

const titleShadow = "[text-shadow:0_6px_4px_rgba(0,0,0,0.25)]";
const diamondShadow = "drop-shadow-[0_6px_4px_rgba(0,0,0,0.25)]";

const SectionTitle = ({ children }: { children: string }) => (
  <h2 className="flex items-center justify-center gap-3 leading-none sm:gap-10">
    <Image
      src="/diamond.svg"
      alt=""
      width={43}
      height={48}
      className={`block h-8 w-auto sm:h-9 ${diamondShadow}`}
      aria-hidden
    />
    <span
      className={`from-white-100 font-fraunces inline-block bg-linear-to-b to-orange-500 bg-clip-text pb-1 text-center text-[28px] font-semibold tracking-normal text-transparent sm:text-[32px] ${titleShadow}`}
    >
      {children}
    </span>
    <Image
      src="/diamond.svg"
      alt=""
      width={43}
      height={48}
      className={`block h-8 w-auto sm:h-9 ${diamondShadow}`}
      aria-hidden
    />
  </h2>
);

const Sponsors = () => {
  return (
    <section id="sponsors" className="mt-6 w-full scroll-mt-15 text-black">
      <SectionTitle>Sponsors</SectionTitle>
      <div className="mx-auto mt-10 mt-20 mb-20 grid w-fit grid-cols-[repeat(4,12vw)] gap-x-6 lg:gap-x-10 max-lg:grid-cols-[repeat(2,34vw)]">
        {SPONSORS.map((sponsor) => (
          <a
            key={sponsor.id}
            href={sponsor.link}
            target="_blank"
            rel="noopener noreferrer"
            className="relative h-[14vw] w-full max-lg:h-[34vw]"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative aspect-[183/138] w-[12vw] transition-transform duration-300 ease-out hover:-rotate-[10deg] max-lg:w-[34vw]">
                <Image
                  src={`sponsor/${sponsor.tier}Cup.svg`}
                  alt={sponsor.tier}
                  width={183}
                  height={138}
                  className="absolute inset-0 h-full w-full"
                />
                {sponsor.image !== "" && (
                  <Image
                    src={sponsor.image}
                    alt={sponsor.name}
                    className={`absolute h-[73.67%] object-contain ${sponsor.offset}`}
                    width={100}
                    height={100}
                  />
                )}
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Sponsors;
