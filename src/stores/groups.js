// src/stores/groups.js
import { defineStore } from 'pinia';
import apiClient from '@/axios';

export const useGroupsStore = defineStore('groups', {
  state: () => ({
    groups: [],
    error: null,
  }),
  actions: {
    async fetchGroups() {
      try {
        const response = await apiClient.get('/groups');
        this.groups = response.data;
      } catch (error) {
        this.error = error;
      }
    },
    async addGroup(name) {
      try {
        const response = await apiClient.post('/groups', { name });
        this.groups.push(response.data);
      } catch (error) {
        this.error = error;
      }
    },
    async updateGroup(id, name) {
      try {
        const response = await apiClient.patch(`/groups/${id}`, { name });
        const index = this.groups.findIndex(group => group.id === id);
        if (index !== -1) {
          this.groups[index] = response.data;
        }
      } catch (error) {
        this.error = error;
      }
    },
    async deleteGroup(id) {
      try {
        await apiClient.delete(`/groups/${id}`);
        this.groups = this.groups.filter(group => group.id !== id);
      } catch (error) {
        this.error = error;
      }
    },
  },
});
