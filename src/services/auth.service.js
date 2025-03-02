// auth.service.js
import { firebaseService } from "./firebase.service";
import { languageService } from "./language.service";

export const authService = {
  async login(userId, password) {
    try {
      const userData = await firebaseService.fetchUserData(userId);
      console.log("Datos obtenidos de Firestore al login:", userData);

      if (userData && userData.password === password) {
        localStorage.setItem("currentUser", JSON.stringify(userData));
        if (userData.language) {
          languageService.setLanguage(userData.language);
          console.log(
            `Idioma establecido a: ${
              userData.language
            } (código: ${languageService.getCurrentLanguage()})`
          );
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
