import { firebaseService } from "./firebase.service";

export const authService = {
  async login(userId, password) {
    try {
      const users = await firebaseService.fetchBetaData();
      const user = users.find(
        (u) => u.id === userId && u.password === password
      );

      if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        return user;
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
