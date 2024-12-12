// src/stores/cabinets.js
import { defineStore } from 'pinia';
import apiClient from '@/axios';

export const useCabinetsStore = defineStore('cabinets', {
  state: () => ({
    cabinets: [],
    error: null,
  }),
  actions: {
    async fetchCabinets() {
      try {
        const response = await apiClient.get('/cabinets');
        this.cabinets = response.data;
      } catch (error) {
        this.error = error;
      }
    },
    async addCabinet(name) {
      try {
        const response = await apiClient.post('/cabinets', { name });
        this.cabinets.push(response.data);
      } catch (error) {
        this.error = error;
      }
    },
    async updateCabinet(id, name) {
      try {
        const response = await apiClient.patch(`/cabinets/${id}`, { name });
        const index = this.cabinets.findIndex(cabinet => cabinet.id === id);
        if (index !== -1) {
          this.cabinets[index] = response.data;
        }
      } catch (error) {
        this.error = error;
      }
    },
    async deleteCabinet(id) {
      try {
        await apiClient.delete(`/cabinets/${id}`);
        this.cabinets = this.cabinets.filter(cabinet => cabinet.id !== id);
      } catch (error) {
        this.error = error;
      }
    },
  },
});
