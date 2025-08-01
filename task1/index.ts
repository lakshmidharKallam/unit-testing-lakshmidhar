import { fetchIsUserNameAvailable } from 'tasks/task1/fetchIsUserNameValid';

export const validateUserName = async (userName: string): Promise<boolean> => {
  if (!/^[a-zA-Z][0-9a-zA-Z]{2,}$/.test(userName)) {
    return false;
  }

  try {
    // this should be "await" fetchIsUserNameAvailable as we are getting a promise
    return await fetchIsUserNameAvailable(userName);
  } catch (e) {
    return false;
  }
};
