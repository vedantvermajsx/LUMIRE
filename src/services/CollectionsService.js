import BaseApiService from './BaseApiService';

class CollectionsService extends BaseApiService {
  constructor() {
    super();
    this.baseEndpoint = '/inventory';
  }

  async getAllCollections(params = {}) {
    return this.get(this.baseEndpoint, params);
  }

  async getCollectionById(id) {
    return this.get(`${this.baseEndpoint}/${id}`);
  }

  async getFeaturedCollections() {
    return this.get(this.baseEndpoint);
  }

  async createCollection(payload) {
    return this.post(this.baseEndpoint, payload);
  }

  async updateCollection(id, payload) {
    return this.put(`${this.baseEndpoint}/${id}`, payload);
  }

  async deleteCollection(id) {
    return this.delete(`${this.baseEndpoint}/${id}`);
  }
}

export const collectionsService = new CollectionsService();
export default CollectionsService;
