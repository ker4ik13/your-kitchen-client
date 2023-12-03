import type { IReview } from "@/types/IReview";
// 1
import photo1_1 from '@/data/reviews/review1/photo1.jpg';
import photo1_2 from '@/data/reviews/review1/photo2.jpg';
import photo1_3 from '@/data/reviews/review1/photo3.jpg';
import photo1_4 from '@/data/reviews/review1/photo4.jpg';
// 2
import photo2_1 from '@/data/reviews/review2/photo1.jpg';
import photo2_2 from '@/data/reviews/review2/photo2.jpg';
import photo2_3 from '@/data/reviews/review2/photo3.jpg';
// 3
import photo3_1 from '@/data/reviews/review3/photo1.jpg';
import photo3_2 from '@/data/reviews/review3/photo2.jpg';
import photo3_3 from '@/data/reviews/review3/photo3.jpg';
// 4
import photo4_1 from '@/data/reviews/review4/photo1.jpg';
import photo4_2 from '@/data/reviews/review4/photo2.jpg';
import photo4_3 from '@/data/reviews/review4/photo3.jpg';
// 4
import photo5_1 from '@/data/reviews/review5/photo1.webp';
import photo5_2 from '@/data/reviews/review5/photo2.webp';
import photo5_3 from '@/data/reviews/review5/photo3.webp';

export const reviews: IReview[] = [
  {
    _id: '1',
    firstName: 'Ольга',
    lastName: 'Андреянова',
    text: 'Огромная благодарность компании Твоя кухня за шикарную кухню по отличной цене. Ребята профессионалы, нашли отличное решение для нестандартной планировки, качество очень хорошее, кухня очень вместительная и функциональная. Изготавливают и устанавливают очень быстро. Рекомендую обращаться именно в эту компанию!',
    photo: '',
    photos: [photo4_1.src, photo4_2.src, photo4_3.src],
  },
  {
    _id: '2',
    firstName: 'Татьяна',
    lastName: 'К.',
    text: 'Отличная компания. Профессионализм на высоком уровне. Обратная связь молниеносная на всех этапах взаимодействия. Чувствуешь себя уверенно, общаясь ними, все знают свой функционал и четко его исполняют. 3Д-проект кухни очень грамотный со всеми деталями, отдельное спасибо дизайнеру-конструктору Дмитрию, рассказал все от а до я по кухонным гарнитурам и материалам, специфике подбора комплектующих и монтажу кухни.',
    photo: '',
    photos: [photo5_1.src, photo5_2.src, photo5_3.src],
  },
  {
    _id: '3',
    firstName: 'Виталий',
    lastName: 'Ч.',
    text: 'Так, ну что сказать, кухня по качеству отличная, цвета, материалы, фурнитура соответствуют заявленному, цена оправдана, с проектом полное совпадение, доставили точно в срок,подняли как и обещали бесплатно, это из плюсов. Из минусов сборку начали на день позже запланированного, а так все отлично, советую. На проекте визуально не так интересно смотрелась, вживую гораздо эффектнее.',
    photo: '',
    photos: [photo2_1.src, photo2_2.src, photo2_3.src],
  },
  {
    _id: '4',
    firstName: 'Виктория',
    lastName: 'Б.',
    text: 'Заказала кухню, осталась очень довольна!\nКачество материала идеальное, фактура и цвет, то что нужно.\nОчень удобна в использовании, много места для хранения. Во время доставили и быстро, аккуратно собрали.',
    photo: '',
    photos: [photo1_1.src, photo1_2.src, photo1_3.src, photo1_4.src],
  },
  {
    _id: '5',
    firstName: 'Никита',
    lastName: 'Русин',
    text: 'Выражаю благодарность компании. Заказывал кухню и остался очень доволен результатом. Кухня красивая, удобная, функциональная. Все пожелания учтены на 100%. Отдельное спасибо дизайнеру-конструктору Алексею за его советы и профессионализм, и сборщику Вячеславу за быструю и качественную работу. Буду рекомендовать вас своим знакомым.',
    photo: '',
    photos: [photo3_1.src, photo3_2.src, photo3_3.src],
  },
]