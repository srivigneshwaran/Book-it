import Logos from '../assets/Bookit-logo.svg'
function Logo({width}) {
  return (
    <>
    <div className='logo'>
        <img src={Logos} alt="logo" width={width} />
    </div>
    </>
  )
}

export default Logo