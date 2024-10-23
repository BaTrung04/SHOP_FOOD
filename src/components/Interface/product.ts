import Mi from "../../assets/categories/Mi.png";
import MonCa from "../../assets/categories/Mon-ca.png";
import MonCha from "../../assets/categories/Mon-cha.png";
import MonGa from "../../assets/categories/Mon-ga.png";
import MonGoi from "../../assets/categories/Mon-goi.png";
import MonHeo from "../../assets/categories/Mon-heo.png";
import MonLau from "../../assets/categories/Mon-lau.png";
import MonTom from "../../assets/categories/Mon-tom.png";

export interface ICategories {
  id: number;
  url: string;
  name: string;
}

export const categories: ICategories[] = [
  {
    id: 1,
    url: Mi,
    name: "Món mì",
  },
  {
    id: 2,
    url: MonCa,
    name: "Món cá",
  },
  {
    id: 3,
    url: MonCha,
    name: "Món chả",
  },
  {
    id: 4,
    url: MonGa,
    name: "Món gà",
  },
  {
    id: 5,
    url: MonGoi,
    name: "Món gỏi",
  },
  {
    id: 6,
    url: MonHeo,
    name: "Món heo",
  },
  {
    id: 7,
    url: MonLau,
    name: "Món lẩu",
  },
  {
    id: 8,
    url: MonTom,
    name: "Món Tôm",
  },
];

export interface IImage {
  public_id: string | null;
  url: string | null;
}

export interface ICategory {
  image: IImage;
  _id: string;
  categoryName: string;
  slug: string;
  description: string;
  createdAt: string; // Hoặc Date nếu bạn muốn chuyển đổi sau này
  __v: number;
}

export interface ICategoryResponse {
  success: boolean;
  categoryCount: number;
  resPerPage: number;
  filteredCategoryCount: number;
  categories: ICategory[];
}
