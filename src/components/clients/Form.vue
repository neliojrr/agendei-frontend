<template>
  <div class="client-form">
    <b-tabs v-model="activeTab">
      <b-tab-item label="Detalhes">
        <div class="field">
          <div class="client-photo">
            <figure class="image is-128x128">
              <img class="is-rounded" src="../../assets/images/client_example.jpg">
            </figure>
            <button class="button is-text">Adicionar foto</button>
          </div>
        </div>
        <div class="field">
          <label class="label">Nome</label>
          <div class="control">
            <input class="input" type="text" placeholder="Lucia Maria">
          </div>
          <p v-if="errors.name" class="help is-danger">{{ errors.name }}</p>
        </div>
        <div class="field columns">
          <div class="control is-expanded column">
            <label class="label">Email</label>
            <input class="input" type="email" placeholder="email@exemplo.com">
            <p v-if="errors.email" class="help is-danger">{{ errors.email }}</p>
          </div>
          <div class="control is-expanded column">
            <label class="label">Telefone</label>
            <input class="input" type="tel" placeholder="64999900000">
            <p v-if="errors.phone" class="help is-danger">{{ errors.phone }}</p>
          </div>
        </div>
        <div class="field columns">
          <div class="control is-expanded column">
            <label class="label">Gênero</label>
            <div class="select is-fullwidth">
              <select>
                <option>Feminino</option>
                <option>Masculino</option>
                <option>Não binario</option>
              </select>
            </div>
          </div>
          <div class="control is-expanded column">
            <label class="label">Data nascimento</label>
            <imask-input
              v-model="client.birthday"
              :mask="Date"
              :unmask="true"
              @accept="onAccept"
              placeholder='01/10/1987'
              class="input"
            />
            <p v-if="errors.birthday" class="help is-danger">{{ errors.birthday }}</p>
          </div>
        </div>
      </b-tab-item>
      <b-tab-item label="Endereço">
        <div class="field">
          <label class="label">Endereço</label>
          <div class="control">
            <input class="input" type="text" placeholder="Rua das Flores, 134">
          </div>
          <p v-if="errors.address" class="help is-danger">{{ errors.address }}</p>
        </div>
        <div class="field columns">
          <div class="control is-expanded column">
            <label class="label">Bairro</label>
            <input class="input" type="text" placeholder="Setor Oeste">
            <p v-if="errors.neighborhood" class="help is-danger">{{ errors.neighborhood }}</p>
          </div>
          <div class="control is-expanded column">
            <label class="label">CEP</label>
            <input class="input" type="text" placeholder="72030-201">
            <p v-if="errors.zip_code" class="help is-danger">{{ errors.zip_code }}</p>
          </div>
        </div>
        <div class="field columns">
          <div class="control is-expanded column is-four-fifths">
            <label class="label">Cidade</label>
            <input class="input" type="text" placeholder="Rio de Janeiro">
            <p v-if="errors.city" class="help is-danger">{{ errors.city }}</p>
          </div>
          <div class="control is-expanded column">
            <label class="label">Estado</label>
            <div class="select is-fullwidth">
              <select>
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

export default {
  data() {
    return {
      client: this.data,
      activeTab: 0,
    };
  },
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
    errors: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    'imask-input': IMaskComponent,
  },
  methods: {
    onAccept(e) {
      console.log(e);
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../assets/sass/variables";

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
      }

      button {
        color: hsl(217, 71%, 53%);
        margin-top: 10px;
      }
    }
  }
}
</style>

