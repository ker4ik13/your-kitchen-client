import logoImg from "@/data/images/logo.svg";
import styles from "./Logo.module.scss";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href={"/"} className={styles.logo}>
      <Image
        src={logoImg}
        alt='Твоя кухня'
        draggable={false}
        priority
        className={styles.logoImg}
      />
      <div className={styles.wrapper}>
        <p className={styles.text}>Твоя кухня</p>
        <p className={styles.text2}>Мебельная фабрика</p>
      </div>
    </Link>
  );
};

export default Logo;
