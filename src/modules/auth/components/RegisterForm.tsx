import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { IRegisterParams, IRegisterValidation } from '../../../models/auth';
import { validateRegister, validRegister } from '../utils';
import { ILocation, IState } from '../../../models/location';

interface Props {
  onRegister(values: IRegisterParams): void;
  onChangeLocation(id: number): void;
  loading: boolean;
  errorMessage: string;
  location: ILocation[];
  state: IState[];
}

const RegisterForm = (props: Props) => {
  const { onRegister, onChangeLocation, loading, errorMessage, location, state } = props;
  console.log('location: ', location);
  const [checkGender, setCheckGender] = useState(Boolean);
  const [formValues, setFormValues] = React.useState<IRegisterParams>({
    email: '',
    password: '',
    repeatPassword: '',
    name: '',
    gender: 'male',
    region: 0,
    state: 0,
  });
  const [validate, setValidate] = React.useState<IRegisterValidation>();

  const handleGenderMale = () => {
    setCheckGender(true);
    setFormValues({ ...formValues, gender: 'male' });
  };

  const handleGenderFeMale = () => {
    setCheckGender(false);
    setFormValues({ ...formValues, gender: 'female' });
  };

  const onSubmit = React.useCallback(() => {
    const validate = validateRegister(formValues);

    setValidate(validate);
    if (!validRegister(validate)) {
      return;
    }

    onRegister(formValues);
  }, [formValues, onRegister]);

  const handleRegion = (e: any) => {
    setFormValues({ ...formValues, region: Number(e.target.value) });
    onChangeLocation(Number(e.target.value));
  };

  const handleState = (e: any) => {
    setFormValues({ ...formValues, state: Number(e.target.value) });
  };

  return (
    <form
      style={{ maxWidth: '560px', width: '100%' }}
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="row g-3 needs-validation"
    >
      {!!errorMessage && (
        <div className="alert alert-danger" role="alert" style={{ width: '100%' }}>
          {errorMessage}
        </div>
      )}

      <div className="col-md-12">
        <label htmlFor="inputEmail" className="form-label">
          <FormattedMessage id="email" />
        </label>
        <input
          type="text"
          className="form-control"
          id="inputEmail"
          value={formValues.email}
          onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
        />

        {!!validate?.email && (
          <small className="text-danger">
            <FormattedMessage id={validate?.email} />
          </small>
        )}
      </div>

      <div className="col-md-12">
        <label htmlFor="inputName" className="form-label">
          <FormattedMessage id="name" />
        </label>
        <input
          type="text"
          className="form-control"
          id="inputName"
          value={formValues.name}
          onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
        />

        {!!validate?.name && (
          <small className="text-danger">
            <FormattedMessage id={validate?.name} />
          </small>
        )}
      </div>

      <div className="col-md-12">
        <label htmlFor="inputRegion" className="form-label">
          <FormattedMessage id="region" />
        </label>

        <select className="form-control" onChange={handleRegion}>
          {location.map((location: ILocation, index) => (
            <option key={index} value={location.id}>
              {location.name}
            </option>
          ))}
        </select>
      </div>
      <div className="col-md-12">
        <label htmlFor="inputState" className="form-label">
          <FormattedMessage id="state" />
        </label>

        <select className="form-control" onChange={handleState}>
          {state.map((state: IState, index) => (
            <option key={index} value={state.id}>
              {state.name}
            </option>
          ))}
        </select>
      </div>

      <div className="col-md-12">
        <label htmlFor="inputPassword" className="form-label">
          <FormattedMessage id="password" />
        </label>
        <input
          type="password"
          className="form-control"
          id="inputPassword"
          value={formValues.password}
          onChange={(e) => setFormValues({ ...formValues, password: e.target.value })}
        />

        {!!validate?.password && (
          <small className="text-danger">
            <FormattedMessage id={validate?.password} />
          </small>
        )}
      </div>

      <div className="col-md-12">
        <label htmlFor="repeatPassword" className="form-label">
          <FormattedMessage id="repeatPassword" />
        </label>
        <input
          type="password"
          className="form-control"
          id="repeatPassword"
          value={formValues.repeatPassword}
          onChange={(e) => setFormValues({ ...formValues, repeatPassword: e.target.value })}
        />

        {!!validate?.repeatPassword && (
          <small className="text-danger">
            <FormattedMessage id={validate?.repeatPassword} />
          </small>
        )}
      </div>
      <div className="col-md-12">
        <label className="form-label">
          <FormattedMessage id="gender" />
        </label>
        <div className="d-flex">
          <div className="form-check" style={{ marginRight: '16px' }}>
            <input
              className="form-check-input"
              type="radio"
              name="male"
              value="male"
              checked={checkGender}
              onClick={handleGenderMale}
            />
            <label className="form-check-label">Nam</label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="female"
              value="female"
              checked={!checkGender}
              onClick={handleGenderFeMale}
            />
            <label className="form-check-label">Nữ</label>
          </div>
        </div>
      </div>

      <div className="row justify-content-md-center" style={{ margin: '16px 0' }}>
        <div className="col-md-auto">
          <button
            className="btn btn-primary"
            type="submit"
            style={{ minWidth: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            disabled={loading}
          >
            {loading && <div className="spinner-border spinner-border-sm text-light mr-2" role="status" />}
            <FormattedMessage id="register" />
          </button>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
