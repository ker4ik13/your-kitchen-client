import logoWithText from "@/data/images/logoWithText.webp";
import Image from "next/image";
import Link from "next/link";
import { pagesLinks } from "../constants";
import styles from "./Logo.module.scss";

const Logo = () => {
  return (
    <Link href={pagesLinks.main} className={styles.logo}>
      <Image
        src={logoWithText}
        alt="Твоя кухня"
        draggable={false}
        priority
        className={styles.logoImg}
        itemProp="logo"
      />
    </Link>
  );
};

export default Logo;
