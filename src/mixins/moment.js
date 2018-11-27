import moment from 'moment';

moment.updateLocale('en', {
  weekdays: [
    'Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado',
  ],
  weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
});

export default {
  methods: {
    momentjs(...args) { // rest parameters
      return moment(...args); // spread operator
    },
  },
};
