<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { RouterView, useRoute, useRouter } from 'vue-router'
import { useGlobalStore } from '@/stores/global'
import { storeToRefs } from 'pinia';
import { getPermissions } from './service'
import { processRoutes, getRouteData } from './router';
import { RouteIds } from './permissions/routerConfig';

const { index } = RouteIds;

const router = useRouter()

const globaStore = useGlobalStore()
const { permissions, token } = storeToRefs(globaStore)

watch((() => {
  return token.value
}), async (value, oldValue) => {
  if (value && !oldValue) {
    // 如果token存在，说明已经登录
    const isHasPermissions = permissions.value;
    const isLoginPage = window.location.pathname == "/";
    // 判断有没有权限
    if (!isHasPermissions) {
      await getPermissions().then((res) => {
        globaStore.setPermissions(res.data)
        processRoutes(res.data).then((menuData) => {
          globaStore.setMenuData(menuData)
        })
      })
    } else {
      processRoutes(permissions.value!).then((menuData) => {
        globaStore.setMenuData(menuData)
      })
    }
    if (isLoginPage) {
      router.push(getRouteData(index).path)
    }
  }
  if(!value){
    router.push('/')
  }
})

onMounted(async () => {
  // 如果token存在，说明已经登录
  const token = sessionStorage.getItem('ACCESS_TOKEN')
  const isLoginPage = window.location.pathname == "/";
  if (token) {
    globaStore.setToken(token)
  } else {
    // 如果没登录，还不是登录页，直接返回登录
    if (!isLoginPage) {
      router.push('/')
    }
  }
})

</script>

<template>
  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {

    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
