import {createPopupElement} from './generateData.js';
import {similarAds} from './data.js';

const similarElements = similarAds();
const form = document.querySelector('.ad-form');
const filterForm = document.querySelector('.map__filters');
const allElements = form.querySelectorAll('fieldset');
const filterElements = filterForm.querySelectorAll('.map__filter');
const mapFeatures = filterForm.querySelector('.map__features');
const addressField = document.querySelector('[name="address"]');
const sliderElement = document.querySelector('.ad-form__slider');
const priceValue = document.querySelector('[name="price"]');
const defaultCoordinates = {
  lat: 35.65283,
  lng: 139.83948,
};

const map = L.map('map-canvas').setView({
  lat: defaultCoordinates.lat,
  lng: defaultCoordinates.lng,
}, 12);

const isActiveMap = () => {
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
  form.classList.remove('ad-form--disabled');
  filterForm.classList.remove('ad-form--disabled');
  allElements.forEach((element) => element.removeAttribute('disabled'));
  filterElements.forEach((element) => element.removeAttribute('disabled'));
  mapFeatures.removeAttribute('disabled');
};

const isInactiveMap = () => {
  form.classList.add('ad-form--disabled');
  filterForm.classList.add('ad-form--disabled');
  allElements.forEach((element) => element.setAttribute('disabled', 'disabled'));
  filterElements.forEach((element) => element.setAttribute('disabled', 'disabled'));
  mapFeatures.setAttribute('disabled', 'disabled');
  addressField.value = `${defaultCoordinates.lat}, ${defaultCoordinates.lng}`;
};

document.addEventListener('DOMContentLoaded', isInactiveMap());
map.on('load', isActiveMap());

const mainIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const icon = L.icon ({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const markerGroup = L.layerGroup().addTo(map);

const createMarker = (adv) => {
  const marker = L.marker (
    {
      lat: Number(adv.location.lat),
      lng: Number(adv.location.lng),
    },
    {
      icon,
    },
  );

  marker
    .addTo(markerGroup)
    .bindPopup(createPopupElement(adv));
};

similarElements.forEach((point) => createMarker(point));

const mainMarker = L.marker(
  {
    lat: defaultCoordinates.lat,
    lng: defaultCoordinates.lng,
  },
  {
    draggable: true,
    icon: mainIcon,
  },
);

mainMarker.addTo(map);

mainMarker.on('moveend', (evt) => {
  const markerCoordinates = evt.target.getLatLng();
  addressField.value = `${markerCoordinates.lat.toFixed(5)}, ${markerCoordinates.lng.toFixed(5)}`;
});

//priceValue.value = 20000;

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100000,
  },
  start: 5000,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      return parseInt(value, 10);
    },
    from: function (value) {
      return parseInt(value, 10);
    }
  },
});

sliderElement.noUiSlider.on('slide', () => {
  priceValue.value = sliderElement.noUiSlider.get();
});

priceValue.addEventListener('input', () => {
  sliderElement.noUiSlider.set(priceValue.value);
});
