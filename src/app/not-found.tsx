import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="text-white-100 flex flex-1 flex-col px-8 pt-28 pb-6 sm:px-14 lg:px-36 xl:px-48">
      <div className="mx-auto flex w-full flex-1 flex-col items-center justify-center gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <h1 className="order-1 font-griffy text-7xl leading-none sm:text-8xl lg:text-9xl">
            404
          </h1>
          <h2 className="order-2 font-fraunces whitespace-nowrap text-3xl sm:text-4xl lg:text-5xl">
            Page Not Found
          </h2>
          <p className="font-labrada order-4 mt-8 text-xl sm:text-2xl lg:order-3 lg:text-3xl">
            The page you are looking for
            <br />
            does not seem to exist.
          </p>

          <Image
            src="/gaurd404.svg"
            alt="Card guard"
            width={794}
            height={582}
            priority
            className="order-3 mt-6 h-auto w-full max-w-[30rem] sm:max-w-[36rem] lg:hidden"
          />

          <Link
            href="/"
            className="font-fraunces border-white-100 text-white-100 hover:from-white-100 order-5 mt-8 rounded-2xl border-2 bg-blue-900 px-8 py-2.5 text-lg shadow-[0_2.13px_4.26px_0_rgba(0,0,0,0.25)] transition-colors duration-300 ease-out hover:bg-linear-to-b hover:to-blue-100 hover:text-blue-900 sm:text-xl"
          >
            Back to Landing
          </Link>
        </div>

        <Image
          src="/gaurd404.svg"
          alt="Card guard"
          width={794}
          height={582}
          priority
          className="hidden h-auto w-full max-w-[42rem] shrink-0 lg:block xl:max-w-[48rem]"
        />
      </div>

      <p className="font-labrada text-white-100 mt-10 text-center text-sm sm:text-base">
        {`© 2026 Cutie Hack • Made with 💗 and 🫖 by ACM Hacks`}
      </p>
    </main>
  );
}
