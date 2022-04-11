const similarElementsTemplate = document.querySelector('#card').content.querySelector('.popup');

const objectTypes = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const getFeatures = (element, features) => {
  const featuresList = element.querySelectorAll('.popup__feature');
  const modifiers = features.map((feature) =>
    `popup__feature--${feature}`);
  featuresList.forEach((featureListItem) => {
    const modifier = featureListItem.classList[1];

    if (!modifiers.includes(modifier)) {
      featureListItem.remove();
    }
  });
};

const getPhotos = (element, hrefPhotos) => {
  const photosList = element.querySelector('.popup__photos');
  photosList.querySelector('img').remove();

  hrefPhotos.forEach((hrefPhoto) => {
    const newPhoto = document.createElement('img');
    newPhoto.src = hrefPhoto;
    newPhoto.classList.add('popup__photo');
    newPhoto.width = '45';
    newPhoto.height = '40';
    newPhoto.alt = 'Фотография жилья';

    photosList.append(newPhoto);
  });
};

const createPopupElement = ({author, offer}) => {
  const offerElement = similarElementsTemplate.cloneNode(true);
  offerElement.querySelector('.popup__avatar').src = author.avatar;
  offerElement.querySelector('.popup__title').textContent = offer.title;
  offerElement.querySelector('.popup__text--address').textContent = offer.address;
  offerElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  offerElement.querySelector('.popup__type').textContent = objectTypes[offer.type];
  const guestsDecl = offer.guests === 1 ? 'гостя' : 'гостей';
  const roomsDecl = offer.rooms === 1 ? 'комната' : 'комнаты';
  offerElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} ${roomsDecl} для ${offer.guests} ${guestsDecl}`;
  offerElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  if ('features' in offer) {
    getFeatures(offerElement, offer.features);
  } else {
    offerElement.querySelector('.popup__features').classList.toggle('hidden');
  }
  if ('description' in offer) {
    offerElement.querySelector('.popup__description').textContent = offer.description;
  } else {
    offerElement.querySelector('.popup__description').classList.toggle('hidden');
  }
  if ('photos' in offer) {
    getPhotos(offerElement, offer.photos);
  } else {
    offerElement.querySelector('.popup__photos').classList.toggle('hidden');
  }
  return offerElement;
};

export {createPopupElement};
