"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./Hero.module.css";

export default function Hero() {
  const [clickCount, setClickCount] = useState(0);
  const [showClickCount, setShowClickCount] = useState(false);
  const [orangeClicked, setOrangeClicked] = useState(false);

  useEffect(() => {
    const savedCount = localStorage.getItem("cutieHackOrangeClicks");

    if (savedCount !== null) {
      setClickCount(Number(savedCount));
    }
  }, []);

  const handleOrangeClick = () => {
    setClickCount((previousCount) => {
      const newCount = previousCount + 1;

      localStorage.setItem(
        "cutieHackOrangeClicks",
        String(newCount)
      );

      return newCount;
    });

    // enlarge orange briefly
    setOrangeClicked(true);
    setTimeout(() => {
      setOrangeClicked(false);
    }, 200);

    // show count for 3 seconds
    setShowClickCount(true);
    setTimeout(() => {
      setShowClickCount(false);
    }, 3000);
  };

  const handleRegisterClick = (
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    event.preventDefault();

    const registerSection = document.getElementById("register");

    if (!registerSection) return;

    const top =
      registerSection.getBoundingClientRect().top +
      window.scrollY -
      120;

    window.scrollTo({
      top,
      behavior: "smooth",
    });
  };

  return (
    <section className={styles.hero}>
      {/* dark lower background shape */}
      <Image
        src="/hero/shading.svg"
        alt=""
        width={399}
        height={259}
        className={styles.shading}
      />

      {/* dark blue background cloud */}
      <Image
        src="/hero/cloud-main.svg"
        alt=""
        width={969}
        height={353}
        className={styles.cloudMain}
      />

      {/* blue cloud behind left oranges */}
      <Image
        src="/hero/cloud-left-small.svg"
        alt=""
        width={330}
        height={221}
        className={styles.cloudLeftSmall}
      />

      {/* blue cloud directly behind watch/rabbit */}
      <Image
        src="/hero/cloud-center.svg"
        alt=""
        width={539}
        height={221}
        className={styles.cloudCenter}
      />

      {/* left foreground cloud */}
      <Image
        src="/hero/cloud-left-wide.svg"
        alt=""
        width={616}
        height={348}
        className={styles.cloudLeftWide}
      />

      {/* right foreground cloud */}
      <Image
        src="/hero/cloud-right.svg"
        alt=""
        width={824}
        height={526}
        className={styles.cloudRight}
      />

      {/* right background cloud */}
      <Image
        src="/hero/cloud-right-small.svg"
        alt=""
        width={330}
        height={221}
        className={styles.cloudRightSmall}
      />

      {/* chain */}
      <Image
        src="/hero/chains.svg"
        alt=""
        width={552}
        height={229}
        priority
        className={styles.chains}
      />

      {/* left oranges */}
      <Image
        src="/hero/orange-left.svg"
        alt=""
        width={154}
        height={188}
        className={styles.orangeLeft}
      />

      <Image
        src="/hero/orange-middle.svg"
        alt=""
        width={123}
        height={160}
        className={styles.orangeMiddle}
      />

      {/* right orange */}
      <Image
        src="/hero/orange-right.svg"
        alt=""
        width={109}
        height={150}
        className={styles.orangeRight}
      />

      <Image
        src="/hero/chains2.svg"
        alt=""
        width={435}
        height={451}
        className={styles.mobileChains}
      />
      {/* mobile-only cloud assets */}
      <Image
        src="/hero/cloud-blue-left-top.svg"
        alt=""
        width={98}
        height={89}
        className={styles.mobileCloudLeftTop}
      />

      <Image
        src="/hero/cloud-blue-right.svg"
        alt=""
        width={109}
        height={108}
        className={styles.mobileCloudRight}
      />

      <Image
        src="/hero/cloud-blue-left-bottom.svg"
        alt=""
        width={190}
        height={121}
        className={styles.mobileCloudLeftBottom}
      />

      <Image
        src="/hero/cloud-mobile-bg.svg"
        alt=""
        width={320}
        height={258}
        className={styles.mobileCloudBg}
      /> 

      {/* rabbit + watch */}
      <div className={styles.rabbitWrap}>
        <Image
          src="/hero/rabbit-watch.svg"
          alt=""
          fill
          priority
          sizes="49vw"
          className={styles.rabbit}
        />
      </div>

      <div className={`${styles.copy} ${styles.desktopCopy}`}>
        <p className={styles.eyebrow}>
          Dream to Wonderland
        </p>

        <h1 className={styles.title}>
          Cutie Hack 2026
        </h1>

        <p className={styles.date}>
          November 21, 2026 ✦ UC Riverside - Winston Chung
        </p>

        <p className={styles.description}>
          A 12 hour journey where imagination meets innovation.
        </p>

        <div className={styles.actions}>
          <a
            href="#register"
            className={styles.primaryButton}
            onClick={handleRegisterClick}
          >
            Register Now
          </a>

          <a href="#" className={styles.secondaryButton}>
            Live Site
          </a>

          <a href="#" className={styles.secondaryButton}>
            Devpost
          </a>
        </div>
      </div>

      {/* mobile-only lower copy */}
      <div className={styles.mobileCopy}>
        <p className={styles.mobileDate}>
          November 21, 2026
          <br />
          UC Riverside - Winston Chung
        </p>

        <p className={styles.mobileDescription}>
          A 12 hour journey where imagination meets innovation.
        </p>

        <div className={styles.mobileActions}>
          <a
            href="#register"
            className={styles.mobilePrimaryButton}
            onClick={handleRegisterClick}
          >
            <span>Register Now</span>
          </a>

          <a href="#" className={styles.mobileSecondaryButton}>
            <span>Live Site</span>
          </a>

          <a href="#" className={styles.mobileSecondaryButton}>
            <span>Devpost</span>
          </a>
        </div>
      </div>

      {/* clickable orange */}
      <button
        type="button"
        className={`${styles.clickOrange} ${orangeClicked ? styles.clickOrangeActive : ""
          }`}
        aria-label="Clickable orange"
        onClick={handleOrangeClick}
      >
        <Image
          src="/hero/clickable-orange.svg"
          alt=""
          fill
          sizes="19vw"
        />
      </button>

      {/* curved click count */}
      <svg
        className={`${styles.clickCount} ${showClickCount ? styles.clickCountVisible : ""
          }`}
        viewBox="0 0 160 45"
        aria-label={`${clickCount} clicks`}
      >
        <defs>
          <path
            id="clickCountCurve"
            d="M 8 10 Q 80 50 152 10"
          />
        </defs>

        <text className={styles.clickCountText}>
          <textPath
            href="#clickCountCurve"
            startOffset="50%"
            textAnchor="middle"
          >
            {clickCount} clicks
          </textPath>
        </text>
      </svg>
    </section>
  );
}
