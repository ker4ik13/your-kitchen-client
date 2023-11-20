import Logo from "@/shared/Logo/Logo";
import styles from "./AdminSidebar.module.scss";
import type { FC } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Icon from "@/shared/IconsComponents/Icon";
import { Icons } from "@/shared/IconsComponents/Icons";
import { useAppDispatch } from "@/store/hooks";
import { logout } from "@/store/user.slice";
import type { IUserStore } from "@/store/store.d";

interface AdminSidebarProps {
  store: IUserStore;
}

const AdminSidebar: FC<AdminSidebarProps> = ({ store }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  return (
    <div className={styles.adminSidebar}>
      <div className={styles.upper}>
        <Logo />
        <h2 className={styles.name}>{store.user ? store.user.email : ""}</h2>
        <div className={styles.links}>
          <Link href={"/admin/claims"} className={styles.link}>
            <Icon icon={Icons.docs(styles.icon)} />
            <p>Заявки</p>
          </Link>
          <Link href={"/admin/kitchens"} className={styles.link}>
            <Icon icon={Icons.kitchen(styles.icon)} />
            <p>Кухни</p>
          </Link>
          <Link href={"/admin/reviews"} className={styles.link}>
            <Icon icon={Icons.reviews(styles.icon)} />
            <p>Отзывы</p>
          </Link>
          <Link href={"/admin/team"} className={styles.link}>
            <Icon icon={Icons.team(styles.icon)} />
            <p>Команда</p>
          </Link>
        </div>
      </div>
      <button
        type='button'
        className={styles.logout}
        onClick={() => {
          dispatch(logout());
          router.push("/admin/login");
        }}
      >
        Выйти
      </button>
    </div>
  );
};

export default AdminSidebar;
