type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
};

type City = {
  name: string;
  location: Location;
};

export type OfferType = {
  id: string;
  title: string;
  type: string;
  price: number;
  previewImage: string;
  city: City;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
};

export type OffersType = OfferType[];

export const offers: OffersType = [
  {
    id: 'de5c9e75-6ce8-4b69-b89f-77ee33bf584c',
    title: 'The house among olive ',
    type: 'room',
    price: 187,
    previewImage: 'https://15.design.htmlacademy.pro/static/hotel/11.jpg',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13,
      },
    },
    location: {
      latitude: 52.36554,
      longitude: 4.911976,
      zoom: 16,
    },
    isFavorite: false,
    isPremium: true,
    rating: 2.2,
  },
  {
    id: '7ff6f3ee-a2d4-4c05-9f83-ff1a6c3abf3c',
    title: 'Tile House',
    type: 'hotel',
    price: 110,
    previewImage: 'https://15.design.htmlacademy.pro/static/hotel/4.jpg',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13,
      },
    },
    location: {
      latitude: 52.385540000000006,
      longitude: 4.902976,
      zoom: 16,
    },
    isFavorite: false,
    isPremium: true,
    rating: 4.3,
  },
  {
    id: 'ddad17fe-8d37-4585-a5db-fe26b195a741',
    title: 'The Pondhouse - A Magical Place',
    type: 'hotel',
    price: 174,
    previewImage: 'https://15.design.htmlacademy.pro/static/hotel/7.jpg',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13,
      },
    },
    location: {
      latitude: 52.397540000000006,
      longitude: 4.9099759999999995,
      zoom: 16,
    },
    isFavorite: true,
    isPremium: true,
    rating: 4,
  },
  {
    id: 'b6a0c99a-d1bd-4290-9449-360a0d50258b',
    title: 'Penthouse, 4-5 rooms + 5 balconies',
    type: 'hotel',
    price: 110,
    previewImage: 'https://15.design.htmlacademy.pro/static/hotel/13.jpg',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13,
      },
    },
    location: {
      latitude: 52.37454,
      longitude: 4.881976,
      zoom: 16,
    },
    isFavorite: false,
    isPremium: false,
    rating: 4.4,
  },
  {
    id: '47a4fe02-18e5-4ff6-a139-4f5559021caa',
    title: 'Waterfront with extraordinary view',
    type: 'room',
    price: 202,
    previewImage: 'https://15.design.htmlacademy.pro/static/hotel/3.jpg',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13,
      },
    },
    location: {
      latitude: 52.367540000000005,
      longitude: 4.883976,
      zoom: 16,
    },
    isFavorite: false,
    isPremium: true,
    rating: 3.4,
  },
];
