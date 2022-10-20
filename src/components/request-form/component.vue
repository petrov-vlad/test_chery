<template>
  <div
    v-if="show || !modal"
    :class="{ 'request-form': !modal, 'request-form modal': show }"
  >
    <div class="request-form__wrapper">
      <form
        class="request-form__content"
        :class="{ 'sended' : success, 'error' : error, 'loading' : loading }"
        @submit.prevent="sendForm"
      >
        <span
          class="request-form__close"
          @click="closeModal"
        >
          <svg><use xlink:href="#close-i" /></svg>
        </span>

        <div class="request-form__title">
          <template v-if="!modal">
            Заявка на покупку Chery
          </template>
          <template v-else>
            {{ title ? title : 'Обратный звонок' }}
          </template>
        </div>

        <div class="request-form__fields">
          <div class="request-form__field">
            <input
              v-model="userData.name"
              v-validate="'required|alpha_spaces|min:2|max:32'"
              data-vv-as="«Имя»"
              type="text"
              name="name"
              placeholder="Имя"
              class="request-form__input"
              :class="{'is-danger': errors.has('name') }"
            >
            <span
              v-show="errors.has('name')"
              class="is-danger"
            >{{ errors.first('name') }}</span>
          </div>
          <div class="request-form__field">
            <input
              v-model="userData.phone"
              v-mask="'+7 (###) ###-##-##'"
              v-validate="'required|min:18'"
              data-vv-as="«Телефон»"
              type="text"
              name="phone"
              placeholder="+7 ("
              class="request-form__input"
              :class="{'is-danger': errors.has('phone') }"
              @focus="setStartInput"
            >
            <span
              v-show="errors.has('phone')"
              class="is-danger"
            >Поле «Телефон» должно включать 11&nbsp;цифр.</span>
          </div>
          <div class="request-form__agreement">
            <div
              class="c-checkbox"
              :class="{'is-danger': errors.has('agreement') }"
            >
              <input
                id="agreement--03"
                v-model="userData.agreement"
                v-validate="'required'"
                type="checkbox"
                name="agreement"
                class="c-checkbox__input"
              >
              <label
                for="agreement--03"
                class="c-checkbox__text"
              >Я согласен с <a
                href="/privacy-policy.html"
                target="_blank"
              >правилами обработки</a>
                персональных данных</label>
            </div>
            <span
              v-show="errors.has('agreement')"
              class="is-danger"
            >Необходимо согласиться с правилами обработки персональных данных.</span>
          </div>
        </div>
        <button class="btn btn_wide request-form__btn">
          Отправить
        </button>

        <div class="sended-info">
          <div class="sended-info__ico">
            <img :src="require('@/img/icons/success-g.svg')">
          </div>
          <div class="sended-info__title">
            Заявка успешно отправлена
          </div>
          <div class="sended-info__text">
            Мы свяжемся с Вами в&nbsp;ближайшее время!
          </div>
        </div>
        <div class="error-info">
          <div class="sended-info__ico">
            <img :src="require('@/img/icons/error-g.svg')">
          </div>
          <div class="sended-info__title">
            Отправка не удалась
          </div>
          <div class="sended-info__text">
            Сервис не смог обработать Вашу заявку. Пожалуйста, попробуйте позднее
            , или свяжитесь с нами самостоятельно.
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { disablePageScroll, enablePageScroll } from 'scroll-lock';

export default {
  props: {
    model: {
      type: String,
      default() {
        return 'Unknown';
      },
    },
    modal: {
      type: Boolean,
      default() {
        return true;
      },
    },
  },
  data() {
    return {
      show: false,
      loading: false,
      success: false,
      error: false,
      title: '',
      gtm_name: '',
      yandex_id: '',
      userData: {
        name: '',
        phone: '',
        target: '',
        agreement: true,
      },
    };
  },
  created() {
    if (this.modal) {
      this.$root.$on('openRequestForm', this.openModal);
    }
  },
  methods: {
    setStartInput() {
      if (!this.userData.phone.length) {
        this.userData.phone = ' (';
      }
    },
    closeModal() {
      this.success = false;
      this.error = false;
      this.loading = false;
      this.show = false;
      enablePageScroll();
    },
    openModal(objData) {
      disablePageScroll();

      if (objData.gtm_name) {
        window.dataLayer = window.dataLayer || [];

        window.dataLayer.push({
          event: objData.gtm_name,
        });

        // eslint-disable-next-line
        // console.log(`dataLayer: ${JSON.stringify(window.dataLayer[window.dataLayer.length - 1])}`);
      }

      if (objData.yandex_id) {
        this.yandex_id = objData.yandex_id;
      }

      if (objData.title) {
        this.title = objData.title;
      } else {
        this.title = 'Заявка на обратный звонок';
      }

      if (objData.target) {
        this.userData.target = objData.target;
      } else {
        this.userData.target = 'Заявка на обратный звонок';
      }

      this.show = true;
    },
    sendForm() {
      const th = this;
      this.loading = true;

      this.$validator.validateAll().then((result) => {
        if (result) {
          const sendObj = {
            name: this.userData.name,
            phone: this.userData.phone,
            type: 'Новые автомобили',
            model: 'Chery',
            target: this.userData.target,
          };

          try {
            axios.post('send.php', {
              name: sendObj.name,
              phone: sendObj.phone.replace(/\s*/g, ''),
              type: sendObj.type,
              model: sendObj.model,
              target: sendObj.target,
            })
              .then((response) => {
                console.log(response);
                if (response.data === 'Success') {
                  th.loading = false;
                  th.success = true;

                  try {
                    Comagic.addOfflineRequest({ // eslint-disable-line no-undef
                      name: sendObj.name,
                      phone: sendObj.phone.replace(/\s*/g, ''),
                      message: `${sendObj.target};
                      Отправлено со страницы: ${window.location}`,
                    });
                  } catch (err) {
                    console.warn(`Отправка в CoMagic не удалась. Причина: ${err}. Пожалуйста, проверьте успешную установку CoMagic на странице.`); // eslint-disable-line no-console
                  }
                  try {
                    window.ctw.createRequest(
                      'form_1',
                      sendObj.phone.replace(/[^+\d]/g, '').replace('+', ''),
                      [
                        {
                          name: 'Name',
                          value: sendObj.name,
                        },
                        {
                          name: 'Target',
                          value: sendObj.target,
                        },
                      ],
                      (success, data) => {
                        console.log(success, data);
                        if (success) {
                          console.log(`Создана заявка на колбек, идентификатор: ${data.callbackRequestId}`);
                        } else {
                          switch (data.type) {
                            case 'request_throttle_timeout':
                            case 'request_throttle_count':
                              console.log('Достигнут лимит создания заявок, попробуйте позже');
                              break;
                            case 'request_phone_blacklisted':
                              console.log('номер телефона находится в черном списке');
                              break;
                            case 'validation_error':
                              console.log('были переданы некорректные данные');
                              break;
                            default:
                              console.log(`Во время выполнения запроса произошла ошибка: ${data.type}`);
                          }
                        }
                      },
                    );
                  } catch (err) {
                    console.warn(`Отправка в CallTouch не удалась. Причина: ${err}.`);
                  }

                  if (this.yandex_id.length > 0) {
                    window.ym(89894355, 'reachGoal', this.yandex_id);
                  }

                  th.clearForm();
                  th.$validator.reset();
                } else {
                  th.loading = false;
                  th.error = true;
                }
              })
              .catch((error) => {
                console.log(error);
                th.loading = false;
                th.error = true;
              });
          } catch (err) {
            th.loading = false;
            console.warn(`Отправка не удалась. Причина: ${err}`);
          }
        } else {
          th.loading = false;
        }
      });
    },
    clearForm() {
      this.userData.name = '';
      this.userData.phone = '';
      this.userData.target = '';
    },
  },
};
</script>
