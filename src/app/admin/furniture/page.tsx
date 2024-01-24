'use client';

import { isUserHaveRights } from '@/features/isUserHaveRights';
import Icon from '@/shared/IconsComponents/Icon';
import { Icons } from '@/shared/IconsComponents/Icons';
import MiniLoading from '@/shared/MiniLoading';
import { pagesLinks } from '@/shared/constants';
import { getAllFurniture } from '@/store/furniture.slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { deleteKitchen } from '@/store/kitchens.slice';
import { checkAuth } from '@/store/user.slice';
import { UserRoles } from '@/types/UserRoles';
import AdminSidebar from '@/widgets/AdminSidebar/AdminSidebar';
import FurnitureItem from '@/widgets/FurnitureItem/FurnitureItem';
import Link from 'next/link';
import { useEffect } from 'react';
import styles from '../Page.module.scss';

// Тексты
const texts = {
	buttonText: '+ Добавить мебель',
	titleText: 'Мебель',
	onMainPageText: 'На главной',
};

const FurniturePage = () => {
	const userStore = useAppSelector((store) => store.user);
	const dispatch = useAppDispatch();
	// const kitchenStore = useAppSelector((store) => store.kitchens);
	const furnitureStore = useAppSelector((store) => store.furniture);

	useEffect(() => {
		if (localStorage.getItem('token')) {
			dispatch(checkAuth());
			dispatch(getAllFurniture());
		}
	}, []);

	const removeKitchen = async (id: string) => {
		if (
			localStorage.getItem('token') &&
			isUserHaveRights(userStore.user, UserRoles.Admin)
		) {
			dispatch(deleteKitchen(id));
		}
	};

	if (furnitureStore.isLoading) {
		return (
			<div className={styles.page}>
				<div className={styles.container}>
					<MiniLoading className={styles.preloader} />
				</div>
			</div>
		);
	}

	if (!userStore.isLoading && !userStore.isAuth) {
		return (
			<div className={styles.page}>
				<div className={styles.container}>
					<p className={styles.authText}>{`Ошибка, авторизируйтесь`}</p>
				</div>
			</div>
		);
	}

	return (
		<div className={styles.page}>
			{userStore.isAuth && <AdminSidebar store={userStore} />}
			<div className={styles.container}>
				<div className={styles.string}>
					<h2 className={styles.title}>
						{texts.titleText} ({furnitureStore.allFurniture.length})
					</h2>
					{isUserHaveRights(userStore.user, UserRoles.Admin) && (
						<Link
							href={pagesLinks.adminFurnitureNew}
							className={styles.addButton}
						>
							{texts.buttonText}
						</Link>
					)}
				</div>
				<div className={styles.kitchens}>
					{furnitureStore.allFurniture &&
						furnitureStore.allFurniture
							.slice(0)
							.reverse()
							.map((furniture, index) => (
								<div className={styles.kitchenLink} key={index}>
									{isUserHaveRights(userStore.user, UserRoles.Admin) && (
										<button
											type='button'
											className={styles.removeButton}
											onClick={() => removeKitchen(furniture._id)}
										>
											<Icon icon={Icons.remove(styles.removeIcon)} />
										</button>
									)}
									{furniture.onMainPage && (
										<p className={styles.kitchenOption}>
											{texts.onMainPageText}
										</p>
									)}

									<Link href={`/admin/furniture/${furniture._id}`}>
										<FurnitureItem furniture={furniture} />
									</Link>
								</div>
							))}
				</div>
			</div>
		</div>
	);
};

export default FurniturePage;
