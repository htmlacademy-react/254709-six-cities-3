type User = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
};
export type ReviewType = {
  id: string;
  date: string;
  user: User;
  comment: string;
  rating: number;
};

export type ReviewsType = ReviewType[];

export const reviews: ReviewsType = [
  {
    id: 'b67ddfd5-b953-4a30-8c8d-bd083cd6b62a',
    date: '2019-05-08T14:13:56.569Z',
    user: {
      name: 'Oliver Conner',
      avatarUrl: 'https://url-to-image/image.png',
      isPro: false,
    },
    comment:
      'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    rating: 4,
  },
  {
    id: 'b67dadd5-b953-4a30-83ed-bd083cd6b22a',
    date: '2019-05-08T14:13:56.569Z',
    user: {
      name: 'Sandra Miller',
      avatarUrl: 'https://url-to-image/image.png',
      isPro: false,
    },
    comment:
      'Worst place ever',
    rating: 1,
  },
  {
    id: 'b67dd331-b953-4430-8c21d-bd083cd6b62b',
    date: '2019-05-08T14:13:56.569Z',
    user: {
      name: 'Neo from Matrix',
      avatarUrl: 'https://url-to-image/image.png',
      isPro: true,
    },
    comment:
      'Amazing',
    rating: 5,
  },
];
