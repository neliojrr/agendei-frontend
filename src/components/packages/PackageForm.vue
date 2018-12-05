<template>
  <div class="package-form">
    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">Nome</label>
      </div>
      <div class="field-body">
        <div class="field">
          <p class="control is-expanded">
            <input class="input" type="text" placeholder="Afine-se">
          </p>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">Preço</label>
      </div>
      <div class="field-body">
        <div class="field">
          <p class="control is-expanded">
            <input class="input" type="text" placeholder="249,90">
          </p>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">Duração</label>
      </div>
      <div class="field-body">
        <div class="field">
          <p class="control is-expanded">
            <input class="input" type="number" placeholder="30">
          </p>
        </div>
        <p class="help">dias</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      errors: {},
    };
  },
};
</script>

<style lang="scss">
.package-form {

  .help {
    margin-top: 10px;
  }

}
</style>
