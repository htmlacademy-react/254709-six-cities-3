import { configureStore } from '@reduxjs/toolkit';
import { OfferType, OfferDetailType, Comment } from './types/offers';
import { ReviewType } from './types/reviews';
import { Cities, AuthorizationStatus, RequestStatus } from './const';

type MockApiResponse = {
  data: unknown;
};

type MockApi = {
  get: () => Promise<MockApiResponse>;
  post: () => Promise<MockApiResponse>;
  delete: () => Promise<MockApiResponse>;
};

type MockState = {
  offers: {
    city: typeof Cities[number];
    offers: OfferType[];
    favoriteOffers: OfferType[];
    status: typeof RequestStatus[keyof typeof RequestStatus];
    error: string | null;
  };
  offerDetail: {
    offer: OfferDetailType;
    nearbyOffers: OfferType[];
    comments: Comment[];
    status: typeof RequestStatus[keyof typeof RequestStatus];
    error: string | null;
  };
  user: {
    authorizationStatus: typeof AuthorizationStatus[keyof typeof AuthorizationStatus];
    email: string | null;
    token: string | null;
    error: string | null;
  };
};

export const makeFakeOffer = (overrides: Partial<OfferType> = {}): OfferType => ({
  id: '1',
  title: 'Beautiful apartment',
  type: 'apartment',
  price: 120,
  previewImage: 'img/apartment-01.jpg',
  city: {
    name: 'Paris',
    location: {
      latitude: 48.8566,
      longitude: 2.3522,
      zoom: 12
    }
  },
  location: {
    latitude: 48.8566,
    longitude: 2.3522,
    zoom: 12
  },
  isFavorite: false,
  isPremium: false,
  rating: 4.5,
  ...overrides
});

export const makeFakeOfferDetail = (overrides: Partial<OfferDetailType> = {}): OfferDetailType => ({
  id: '1',
  title: 'Beautiful apartment',
  type: 'apartment',
  price: 120,
  city: {
    name: 'Paris',
    location: {
      latitude: 48.8566,
      longitude: 2.3522,
      zoom: 12
    }
  },
  location: {
    latitude: 48.8566,
    longitude: 2.3522,
    zoom: 12
  },
  isFavorite: false,
  isPremium: false,
  rating: 4.5,
  description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
  bedrooms: 3,
  goods: ['Heating', 'Kitchen', 'Cable TV', 'Washing machine', 'Coffee machine', 'Dishwasher'],
  host: {
    name: 'Oliver Conner',
    avatarUrl: 'img/avatar-angelina.jpg',
    isPro: false
  },
  images: [
    'img/room.jpg',
    'img/apartment-01.jpg',
    'img/apartment-02.jpg',
    'img/apartment-03.jpg',
    'img/studio-01.jpg',
    'img/apartment-01.jpg'
  ],
  maxAdults: 4,
  ...overrides
});

export const makeFakeComment = (overrides: Partial<Comment> = {}): Comment => ({
  id: '1',
  date: '2019-05-08T14:13:56.569Z',
  user: {
    name: 'Oliver Conner',
    avatarUrl: 'img/avatar-angelina.jpg',
    isPro: false
  },
  comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
  rating: 4,
  ...overrides
});

export const makeFakeReview = (overrides: Partial<ReviewType> = {}): ReviewType => ({
  id: '1',
  date: '2019-05-08T14:13:56.569Z',
  user: {
    name: 'Oliver Conner',
    avatarUrl: 'img/avatar-angelina.jpg',
    isPro: false
  },
  comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
  rating: 4,
  ...overrides
});

export const makeFakeStore = (initialState?: Partial<MockState>) => {
  const defaultState: MockState = {
    offers: {
      city: Cities[0],
      offers: [makeFakeOffer()],
      favoriteOffers: [],
      status: RequestStatus.success,
      error: null,
    },
    offerDetail: {
      offer: makeFakeOfferDetail(),
      nearbyOffers: [makeFakeOffer({ id: '2' })],
      comments: [makeFakeComment()],
      status: RequestStatus.success,
      error: null,
    },
    user: {
      authorizationStatus: AuthorizationStatus.NoAuth,
      email: null,
      token: null,
      error: null,
    },
  };

  const mergedState: MockState = {
    offers: { ...defaultState.offers, ...initialState?.offers },
    offerDetail: { ...defaultState.offerDetail, ...initialState?.offerDetail },
    user: { ...defaultState.user, ...initialState?.user },
  };

  const mockApi: MockApi = {
    get: () => Promise.resolve({ data: {} }),
    post: () => Promise.resolve({ data: {} }),
    delete: () => Promise.resolve({ data: {} }),
  };

  return configureStore({
    reducer: {
      test: (state: MockState | undefined = mergedState): MockState => state
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: mockApi,
        },
      }),
  });
};

export const TEST_CITIES = Cities;

export const MOCK_LOCATION = {
  latitude: 48.8566,
  longitude: 2.3522,
  zoom: 12
};

export const MOCK_CITY = {
  name: 'Paris',
  location: MOCK_LOCATION
};

export const MOCK_HOST = {
  name: 'Oliver Conner',
  avatarUrl: 'img/avatar-angelina.jpg',
  isPro: false
};

export const MOCK_USER = {
  name: 'Oliver Conner',
  avatarUrl: 'img/avatar-angelina.jpg',
  isPro: false
};

export const MOCK_AUTH_STATE = {
  authorizationStatus: AuthorizationStatus.Auth,
  email: 'test@example.com',
  token: 'mock-token',
  error: null,
};

export const MOCK_LOADING_STATE = {
  status: RequestStatus.loading,
  error: null,
};

export const MOCK_ERROR_STATE = {
  status: RequestStatus.failed,
  error: 'Mock error message',
};

export const MOCK_OFFERS = [
  makeFakeOffer({ id: '1', title: 'First Offer', price: 100 }),
  makeFakeOffer({ id: '2', title: 'Second Offer', price: 200, city: { name: 'Amsterdam', location: MOCK_LOCATION } }),
  makeFakeOffer({ id: '3', title: 'Third Offer', price: 150, isFavorite: true }),
];

export const MOCK_COMMENTS = [
  makeFakeComment({ id: '1', rating: 5, comment: 'Excellent!' }),
  makeFakeComment({ id: '2', rating: 4, comment: 'Very good!' }),
  makeFakeComment({ id: '3', rating: 3, comment: 'Good!' }),
];
