const modal = {
  namespaced: true,
  state: {
    items: []
  },
  getters: {
    isModalOpen: state => id => !!state.items.find(item => item.id === id)
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
      const { id, data, buttons, dropdown, errors } = payload;
      const index = state.items.findIndex(item => item.id === id);
      if (index > -1) {
        const currentModal = { ...state.items[index] };
        currentModal.props = {
          ...currentModal.props,
          errors,
          buttons: buttons || currentModal.props.buttons,
          dropdown: dropdown || currentModal.props.dropdown,
          data: { ...currentModal.props.data, ...data }
        };
        state.items.splice(index, 1, currentModal);
      }
    }
  }
};

export default modal;
