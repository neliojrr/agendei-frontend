<template>
  <div class="staff-form">
    <div class="field">
      <label class="label">Nome</label>
      <div class="control">
        <input class="input" type="text" placeholder="Lucia Maria">
      </div>
      <p v-if="errors.name" class="help is-danger">{{ errors.name }}</p>
    </div>
    <div class="field is-grouped">
      <div class="control is-expanded">
        <label class="label">Email</label>
        <input class="input" type="email" placeholder="email@exemplo.com">
        <p v-if="errors.email" class="help is-danger">{{ errors.email }}</p>
      </div>
      <div class="control is-expanded">
        <label class="label">Telefone</label>
        <input class="input" type="phone" placeholder="64999900000">
        <p v-if="errors.email" class="help is-danger">{{ errors.email }}</p>
      </div>
    </div>
    <div class="field is-grouped">
      <div class="control is-expanded">
        <label class="label">Serviços</label>
        <div class="select is-fullwidth">
          <select>
            <option>Serviço 1</option>
          </select>
        </div>
      </div>
      <div class="control is-expanded">
        <label class="label">&nbsp;</label>
        <label class="checkbox select-all-services">
          <input type="checkbox">
          &nbsp;Selecionar Todos
        </label>
      </div>
    </div>
    <div class="field colors">
      <label class="label">Cor na agenda</label>
      <div class="control">
        <ul class="colors-list">
          <li
            v-for="(c, i) in colors"
            :key="c"
            :style="{ backgroundColor: c }"
            class="single-color"
          >
            <template v-if="i === 0">
              <font-awesome-icon icon="check" />
            </template>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      colors: [
        '#ef1554',
        '#c8e30b',
        '#2350c2',
        '#27c148',
        '#97c3a4',
        '#056bbe',
        '#61f6bc',
        '#4d5795',
        '#769ee9',
        '#7a07a1',
      ],
    };
  },
  props: {
    errors: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>

<style scoped lang="scss">
.staff-form {
  text-align: left;

  .select-all-services {
    margin-left: 10px;
  }

  .colors {

    .colors-list {
      display: flex;

      .single-color {
        display: inline-block;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 35px;
        height: 35px;
        border-radius: 50%;
        border: 1px solid #DDDDDD;
        color: white;
        cursor: pointer;
      }

      .single-color + .single-color {
        margin-left: 10px;
      }
    }
  }
}
</style>

