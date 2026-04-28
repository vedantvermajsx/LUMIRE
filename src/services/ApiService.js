import BaseApiService from './BaseApiService';

const api = new BaseApiService();

export const apiService = {
  // ── Inventory ──────────────────────────────────────────────
  async getInventory() {
    try {
      return await api.get('/inventory');
    } catch (err) {
      return [];
    }
  },
  async addPiece(piece) {
    try {
      return await api.post('/inventory', piece);
    } catch (err) {
      throw err;
    }
  },
  async updatePiece(id, updates) {
    try {
      return await api.put(`/inventory/${id}`, updates);
    } catch (err) {
      throw err;
    }
  },
  async deletePiece(id) {
    try {
      return await api.delete(`/inventory/${id}`);
    } catch (err) {
      throw err;
    }
  },

  // ── Upload ─────────────────────────────────────────────────
  async uploadImage(file) {
    try {
      const formData = new FormData();
      formData.append('image', file);
      const response = await api.client.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.url; 
    } catch (err) {
      throw err;
    }
  },

  // ── Bookings ───────────────────────────────────────────────
  async getBookings() {
    try {
      return await api.get('/bookings');
    } catch (err) {
      return [];
    }
  },
  async addBooking(booking) {
    try {
      return await api.post('/bookings', booking);
    } catch (err) {
      throw err;
    }
  },
  async updateBookingStatus(id, status) {
    try {
      return await api.patch(`/bookings/${id}/status`, { status });
    } catch (err) {
      throw err;
    }
  },
};

export default apiService;
