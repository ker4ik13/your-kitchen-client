import logoWithoutText from "@/data/images/logo.png";
import styles from "./LogoWithoutText.module.scss";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href={"/"} className={styles.logo}>
      <Image
        src={logoWithoutText}
        alt='Твоя кухня'
        draggable={false}
        priority
        className={styles.logoImg}
      />
    </Link>
  );
};

export default Logo;
