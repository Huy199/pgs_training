import React, { useCallback, useEffect, useState } from 'react';
import styles from '../homePage.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../redux/reducer';
import { Action } from 'redux';
import { fetchThunk } from '../../common/redux/thunk';
import { IPhoto } from '../../../models/Photo';
import HomeForm from '../components/HomeForm';
import { setPhotos } from '../redux/dataReducer';
import Cookie from 'js-cookie';
import { ACCESS_TOKEN_KEY } from '../../../utils/constants';
import { replace } from 'connected-react-router';
import { ROUTES } from '../../../configs/routes';
import { removeUserInfo } from '../../auth/redux/authReducer';

const HomePage = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [clonePhotos, setClonePhotos] = useState<IPhoto[]>([]);
  const { photos } = useSelector((state: AppState) => ({
    photos: state.data.photos,
  }));

  const getPhotos = useCallback(async () => {
    const json = await dispatch(fetchThunk('https://jsonplaceholder.typicode.com/photos'));
    if (json) {
      dispatch(setPhotos(json.slice(0, 10)));
    }
  }, [dispatch]);

  useEffect(() => {
    getPhotos();
  }, [getPhotos]);

  const setPhotoTitle = useCallback((index: number, value: string) => {
    setClonePhotos((prevState) => {
      const newPhotosByTutorComponent = Array.from(prevState);
      const newPhoto = { ...newPhotosByTutorComponent[index], title: value };
      newPhotosByTutorComponent[index] = newPhoto;
      return newPhotosByTutorComponent;
    });
  }, []);

  const handleReset = () => {
    setClonePhotos([...photos]);
  };

  const handleConfirm = () => {
    dispatch(setPhotos([...clonePhotos]));
  };

  useEffect(() => {
    setClonePhotos([...photos]);
  }, [photos]);

  const handleLogout = useCallback(
    (e) => {
      Cookie.remove(ACCESS_TOKEN_KEY);
      dispatch(removeUserInfo());
      dispatch(replace(ROUTES.login));
    },
    [dispatch],
  );

  return (
    <div className={styles.container}>
      <button type="button" className="btn btn-secondary" onClick={handleLogout}>
        Logout
      </button>
      <div className={styles.button}>
        <button
          disabled={JSON.stringify(photos) === JSON.stringify(clonePhotos)}
          type="button"
          className="btn btn-primary m-3"
          onClick={handleConfirm}
        >
          Confirm
        </button>
        <button
          disabled={JSON.stringify(photos) === JSON.stringify(clonePhotos)}
          type="button"
          className="btn btn-secondary"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
      <div className={styles.infors}>
        {clonePhotos.map((item: IPhoto, index) => (
          <HomeForm
            index={index}
            key={index}
            albumId={item.albumId}
            id={item.id}
            url={item.url}
            title={item.title}
            thumbnailUrl={item.thumbnailUrl}
            setPhotoTitle={setPhotoTitle}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
