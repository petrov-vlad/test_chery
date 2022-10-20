// --------------------------- [[ Styles ]] ---------------------------

import '../scss/style.scss';

// --------------------------- [[ Scripts ]] --------------------------

// Plugins
import Vue from 'vue';
import VueScrollTo from 'vue-scrollto';
import VeeValidate, { Validator } from 'vee-validate';
import messagesRU from 'vee-validate/dist/locale/ru';
import VueTheMask from 'vue-the-mask';
// import { EventBus } from './eventbus';
import YmapPlugin from 'vue-yandex-maps';
import YandexMap from '../components/yandex-map/component.vue';
import RequestForm from '../components/request-form/component.vue';
import Swiper from '../../node_modules/swiper/swiper-bundle.min';

// Icons
const svgModules = require.context('../img/icons', false, /\.svg$/);
svgModules.keys().forEach(svgModules);

// Yandex Map Settings
const settings = {
  apiKey: '776d6610-282f-49cc-aa79-65360ee42c00', // !! вставить API ключ
  lang: 'ru_RU',
  coordorder: 'latlong',
  version: '2.1',
};

Vue.config.productionTip = false;
Vue.config.devtools = false;

// Plugins init
Vue.use(VueScrollTo);
Vue.use(VueTheMask);
Validator.localize('ru', messagesRU);
Vue.use(VeeValidate, {
  locale: 'ru',
  events: 'input|blur',
});
Vue.use(YmapPlugin, settings);

// Base Vue component
new Vue({
  // eslint-disable-line no-new
  el: '#content-wrapper',
  components: {
    RequestForm,
    YandexMap,
  },
  data() {
    return {
      currentModel: '',
      canReturnToTop: false,
    };
  },
  mounted() {
    const th = this;
    const storeEl = document.querySelector('#store');
    const otherEl = document.querySelector('#other');
    const modelsListEl = document.querySelectorAll('.tabs');
    const menu = document.querySelector('#tabs-menu');
    let storeElPosition = storeEl.getBoundingClientRect().top;

    if (storeEl) {
      const models = [];
      const modelsStore = storeEl.querySelectorAll('[data-model-id]');

      modelsListEl.forEach((model) => {
        model.querySelectorAll('[data-model-id]').forEach((item) => {
          models.push(item);
        });
      });

      models.forEach((model) => {
        model.addEventListener('click', () => {
          const index = model.getAttribute('data-model-id');

          th.currentModel = index;

          models.forEach((item) => {
            if (item.getAttribute('data-model-id') === index) {
              item.classList.add('active');
            } else {
              item.classList.remove('active');
            }
          });

          modelsStore.forEach((item) => {
            if (item.getAttribute('data-model-id') === index) {
              item.classList.remove('hidden');
              VueScrollTo.scrollTo(item, 500, {
                offset: -100,
              });
            } else {
              item.classList.add('hidden');
            }
          });
        });
      });
    }

    if (otherEl) {
      const models = otherEl.querySelectorAll('[data-model-id]');
      const modelsStore = storeEl.querySelectorAll('[data-model-id]');

      models.forEach((model) => {
        model.addEventListener('click', () => {
          const index = model.getAttribute('data-model-id');

          th.currentModel = index;

          modelsStore.forEach((item) => {
            if (item.getAttribute('data-model-id') === index) {
              item.classList.remove('hidden');
              // VueScrollTo.scrollTo(item, 500, {
              //   offset: -50,
              // });
            } else {
              item.classList.add('hidden');
            }
          });
        });
      });
    }

    // Change color in stock
    const paletteItems = document.querySelectorAll('.car-card__color');

    paletteItems.forEach((paletteItem) => {
      paletteItem.addEventListener('click', () => {
        const colorName = paletteItem.getAttribute('data-color-name');
        const parentItem = paletteItem.closest('.car-card').querySelector('.car-card__slider');
        const picItem = parentItem.querySelector('img');
        const currentColor = picItem.getAttribute('data-color-name');
        const imagePath = picItem.getAttribute('src').replace(currentColor, colorName);
        const imagePathSS = picItem.getAttribute('srcset').replace(currentColor, colorName);

        picItem.setAttribute('src', imagePath);
        picItem.setAttribute('srcset', imagePathSS);
        picItem.setAttribute('data-color-name', colorName);

        paletteItems.forEach((i) => {
          i.classList.remove('is-active');
        });
        paletteItem.classList.add('is-active');
      });
    });

    // To top scroll button
    window.addEventListener('scroll', () => {
      th.canReturnToTop = window.pageYOffset > document.documentElement.clientHeight;
      storeElPosition = storeEl.getBoundingClientRect().top;
      if (window.pageYOffset >= storeElPosition) {
        menu.style.top = '0';
      } else {
        menu.style.top = '-10rem';
      }
    });
  },
  methods: {
    modalOpen(data) {
      this.$emit('openRequestForm', {
        title: data.title,
        target: data.target,
        gtm_name: data.gtm_name,
        yandex_id: data.yandex_id,
      });
    },
  },
});

new Swiper('.swiper', {
  direction: 'vertical',
  slidesPerView: 4,
  spaceBetween: 5,
  loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});
