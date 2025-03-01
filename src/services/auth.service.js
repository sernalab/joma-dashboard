// auth.service.js
import { firebaseService } from "./firebase.service";

export const authService = {
  async login(userId, password) {
    try {
      const userData = await firebaseService.fetchUserData(userId);

      if (userData && userData.password === password) {
        localStorage.setItem("currentUser", JSON.stringify(userData));
        return userData;
      }

      throw new Error("Credenciales inválidas");
    } catch (error) {
      throw error;
    }
  },

  isAuthenticated() {
    return localStorage.getItem("currentUser") !== null;
  },

  logout() {
    localStorage.removeItem("currentUser");
  },
};
