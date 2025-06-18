import axios from "axios";
const baseApiUrl = 'http://localhost:8888/penyakit/'

interface PenyakitDTO {
  kode: string
  nama_penyakit: string
  penanganan_awal: string
}

export const PenyakitApi =  {
  create: async (data: PenyakitDTO) => {
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

  update: async (id: number, data: PenyakitDTO) => {
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