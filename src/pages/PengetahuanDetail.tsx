import { Main, Container, ContainerRow } from '@/components/BaseLayout'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import { BaseTable, TableData, TableHead } from '@/components/Table'
import { BaseButton, ButtonPrimary } from '@/components/Buttons'
import { PengetahuanApi } from '@/api/pengetahuanApi'
import { PenyakitApi } from '@/api/penyakitApi'
import { useEffect, useRef, useState } from 'react'
import { ModalAlert, ModalHandle } from '@/components/Modals/ModalAlert'
import { ModalForm } from '@/components/Modals'
import { InputText } from '@/components/Inputs/InputText'
import useHandleInput from '@/hooks/useHandleInput'
import { closeModal, openModal } from '@/utils'
import CircleLoading from '@/components/CircleLoading'

interface PengetahuanDTO {
  id_gejala: number
  id_penyakit: number
  cr_rule: number
}

const PengetahuanDetail = () => {
  const [dataList, setDataList] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [alertMessage, setAlertMessage] = useState('')
  const [formType, setFormType] = useState<'create' | 'update'>('create')
  const [id, setId] = useState<number>(0)

  const getAllData = async () => {
    const data = await PengetahuanApi.getAll()
    data.data && setDataList(data.data)
  }

  const modalFormRef = useRef<ModalHandle>(null);
  const modalRefAlert = useRef<ModalHandle>(null);
  const modalRefDelete = useRef<ModalHandle>(null);
  
  const { formState, setFormState, handleInput } = useHandleInput<PengetahuanDTO>({
    id_gejala: 0,
    id_penyakit: 0,
    cr_rule: 0
  });

  const handleOpenModal = () => {
    openModal(modalFormRef)
    setFormType('create')
    setFormState({ id_gejala: 0, id_penyakit: 0, cr_rule: 0 })
    setErrorMessage('')
  }

  const handleEdit = (id: number, kode: string, nama_gejala: string) => {
    openModal(modalFormRef)
    setFormType('update')
    setFormState({ id_gejala: 0, id_penyakit: 0, cr_rule: 0 })
    setId(id)
  }

  const handleSave = async () => {
    try {
      openModal(modalRefAlert)
      let response: any

      if (formType === 'create') {
        response = await PengetahuanApi.create(formState)
      } else {
        response = await PengetahuanApi.update(id, formState)
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
      const response = await PengetahuanApi.delete(id)
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
        <Navbar page='Pengetahuan' />
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
                  <TableHead text='Nama Gejala' />
                  <TableHead />
                  <TableHead />
                </>}

              tbody={<>
                {dataList && dataList.map((item: any, index: number) => (
                  <tr key={index}>
                    <TableData text={index+1} />
                    <TableData text={item.kode} />
                    <TableData text={item.nama_gejala} />
                    <TableData className='w-full' />
                    <TableData text={
                      <div className='flex flex-row'>
                        <BaseButton text='Edit' onClick={() => handleEdit(item.id, item.kode, item.nama_gejala)} className='bg-blue-400 hover:bg-blue-500 me-2'  />
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
      
      <ModalForm title={`${formType === 'create' ? 'Tambah' : 'Edit'} Data Gejala`} ref={modalFormRef} onSave={handleSave}>
        <div>
          {/* <InputText text='Kode' name='kode' value={formState.id_gejala} onChange={handleInput} />
          <InputText text='Nama Gejala' name='nama_gejala' value={formState.id_penyakit} onChange={handleInput} /> */}
          <small className='text-red-500'>{errorMessage}</small>
        </div>
      </ModalForm>

      <ModalAlert ref={modalRefAlert}
        message={alertMessage ? alertMessage : <CircleLoading/>}
      />

      <ModalAlert ref={modalRefDelete}
        message='Yakin ingin menghapus data gejala yang dipilih?'
        onConfirm={handleDelete}
      />
    </>
  )
}

export default PengetahuanDetail