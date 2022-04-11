import {createPopupElement} from './popup.js';
import {filterPoint} from './userForm.js';

const MARKER_COUNT = 10;
const form = document.querySelector('.ad-form');
const filterForm = document.querySelector('.map__filters');
const allElements = form.querySelectorAll('fieldset');
const filterElements = filterForm.querySelectorAll('.map__filter');
const mapFeatures = filterForm.querySelector('.map__features');
const addressField = document.querySelector('[name="address"]');
const houseTypeInput = document.querySelector('[name="housing-type"]');
const housePriceInput = document.querySelector('[name="housing-price"]');
const houseRoomInput = document.querySelector('[name="housing-rooms"]');
const houseGuestsInput = document.querySelector('[name="housing-guests"]');
const houseFeatures = document.querySelectorAll('.map__features');

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

let markerGroup = L.layerGroup().addTo(map);

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

const clearMap = () => {
  markerGroup.remove();
  markerGroup = L.layerGroup().addTo(map);
};

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

const setMainMarker = () => {
  mainMarker.setLatLng ({
    lat: defaultCoordinates.lat,
    lng: defaultCoordinates.lng,
  });
  addressField.value = `${defaultCoordinates.lat.toFixed(5)}, ${defaultCoordinates.lng.toFixed(5)}`;
};

mainMarker.on('moveend', (evt) => {
  const markerCoordinates = evt.target.getLatLng();
  addressField.value = `${markerCoordinates.lat.toFixed(5)}, ${markerCoordinates.lng.toFixed(5)}`;
});

const renderSimilarList = (similarPoints) => {
  clearMap();
  similarPoints
    .slice()
    .filter(filterPoint)
    .slice(0, MARKER_COUNT)
    .forEach((point) => createMarker(point));
};

const setTypeChange = (cb) => {
  houseTypeInput.addEventListener('change', () => {
    cb();
  });
};

const setPriceChange = (cb) => {
  housePriceInput.addEventListener('change', () => {
    cb();
  });
};

const setRoomChange = (cb) => {
  houseRoomInput.addEventListener('change', () => {
    cb();
  });
};

const setGuestsChange = (cb) => {
  houseGuestsInput.addEventListener('change', () => {
    cb();
  });
};

const setFeaturesChange = (cb) => {
  houseFeatures.forEach((feature) => feature.addEventListener('change', () => {
    cb();
  }));
};

export {createMarker, setMainMarker, setTypeChange, setPriceChange, setRoomChange, setGuestsChange, setFeaturesChange, renderSimilarList};
