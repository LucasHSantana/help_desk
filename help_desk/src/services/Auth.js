// import api from './Api';

const TOKEN_KEY = 'login_token';
const IV_KEY = 'iv_token'

export const isAuthenticated = async () => {
  //Verifica com o servidor se o token é válido
  // const config = {
  //   headers: {
  //       token: localStorage.getItem(TOKEN_KEY),
  //       iv: localStorage.getItem(IV_KEY)
  //   }
  // }

  // const response = await api.post('/testeDecrypt', '', config); 
  
  // if (response.data.result === 1){
  //   return response.data.decoded;
  // } else {
  //   return false;
  // }
  return true;
  
};

export const login = (token, iv) => {
  //Grava o token e o iv no localStorage do navegador
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(IV_KEY, iv);
};

export const logout = () => {
  //Remove o token e iv do local storage do navegador
  localStorage.removeItem(TOKEN_KEY);
}; 