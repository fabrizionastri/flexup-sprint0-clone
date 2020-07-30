import Vue from 'vue'
import { configure, addDecorator, addParameters } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import { withInfo } from 'storybook-addon-vue-info'
import { action } from '@storybook/addon-actions'
import { withA11y } from "@storybook/addon-a11y";
import Vuetify from 'vuetify'
import { VApp, VContainer, VBtn, VAutocomplete, VTextField } from 'vuetify/lib'
import colors from 'vuetify/es5/util/colors'
import 'vuetify/dist/vuetify.css';
import i18n from '~/.storybook/i18n'
import '~/plugins/globalcomponents'
import '~/plugins/directives'
import activeAccount from '~/.storybook/activeAccount'
import store from '~/.storybook/store'
import axios from 'axios'
import "@mdi/font/css/materialdesignicons.css";

const vuetifyOptions = {
  theme: {
    customVariables: ['~/assets/variables.scss'],
    dark: false,
    themes: {
      dark: {
        primary: colors.blue.darken2,
        accent: colors.grey.darken3,
        secondary: colors.amber.darken3,
        info: colors.teal.lighten1,
        warning: colors.amber.base,
        error: colors.deepOrange.accent4,
        success: colors.green.accent3
      }
    }
  },
  components: {
    VApp,
    VContainer,
    VBtn,
    VAutocomplete,
    VTextField
  }
}

Vue.use(Vuetify)

addDecorator(() => ({
  vuetify: new Vuetify(vuetifyOptions),
  i18n,
  template: `
  <v-app>
    <v-main>
      <story/>
    </v-main>
  </v-app>`
}))

// -- removes all productionTip logs from the console when running storybook
Vue.config.productionTip = false
// -- overrides nuxt-link native functionality in order to avoid navigating to an actual page
Vue.component('nuxt-link', {
  props: ['to'],
  methods: {
    log() {
      action('link target')(this.to)
    },
  },
  template: 'NuxtLink',
})

import theme from "./theme.js";
addParameters({
  options: {
    theme,
    sortStoriesByKind: true,
  }
});

// -- adds the info tab to your story
addDecorator(withInfo)
// -- adds the knob tab to your story, this allows you to play around with your component
addDecorator(withKnobs)

addDecorator(withA11y);

Vue.prototype.$store = store
Vue.prototype.$activeAccount = activeAccount
Vue.prototype.$axios = axios

// -- tells storybook where to look for stories
configure(function () {
  const req = require.context('../components/', true, /\.stories\.js$/)
  req.keys().forEach(filename => req(filename))
}, module)
