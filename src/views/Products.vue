<template>
  <section>
    <Menu />
    <NavApp :title="title" />

    <div class="products app-content">
      <div class="top-actions columns is-mobile">
        <div class="field product-search column is-half-desktop">
          <div class="control has-icons-left">
            <input
              class="input"
              type="text"
              placeholder="Pesquisar um produto"
              title="Digite parte do nome ou descrição pressione enter"
              v-model="query"
            >
            <div class="icon is-medium is-left">
              <font-awesome-icon icon="search" />
            </div>
          </div>
        </div>
        <div class="column new-product">
          <div
            v-if="showButtonOptions"
            class="is-hidden-desktop mobile-action-background"
            @click="showButtonOptions = false"
          />
          <button class="button is-info is-hidden-touch" @click="openModalNewProductCategory">
            <span>Nova Categoria</span>
          </button>
          <button class="button is-primary is-hidden-touch" @click="openModalNewProduct">
            <span>Novo Produto</span>
          </button>
          <button
            class="button is-primary is-hidden-desktop"
            v-show="!showButtonOptions"
            @click="showButtonOptions = true"
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
              <button class="button is-info" @click="openModalNewProductCategory">
                <span>
                  <font-awesome-icon icon="clipboard-list" />
                </span>
              </button>
            </b-tooltip>
          </div>
          <div v-show="showButtonOptions" class="is-hidden-desktop mobile-buttons">
            <b-tooltip
              label="Novo Produto"
              position="is-left"
              type="is-black"
              :always="showButtonOptions"
            >
              <button class="button is-primary" @click="openModalNewProduct">
                <span>
                  <font-awesome-icon icon="spray-can" />
                </span>
              </button>
            </b-tooltip>
          </div>
        </div>
      </div>
      <div
        :key="productCategory.id"
        v-for="productCategory in productCategories"
        class="categories"
      >
        <ProductCategoryRow
          :productCategory="productCategory"
          @open-modal-edit-product-category="openModalEditProductCategory"
          @delete-product-category="deleteProductCategory"
          @open-modal-new-product="openModalNewProduct"
          @edit-product="editProduct"
        />
      </div>
      <div class="categories categories-empty" v-if="productCategories.length === 0">
        <h3 class="subtitle is-5">Não encontramos nenhum produto.</h3>
        <p>
          <img alt="empty results" title="Nao encontrado" src="../assets/images/empty.svg" />
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
import Form from '@/components/products/Form.vue';
import FormProduct from '@/components/products/FormProduct.vue';
import ProductCategoryRow from '@/components/products/ProductCategoryRow.vue';

export default {
  data() {
    return {
      title: this.pageTitle,
      showButtonOptions: false,
      productCategory: {
        name: '',
        description: '',
      },
      product: {
        name: '',
        description: '',
        duration: null,
        price: null,
        cost: null,
      },
      productCategories: [],
      allProductCategories: [],
      errors: {},
      query: '',
    };
  },
  props: ['pageTitle'],
  components: {
    Menu,
    NavApp,
    Form,
    FormProduct,
    ProductCategoryRow,
  },
  watch: {
    query() {
      this.debounceSearch();
    },
  },
  created() {
    this.$emit('set-loading-overlay', true);
    this.debounceSearch = debounce(this.search, 500);
    const salon = window.localStorage.getItem('salon') || '{}';
    this.salon = JSON.parse(salon) || {};
    this.getProductCategories();
  },
  methods: {
    ...mapMutations('modal', ['addModal', 'removeModal']),

    getProductCategories() {
      api.get(`/salons/${this.salon.id}/product_categories`)
        .then((response) => {
          this.allProductCategories = response.data;
          this.productCategories = response.data || [];
          this.$emit('set-loading-overlay', false);
        })
        .catch(() => {
          this.$emit('set-loading-overlay', false);
          this.$toast.open({
            message: 'Não foi possível encontrar as categorias de produtos!',
            type: 'is-danger',
          });
        });
    },

    saveNewProductCategory(productCategory) {
      this.$emit('set-loading-overlay', true);
      api.post(`/salons/${this.salon.id}/product_categories`, { ...productCategory })
        .then((response) => {
          this.productCategories.push(response.data);
          this.$emit('set-loading-overlay', false);
          this.removeModal({ id: modalId.NEW_SERVICE_CATEGORY });
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

    updateProductCategory(productCategory) {
      this.$emit('set-loading-overlay', true);
      api.put(`/product_categories/${productCategory.id}`, { ...productCategory })
        .then((response) => {
          const allProductCategories = this.productCategories.slice(0);
          const updatedProductCategory = response.data;
          this.productCategories = allProductCategories.map((sc) => {
            if (sc.id === updatedProductCategory.id) {
              return updatedProductCategory;
            }
            return sc;
          });
          this.$emit('set-loading-overlay', false);
          this.removeModal({ id: modalId.EDIT_SERVICE_CATEGORY });
        });
    },

    deleteProductCategory(productCategoryId) {
      if (window.confirm('Você tem certeza?')) {
        this.$emit('set-loading-overlay', true);
        api.delete(`/product_categories/${productCategoryId}`)
          .then(() => {
            this.productCategories =
              this.productCategories.filter(sc => sc.id !== productCategoryId);
            this.$toast.open({
              message: 'A categoria foi excluída!',
              type: 'is-success',
            });
            this.$emit('set-loading-overlay', false);
          })
          .catch(() => {
            this.$toast.open({
              message: 'Delete todos os produtos antes de deletar a categoria!',
              type: 'is-danger',
            });
            this.$emit('set-loading-overlay', false);
          });
      }
    },

    saveNewProduct({ product }) {
      this.$emit('set-loading-overlay', true);
      const data = { ...product };
      data.cost *= 100;
      data.price *= 100;
      api.post(`/salons/${this.salon.id}/products`, { product: data })
        .then((response) => {
          const newProduct = response.data;
          this.productCategories = this.productCategories.map((sc) => {
            if (sc.id === newProduct.product_category_id) {
              sc.products.push(newProduct);
            }
            return sc;
          });
          this.$emit('set-loading-overlay', false);
          this.removeModal({ id: modalId.NEW_SERVICE });
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

    updateProduct({ product, productCategoryId }) {
      this.$emit('set-loading-overlay', true);
      const newProduct = { ...product };
      newProduct.cost *= 100;
      newProduct.price *= 100;
      api.put(`/products/${product.id}`, { ...newProduct })
        .then((response) => {
          const updatedProduct = response.data || {};
          const productCategory = this.productCategories
            .find(sc => sc.id === updatedProduct.product_category_id);
          let oldProductCategory = {};
          const index = productCategory.products.findIndex(s => s.id === updatedProduct.id);
          if (index > -1) {
            productCategory.products = productCategory.products.map((s) => {
              if (s.id === updatedProduct.id) {
                return updatedProduct;
              }
              return s;
            });
          } else {
            productCategory.products.push(updatedProduct);
            oldProductCategory =
              this.productCategories.find(sc => sc.id === productCategoryId);
            oldProductCategory.products =
              oldProductCategory.products.filter(s => s.id !== product.id);
          }
          this.productCategories = this.productCategories.map((sc) => {
            if (sc.id === productCategory.id) {
              return productCategory;
            }
            if (sc.id === oldProductCategory.id) {
              return oldProductCategory;
            }
            return sc;
          });
          this.$emit('set-loading-overlay', false);
          this.removeModal({ id: modalId.EDIT_SERVICE });
        });
    },

    deleteProduct({ product }) {
      if (window.confirm('Você tem certeza?')) {
        this.$emit('set-loading-overlay', true);
        api.delete(`/products/${product.id}`)
          .then(() => {
            this.productCategories =
              this.productCategories.map((productCategory) => {
                const sc = productCategory;
                if (sc.id === product.product_category_id) {
                  sc.products = sc.products.filter(s => s.id !== product.id);
                }
                return sc;
              });
            this.$toast.open({
              message: 'O produto foi excluído!',
              type: 'is-success',
            });
            this.$emit('set-loading-overlay', false);
            this.removeModal({ id: modalId.EDIT_SERVICE });
          })
          .catch(() => {
            this.$toast.open({
              message: 'Impossível deletar este produto!',
              type: 'is-danger',
            });
            this.$emit('set-loading-overlay', false);
          });
      }
    },

    openModalNewProductCategory() {
      this.showButtonOptions = false;
      const buttons = [
        {
          title: 'Salvar',
          class: 'is-success',
          action: this.saveNewProductCategory,
        },
      ];
      this.productCategory = {
        name: '',
        description: '',
      };
      const id = modalId.NEW_SERVICE_CATEGORY;
      const data = { ...this.productCategory };
      const props = {
        title: 'Nova Categoria', content: Form, data, buttons,
      };
      this.addModal({ id, props });
    },

    openModalEditProductCategory(productCategory) {
      const buttons = [
        {
          title: 'Salvar',
          class: 'is-success',
          action: this.updateProductCategory,
        },
      ];
      const id = modalId.EDIT_SERVICE_CATEGORY;
      const data = { ...productCategory };
      const props = {
        title: 'Editar Categoria', content: Form, data, buttons,
      };
      this.addModal({ id, props });
    },

    openModalNewProduct(productCategoryId = null) {
      this.showButtonOptions = false;
      const buttons = [
        {
          title: 'Salvar',
          class: 'is-success',
          action: this.saveNewProduct,
        },
      ];
      this.product = {
        name: '',
        description: '',
        price: null,
        cost: null,
        product_category_id: productCategoryId,
        barcode: '',
        brand: '',
        quantity: 0,
      };
      const data = {
        product: this.product,
        productCategories: this.allProductCategories,
      };
      const id = modalId.NEW_SERVICE;
      const props =
        {
          title: 'Novo Produto', content: FormProduct, data, buttons,
        };
      this.addModal({ id, props });
    },

    editProduct(product) {
      const buttons = [
        {
          title: 'Salvar',
          class: 'is-success',
          action: this.updateProduct,
        },
        {
          title: 'Deletar',
          class: 'is-danger',
          action: this.deleteProduct,
        },
      ];
      const data = {
        product: Object.assign({}, product),
        productCategoryId: product.product_category_id,
        productCategories: this.allProductCategories,
      };
      const id = modalId.EDIT_SERVICE;
      const props =
        {
          title: 'Editar Produto', content: FormProduct, data, buttons,
        };
      this.addModal({ id, props });
    },

    search() {
      this.$emit('set-loading-overlay', true);
      if (this.query && this.query.length > 1) {
        api.get(`/salons/${this.salon.id}/products/search/${this.query}`)
          .then((response) => {
            this.productCategories = response.data || [];
            this.$emit('set-loading-overlay', false);
          })
          .catch(() => {
            this.$emit('set-loading-overlay', false);
            this.$toast.open({
              message: 'Não foi possível encontrar os produtos buscados!',
              type: 'is-danger',
            });
          });
      } else {
        this.getProductCategories();
      }
    },
  },
};
</script>

<style lang="scss">
.mobile-action-background {
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background-color: #000000;
  opacity: 0.4;
  z-index: 99;
}
.products {
  padding: 10px;

  .top-actions {
    text-align: right;

    .new-product {
      @media screen and (max-width: 1024px) {
        position: fixed;
        bottom: 21px;
        right: 25px;
        z-index: 100;
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
          z-index: 100;
          font-size: 18px;
        }
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
