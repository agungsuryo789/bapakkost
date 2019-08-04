import axios from 'axios'
import VueAxios from 'vue-axios'
 
Vue.use(VueAxios, axios)

const api = axios.create({
    baseURL: 'https://some-domain.com/api/',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
  });
