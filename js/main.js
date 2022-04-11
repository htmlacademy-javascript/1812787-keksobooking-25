import {setUserFormSubmit, resetPage, setResetPage} from './userForm.js';
import {getData} from './load.js';
import {renderSimilarList, setFeaturesChange, setGuestsChange, setPriceChange, setRoomChange, setTypeChange} from './userFormStartPage.js';
import {debounce} from './util.js';
import './photo.js';

const RERENDER_DELAY = 500;

getData((points) => {
  renderSimilarList(points);
  setTypeChange(debounce(
    () => renderSimilarList(points),
    RERENDER_DELAY,
  ));
  setPriceChange(debounce(
    () => renderSimilarList(points),
    RERENDER_DELAY,
  ));
  setRoomChange(debounce(
    () => renderSimilarList(points),
    RERENDER_DELAY,
  ));
  setGuestsChange(debounce(
    () => renderSimilarList(points),
    RERENDER_DELAY,
  ));
  setFeaturesChange(debounce(
    () => renderSimilarList(points),
    RERENDER_DELAY,
  ));
  setUserFormSubmit(() => resetPage(points));
  setResetPage(() => resetPage(points));
});
