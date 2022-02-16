import { ActionType, createCustomAction, getType } from 'typesafe-actions';
import { IPhoto } from '../../../models/Photo';

export interface DataState {
  photos: Array<IPhoto>;
  photosFetchProgress: number;
}

export const setPhotos = createCustomAction('set/setPhotos', (data: Array<IPhoto>) => ({
  data,
}));
export const setPhotosFetchProgress = createCustomAction('set/setPhotosFetchProgress', (data: number) => ({
  data,
}));

const actions = { setPhotos, setPhotosFetchProgress };

type Action = ActionType<typeof actions>;

export default function reducer(state: DataState = { photos: [], photosFetchProgress: 0 }, action: Action) {
  switch (action.type) {
    case getType(setPhotos):
      return { ...state, photos: action.data };
    case getType(setPhotosFetchProgress):
      return { ...state, photosFetchProgress: action.data };
    default:
      return state;
  }
}
