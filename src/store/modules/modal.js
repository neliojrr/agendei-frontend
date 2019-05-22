const modal = {
  namespaced: true,
  state: {
    items: [],
  },
  getters: {
    isModalOpen: state => id => !!state.items.find(item => item.id === id),
  },
  mutations: {
    addModal(state, payload) {
      const { id, props } = payload;
      state.items.push({ id, props });
    },

    removeModal(state, payload) {
      const { id } = payload;
      state.items = state.items.filter(item => item.id !== id);
    },

    updateModalProps(state, payload) {
      const {
        id, data, buttons, dropdown,
      } = payload;
      const index = state.items.findIndex(item => item.id === id);
      if (index > -1) {
        const currentModal = { ...state.items[index] };
        currentModal.props = {
          ...currentModal.props,
          buttons,
          dropdown,
          data: { ...currentModal.props.data, ...data },
        };
        state.items.splice(index, 1, currentModal);
      }
    },

    addFormErrors(state, payload) {
      const { id, errors } = payload;
      const items = state.items.map((item) => {
        if (item.id === id) {
          item.errors = errors;
        }
        return item;
      });
      state.items = items;
    },
  },
};

export default modal;
