const form = document.querySelector('.ad-form');
const filterForm = document.querySelector('.map__filters');
const allElements = form.querySelectorAll('fieldset');
const filterElements = filterForm.querySelectorAll('.map__filter');
const mapFeatures = filterForm.querySelector('.map__features');
const map = L.map('map-canvas').setView({
  lat: 35.65000,
  lng: 139.70000,
}, 8);

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
};

document.addEventListener('DOMContentLoaded', isInactiveMap());
document.addEventListener('load', isActiveMap());
