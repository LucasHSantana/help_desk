const TOKEN_KEY = 'login_token';
const IV_KEY = 'iv_token'

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const login = (token, iv) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(IV_KEY, iv);
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};