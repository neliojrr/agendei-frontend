<template>
  <div class="pricing-panel">
    <p class="plan-title">
      {{ title }}
    </p>
    <p class="image">
      <img :alt="title" :title="title" :src="getImgUrl(image)" />
    </p>
    <p class="plan-price">
      R$
      <span v-if="annual">{{ priceAnnual }}</span>
      <span v-else>{{ price }}</span>
      /mês
      <br />
      <span v-if="annual" class="charge-period">
        Cobrado anualmente
      </span>
      <span v-else class="charge-period">
        Cobrado mensalmente
      </span>
    </p>
    <p class="plan-price has-text-primary">
      {{ subtitle }}
    </p>
    <ul class="plan-features">
      <li v-for="feature in features" :key="`${title} - ${feature}`">
        <span><font-awesome-icon icon="check"/></span>
        <span>{{ feature }}</span>
      </li>
      <li>e muito mais</li>
    </ul>
    <p class="plan-register">
      <button
        title="Experimente gratis"
        type="button"
        class="button is-primary"
        @click="goToRegister"
      >
        Teste gratuitamente por 14 dias
      </button>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    annual: {
      type: Boolean,
      default: false,
      isRequired: false
    },
    id: {
      type: Number,
      default: 1,
      isRequired: true
    },
    title: {
      type: String,
      default: 'Solo',
      isRequired: true
    },
    subtitle: {
      type: String,
      default: 'Ideal para quem trabalha sozinho',
      isRequired: true
    },
    image: {
      type: String,
      default: '../../assets/images/pricing_woman.svg',
      isRequired: false
    },
    price: {
      type: Number,
      default: 39,
      isRequired: false
    },
    priceAnnual: {
      type: Number,
      default: 31,
      isRequired: false
    },
    features: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  methods: {
    getImgUrl(img) {
      const images = require.context('../../assets/images/', false, /\.svg$/);
      return images(`./${img}`);
    },

    goToRegister() {
      this.$ga.event('Home', 'Button click', `Try plan ${this.title}`);
      this.$router.push(`/cadastrar?plan=${this.id}`);
    }
  }
};
</script>

<style lang="scss">
.pricing-panel {
  width: 100%;
  box-shadow: 0px 0px 5px #aaaaaa;
  border-radius: 5px;
  text-align: center;
  padding-top: 2em;
  padding-bottom: 2em;

  p {
    margin: auto;
    margin-bottom: 2em;
  }

  .plan-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 1em;
  }

  .image {
    height: 150px;
    width: 50%;

    img {
      height: 100%;
    }
  }

  .plan-price {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 1em;

    span {
      font-size: 36px;
    }

    .charge-period {
      font-size: 14px;
    }
  }

  .plan-features {
    margin-top: 2em;
    list-style: none;

    li {
      margin-bottom: 0.5em;
      display: flex;
      justify-content: center;

      span {
        width: 10%;
        text-align: right;
        margin-right: 5%;
        margin-left: 15%;
      }

      span + span {
        text-align: left;
        margin-left: 5%;
        margin-right: 0;
        width: 60%;
      }
    }
  }

  .plan-register {
    margin-top: 2em;
  }
}
</style>
