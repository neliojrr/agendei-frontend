<template>
  <section>
    <Menu />
    <NavApp :title="title" />

    <div class="services app-content">
      <div class="top-actions columns is-mobile">
        <div
          class="field service-search column is-half-desktop is-full-mobile is-full-tablet"
        >
          <div class="control has-icons-left">
            <input
              class="input"
              type="text"
              placeholder="Pesquisar um serviço"
              title="Digite parte do nome ou descrição pressione enter"
              v-model="query"
            />
            <div class="icon is-medium is-left">
              <font-awesome-icon icon="search" />
            </div>
          </div>
        </div>
        <div class="column new-service">
          <button
            class="button is-info is-hidden-touch"
            @click="openModalNewServiceCategory"
          >
            <span>Nova Categoria</span>
          </button>
          <button
            class="button is-primary is-hidden-touch"
            @click="openModalNewService"
          >
            <span>Novo Serviço</span>
          </button>
          <MobileBottomMenu :buttons="buttons" />
        </div>
      </div>
      <div
        :key="serviceCategory.id"
        v-for="serviceCategory in serviceCategories"
        class="categories"
      >
        <ServiceCategoryRow
          :serviceCategory="serviceCategory"
          @open-modal-edit-service-category="openModalEditServiceCategory"
          @delete-service-category="deleteServiceCategory"
          @open-modal-new-service="openModalNewService"
          @edit-service="editService"
        />
      </div>
      <div
        class="categories categories-empty"
        v-if="serviceCategories.length === 0"
      >
        <h3 class="subtitle is-5">Não encontramos nenhum serviço.</h3>
        <p>
          <img
            alt="empty results"
            title="Nao encontrado"
            src="../assets/images/empty.svg"
          />
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import { debounce } from 'lodash';
import { mapMutations } from 'vuex';
import modalId from '@/utils/modalId';
import { api } from '@/utils/api-connect';
import Menu from '@/components/Menu.vue';
import NavApp from '@/components/NavApp.vue';
import MobileBottomMenu from '@/components/MobileBottomMenu.vue';
import Form from '@/components/services/Form.vue';
import FormService from '@/components/services/FormService.vue';
import ServiceCategoryRow from '@/components/services/ServiceCategoryRow.vue';

export default {
  components: {
    Menu,
    NavApp,
    MobileBottomMenu,
    Form,
    FormService,
    ServiceCategoryRow
  },
  props: {
    pageTitle: {
      type: String,
      default: '',
      required: false
    }
  },
  data() {
    return {
      title: this.pageTitle,
      serviceCategory: {
        name: '',
        description: ''
      },
      service: {
        name: '',
        description: '',
        duration: null,
        price: null,
        cost: null
      },
      serviceCategories: [],
      allServiceCategories: [],
      errors: {},
      query: '',
      buttons: []
    };
  },
  watch: {
    query() {
      this.debounceSearch();
    }
  },
  created() {
    this.buttons = [
      {
        id: 'newServiceCategory',
        title: 'Nova Categoria',
        icon: 'clipboard-list',
        action: this.openModalNewServiceCategory,
        class: 'is-info'
      },
      {
        id: 'newService',
        title: 'Novo Serviço',
        icon: 'cut',
        action: this.openModalNewService
      }
    ];
    this.$emit('set-loading-overlay', true);
    this.debounceSearch = debounce(this.search, 500);
    const salon = window.localStorage.getItem('salon') || '{}';
    this.salon = JSON.parse(salon) || {};
    this.getServiceCategories();
  },
  methods: {
    ...mapMutations('modal', ['addModal', 'removeModal', 'updateModalProps']),
    ...mapMutations('service', {
      addService: 'addService',
      updateServiceStore: 'updateService',
      deleteServiceStore: 'deleteService',
      addServiceCategory: 'addServiceCategory',
      updateServiceCategoryStore: 'updateServiceCategory',
      deleteServiceCategoryStore: 'deleteServiceCategory'
    }),

    getServiceCategories() {
      api
        .get(`/salons/${this.salon.id}/service_categories`)
        .then(response => {
          this.allServiceCategories = response.data;
          this.serviceCategories = response.data || [];
          this.$emit('set-loading-overlay', false);
        })
        .catch(() => {
          this.$emit('set-loading-overlay', false);
          this.$toast.open({
            message: 'Não foi possível encontrar as categorias de serviços!',
            type: 'is-danger'
          });
        });
    },

    saveNewServiceCategory(serviceCategory) {
      this.$emit('set-loading-overlay', true);
      api
        .post(`/salons/${this.salon.id}/service_categories`, {
          ...serviceCategory
        })
        .then(response => {
          this.serviceCategories.push(response.data);
          this.$emit('set-loading-overlay', false);
          this.addServiceCategory(response.data);
          this.removeModal({ id: modalId.NEW_SERVICE_CATEGORY });
        })
        .catch(error => {
          this.$emit('set-loading-overlay', false);
          let errors = {};
          if (error.response) {
            errors = error.response.data || {};
          } else {
            errors.message = error.message;
          }
          this.errors = errors;
          this.updateModalProps({
            id: modalId.NEW_SERVICE_CATEGORY,
            errors: this.errors
          });
        });
    },

    updateServiceCategory(serviceCategory) {
      this.$emit('set-loading-overlay', true);
      api
        .put(`/service_categories/${serviceCategory.id}`, {
          ...serviceCategory
        })
        .then(response => {
          const allServiceCategories = this.serviceCategories.slice(0);
          const updatedServiceCategory = response.data;
          this.serviceCategories = allServiceCategories.map(sc => {
            if (sc.id === updatedServiceCategory.id) {
              return updatedServiceCategory;
            }
            return sc;
          });
          this.$emit('set-loading-overlay', false);
          this.removeModal({ id: modalId.EDIT_SERVICE_CATEGORY });
          this.updateServiceCategoryStore(updatedServiceCategory);
        })
        .catch(error => {
          this.$emit('set-loading-overlay', false);
          let errors = {};
          if (error.response) {
            errors = error.response.data || {};
          } else {
            errors.message = error.message;
          }
          this.errors = errors;
          this.updateModalProps({
            id: modalId.EDIT_SERVICE_CATEGORY,
            errors: this.errors
          });
        });
    },

    deleteServiceCategory(serviceCategoryId) {
      if (window.confirm('Você tem certeza?')) {
        this.$emit('set-loading-overlay', true);
        api
          .delete(`/service_categories/${serviceCategoryId}`)
          .then(() => {
            this.serviceCategories = this.serviceCategories.filter(
              sc => sc.id !== serviceCategoryId
            );
            this.$toast.open({
              message: 'A categoria foi excluída!',
              type: 'is-success'
            });
            this.deleteServiceCategoryStore(serviceCategoryId);
            this.$emit('set-loading-overlay', false);
          })
          .catch(() => {
            this.$toast.open({
              message: 'Delete todos os serviços antes de deletar a categoria!',
              type: 'is-danger'
            });
            this.$emit('set-loading-overlay', false);
          });
      }
    },

    saveNewService(data) {
      this.$emit('set-loading-overlay', true);
      const newData = { ...data };
      api
        .post(`/salons/${this.salon.id}/services`, { ...newData })
        .then(response => {
          const newService = response.data;
          this.serviceCategories = this.serviceCategories.map(sc => {
            if (sc.id === newService.service_category_id) {
              sc.services.push(newService);
            }
            return sc;
          });
          this.$emit('set-loading-overlay', false);
          this.removeModal({ id: modalId.NEW_SERVICE });
          this.addService(newService);
        })
        .catch(error => {
          this.$emit('set-loading-overlay', false);
          let errors = {};
          if (error.response) {
            errors = error.response.data || {};
          } else {
            errors.message = error.message;
          }
          this.errors = errors;
          this.updateModalProps({
            id: modalId.NEW_SERVICE,
            errors: this.errors
          });
        });
    },

    updateService({ service, serviceCategoryId }) {
      this.$emit('set-loading-overlay', true);
      const newService = { ...service };
      api
        .put(`/services/${service.id}`, { ...newService })
        .then(response => {
          const updatedService = response.data || {};
          const serviceCategory = this.serviceCategories.find(
            sc => sc.id === updatedService.service_category_id
          );
          let oldServiceCategory = {};
          const index = serviceCategory.services.findIndex(
            s => s.id === updatedService.id
          );
          if (index > -1) {
            serviceCategory.services = serviceCategory.services.map(s => {
              if (s.id === updatedService.id) {
                return updatedService;
              }
              return s;
            });
          } else {
            serviceCategory.services.push(updatedService);
            oldServiceCategory = this.serviceCategories.find(
              sc => sc.id === serviceCategoryId
            );
            oldServiceCategory.services = oldServiceCategory.services.filter(
              s => s.id !== service.id
            );
          }
          this.serviceCategories = this.serviceCategories.map(sc => {
            if (sc.id === serviceCategory.id) {
              return serviceCategory;
            }
            if (sc.id === oldServiceCategory.id) {
              return oldServiceCategory;
            }
            return sc;
          });
          this.updateServiceStore(updatedService);
          this.$emit('set-loading-overlay', false);
          this.removeModal({ id: modalId.EDIT_SERVICE });
        })
        .catch(error => {
          this.$emit('set-loading-overlay', false);
          let errors = {};
          if (error.response) {
            errors = error.response.data || {};
          } else {
            errors.message = error.message;
          }
          this.errors = errors;
          this.updateModalProps({
            id: modalId.EDIT_SERVICE,
            errors: this.errors
          });
        });
    },

    deleteService({ service }) {
      if (window.confirm('Você tem certeza?')) {
        this.$emit('set-loading-overlay', true);
        api
          .delete(`/services/${service.id}`)
          .then(() => {
            this.serviceCategories = this.serviceCategories.map(
              serviceCategory => {
                const sc = serviceCategory;
                if (sc.id === service.service_category_id) {
                  sc.services = sc.services.filter(s => s.id !== service.id);
                }
                return sc;
              }
            );
            this.$toast.open({
              message: 'O serviço foi excluído!',
              type: 'is-success'
            });
            this.deleteServiceStore(service);
            this.$emit('set-loading-overlay', false);
            this.removeModal({ id: modalId.EDIT_SERVICE });
          })
          .catch(() => {
            this.$toast.open({
              message: 'Impossível deletar este serviço!',
              type: 'is-danger'
            });
            this.$emit('set-loading-overlay', false);
          });
      }
    },

    openModalNewServiceCategory() {
      const buttons = [
        {
          title: 'Salvar',
          class: 'is-success',
          action: this.saveNewServiceCategory
        }
      ];
      this.serviceCategory = {
        name: '',
        description: ''
      };
      const id = modalId.NEW_SERVICE_CATEGORY;
      const data = { ...this.serviceCategory };
      const props = {
        data,
        buttons,
        title: 'Nova Categoria',
        content: Form
      };
      this.addModal({ id, props });
    },

    openModalEditServiceCategory(serviceCategory) {
      const buttons = [
        {
          title: 'Salvar',
          class: 'is-success',
          action: this.updateServiceCategory
        }
      ];
      const id = modalId.EDIT_SERVICE_CATEGORY;
      const data = { ...serviceCategory };
      const props = {
        data,
        buttons,
        title: 'Editar Categoria',
        content: Form
      };
      this.addModal({ id, props });
    },

    openModalNewService(serviceCategoryId = null) {
      const buttons = [
        {
          title: 'Salvar',
          class: 'is-success',
          action: this.saveNewService
        }
      ];
      this.service = {
        name: '',
        description: '',
        duration: null,
        price: null,
        cost: null,
        service_category_id: serviceCategoryId
      };
      const data = {
        service: this.service,
        serviceCategories: this.allServiceCategories
      };
      const id = modalId.NEW_SERVICE;
      const props = {
        data,
        buttons,
        title: 'Novo Serviço',
        content: FormService
      };
      this.addModal({ id, props });
    },

    editService(service) {
      const buttons = [
        {
          title: 'Salvar',
          class: 'is-success',
          action: this.updateService
        },
        {
          title: 'Deletar',
          class: 'is-danger',
          action: this.deleteService
        }
      ];
      const data = {
        service: Object.assign({}, service),
        serviceCategoryId: service.service_category_id,
        serviceCategories: this.allServiceCategories
      };
      const id = modalId.EDIT_SERVICE;
      const props = {
        data,
        buttons,
        title: 'Editar Serviço',
        content: FormService
      };
      this.addModal({ id, props });
    },

    search() {
      this.$emit('set-loading-overlay', true);
      if (this.query && this.query.length > 1) {
        api
          .get(`/salons/${this.salon.id}/services/search/${this.query}`)
          .then(response => {
            this.serviceCategories = response.data || [];
            this.$emit('set-loading-overlay', false);
          })
          .catch(() => {
            this.$emit('set-loading-overlay', false);
            this.$toast.open({
              message: 'Não foi possível encontrar os serviços buscados!',
              type: 'is-danger'
            });
          });
      } else {
        this.getServiceCategories();
      }
    }
  }
};
</script>

<style lang="scss">
.services {
  padding: 10px;

  .top-actions {
    text-align: right;

    .new-service {
      button + button {
        margin-left: 10px;
      }
    }
  }

  .categories {
    margin-bottom: 20px;
  }

  .categories-empty {
    h3 {
      margin-bottom: 50px;
    }

    p {
      height: 60vh;

      img {
        height: 100%;
      }
    }
  }
}
</style>
