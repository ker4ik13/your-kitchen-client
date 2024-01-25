'use client';

import styles from '../../Page.module.scss';

import { isUserHaveRights } from '@/features/isUserHaveRights';
import FurnitureService from '@/services/FurnitureService';
import MiniLoading from '@/shared/MiniLoading';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { checkAuth } from '@/store/user.slice';
import { IError } from '@/types/IError';
import { UserRoles } from '@/types/UserRoles';
import AdminSidebar from '@/widgets/AdminSidebar/AdminSidebar';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

// Поля формы
interface TInputs {
	name: string;
	slug: string;
	description: string;
	price: number;
	photos: ImageData[];
	onMainPage: boolean;
}

// Тексты
const texts = {
	notFoundText: 'Мебель не найдена',
	buttonText: 'Добавить',
	titleText: 'Добавить мебель',
	addOrChangeErrorText: 'Ошибка добавления мебели. Попробуйте еще раз',
	errorText: 'Что-то пошло не так. Попробуйте еще раз',
	successText: 'Мебель успешно добавлена',
};

const NewFurniturePage = () => {
	const { register, handleSubmit, reset } = useForm<TInputs>();
	const userStore = useAppSelector((store) => store.user);
	const dispatch = useAppDispatch();

	const [photos, setPhotos] = useState<any[]>([]);
	const [files, setFiles] = useState<File[]>([]);
	const [drag, setDrag] = useState(false);

	// Ошибка
	const [error, setError] = useState<IError>({ isError: false, value: '' });

	useEffect(() => {
		if (localStorage.getItem('token')) {
			dispatch(checkAuth());
		}
	}, []);

	useEffect(() => {
		if (!isUserHaveRights(userStore.user, UserRoles.Admin)) {
			setError({
				isError: true,
				value: 'У вас нет прав на просмотр этой страницы',
			});
		} else {
			setError({
				isError: false,
				value: '',
			});
		}
	}, [userStore.user]);

	if (userStore.isLoading) {
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

	// Обработчик фото
	const getPhotosFromFiles = (event: any, files: any[]) => {
		const photos: any[] = [];

		files.map((file) => {
			let photo = {
				title: file.name,
				src: URL.createObjectURL(file),
			};

			photos.push(photo);
		});

		setPhotos(photos);
	};

	// Обработчики
	const dragStartHandler = (event: any) => {
		event.preventDefault();
		setDrag(true);
	};
	const dragLeaveHandler = (event: any) => {
		event.preventDefault();
		setDrag(false);
	};
	const dropHandler = (event: any) => {
		event.preventDefault();
		setDrag(false);
		let files = [...event.dataTransfer.files];
		setFiles(files);

		if (files && files.length > 0) {
			getPhotosFromFiles(event, files);
		}
	};
	const changeHandler = (event: any) => {
		event.preventDefault();
		let files = [...event.target.files];
		setFiles(files);
		console.log(files);

		if (files && files.length > 0) {
			getPhotosFromFiles(event, files);
		}
	};

	// Удаление фоток
	const deleteImage = (photoTitle: number) => {
		const images = [...photos];

		const result = images.filter((image) => photoTitle !== image.title);

		setPhotos(result);
	};

	const onSubmit: SubmitHandler<TInputs> = async (data) => {
		const form = new FormData();

		form.append('name', data.name);
		form.append('description', data.description);
		form.append('slug', data.slug);
		form.append('price', data.price.toString());

		// Добавление всех фото
		files.forEach((file) => {
			form.append(`files`, file);
		});
		form.append('onMainPage', JSON.stringify(data.onMainPage));

		const response = await FurnitureService.addFurniture(form);
		if (response.status === 201) {
			setError({
				isError: false,
				value: texts.successText,
			});
			reset({
				description: '',
				photos: [],
				price: 0,
				name: '',
				slug: '',
				onMainPage: false,
			});
			setFiles([]);
			setPhotos([]);
		} else {
			setError({
				isError: true,
				value: texts.addOrChangeErrorText,
			});
		}
	};

	const isSuccess = (error: IError) => {
		return error.isError === true ? styles.error : styles.success;
	};

	return (
		<div className={styles.page}>
			{userStore.isAuth && <AdminSidebar store={userStore} />}
			<div className={styles.container}>
				{isUserHaveRights(userStore.user, UserRoles.Admin) && (
					<div className={styles.string}>
						<h2 className={styles.title}>{texts.titleText}</h2>
						<button
							type='submit'
							form='furnitureForm'
							className={styles.addButton}
						>
							{texts.buttonText}
						</button>
					</div>
				)}
				<div className={styles.string}>
					<p className={isSuccess(error)}>{error.value}</p>
				</div>
				{isUserHaveRights(userStore.user, UserRoles.Admin) && (
					<>
						{/* Форма */}
						<form
							className={styles.addForm}
							id='furnitureForm'
							onSubmit={handleSubmit(onSubmit)}
						>
							{/* Заголовок */}
							<div className={styles.inputWrapper}>
								<label htmlFor='name' className={styles.label}>
									Название
								</label>
								<input
									type='text'
									id='name'
									placeholder='Название мебели'
									{...register('name', {
										required: true,
									})}
									className={`${styles.textInput} ${styles.fullInput}`}
								/>
							</div>
							<div className={styles.string}>
								{/* Цена */}
								<div className={styles.inputWrapper}>
									<label htmlFor='price' className={styles.label}>
										Цена
									</label>
									<input
										type='number'
										id='price'
										placeholder='249999'
										{...register('price', {
											required: true,
										})}
										className={styles.textInput}
									/>
								</div>

								{/* На главной */}
								<div className={styles.inputWrapper}>
									<label htmlFor='onMainPage' className={styles.label}>
										На главной странице
									</label>
									<input
										type='checkbox'
										{...register('onMainPage')}
										id='onMainPage'
										className={styles.checkboxInput}
									/>
								</div>
							</div>

							{/* Ссылка */}
							<div className={styles.inputWrapper}>
								<label htmlFor='slug' className={styles.label}>
									Ссылка
								</label>
								<input
									type='text'
									id='slug'
									placeholder='Ссылка на мебель (shkaf)'
									{...register('slug', {
										required: true,
									})}
									className={`${styles.textInput} ${styles.fullInput}`}
								/>
							</div>

							{/* Описание */}
							<div className={styles.inputWrapper}>
								<label htmlFor='description' className={styles.label}>
									Описание
								</label>
								<textarea
									id='description'
									placeholder='Описание'
									{...register('description', {
										required: true,
									})}
									className={styles.textArea}
								/>
							</div>

							{/* Фото */}
							<div className={styles.inputWrapper}>
								<label className={styles.label}>Фото</label>
								<input
									id='photos'
									type='file'
									{...register('photos', {
										required: true,
										value: photos,
									})}
									accept='image/png, image/jpeg, image/jpg, image/webp'
									multiple
									className={styles.inputPhotos}
									required
									onChange={(event) => changeHandler(event)}
									onDragStart={(event) => dragStartHandler(event)}
									onDragLeave={(event) => dragLeaveHandler(event)}
									onDragOver={(event) => dragStartHandler(event)}
									onDrop={(event) => dropHandler(event)}
								/>
								<label htmlFor='photos' className={styles.labelPhotos}>
									{!drag
										? 'Нажмите или перетащите изображения'
										: 'Отпустите изображения'}
								</label>
							</div>

							{/* Предпросмотр фото */}
							{photos.length > 0 && (
								<div className={styles.photosPreview}>
									{photos.map((photo, index) => (
										<div className={styles.photo} key={index}>
											<img
												src={photo.src}
												alt={`Фото ${index + 1}`}
												className={styles.previewPhoto}
											/>
											<button
												type='button'
												className={styles.deleteButton}
												onClick={() => deleteImage(photo.title)}
											>
												×
											</button>
											<p className={styles.photoTitle}>{photo.title}</p>
										</div>
									))}
								</div>
							)}
						</form>
					</>
				)}
			</div>
		</div>
	);
};

export default NewFurniturePage;
