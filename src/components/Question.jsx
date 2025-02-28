import React from 'react'

const Question = ({question, validateAnswers, correctAnswer, questionId, options, selectedOptions, setSelectedOptions}) => {

  function handleOption(option, id) {
    if (!validateAnswers) {
      setSelectedOptions((prev) => {
        return {
          ...prev,
          [id]: option,
        }
      })
    }
  }
  const selectedOption = selectedOptions[questionId]

  return (
    <>
        <div className='flex flex-col items-start sm:w-1/2 w-5/6 gap-3'>
            <h1 className='font-karla font-bold text-light-blue leading-5 text-base'>{question}</h1>


            <div className='flex gap-3 justify-start'>
              {options.map((option, id) => {
              return(
              <button style={    
                !validateAnswers ?
                {
                  backgroundColor: selectedOption === option ? "#D6DBF5" : "",
                  border: selectedOption === option ? "none" : ""
                }
                :
                {
                  backgroundColor: 
                  option === correctAnswer 
                  ? 
                  "#94D7A2" 
                  : 
                  selectedOption === option 
                  ? 
                  "#F8BCBC" 
                  : 
                  "",
                  border:
                  option === correctAnswer ? 
                  "none" 
                  : 
                  selectedOption === option 
                  ? 
                  "none" 
                  : 
                  "",
                  opacity: option === correctAnswer ? "" : selectedOption === option ? "0.5" : "0.5" 
                }
              } 

              type='button' 
              key={id} 
              onClick={() => handleOption(option, questionId)}
              className='font-inter px-1.5 py-1 rounded-[7.94px] font-medium border-1 border-light-purple text-xs text-light-blue rounded-sm5'>

              {option}

              </button> 
            )
              })}
            </div>
            </div>
    </>
  )
}

export default Question