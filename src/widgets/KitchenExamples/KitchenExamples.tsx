'use client';

import { UserKitchenService } from '@/services/UserKitchenService';
import { Icons } from '@/shared/IconsComponents/Icons';
import MiniLoading from '@/shared/MiniLoading';
import { OrangeButton } from '@/shared/ui';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setKitchens } from '@/store/kitchens.slice';
import { IKitchen } from '@/types/IKitchen';
import {
	IBudgetOption,
	IDaysOption,
	KitchensOptions,
	KitchensStyles,
	kitchensBudget,
	kitchensDays,
	kitchensStylesTranslate,
	kitchensTranslate,
} from '@/types/KitchenOptions';
import Kitchen from '@/widgets/Kitchen/Kitchen';
import { Listbox } from '@headlessui/react';
import { useEffect, useState } from 'react';
import styles from './KitchenExamples.module.scss';

interface ISelectOptions {
	value: string;
	label: string;
}

const noKitchensText = 'Кухни по таким параметрам не найдены.';

const kitchensStyles: ISelectOptions[] = [
	{ value: 'Все', label: 'Все' },
	{ value: KitchensOptions.chalet, label: kitchensTranslate.chalet },
	{ value: KitchensOptions.classic, label: kitchensTranslate.classic },
	{ value: KitchensOptions.hightech, label: kitchensTranslate.hightech },
	{ value: KitchensOptions.loft, label: kitchensTranslate.loft },
	{ value: KitchensOptions.minimalism, label: kitchensTranslate.minimalism },
	{ value: 'Модерн', label: 'Модерн' },
	{ value: 'Современный', label: 'Современный' },
	{ value: 'Прованс', label: 'Прованс' },
	{ value: 'Скандинавский', label: 'Скандинавский' },
];
const kitchensTypes: ISelectOptions[] = [
	{ value: 'Все', label: 'Все' },
	{ value: KitchensStyles.straight, label: kitchensStylesTranslate.straight },
	{ value: KitchensStyles.corner, label: kitchensStylesTranslate.corner },
	{ value: KitchensStyles.UShaped, label: kitchensStylesTranslate.UShaped },
	{ value: KitchensStyles.fullWidth, label: kitchensStylesTranslate.fullWidth },
];

const KitchenExamples = () => {
	const kitchenState = useAppSelector((store) => store.kitchens);
	const dispatch = useAppDispatch();

	const [sliceNumber, setSliceNumber] = useState(8);

	const [scopeKitchens, setSkopeKitchens] = useState<IKitchen[]>([]);
	const [styleValue, setStyleValue] = useState<ISelectOptions>(
		kitchensStyles[0],
	);
	const [typeValue, setTypeValue] = useState<ISelectOptions>(kitchensTypes[0]);
	const [budgetValue, setBudgetValue] = useState<IBudgetOption>(
		kitchensBudget[0],
	);
	const [termValue, setTermValue] = useState<IDaysOption>(kitchensDays[0]);

	const getKitchens = async () => {
		try {
			const response = await UserKitchenService.getKitchens();
			setSkopeKitchens(response);
			dispatch(setKitchens(response));
		} catch (error) {
			console.log(error);
		}
	};
	const sortKitchens = (kitchens: IKitchen[]): IKitchen[] => {
		const timeKitchens = [...kitchens];

		// 1. Сортировка по стилю
		const styleSortedKitchens = timeKitchens.filter((kitchen) => {
			if (styleValue.value === 'Все') {
				return kitchen;
			} else {
				return kitchen.style.value === styleValue.value;
			}
		});

		// 2. Сортировка по типу
		const typeSortedKitchens = styleSortedKitchens.filter((kitchen) => {
			if (typeValue.value === 'Все') {
				return kitchen;
			} else {
				return kitchen.type?.value === typeValue.value;
			}
		});

		// 3. Сортировка по цене
		const budgetSortedKitchens = typeSortedKitchens.filter((kitchen) => {
			return kitchen.price < budgetValue.max && kitchen.price > budgetValue.min;
		});

		// Сортировка по убывающей цене
		const priceSort = budgetSortedKitchens.sort((a, b) => {
			return a.price - b.price;
		});

		// 4. Сортировка по срокам
		const termSortedKitchens = priceSort.filter((kitchen) => {
			return (
				+kitchen.term.split(' ')[0] < termValue.max &&
				+kitchen.term.split(' ')[0] > termValue.min
			);
		});

		setSliceNumber(8);
		return termSortedKitchens;
	};

	useEffect(() => {
		getKitchens();
	}, []);

	const handleShowMore = () => {
		if (sliceNumber < scopeKitchens.length) {
			setSliceNumber((prev) => prev + 8);
		}
	};

	useEffect(() => {
		const sortedKitchens = sortKitchens(kitchenState.kitchens);
		setSkopeKitchens(sortedKitchens);
		handleShowMore();
	}, [styleValue, typeValue, budgetValue, termValue]);

	return (
		<div className={styles.portfolioPage}>
			<div className={styles.container}>
				<div className={styles.kitchens}>
					<h1 className={styles.title}>
						<span>Примеры</span> кухонь, которые мы уже разработали для наших
						клиентов
					</h1>
					<h3 className={styles.subtitle}>
						<span>Выберите свою:</span> от лофта до классики
					</h3>
					<div className={styles.sortWrapper}>
						{/* Select стиль */}
						<div className={styles.listWrapper}>
							<Listbox value={styleValue} onChange={setStyleValue}>
								{({ open }) => (
									<>
										<Listbox.Button className={styles.listButton}>
											<div className={styles.leftSide}>
												<span>Cтиль: </span>
												{styleValue.label}
											</div>
											<Icons.chevron direction={open ? 'down' : 'up'} />
										</Listbox.Button>
										<Listbox.Options className={styles.listOptions}>
											{kitchensStyles.map((type, i) => (
												<Listbox.Option
													key={i}
													value={type}
													className={({ active }) =>
														`${styles.listItem} ${active ? styles.active : ''}`
													}
												>
													{type.label}
												</Listbox.Option>
											))}
										</Listbox.Options>
									</>
								)}
							</Listbox>
						</div>
						{/* Select бюджет */}
						<div className={styles.listWrapper}>
							<Listbox value={budgetValue} onChange={setBudgetValue}>
								{({ open }) => (
									<>
										<Listbox.Button className={styles.listButton}>
											<div className={styles.leftSide}>
												<span>Бюджет: </span>
												{budgetValue.label === 'Все'
													? budgetValue.label
													: `${budgetValue.label}₽`}
											</div>
											<Icons.chevron direction={open ? 'down' : 'up'} />
										</Listbox.Button>
										<Listbox.Options className={styles.listOptions}>
											{kitchensBudget.map((type, i) => (
												<Listbox.Option
													key={i}
													value={type}
													className={({ active }) =>
														`${styles.listItem} ${active ? styles.active : ''}`
													}
												>
													{type.label}
												</Listbox.Option>
											))}
										</Listbox.Options>
									</>
								)}
							</Listbox>
						</div>
						{/* Select сроки */}
						<div className={styles.listWrapper}>
							<Listbox value={termValue} onChange={setTermValue}>
								{({ open }) => (
									<>
										<Listbox.Button className={styles.listButton}>
											<div className={styles.leftSide}>
												<span>Сроки: </span>
												{termValue.label}
											</div>
											<Icons.chevron direction={open ? 'down' : 'up'} />
										</Listbox.Button>
										<Listbox.Options className={styles.listOptions}>
											{kitchensDays.map((type, i) => (
												<Listbox.Option
													key={i}
													value={type}
													className={({ active }) =>
														`${styles.listItem} ${active ? styles.active : ''}`
													}
												>
													{type.label}
												</Listbox.Option>
											))}
										</Listbox.Options>
									</>
								)}
							</Listbox>
						</div>
						{/* Select тип кухни */}
						<div className={styles.listWrapper}>
							<Listbox value={typeValue} onChange={setTypeValue}>
								{({ open }) => (
									<>
										<Listbox.Button className={styles.listButton}>
											<div className={styles.leftSide}>
												<span>Тип кухни: </span>
												{typeValue.label}
											</div>
											<Icons.chevron direction={open ? 'down' : 'up'} />
										</Listbox.Button>
										<Listbox.Options className={styles.listOptions}>
											{kitchensTypes.map((type, i) => (
												<Listbox.Option
													key={i}
													value={type}
													className={({ active }) =>
														`${styles.listItem} ${active ? styles.active : ''}`
													}
												>
													{type.label}
												</Listbox.Option>
											))}
										</Listbox.Options>
									</>
								)}
							</Listbox>
						</div>
					</div>
					{/* Кухни */}
					<div className={styles.allKitchens}>
						{scopeKitchens.length !== 0 &&
							scopeKitchens
								.slice(-sliceNumber)
								.toReversed()
								.map((kitchen, i) => (
									<div className={styles.kitchenWrapper} key={i}>
										<Kitchen kitchen={kitchen} isPreview />
									</div>
								))}
						{kitchenState &&
							kitchenState.isLoading &&
							kitchenState.kitchens.length === 0 && (
								<MiniLoading className={styles.loading} />
							)}
						{kitchenState &&
							!kitchenState.isLoading &&
							scopeKitchens.length === 0 &&
							kitchenState.kitchens.length !== 0 && (
								<p className={styles.noKitchens}>{noKitchensText}</p>
							)}
					</div>
					{sliceNumber < scopeKitchens.length && (
						<div className={styles.moreButton}>
							<OrangeButton onClick={handleShowMore} center arrow='down'>
								Показать еще
							</OrangeButton>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default KitchenExamples;
