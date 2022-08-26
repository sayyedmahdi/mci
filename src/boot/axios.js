import { boot } from "quasar/wrappers";
import axios from "axios";
import { Cookies } from 'quasar';

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)

const api = axios.create({ baseURL: "https://mci.innovo-services.de/api/" });
//const api = axios.create({ baseURL: "http://localhost:180/mci/api/" });
axios.defaults.headers.common['Content-Type'] = 'application/json';
api.defaults.headers.common['Content-Type'] = 'application/json';
let token = Cookies.get('mcisitetoken')
// console.log('Token = ' + token)
if (token) {
  axios.defaults.headers.common['Token'] = token
  api.defaults.headers.common['Token'] = token
}

// check unauthorized response (401)
axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  // if unauthorized (401)
  if (error.response.status === 401) {
    // remove the token cookie
    Cookies.remove('mcisitetoken')
    // redirect to /login
    window.location.replace('/login')
  }
  return Promise.reject(error)
})

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api };
