export const SITE_NAME = "Твоя кухня";
export const CLIENT_URL = "https://youkuhnya.ru";

export const pagesData: IPages = {
  main: {
    name: CLIENT_URL,
    title: "Кухни на заказ в Москве от производителя. Кухни с гарантией 10 лет",
    description:
      "Кухни по индивидуальным размерам без наценок. Долговечная немецкая и австрийская фурнитура. Срок изготовления 10-20 дней. Бесплатный 3D проект кухни и визуализация за 4 часа. Запишитесь на замер и расчет стоимости.",
    keywords:
      "Кухни на заказ, Кухни в Москве, Производство кухонь, Гарантия 10 лет, Индивидуальные размеры кухонь, Немецкая фурнитура, Австрийская фурнитура, Срок изготовления 10-20 дней, Бесплатный 3D проект кухни, Визуализация кухни, Замер кухни, Расчет стоимости кухни, Долговечные кухни, Кухни с гарантированным качеством, Бесплатная консультация по кухням, Изготовление кухонь под заказ, Кухонные решения, Кухни с доставкой, Эксклюзивные кухни, Профессиональные дизайнеры кухонь",
    type: "website",
    url: CLIENT_URL,
  },
  articles: {
    name: "articles",
    title: "Полезные статьи про кухни",
    description:
      "Статьи о мебели для кухни: организация пространства, дизайн и стиль кухни, материалы, нюансы и тонкости проектирования. Рекомендации по выбору кухонной мебели на заказ, ответы на частые вопросы.",
    keywords:
      "Статьи про кухни, статьи про мебель, дизайн и стиль кухни, нюансы и тонкости проектирования, рекомендации по выбору кухонной мебели",
    url: `${CLIENT_URL}/articles`,
    type: "article",
  },
  portfolio: {
    name: `portfolio`,
    title:
      "Фото кухонь на заказ. Готовые проекты, цены и описания. Смотрите и заказывайте.",
    description:
      "Фото кухонь на заказ с ценами и описанием от фабрики Твоя кухня.  Портфолио проектов кухонь под ключ. Отзывы клиентов о фабрике. Заходите на сайт и смотрите.",
    keywords:
      "Кухни на заказ фото, Кухни на заказ отзывы, Фото готовых кухонь, Заказать кухню отзывы, Кухни на заказ цены, Сколько стоит кухня на заказ, стоимость кухонь в Москве, стоимость кухонь на заказ, Кухни в Москве цены",
    url: `${CLIENT_URL}/portfolio`,
    type: "website",
  },
  advantages: {
    name: `preimushestva`,
    title: "Преимущества мебели фабрики Твоя кухня",
    description:
      "Кухонные гарнитуры и корпусная мебель от фабрики «Твоя Кухня». Характеристики, особенности, применяемые материалы. Выберите качественную и комфортную кухню, сделанную по индивидуальному проекту, и воспользуйтесь рассрочкой до 24 месяцев без первоначального взноса и переплат.",
    url: `${CLIENT_URL}/preimushestva`,
    type: "website",
  },
  furniture: {
    name: `korpusnaya_mebel`,
    title: "Корпусная мебель на заказ в Москве",
    description:
      "Качественная мебель на заказ от производителя. Мебель по индивидуальным размерам и проектам по доступным ценам в Москве. Шкафы, прихожие, гардеробные и другая мебель с максимальной выгодой.",
    keywords:
      "Мебель на заказ,Изготовление мебели на заказ, Мебель по индивидуальному заказу, Заказ мебели по размерам, Мебель под заказ, Мебель на заказ по индивидуальным размерам, Корпусная мебель на заказ, Заказ мебели по размерам недорого, Мебель на заказ в Москве, Мебель для ванной на заказ, Мебель на заказ комната, Детская мебель на заказ, Мебель для гостиной, Мебель на заказ недорого Москва, Мебель на заказ область, Встраиваемая мебель на заказ, Встроенная мебель на заказ, Производство мебели на заказ, Мебель на заказ фото, Заказ мебели по размеру недорого Москва",
    url: `${CLIENT_URL}/korpusnaya_mebel`,
    type: "website",
  },
  discounts: {
    name: `discounts`,
    title: "Акции и скидки на мебель и кухонные гарнитуры",
    description:
      "Актуальный каталог акций и скидок на кухни и корпусную мебель в Москве. Узнай как выгодно приобрести кухонный гарнитур или другую мебель на заказ. Подарки и техника новым клиентам фабрики «Твоя кухня».",
    keywords: "Скидки, акции, подарки",
    url: `${CLIENT_URL}/discounts`,
    type: "website",
  },
};

export const links: ILink = {
  vk: "https://vk.com/youkuhnya",
  tgChat: "https://t.me/LevitinTvoyaKuhnya",
  tgGroup: "https://t.me/youkuhnya",
  whatsapp: "https://wa.me/79804160380",
  tel: "tel:+74959885528",
  phone: "+7 (495) 988-55-28",
  mailTo: "mailto:info@youkuhnya.ru",
  email: "info@youkuhnya.ru",
};

export const pagesLinks: ILink = {
  main: "/",
  howWeWork: "#how-we-work",
  discounts: "/discounts",
  reviews: "/#reviews",
  articles: "/articles",
  portfolio: "/portfolio",
  advantages: "/preimushestva",
  furniture: "/korpusnaya_mebel",
  admin: "/admin",
  adminClaims: "/admin/claims",
  adminAdmins: "/admin/admins",
  adminAdminsNew: "/admin/admins/new",
  adminKitchens: "/admin/kitchens",
  adminFurniture: "/admin/furniture",
  adminFurnitureNew: "/admin/furniture/new",
  adminKitchensNew: "/admin/kitchens/new",
  adminReviews: "/admin/reviews",
  adminReviewsNew: "/admin/reviews/new",
  adminTeam: "/admin/team",
  adminTeamNew: "/admin/team/new",
  adminArticles: "/admin/articles",
  adminArticlesNew: "/admin/articles/new",
  adminGallery: "/admin/gallery",
  adminGalleryNew: "/admin/gallery/new",
  adminLogin: "/admin/login",
};

interface ILink {
  [name: string]: string;
}
interface IPage {
  name: string;
  title: string;
  description: string;
  keywords?: string;
  url: string;
  type?:
    | "website"
    | "article"
    | "book"
    | "profile"
    | "music.song"
    | "music.album"
    | "music.playlist"
    | "music.radio_station"
    | "video.movie"
    | "video.episode"
    | "video.tv_show"
    | "video.other"
    | undefined;
}
interface IPages {
  [page: string]: IPage;
}
