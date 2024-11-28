import Footer from "../components/footer/Footer"
import Header from "../components/header/Header"
import RealTimeLocation from "../components/realtimelocation/RealTimeLocation"

const Page = () => {

  return (
    <>
    <Header/>
    <div className="h-[500px]">
      <div className=" flex items-center justify-center bg-orange-500 text-white p-6">
        <h1>Tracking the live location from here .</h1>
      </div>
      <div>
    <RealTimeLocation/>
    </div>
    </div>
    <Footer/>
    </>
  )
}

export default Page