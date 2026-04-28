import BaseApiService from './BaseApiService';

class ProductsService extends BaseApiService {
  constructor() {
    super();
    this.baseEndpoint = '/products';
  }

  async getAllProducts(params = {}) {
    return this.get(this.baseEndpoint, params);
  }

  async getProductById(id) {
    return this.get(`${this.baseEndpoint}/${id}`);
  }

  async getProductsByCollection(collectionId) {
    return this.get(`${this.baseEndpoint}/collection/${collectionId}`);
  }

  async createProduct(payload) {
    return this.post(this.baseEndpoint, payload);
  }

  async updateProduct(id, payload) {
    return this.put(`${this.baseEndpoint}/${id}`, payload);
  }

  async deleteProduct(id) {
    return this.delete(`${this.baseEndpoint}/${id}`);
  }
}

export const productsService = new ProductsService();
export default ProductsService;
