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
import { Link } from 'react-router-dom'

interface PenyakitDTO {
  kode: string
  nama_penyakit: string
  penanganan_awal: string
}

const Pengetahuan = () => {
  const [dataList, setDataList] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [alertMessage, setAlertMessage] = useState('')
  const [formType, setFormType] = useState<'create' | 'update'>('create')
  const [id, setId] = useState<number>(0)

  const getAllData = async () => {
    const data = await PenyakitApi.getAll()
    data.data && setDataList(data.data)
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
        <Navbar page='Penyakit' />
        <Container>

          <div className='flex justify-end mb-4'>
            <ButtonPrimary text='Tambah' icon='fa-plus' onClick={handleOpenModal} />
          </div>

          <ContainerRow className='-mx-3 relative'>
            <BaseTable className='pb-24'

              thead={
                <>
                  <TableHead text='No' className='w-12' />
                  <TableHead text='Kode' />
                  <TableHead text='Nama Penyakit' />
                  <TableHead text='Penanganan Awal' />
                  <TableHead />
                  <TableHead />
                </>}

              tbody={<>
                {dataList && dataList.map((item: any, index: number) => (
                  <tr key={index}>
                    <TableData text={index+1} />
                    <TableData text={item.kode} />
                    <TableData text={item.nama_penyakit} />
                    <TableData text={item.penanganan_awal} />
                    <TableData className='w-full' />
                    <TableData text={
                      <div className='flex flex-row'>
                        <Link to={`/pengetahuan/${item.nama_penyakit}`}>
                          <BaseButton text='Edit CF Rule' className='bg-blue-400 hover:bg-blue-500 me-2'  />
                        </Link>
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

export default Pengetahuan