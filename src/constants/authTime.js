import router from '../router';

export function isUserLoggedIn() {
  localStorage.removeItem('token');
  router.push('/login');
}
