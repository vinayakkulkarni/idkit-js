import { setVueInstance } from './utils/config';
import { App as Application, Plugin } from 'vue';
import IdKitWidget from './components/IdKitWidget.vue';

let installed = false;

const install: Exclude<Plugin['install'], undefined> = (app: Application) => {
  if (!installed) {
    setVueInstance(app);
    app.component('IdKitWidget', IdKitWidget);
    installed = true;
  }
};

export default install;
