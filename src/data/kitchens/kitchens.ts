import { IKitchen } from "@/types/IKitchen";
import { KitchensOptions } from "@/types/KitchenOptions";
// 1
import kitchen1_1 from '@/data/kitchens/kitchen1/kitchen1.jpg';
import kitchen1_2 from '@/data/kitchens/kitchen1/kitchen2.jpg';
import kitchen1_3 from '@/data/kitchens/kitchen1/kitchen3.jpg';
import kitchen1_4 from '@/data/kitchens/kitchen1/kitchen4.jpg';
import kitchen1_5 from '@/data/kitchens/kitchen1/kitchen5.jpg';
// 2
import kitchen2_1 from '@/data/kitchens/kitchen2/kitchen1.jpg';
import kitchen2_2 from '@/data/kitchens/kitchen2/kitchen2.jpg';
import kitchen2_3 from '@/data/kitchens/kitchen2/kitchen3.jpg';
import kitchen2_4 from '@/data/kitchens/kitchen2/kitchen4.jpg';
import kitchen2_5 from '@/data/kitchens/kitchen2/kitchen5.jpg';
import kitchen2_6 from '@/data/kitchens/kitchen2/kitchen6.jpg';
// 3
import kitchen3_1 from '@/data/kitchens/kitchen3/kitchen1.jpg';
import kitchen3_2 from '@/data/kitchens/kitchen3/kitchen2.jpg';
import kitchen3_3 from '@/data/kitchens/kitchen3/kitchen3.jpg';
import kitchen3_4 from '@/data/kitchens/kitchen3/kitchen4.jpg';
import kitchen3_5 from '@/data/kitchens/kitchen3/kitchen5.jpg';
// 4
import kitchen4_1 from '@/data/kitchens/kitchen4/kitchen1.jpg';
import kitchen4_2 from '@/data/kitchens/kitchen4/kitchen2.jpg';
import kitchen4_3 from '@/data/kitchens/kitchen4/kitchen3.jpg';
import kitchen4_4 from '@/data/kitchens/kitchen4/kitchen4.jpg';
import kitchen4_5 from '@/data/kitchens/kitchen4/kitchen5.jpg';
import kitchen4_6 from '@/data/kitchens/kitchen4/kitchen6.jpg';
// 5
import kitchen5_1 from '@/data/kitchens/kitchen5/kitchen1.jpg';
import kitchen5_2 from '@/data/kitchens/kitchen5/kitchen2.jpg';
import kitchen5_3 from '@/data/kitchens/kitchen5/kitchen3.jpg';
import kitchen5_4 from '@/data/kitchens/kitchen5/kitchen4.jpg';
// 6
// import kitchen6_1 from '@/data/kitchens/kitchen6/kitchen1.jpg';
// import kitchen6_2 from '@/data/kitchens/kitchen6/kitchen2.jpg';
// import kitchen6_3 from '@/data/kitchens/kitchen6/kitchen3.jpg';
// import kitchen6_4 from '@/data/kitchens/kitchen6/kitchen4.jpg';
// import kitchen6_5 from '@/data/kitchens/kitchen6/kitchen5.jpg';


export const kitchens: IKitchen[] = [
  {
    _id: '1',
    title: 'Кухня П-образная компактная',
    description: 'Компактная П-образная кухня с трендовыми рифлёными фасадами. В данном проекте решили с пользой задействовать зону под окном для увеличения рабочей поверхности и зоны хранения.',
    price: 84600,
    options: [KitchensOptions.loft],
    term: '21 день',
    photos: [kitchen1_1, kitchen1_2, kitchen1_3, kitchen1_4, kitchen1_5],
  },
  {
    _id: '2',
    title: 'П-образная кухня',
    description: 'Благодаря своей уникальной П-образной форме, позволит максимально использовать пространство, делая его более удобным и комфортным для жизни.',
    price: 273500,
    options: [KitchensOptions.minimalism],
    term: '25 дней',
    photos: [kitchen2_1, kitchen2_2, kitchen2_3, kitchen2_4, kitchen2_5, kitchen2_6],
  },
  {
    _id: '3',
    title: 'Кухня в стиле High-Tech',
    description: 'Совокупность простоты, удобства, функциональности и стиля. High-Tech достаточно прагматичный и холодный стиль. Для придания уюта и домашней атмосферы дизайнеры рекомендуют добавлять в интерьер больше природных материалов например, дерево.',
    price: 173500,
    options: [KitchensOptions.classic],
    term: '21 день',
    photos: [kitchen3_1, kitchen3_2, kitchen3_3, kitchen3_4, kitchen3_5],
  },
  {
    _id: '4',
    title: 'Кухня Г-образная в черно-белом контрасте',
    description: 'Роскошный гарнитур, выполненный в эффектном контрасте черного и белого. Глубокий матовый черный цвет фасадов придает интерьеру изысканную элегантность, а сверкающий глянцевый белый подчеркивает его чистоту и свежесть.',
    price: 139500,
    options: [KitchensOptions.chalet],
    term: '21 день',
    photos: [kitchen4_1, kitchen4_2, kitchen4_3, kitchen4_4, kitchen4_5, kitchen4_6],
  },
  {
    _id: '5',
    title: 'Кухня Г-образная с повышенным функционалом',
    description: 'Эта кухня привлекает внимание свей элегантностью и изящным дизайном. Но кроме своей эстетичности, этот гарнитур также обладает высокой функциональностью.\nВнутри шкафов и ящиков находится достаточное пространство для хранения посуды, кухонных принадлежностей и продуктов. Удобные полки и выдвижные ящики обеспечивают легкость доступа и организацию пространства, облегчая процесс готовки и хранения кухонной утвари.',
    price: 197500,
    options: [KitchensOptions.loft],
    term: '25 дней',
    photos: [kitchen5_1, kitchen5_2, kitchen5_3, kitchen5_4],
  },
]