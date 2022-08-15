export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.tokens) {
      // for Node.js Express back-end
      return { 'x-access-token': user.tokens.access.token };
    } else {
      return {};
    }
  }