export const AppRoute = {
  Main: '/',
  Login: '/login',
  Favorites: '/favorites',
  Offer: '/offer/:id',
} as const;

export const AuthorizationStatus = {
  NoAuth: 'NO AUTH',
  Auth: 'AUTH',
  Unknown: 'UNKNOWN',
} as const;

export const Setting = {
  OffersCount: 5,
} as const;

export const Cities = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
] as const;
