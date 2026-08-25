import type { IconType } from 'react-icons';
import {
  LuMapPin,
  LuGift,
  LuShoppingBag,
  LuZap,
  LuNavigation,
  LuClipboardList,
} from 'react-icons/lu';

export type AppFeatureLayout = 'image-right' | 'image-left';

export type AppFeature = {
  id: string;
  Icon: IconType;
  title: string;
  badge?: string;
  description: string;
  layout: AppFeatureLayout;
  image: string;
};

const ASSET =
  '/assets/landing/img/react_assets/product-service/slide-app-images';

export const APP_FEATURES: AppFeature[] = [
  {
    id: 'discover-stores',
    Icon: LuMapPin,
    title: 'Discover Stores',
    badge: 'NEW',
    description:
      'Find the best local brands and international stores near you with our intelligent geo-filtering.',
    layout: 'image-right',
    image: `${ASSET}/ImageSide-1.png`,
  },
  {
    id: 'exclusive-offers',
    Icon: LuGift,
    title: 'Exclusive Offers',
    badge: 'DEALS',
    description:
      "Unlock deals you won't find anywhere else. From flash sales to long-term rewards.",
    layout: 'image-left',
    image: `${ASSET}/ImageSide-2.png`,
  },
  {
    id: 'product-experience',
    Icon: LuShoppingBag,
    title: 'Product Experience',
    description:
      'Immersive product browsing with high-resolution imagery and detailed specifications.',
    layout: 'image-right',
    image: `${ASSET}/ImageSide-3.png`,
  },
  {
    id: 'fast-checkout',
    Icon: LuZap,
    title: 'Fast Checkout',
    badge: 'SECURE',
    description:
      'One-tap secure payments and saved addresses make every order a breeze.',
    layout: 'image-left',
    image: `${ASSET}/ImageSide-4.png`,
  },
  {
    id: 'live-tracking',
    Icon: LuNavigation,
    title: 'Live Tracking',
    badge: 'REAL-TIME',
    description:
      'Watch your delivery move across Qatar in real-time with precise GPS accuracy.',
    layout: 'image-right',
    image: `${ASSET}/ImageSide-5.png`,
  },
  {
    id: 'order-history',
    Icon: LuClipboardList,
    title: 'Order History',
    description:
      'Track your spending and re-order your favorites with a single tap.',
    layout: 'image-left',
    image: `${ASSET}/ImageSide-6.png`,
  },
];
