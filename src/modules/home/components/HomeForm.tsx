import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import styles from '../homePage.module.scss';

interface Props {
  index: number;
  albumId: Number;
  id: Number;
  title: string;
  url: string;
  thumbnailUrl: string;
  setPhotoTitle(index: number, value: string): void;
}

const HomeForm = (props: Props) => {
  const { albumId, id, url, title, thumbnailUrl, setPhotoTitle, index } = props;
  const [name, setName] = useState('');
  const [check, setCheck] = useState(true);
  const [isLabel, setIsLabel] = useState(true);
  const inputRef = useRef<any>();

  const handleOnChange = useCallback(
    (e) => {
      setPhotoTitle(index, e.target.value);
    },
    [setPhotoTitle, index],
  );

  useEffect(() => {
    if (isLabel === false) {
      inputRef.current?.focus();
    }
  }, [isLabel]);

  return (
    <div className={styles.infor}>
      <div className={styles.images}>
        <img className={styles.image} src={url}></img>
      </div>
      <div className={styles.details}>
        <h5>{Date.now()}</h5>
        {isLabel ? (
          <div className={styles.label + ' form-control'} onClick={() => setIsLabel(false)}>
            {title}
          </div>
        ) : (
          <input
            ref={inputRef}
            name="name"
            value={title}
            className={styles.name + ' form-control'}
            type="text"
            onChange={handleOnChange}
            onBlur={() => setIsLabel(true)}
          />
        )}
      </div>
    </div>
  );
};

export default memo(HomeForm);
