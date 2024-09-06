import Vue3ColorPicker from "vue3-colorpicker";
import { createApp } from 'vue'
import './scss/style.scss'
import App from './App.vue'

const app = createApp(App)

const components = import.meta.glob('./components/UI/App*.vue', { eager: true });
    Object.keys(components).forEach((path) => {
    const name = path.match(/\.\/components\/UI\/(.*)\.vue$/)[1];
    const component = components[path].default;
    app.component(name, component);
});

app.use(Vue3ColorPicker).mount('#app')
