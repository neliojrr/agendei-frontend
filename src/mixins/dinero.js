import Dinero from 'dinero.js';

export default {
  created() {
    Dinero().setLocale('pt-BR');
  },
  methods: {
    createMoney(amount) {
      return Dinero({ amount, currency: 'BRL', precision: 2 });
    },
    displayMoney(amount) {
      if (amount === null || amount === undefined || amount === '') {
        return null;
      }
      const dinero = this.createMoney(amount);
      return dinero.hasCents()
        ? dinero.toFormat('$0.00').replace('.', ',')
        : dinero.toFormat('$0');
    },
    displayRawMoney(amount) {
      if (amount === null || amount === undefined || amount === '') {
        return null;
      }
      return this.createMoney(amount).toUnit();
    }
  }
};
