import { Collection, CreateCollectionDTO, GetCollectionDTO, GetCollectionsResponse } from "@/types/collection";
import { getHeaders } from "@/lib/utils";
import http from "@/lib/fetchWithAuth";


export const collectionService = {
  async createCollection(data: CreateCollectionDTO): Promise<Collection> {
    try {
      const response = await http(`/collections`, {
        method: 'POST',
        headers: await getHeaders(),
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create collection');
      }

      return response.json();
    } catch (error) {
      console.error('Error creating collection:', error);
      throw error;
    }
  },

  async getAllCollections(params: GetCollectionDTO = {}): Promise<GetCollectionsResponse> {
    try {
      const queryParams = new URLSearchParams();
      
      if (params.collectionId) {
        queryParams.append('collectionId', params.collectionId);
      }
      if (params.limit) {
        queryParams.append('limit', params.limit.toString());
      }
      if (params.offset) {
        queryParams.append('offset', params.offset.toString());
      }

      const response = await http(
        `/collections?${queryParams.toString()}`,
        {
          method: 'GET',
          headers: await getHeaders(),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch collections');
      }

      return response.json();
    } catch (error) {
      console.error('Error fetching collections:', error);
      throw error;
    }
  }
};
