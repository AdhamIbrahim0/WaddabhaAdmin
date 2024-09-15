import { Image } from '../../../shared/models/image';
import { User } from '../../../shared/models/User';
import { Category } from '../../categories/models/category';

export interface Service {
  id: string;
  name: string;
  initialPrice: number;
  description: string;
  buyerInstructions: string;
  buyersCount: number;
  rating: number;
  status: string;
  images: Image[]; //
  category: Category;
  seller: User;
}
