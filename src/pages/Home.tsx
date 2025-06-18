import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import { Container, Main } from '@/components/BaseLayout'
import CardWhite from '@/components/Cards/CardWhite'

const Home = () => {
  return (
    <>
      <Sidebar/>
      <Main>
        <Navbar page='Home' />
        <Container>
          <CardWhite>
            <div className='text-center'>
              <h1 className='text-2xl font-semibold text-slate-600'>Sistem Pendukung Keputusan (SPK) Karyawan Terbaik di BKPSDM Menggunakan Metode Analytical Hierarchy Process (AHP)</h1>
            </div>
          </CardWhite>
          <CardWhite>
            <p>Penilaian 1-9:</p>
            <p>1: Sama penting</p>
            <p>3: Sedikit lebih penting</p>
            <p>5: Lebih penting</p>
            <p>7: Sangat lebih penting</p>
            <p>9: Mutlak lebih penting</p>
          </CardWhite>
        </Container>
      </Main>
    </>
  )
}

export default Home