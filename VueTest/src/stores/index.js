import { store } from 'quasar/wrappers'
import { createPinia } from 'pinia'
import piniaPluginPersistedState from "pinia-plugin-persistedstate"

export default store(() => {
  const pinia = createPinia()
  pinia.use(piniaPluginPersistedState)
  return pinia
})
