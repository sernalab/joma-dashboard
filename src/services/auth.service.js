// auth.service.js
import { firebaseService } from "./firebase.service";
import { languageService } from "./language.service";

export const authService = {
  async login(userId, password) {
    try {
      const userData = await firebaseService.fetchUserData(userId);

      if (userData && userData.password === password) {
        localStorage.setItem("currentUser", JSON.stringify(userData));
        if (userData.language) {
          languageService.setLanguage(userData.language);
        }
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

  getCurrentUser() {
    const userJson = localStorage.getItem("currentUser");
    return userJson ? JSON.parse(userJson) : null;
  },
};
