<template>
  <section>
    <Menu />
    <NavApp :title="title" />
    <div class="services app-content">
      <div class="top-actions columns is-mobile">
        <div class="field service-search column is-half-desktop">
          <div class="control has-icons-left">
            <input class="input" type="text" placeholder="Pesquisar um serviço">
            <div class="icon is-medium is-left">
              <font-awesome-icon icon="search" />
            </div>
          </div>
        </div>
        <div class="column new-service">
          <button class="button is-info is-hidden-touch" @click="openModalNewServiceCategory">
            <span>Nova Categoria</span>
          </button>
          <button class="button is-primary is-hidden-touch" @click="openModalNewService">
            <span>Novo Serviço</span>
          </button>
          <button
            class="button is-primary is-hidden-desktop"
            v-show="!showButtonOptions"
            @click="showButtonOptions = !showButtonOptions"
          >
            <span class="is-hidden-desktop">
              <font-awesome-icon icon="plus" />
            </span>
          </button>
          <div v-show="showButtonOptions" class="is-hidden-desktop mobile-buttons">
            <b-tooltip
              label="Nova Categoria"
              position="is-left"
              type="is-black"
              :always="showButtonOptions"
            >
              <button class="button is-info" @click="openModalNewServiceCategory">
                <span>
                  <font-awesome-icon icon="clipboard-list" />
                </span>
              </button>
            </b-tooltip>
          </div>
          <div v-show="showButtonOptions" class="is-hidden-desktop mobile-buttons">
            <b-tooltip
              label="Novo Serviço"
              position="is-left"
              type="is-black"
              :always="showButtonOptions"
            >
              <button class="button is-primary" @click="openModalNewService">
                <span>
                  <font-awesome-icon icon="cut" />
                </span>
              </button>
            </b-tooltip>
          </div>
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
    </div>
  </section>
</template>

<script>
import { api } from '@/utils/api-connect';
import Menu from '@/components/Menu.vue';
import NavApp from '@/components/NavApp.vue';
import Form from '@/components/services/Form.vue';
import FormService from '@/components/services/FormService.vue';
import ServiceCategoryRow from '@/components/services/ServiceCategoryRow.vue';

export default {
  data() {
    return {
      title: this.pageTitle,
      showButtonOptions: false,
      serviceCategory: {
        name: '',
        description: '',
      },
      service: {
        name: '',
        description: '',
        duration: null,
        price: null,
        cost: null,
      },
      serviceCategories: [],
      errors: {},
    };
  },
  props: ['pageTitle'],
  components: {
    Menu,
    NavApp,
    Form,
    FormService,
    ServiceCategoryRow,
  },
  created() {
    this.$emit('set-loading-overlay', true);
    this.getServiceCategories();
  },
  methods: {
    getServiceCategories() {
      this.salon = JSON.parse(window.sessionStorage.getItem('salon'));
      api.get(`/salons/${this.salon.id}/service_categories`)
        .then((response) => {
          this.serviceCategories = response.data || [];
          this.$emit('set-loading-overlay', false);
        })
        .catch(() => {
          this.$emit('set-loading-overlay', false);
          this.$toast.open({
            message: 'Não foi possível encontrar as categorias de serviços!',
            type: 'is-danger',
          });
        });
    },
    saveNewServiceCategory(serviceCategory) {
      this.$emit('set-loading-overlay', true);
      api.post(`/salons/${this.salon.id}/service_categories`, { ...serviceCategory })
        .then((response) => {
          this.serviceCategories.push(response.data);
          this.$emit('set-loading-overlay', false);
          this.$emit('close-modal');
        })
        .catch((error) => {
          this.$emit('set-loading-overlay', false);
          let errors = {};
          if (error.response) {
            errors = error.response.data || {};
          } else {
            errors.message = error.message;
          }
          this.errors = errors;
          this.$emit('set-form-errors', this.errors);
        });
    },
    updateServiceCategory(serviceCategory) {
      this.$emit('set-loading-overlay', true);
      api.put(`/service_categories/${serviceCategory.id}`, { ...serviceCategory })
        .then((response) => {
          const allServiceCategories = this.serviceCategories.slice(0);
          const updatedServiceCategory = response.data;
          this.serviceCategories = allServiceCategories.map((sc) => {
            if (sc.id === updatedServiceCategory.id) {
              return updatedServiceCategory;
            }
            return sc;
          });
          this.$emit('set-loading-overlay', false);
          this.$emit('close-modal');
        });
    },
    deleteServiceCategory(serviceCategoryId) {
      if (confirm('Você tem certeza?')) {
        this.$emit('set-loading-overlay', true);
        api.delete(`/service_categories/${serviceCategoryId}`)
          .then(() => {
            this.serviceCategories =
              this.serviceCategories.filter(sc => sc.id !== serviceCategoryId);
            this.$toast.open({
              message: 'A categoria foi excluída!',
              type: 'is-success',
            });
            this.$emit('set-loading-overlay', false);
          })
          .catch(() => {
            this.$toast.open({
              message: 'Delete todos os serviços antes de deletar a categoria!',
              type: 'is-danger',
            });
            this.$emit('set-loading-overlay', false);
          });
      }
    },
    saveNewService(service) {
      this.$emit('set-loading-overlay', true);
      api.post(`/salons/${this.salon.id}/services`, { ...service })
        .then((response) => {
          const newService = response.data;
          this.serviceCategories = this.serviceCategories.map((sc) => {
            if (sc.id === newService.service_category_id) {
              sc.services.push(newService);
            }
            return sc;
          });
          this.$emit('set-loading-overlay', false);
          this.$emit('close-modal');
        });
    },
    updateService({ service }) {
      this.$emit('set-loading-overlay', true);
      api.put(`/services/${service.id}`, { ...service })
        .then((response) => {
          const updatedService = response.data;
          const serviceCategory = this.serviceCategories
            .find(sc => sc.id === updatedService.service_category_id);
          serviceCategory.services = serviceCategory.services.map((s) => {
            if (s.id === updatedService.id) {
              return updatedService;
            }
            return s;
          });
          this.serviceCategories = this.serviceCategories.map((sc) => {
            if (sc.id === serviceCategory.id) {
              return serviceCategory;
            }
            return sc;
          });
          this.$emit('set-loading-overlay', false);
          this.$emit('close-modal');
        });
    },
    deleteService({ service }) {
      if (confirm('Você tem certeza?')) {
        this.$emit('set-loading-overlay', true);
        api.delete(`/services/${service.id}`)
          .then(() => {
            this.serviceCategories =
              this.serviceCategories.map((sc) => {
                if (sc.id === service.service_category_id) {
                  sc.services = sc.services.filter(s => s.id !== service.id);
                }
                return sc;
              });
            this.$toast.open({
              message: 'O serviço foi excluído!',
              type: 'is-success',
            });
            this.$emit('set-loading-overlay', false);
            this.$emit('close-modal');
          })
          .catch(() => {
            this.$toast.open({
              message: 'Impossível deletar este serviço!',
              type: 'is-danger',
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
          action: this.saveNewServiceCategory,
        },
      ];
      this.serviceCategory = {
        name: '',
        description: '',
      };
      this.$emit('open-modal', 'Nova Categoria', Form, this.serviceCategory, buttons);
    },
    openModalEditServiceCategory(serviceCategory) {
      const buttons = [
        {
          title: 'Salvar',
          class: 'is-success',
          action: this.updateServiceCategory,
        },
      ];
      this.$emit('open-modal', 'Editar Categoria', Form, { ...serviceCategory }, buttons);
    },
    openModalNewService(serviceCategoryId = null) {
      const buttons = [
        {
          title: 'Salvar',
          class: 'is-success',
          action: this.saveNewService,
        },
      ];
      this.service = {
        name: '',
        description: '',
        duration: null,
        price: null,
        cost: null,
        service_category_id: serviceCategoryId,
      };
      const data = {
        service: this.service,
        serviceCategories: this.serviceCategories,
      };
      this.$emit('open-modal', 'Novo Serviço', FormService, data, buttons);
    },
    editService(service) {
      const buttons = [
        {
          title: 'Salvar',
          class: 'is-success',
          action: this.updateService,
        },
        {
          title: 'Deletar',
          class: 'is-danger',
          action: this.deleteService,
        },
      ];
      const data = {
        service,
        serviceCategories: this.serviceCategories,
      };
      this.$emit('open-modal', 'Editar Serviço', FormService, data, buttons);
    },
  },
};
</script>

<style lang="scss">
.services {
  padding: 10px;

  .top-actions {
    text-align: right;

    .new-service {
      @media screen and (max-width: 1024px) {
        position: fixed;
        bottom: 21px;
        right: 25px;
      }

      button + button {
        margin-left: 10px;
      }

      .mobile-buttons {
        margin-bottom: 10px;
      }

      .mobile-buttons + .mobile-buttons {
        margin-bottom: 0;
      }

      button {
        @media screen and (max-width: 1024px) {
          height: 50px;
          width: 50px;
          padding: 0;
          display: flex;
          border-radius: 50%;
          z-index: 10;
          font-size: 18px;
        }
      }
    }
  }

  .categories {
    margin-bottom: 20px;
  }
}
</style>
