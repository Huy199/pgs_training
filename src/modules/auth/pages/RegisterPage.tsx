import React, { useEffect, useState } from 'react';
import RegisterForm from '../components/RegisterForm';
import logo from '../../../logo-420-x-108.png';
import { IRegisterParams } from '../../../models/auth';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../redux/reducer';
import { Action } from 'redux';
import { fetchThunk } from '../../common/redux/thunk';
import { API_PATHS } from '../../../configs/api';
import { RESPONSE_STATUS_SUCCESS } from '../../../utils/httpResponseCode';
import { ROUTES } from '../../../configs/routes';
import { replace } from 'connected-react-router';
import { getErrorMessageResponse } from '../../../utils';

const RegisterPage = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState([]);
  const [state, setState] = useState([]);
  const [pid, setPid] = useState(Number);

  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    async function fetchLocation() {
      const json = await dispatch(fetchThunk(API_PATHS.location, 'get'));
      setLocation(json.data);
    }
    fetchLocation();
  }, []);
  console.log('location: ', location);

  useEffect(() => {
    async function fetchState() {
      const json = await dispatch(fetchThunk(API_PATHS.location + `?pid=${pid}`));
      setState(json.data);
    }
    fetchState();
  }, [pid]);

  const onChangeLocation = (pid: number) => {
    setPid(pid);
  };

  const onRegister = React.useCallback(
    async (values: IRegisterParams) => {
      setErrorMessage('');
      setLoading(true);

      const json = await dispatch(
        fetchThunk(API_PATHS.signUp, 'post', {
          email: values.email,
          password: values.password,
          repeatPassword: values.repeatPassword,
          name: values.name,
          gender: values.gender,
          region: values.region,
          state: values.state,
        }),
      );
      setLoading(false);
      if (json?.code === RESPONSE_STATUS_SUCCESS) {
        dispatch(replace(ROUTES.login));
        return;
      }

      setErrorMessage(getErrorMessageResponse(json));
    },
    [dispatch],
  );

  return (
    <div
      className="container"
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <img src={logo} alt="" style={{ maxWidth: '250px', margin: '32px' }} />

      <RegisterForm
        onChangeLocation={onChangeLocation}
        location={location}
        state={state}
        onRegister={onRegister}
        loading={loading}
        errorMessage={errorMessage}
      />
    </div>
  );
};

export default RegisterPage;
