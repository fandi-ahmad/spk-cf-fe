import axios from "axios";
const baseApiUrl = 'http://localhost:8888/pengetahuan/'

interface PengetahuanDTO {
  id_gejala: number
  id_penyakit: number
  cr_rule: number
}

export const PengetahuanApi =  {
  create: async (data: PengetahuanDTO) => {
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

  getByPenyakitId: async (id: number) => {
    try {
      const response = await axios.get(baseApiUrl+'penyakit/'+id)
      return response.data
    } catch (error: any) {
      return error.response.data
    }
  },

  update: async (id: number, data: PengetahuanDTO) => {
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