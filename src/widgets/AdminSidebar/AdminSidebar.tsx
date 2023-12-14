import Logo from "@/shared/Logo/Logo";
import styles from "./AdminSidebar.module.scss";
import { type FC } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Icon from "@/shared/IconsComponents/Icon";
import { Icons } from "@/shared/IconsComponents/Icons";
import { useAppDispatch } from "@/store/hooks";
import { logout } from "@/store/user.slice";
import type { IUserStore } from "@/store/store.d";
import { UserRoles } from "@/types/UserRoles";
import { isUserHaveRights } from "@/features/isUserHaveRights";
import { IoMdPhotos } from "react-icons/io";
import { MdArticle, MdOutlineRateReview } from "react-icons/md";

interface AdminSidebarProps {
  store: IUserStore;
}

const AdminSidebar: FC<AdminSidebarProps> = ({ store }) => {
  const path = usePathname()?.split("/")[2];

  const isActive = (link: string) =>
    path === link ? `${styles.link} ${styles.active}` : styles.link;

  const router = useRouter();
  const dispatch = useAppDispatch();

  return (
    <div className={styles.adminSidebar}>
      <div className={styles.upper}>
        <Logo />
        <h2 className={styles.name}>{store.user ? store.user.email : ""}</h2>
        <div className={styles.links}>
          {isUserHaveRights(store.user, UserRoles.Admin) && (
            <Link href={"/admin/claims"} className={isActive("claims")}>
              <Icon icon={Icons.docs(styles.icon)} />
              <p>Заявки</p>
            </Link>
          )}
          <Link href={"/admin/kitchens"} className={isActive("kitchens")}>
            <Icon icon={Icons.kitchen(styles.icon)} />
            <p>Кухни</p>
          </Link>
          <Link href={"/admin/reviews"} className={isActive("reviews")}>
            <MdOutlineRateReview />
            <p>Отзывы</p>
          </Link>
          <Link href={"/admin/team"} className={isActive("team")}>
            <Icon icon={Icons.team(styles.icon)} />
            <p>Команда</p>
          </Link>
          {isUserHaveRights(store.user, UserRoles.Admin) && (
            <Link href={"/admin/admins"} className={isActive("admins")}>
              <Icon icon={Icons.team(styles.icon)} />
              <p>Администраторы</p>
            </Link>
          )}
          <Link href={"/admin/articles"} className={isActive("articles")}>
            <MdArticle />
            <p>Статьи</p>
          </Link>
          <Link href={"/admin/gallery"} className={isActive("gallery")}>
            <IoMdPhotos />
            <p>Галерея</p>
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
