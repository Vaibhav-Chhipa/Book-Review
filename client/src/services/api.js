// import axios from 'axios';

// const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api' });

// api.interceptors.request.use((config) => {
//   const user = JSON.parse(localStorage.getItem('br_user'));
//   if (user?.token) config.headers.Authorization = `Bearer ${user.token}`;
//   return config;
// });

// export default api;

// client/src/services/api.js
// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://localhost:5000/api',   //  👈  absolute backend URL
// });

// export default api;
import axios from 'axios';
const api = axios.create({ baseURL: 'http://localhost:5000/api' });
api.interceptors.request.use((c)=>{const u=JSON.parse(localStorage.getItem('br_user'));if(u?.token) c.headers.Authorization=`Bearer ${u.token}`;return c;});
export default api;
