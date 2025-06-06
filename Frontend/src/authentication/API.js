export const saveToken = (token) => {
  console.log("Saving token to localStorage:", token); // ✅ Add this
  localStorage.setItem('token', token);
};
export const getToken = () => localStorage.getItem('token');
export const clearToken = () => localStorage.removeItem('token');