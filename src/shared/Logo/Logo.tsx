import logoWithText from "@/data/images/logoWithText.webp";
import styles from "./Logo.module.scss";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href={"/"} className={styles.logo}>
      <Image
        src={logoWithText}
        alt='Твоя кухня'
        draggable={false}
        priority
        className={styles.logoImg}
      />
    </Link>
  );
};

export default Logo;
