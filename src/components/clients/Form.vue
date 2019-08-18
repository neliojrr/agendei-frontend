<template>
  <div class="client-form">
    <b-tabs v-model="activeTab">
      <b-tab-item label="Detalhes">
        <div class="field">
          <div class="client-photo">
            <figure class="image is-128x128">
              <img
                v-if="client.avatar && client.avatar.path"
                class="is-rounded user-avatar"
                :src="client.avatar.path"
              />
              <div
                v-else
                class="empty-photo has-background-grey-lighter has-text-white has-text-weight-semibold"
              >
                {{ client.name ? client.name.substring(0, 1) : '' }}
              </div>
              <b-loading
                :is-full-page="false"
                :active.sync="isLoading"
                :can-cancel="false"
              >
              </b-loading>
            </figure>
            <input
              type="file"
              ref="avatar"
              style="display: none"
              @change="setAvatar"
            />
            <button class="button is-text" @click="$refs.avatar.click()">
              Adicionar foto
            </button>
          </div>
        </div>
        <div class="field">
          <label class="label">Nome</label>
          <div class="control">
            <input
              class="input"
              :class="{ 'is-danger': errors.name }"
              type="text"
              placeholder="Lucia Maria"
              v-model="client.name"
            />
          </div>
          <p
            v-for="message in errors.name"
            :key="message"
            class="help is-danger"
          >
            {{ message }}
          </p>
        </div>
        <div class="field columns">
          <div
            class="control is-expanded column"
            :class="{ 'is-danger': errors.email }"
          >
            <label class="label">Email</label>
            <input
              class="input"
              :class="{ 'is-danger': errors.email }"
              type="email"
              placeholder="email@exemplo.com"
              v-model="client.email"
            />
            <p
              v-for="message in errors.email"
              :key="message"
              class="help is-danger"
            >
              {{ message }}
            </p>
          </div>
          <div class="control is-expanded column">
            <label class="label">Telefone</label>
            <input
              class="input"
              :class="{ 'is-danger': errors.phone }"
              type="tel"
              placeholder="64999900000"
              v-model="client.phone"
            />
            <p
              v-for="message in errors.phone"
              :key="message"
              class="help is-danger"
            >
              {{ message }}
            </p>
          </div>
        </div>
        <div class="field columns">
          <div
            class="control is-expanded column"
            :class="{ 'is-danger': errors.phone }"
          >
            <label class="label">Gênero</label>
            <div class="select is-fullwidth">
              <select v-model="client.gender">
                <option value="female">Feminino</option>
                <option value="male">Masculino</option>
                <option value="none">Não binario</option>
              </select>
            </div>
          </div>
          <div class="control is-expanded column">
            <label class="label">Data nascimento</label>
            <imask-input
              :value="birthday"
              :mask="Date"
              :unmask="true"
              @accept="onAccept"
              placeholder="01/10/1987"
              class="input"
            />
            <p
              v-for="message in errors.birth"
              :key="message"
              class="help is-danger"
            >
              {{ message }}
            </p>
          </div>
        </div>
      </b-tab-item>
      <b-tab-item label="Endereço">
        <div class="field">
          <label class="label">Endereço</label>
          <div class="control">
            <input
              class="input"
              :class="{ 'is-danger': errors.address }"
              type="text"
              placeholder="Rua das Flores, 134"
              v-model="client.address"
            />
          </div>
          <p v-if="errors.address" class="help is-danger">
            {{ errors.address }}
          </p>
        </div>
        <div class="field columns">
          <div class="control is-expanded column">
            <label class="label">Bairro</label>
            <input
              class="input"
              :class="{ 'is-danger': errors.neighborhood }"
              type="text"
              placeholder="Setor Oeste"
              v-model="client.neighborhood"
            />
            <p v-if="errors.neighborhood" class="help is-danger">
              {{ errors.neighborhood }}
            </p>
          </div>
          <div class="control is-expanded column">
            <label class="label">CEP</label>
            <input
              class="input"
              :class="{ 'is-danger': errors.zip_code }"
              type="text"
              placeholder="72030-201"
              v-model="client.zip_code"
            />
            <p v-if="errors.zip_code" class="help is-danger">
              {{ errors.zip_code }}
            </p>
          </div>
        </div>
        <div class="field columns">
          <div class="control is-expanded column is-four-fifths">
            <label class="label">Cidade</label>
            <input
              class="input"
              :class="{ 'is-danger': errors.city }"
              type="text"
              placeholder="Rio de Janeiro"
              v-model="client.city"
            />
            <p v-if="errors.city" class="help is-danger">{{ errors.city }}</p>
          </div>
          <div
            class="control is-expanded column"
            :class="{ 'is-danger': errors.city }"
          >
            <label class="label">Estado</label>
            <div class="select is-fullwidth">
              <select v-model="client.state">
                <option value="AC">AC</option>
                <option value="AL">AL</option>
                <option value="AM">AM</option>
                <option value="AP">AP</option>
                <option value="BA">BA</option>
                <option value="CE">CE</option>
                <option value="DF">DF</option>
                <option value="ES">ES</option>
                <option value="GO">GO</option>
                <option value="MA">MA</option>
                <option value="MG">MG</option>
                <option value="MS">MS</option>
                <option value="MT">MT</option>
                <option value="PA">PA</option>
                <option value="PB">PB</option>
                <option value="PE">PE</option>
                <option value="PI">PI</option>
                <option value="PR">PR</option>
                <option value="RJ">RJ</option>
                <option value="RN">RN</option>
                <option value="RS">RS</option>
                <option value="RO">RO</option>
                <option value="RR">RR</option>
                <option value="SC">SC</option>
                <option value="SE">SE</option>
                <option value="SP">SP</option>
                <option value="TO">TO</option>
              </select>
            </div>
          </div>
        </div>
      </b-tab-item>
    </b-tabs>
  </div>
</template>

<script>
import { IMaskComponent } from 'vue-imask';
import moment from 'moment';

export default {
  components: {
    'imask-input': IMaskComponent
  },
  props: {
    data: {
      type: Object,
      default: () => ({})
    },
    errors: {
      type: Object,
      default: () => ({})
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      client: this.data,
      activeTab: 0
    };
  },
  computed: {
    birthday() {
      if (this.client.birth) {
        return moment(this.client.birth).format('DD.MM.YYYY');
      }
      return null;
    }
  },
  methods: {
    onAccept() {},
    setAvatar(e) {
      if (e.target.files && e.target.files.length > 0) {
        const path = window.URL.createObjectURL(e.target.files[0]);
        this.client.avatar = e.target.files[0];
        this.client.avatar.path = path;
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import '../../assets/sass/variables';

.client-form {
  text-align: left;

  .columns {
    margin-bottom: 0;
    margin-top: 0;

    .column {
      padding-top: 0;
      padding-bottom: 0;
      margin-bottom: 0.75rem;
    }
  }

  .field {
    .client-photo {
      text-align: center;

      figure {
        margin: auto;

        img {
          max-height: 128px;
          max-width: 128px;
        }

        .empty-photo {
          height: 128px;
          width: 128px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 42px;
        }
      }

      button {
        color: hsl(217, 71%, 53%);
        margin-top: 10px;
      }
    }
  }
}
</style>
