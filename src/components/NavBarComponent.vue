<template>
  <nav class="navbar">
    <div class="navbar-container">
      <!-- Logo/Brand -->
      <router-link to="/" class="navbar-brand">
        <span class="logo-icon">B</span>
        <span class="logo-text">LOG APP</span>
      </router-link>

      <!-- Search Bar (visible on all pages except auth pages) -->
      <div class="navbar-search" v-if="showSearch">
        <SearchComponent />
      </div>

      <!-- Navigation Links -->
      <div class="navbar-links">
        <!-- Guest Links -->
        <template v-if="!user">
          <router-link
            to="/register"
            class="nav-link"
            v-if="route.name !== 'register'"
          >
            <span class="link-icon">👤</span>
            <span class="link-text">Register</span>
          </router-link>

          <router-link
            to="/login"
            class="nav-link"
            v-if="route.name !== 'login'"
          >
            <span class="link-icon">🔑</span>
            <span class="link-text">Login</span>
          </router-link>
        </template>

        <!-- Authenticated Links -->
        <template v-if="user">
          <router-link
            to="/posts/add"
            class="nav-link accent"
            v-if="route.name !== 'addPost'"
          >
            <span class="link-icon">✏️</span>
            <span class="link-text">Add Post</span>
          </router-link>

          <button class="nav-link logout" @click="logout">
            <span class="link-icon">🚪</span>
            <span class="link-text">Logout</span>
          </button>
        </template>
      </div>
    </div>
  </nav>
</template>
  
  <script setup>
import { ref, watch, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import SearchComponent from "./UI/SearchComponent.vue";

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();
const user = ref(null);

// Hide search on auth pages
const showSearch = computed(() => {
  return !["login", "register"].includes(route.name);
});

watch(
  () => authStore.user,
  (currentUser) => {
    user.value = currentUser;
  },
  { immediate: true }
);

const logout = async () => {
  try {
    await authStore.logoutUser();
    router.push("/");
  } catch (error) {
    console.error("Logout failed:", error);
  }
};
</script>
  
  <style scoped>
/* ===== Base Styles ===== */
.navbar {
  background: linear-gradient(135deg, #1a535c 0%, #0d2b36 100%);
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 80%;
  margin: 1.5rem auto;
}

.navbar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 5rem;
  max-width: 1400px;
  margin: 0 auto;
}

/* ===== Brand/Logo ===== */
.navbar-brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
}

.logo-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  background: #4ade80;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  border-radius: 50%;
}

.logo-text {
  font-size: 1.8rem;
  font-weight: 700;
  color: white;
  letter-spacing: 0.5px;
}

/* ===== Search ===== */
.navbar-search {
  flex: 1;
  max-width: 500px;
  margin: 0 2rem;
}

/* ===== Navigation Links ===== */
.navbar-links {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  border-radius: 0.5rem;
  text-decoration: none;
  color: white;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.2s ease;
  background: transparent;
  border: none;
  cursor: pointer;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.nav-link.accent {
  background: #4ade80;
  color: #1e494a;
}

.nav-link.accent:hover {
  background: #3bd171;
  box-shadow: 0 2px 8px rgba(74, 222, 128, 0.3);
}

.nav-link.logout:hover {
  background: rgba(239, 68, 68, 0.2);
  color: #ef4444;
}

.link-icon {
  font-size: 1.2rem;
}

.link-text {
  font-size: 1rem;
}

/* Active route indicator */
.router-link-exact-active {
  position: relative;
}

.router-link-exact-active::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 50%;
  height: 2px;
  background: #4ade80;
}

/* ===== Responsive Design ===== */
@media (max-width: 1024px) {
  .navbar-container {
    flex-wrap: wrap;
    height: auto;
    padding: 1rem 0;
    gap: 1rem;
  }

  .navbar-brand {
    order: 1;
  }

  .navbar-search {
    order: 3;
    width: 100%;
    max-width: 100%;
    margin: 0.5rem 0;
  }

  .navbar-links {
    order: 2;
    margin-left: auto;
  }
}

@media (max-width: 768px) {
  .navbar {
    max-width: 95%;
  }

  .link-text {
    display: none;
  }

  .nav-link {
    padding: 0.75rem;
  }

  .logo-text {
    font-size: 1.5rem;
  }
}
</style>