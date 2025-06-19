import { Main, Container, ContainerRow } from '@/components/BaseLayout'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import { BaseTable, TableData, TableHead } from '@/components/Table'
import { BaseButton, ButtonPrimary } from '@/components/Buttons'
import { PenyakitApi } from '@/api/penyakitApi'
import { useEffect, useRef, useState } from 'react'
import { ModalAlert, ModalHandle } from '@/components/Modals/ModalAlert'
import { ModalForm } from '@/components/Modals'
import { InputText } from '@/components/Inputs/InputText'
import useHandleInput from '@/hooks/useHandleInput'
import { closeModal, openModal } from '@/utils'
import CircleLoading from '@/components/CircleLoading'
import { useParams } from 'react-router-dom'
import { PengetahuanApi } from '@/api/pengetahuanApi'
import { GejalaApi } from '@/api/gejalaApi'
import { InputColumn } from '@/components/Inputs/InputColumn'

interface PenyakitDTO {
  kode: string
  nama_penyakit: string
  penanganan_awal: string
}

const PenyakitDetail = () => {
  const { id_penyakit } = useParams();

  const [dataList, setDataList] = useState([])
  const [dataGejalaList, setDataGejalaList] = useState([])

  const [errorMessage, setErrorMessage] = useState('')
  const [alertMessage, setAlertMessage] = useState('')
  const [formType, setFormType] = useState<'create' | 'update'>('create')
  const [id, setId] = useState<number>(0)

  const getAllData = async () => {
    const data = await PengetahuanApi.getByPenyakitId(Number(id_penyakit));
    data.data && setDataList(data.data)
  }

  const getAllGejala = async () => {
    const data = await GejalaApi.getAll();
    data.data && setDataGejalaList(data.data)
  }


  const modalFormRef = useRef<ModalHandle>(null);
  const modalRefAlert = useRef<ModalHandle>(null);
  const modalRefDelete = useRef<ModalHandle>(null);
  
  const { formState, setFormState, handleInput } = useHandleInput<PenyakitDTO>({
    kode: '',
    nama_penyakit: '',
    penanganan_awal: ''
  });

  const handleOpenModal = () => {
    openModal(modalFormRef)
    setFormType('create')
    setFormState({ kode: '', nama_penyakit: '', penanganan_awal: '' })
    setErrorMessage('')
  }

  const handleEdit = (id: number, kode: string, nama_penyakit: string, penanganan_awal: string) => {
    openModal(modalFormRef)
    setFormType('update')
    setFormState({ kode, nama_penyakit, penanganan_awal })
    setId(id)
  }

  const handleSave = async () => {
    try {
      openModal(modalRefAlert)
      let response: any

      if (formType === 'create') {
        response = await PenyakitApi.create(formState)
      } else {
        response = await PenyakitApi.update(id, formState)
      }

      if (response.status === 201 || response.status === 200) {
        getAllData()
        closeModal(modalFormRef)
      }
      openModal(modalRefAlert)
      setAlertMessage(response.message)
    } catch (error: any) {
      openModal(modalRefAlert)
      setAlertMessage(error.response.data.message)
    }
  }

  const openModalDelete = (criteria_id: number) => {
    openModal(modalRefDelete)
    setId(criteria_id)
  }

  const handleDelete = async () => {
    try {
      openModal(modalRefAlert)
      const response = await PenyakitApi.delete(id)
      if (response.status === 200) {
        getAllData()
        closeModal(modalRefDelete)
      }
      openModal(modalRefAlert)
      setAlertMessage(response.message)
    } catch (error: any) {
      openModal(modalRefAlert)
      setAlertMessage(error.response.data.message)
    }
  }

  useEffect(() => {
    getAllData()
  }, [])

  return (
    <>
      <Sidebar/>
      <Main>
        <Navbar page={`Detail Penyakit (CF Rule) - ${id_penyakit}`} />
        <Container>

          <div className='flex justify-end mb-4'>
            <ButtonPrimary text='Tambah' icon='fa-plus' onClick={handleOpenModal} />
          </div>

          <ContainerRow className='-mx-3 relative'>
            <BaseTable className='pb-24'

              thead={
                <>
                  <TableHead text='No' className='w-12' />
                  <TableHead text='Nama Gejala' />
                  <TableHead text='Nilai CF Rule (Pakar)' />
                  <TableHead />
                  <TableHead />
                </>}

              tbody={<>
                {dataList && dataList.map((item: any, index: number) => (
                  <tr key={index}>
                    <TableData text={index+1} />
                    <TableData text={item.nama_penyakit} />
                    <TableData text={
                      <>
                        <input type='number' value={item.cr_rule} className='border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500 w-28' />
                      </>
                    } />
                    <TableData className='w-full' />
                    <TableData text={
                      <div className='flex flex-row'>
                        <BaseButton text='Hapus' onClick={() => openModalDelete(item.id)} className='bg-red-400 hover:bg-red-500'  />
                      </div>
                    } className='w-48' />
                  </tr>
                ))}
              </>}
            />
          </ContainerRow>
        </Container>
      </Main>
      
      <ModalForm title={`${formType === 'create' ? 'Tambah' : 'Edit'} Data Penyakit`} ref={modalFormRef} onSave={handleSave}>
        <div>
          <InputText text='Kode' name='kode' value={formState.kode} onChange={handleInput} />
          <InputText text='Nama Penyakit' name='nama_penyakit' value={formState.nama_penyakit} onChange={handleInput} />
          <InputText text='Penanganan Awal' name='penanganan_awal' value={formState.penanganan_awal} onChange={handleInput} />
          <small className='text-red-500'>{errorMessage}</small>
        </div>
      </ModalForm>

      <ModalAlert ref={modalRefAlert}
        message={alertMessage ? alertMessage : <CircleLoading/>}
      />

      <ModalAlert ref={modalRefDelete}
        message='Yakin ingin menghapus data penyakit yang dipilih?'
        onConfirm={handleDelete}
      />
    </>
  )
}

export default PenyakitDetail