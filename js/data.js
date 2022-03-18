import {getRandomInteger, getRandomFloat, getRandomArrayElement, getArrayWithRandomElements, zeroPad } from './util.js';

const NAMES = [
  'Эко-отель Priroda',
  'Усадьба У горы',
  'Апарт-отель',
  'Отель',
];

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const TIME_OPTIONS = [
  '12:00',
  '13:00',
  '14:00',
];

const CHARACTERISTICS = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const SIMILAR_ADS_COUNT = 10;

const createAuthor = (i) => ({
  avatar: `img/avatars/user${zeroPad(i+1, 2)}.png`,
});

const createOffer = (location) => ({
  title: getRandomArrayElement(NAMES),
  address: `${location.lat}, ${location.lng}`,
  price: getRandomInteger(1000, 100000),
  type: getRandomArrayElement(TYPES),
  rooms: getRandomInteger(1, 5),
  guests: getRandomInteger(1, 10),
  checkin: getRandomArrayElement(TIME_OPTIONS),
  checkout: getRandomArrayElement(TIME_OPTIONS),
  features: getArrayWithRandomElements (CHARACTERISTICS),
  description: 'Здесь будет описание объекта',
  photos: getArrayWithRandomElements(PHOTOS),
});

const createLocation = () => ({
  lat: getRandomFloat(35.65000, 35.70000, 5),
  lng: getRandomFloat(139.70000, 139.80000, 5),
});

const createAdv = (i, location) => ({
  author: createAuthor(i),
  offer: createOffer(location),
  location: location,
});

const similarAds = () => Array.from({length: SIMILAR_ADS_COUNT}, (_, i) => createAdv(i, createLocation()));

export {similarAds};
