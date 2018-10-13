<template>
  <section class="calendar">
    <div class="options columns is-mobile">
      <div class="column">
        <div class="control has-icons-left">
          <div class="select">
            <select>
              <option selected>Country</option>
              <option>Select dropdown</option>
              <option>With options</option>
            </select>
          </div>
          <div class="icon is-small is-left">
            <font-awesome-icon icon="user" />
          </div>
        </div>
      </div>
      <div class="column">
        <div class="control has-icons-left">
          <div class="select">
            <select>
              <option selected>Date</option>
              <option>Select dropdown</option>
              <option>With options</option>
            </select>
          </div>
          <div class="icon is-small is-left">
            <i class="fas fa-globe"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="header columns is-mobile">
      <div class="column is-2"></div>
      <div class="column">
        Nelio
      </div>
      <div class="column">
        Gustavo
      </div>
      <div class="column">
        Salviano
      </div>
    </div>
    <div class="calendar-body">
      <div v-for="n in fullHours" :key="n">
        <div class="appointments columns is-mobile full-hour">
          <div class="column is-2">
            {{ n + start }}
          </div>
          <div class="column"></div>
          <div class="column"></div>
          <div class="column"></div>
        </div>
        <div class="appointments columns is-mobile">
          <div class="column is-2"></div>
          <div class="column"></div>
          <div class="column"></div>
          <div class="column"></div>
        </div>
        <div class="appointments columns is-mobile">
          <div class="column is-2"></div>
          <div class="column"></div>
          <div class="column"></div>
          <div class="column"></div>
        </div>
        <div class="appointments columns is-mobile">
          <div class="column is-2"></div>
          <div class="column"></div>
          <div class="column"></div>
          <div class="column"></div>
        </div>
      </div>
      <div class="bottom columns is-mobile"></div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      start: 7,
      end: 23,
      fullHours: 23 - 7,
    };
  },
};

</script>

<style lang="scss">
.options {
}

.columns {

  .column {
    border: 1px solid #cccccc;
    border-right: 0;
    border-bottom: 0;
  }
}

.header {
  margin-bottom: 0 !important; // how i'm going to remove this

  .column {
    border-bottom: 1px solid #cccccc;
  }
}

.calendar-body {
  height: calc(100vh - 95px);
  overflow-y: auto;
  overflow-x: hidden;
  padding-top: 10px;

  .columns:last-child {
    margin-bottom: calc(1.5rem - 0.75rem);
  }
}

.appointments {

  .column {
  }
}

.full-hour {
  border-top: 1px solid #cccccc;

  div {
    padding: 0;
    border-top: 1px solid #cccccc;
  }
}

.bottom {
  border-bottom: 1px solid #cccccc;

}
</style>
