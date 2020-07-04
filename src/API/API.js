const devAPI = 'http://localhost:3000';
const prodAPI = 'https://arcane-wildwood-01661.herokuapp.com/';
const baseAPI = process.env.REACT_APP_ENV === 'development' ? devAPI : prodAPI;

const API = {
    api: `${baseAPI}/api`,
    // api: prodAPI,
    baseAPI
}
  