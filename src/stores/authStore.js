import { loginUser, logoutUser, registerUser } from "@/services/authService";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: null,
  }),
  actions: {
    setUserToLocalStorage(user, token) {
      this.user = user;
      this.token = token;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      console.log("User stored in localStorage:", user);
    },
    async registerUser(credentials) {
      try {
        const userData = await registerUser(credentials);
        console.log(userData);
        this.setUserToLocalStorage(userData._id, userData.token);
      } catch (error) {
        console.error("Registration failed:", error.response.data.message);
        throw error;
      }
    },
    async loginUser(credentials) {
      try {
        const userData = await loginUser(credentials);
        console.log(credentials);
        this.setUserToLocalStorage(userData._id, userData.token);
      } catch (error) {
        console.error("Login failed:", error.response.data.message);
        throw error;
      }
    },
    async logoutUser() {
      try {
        await logoutUser();
        this.user = null;
        this.token = null;
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      } catch (error) {
        console.error("Logout failed:", error.response.data.message);
        throw error;
      }
    },
    initializeFromLocalStorage() {
      const user = localStorage.getItem("user");
      const token = localStorage.getItem("token");
      if (user && token) this.setUserToLocalStorage(user, token);
    },
    setup() {
      this.initializeFromLocalStorage();
    },
  },
});
