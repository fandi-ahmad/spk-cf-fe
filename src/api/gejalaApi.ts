import axios from "axios";
const baseApiUrl = 'http://localhost:8888/gejala/'

interface GejalaDTO {
  kode: string
  nama_gejala: string
}

export const GejalaApi =  {
  create: async (data: GejalaDTO) => {
    try {
      const response = await axios.post(baseApiUrl, data)
      return response.data
    } catch (error: any) {
      return error.response.data
    }
  },

  getAll: async () => {
    try {
      const response = await axios.get(baseApiUrl)
      return response.data
    } catch (error: any) {
      return error.response.data
    }
  },

  update: async (id: number, data: GejalaDTO) => {
    try {
      const response = await axios.put(baseApiUrl+id, data)
      return response.data
    } catch (error: any) {
      return error.response.data
    }
  },

  delete: async (id: number) => {
    try {
      const response = await axios.delete(baseApiUrl+id)
      return response.data
    } catch (error: any) {
      return error.response.data
    }
  }
}