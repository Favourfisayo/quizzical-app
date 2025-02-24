import React from 'react'
import { useState } from 'react'
import QuestionPage from './QuestionPage'
const Homepage = () => {
  const [nextPage, setNextPage] = useState(false) 
  const openNextPage = () => {
    setNextPage(true)
  }


  return (
    <>
    { 
    !nextPage ?
      <div className='flex flex-col bg-lighter-purple w-full h-screen items-center justify-center gap-2'>
          <h2 className='font-karla font-bold text-3xl text-light-blue leading-36.53'>Quizzical</h2>
          <p className='text-light-blue leading-[19.36px] font-inter font-normal '>This is a fun quiz app!</p>
          <button onClick={openNextPage} className='button text-white bg-light-purple px-8 py-2 rounded-md font-inter font-medium'>Start quiz</button>
      </div>
      :
      <QuestionPage
      setNextPage = {setNextPage}
      />
    }
    </>
  )
}

export default Homepage  