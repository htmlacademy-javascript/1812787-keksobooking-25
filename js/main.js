import {setUserFormSubmit, resetPage} from './userForm.js';
import './userFormStartPage.js';
import {getData} from './load.js';
import {rendererSimilarList, setFeaturesChange, setGuestsChange, setPriceChange, setRoomChange, setTypeChange} from './userFormStartPage.js';
import {debounce} from './util.js';
import './photo.js';

const RERENDER_DELAY = 500;

getData((points) => {
  rendererSimilarList(points);
  setTypeChange(debounce(
    () => rendererSimilarList(points),
    RERENDER_DELAY,
  ));
  setPriceChange(debounce(
    () => rendererSimilarList(points),
    RERENDER_DELAY,
  ));
  setRoomChange(debounce(
    () => rendererSimilarList(points),
    RERENDER_DELAY,
  ));
  setGuestsChange(debounce(
    () => rendererSimilarList(points),
    RERENDER_DELAY,
  ));
  setFeaturesChange(debounce(
    () => rendererSimilarList(points),
    RERENDER_DELAY,
  ));
});

setUserFormSubmit(resetPage);
