import { APIHost } from '../utils/constants';

enum APIService {
  auth,
  protected,
  public,
}

function getBaseUrl(service: APIService) {
  if (service === APIService.auth) {
    return `${APIHost}/auth`;
  } else if (service === APIService.protected) {
    return `${APIHost}/protected`;
  } else if (service === APIService.public) {
    return `${APIHost}`;
  }

  return '';
}

export const API_PATHS = {
  signIn: `${getBaseUrl(APIService.auth)}/login`,
  signUp: `${getBaseUrl(APIService.auth)}/register`,
  location: `${getBaseUrl(APIService.public)}/location`,
  userProfile: `${getBaseUrl(APIService.public)}/user`,
  photo: 'https://jsonplaceholder.typicode.com/photos',
};
