import logoWithText from "@/data/images/logoWithText.webp";
import styles from "./Logo.module.scss";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link
      href={"/"}
      className={styles.logo}
      itemScope
      itemType='https://schema.org/Organization'
    >
      <Image
        src={logoWithText}
        alt='Твоя кухня'
        draggable={false}
        priority
        className={styles.logoImg}
        itemProp='logo'
      />
    </Link>
  );
};

export default Logo;
