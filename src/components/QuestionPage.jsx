import React from 'react'
import { useEffect, useRef, useState} from 'react'
import { ThreeDots } from 'react-loader-spinner'
import Question from './Question'
const QuestionPage = ({setNextPage}) => {
    const isFirstRender = useRef(true)
    const [questions, setQuestions] = useState([])
    const [selectedOptions, setSelectedOptions] = useState({})
    const [validateAnswers, setValidateAnswers] = useState(false)
    const [score, setScore] = useState(0)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const correctAnswers = questions.map(question => question.correct_answer)

    const decodeHTML = (html) => {
      const txt = document.createElement("textarea");
      txt.innerHTML = html;
      return txt.value;
    };

useEffect(() => {
    if(isFirstRender.current) {
        isFirstRender.current = false
        return
    }
    const fetchQuestions = async () => {
    setLoading(true)
    try {
      const response = await fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      if(!response.ok) {
        throw new Error(`Sorry, an error occurred: ${response.status}`)
      }
        const data = await response.json()
        const updatedQuestions = data.results.map(question => {
        const correct = decodeHTML(question.correct_answer)
        const rand =  Math.ceil(Math.random() * 4)
        const options = question.incorrect_answers.map(option => decodeHTML(option))
        options.splice(rand, 0, correct)

        return {
          ...question,
          question: decodeHTML(question.question),
          options,
        }
      })
        setQuestions(updatedQuestions)
    } catch(err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }
  fetchQuestions()
  }, [])

  const checkAnswers = () => {
    setValidateAnswers(true)
    let newScore = 0
    Object.keys(selectedOptions).forEach(questionId => {
      if(selectedOptions[questionId] === correctAnswers[questionId]){
        newScore += 1
      }
    })
    setScore(newScore)
  }

  
  return (
    <>
<div className='w-screen h-screen bg-lighter-purple'>
<div className='flex flex-col justify-around items-center w-full h-full '>
{error && <h1 className='text-2xl font-inter font-bold text-light-purple'>{error}</h1>}
{
!loading 
?
questions.map((question, id) => {
return (
  <Question
      key={id}
      questionId = {id}
      question = {question.question}
      options = {question.options}
      validateAnswers = {validateAnswers}
      correctAnswer = {question.correct_answer}
      selectedOptions = {selectedOptions}
      setSelectedOptions = {setSelectedOptions}
  />
) 
})
:
(
<ThreeDots
  color="#4D5B9E"/>
)
}
                  
{!validateAnswers 
?
questions.length > 0 ? <button onClick={checkAnswers} className='font-inter font-semibold text-[10.24px] px-5 py-3 rounded-[10px] bg-light-purple text-white'>Check answers</button>: ""
:
<div className='flex w-1/2 justify-center items-center gap-5'>
  <h1 className='font-inter font-bold leading-[15.49px] text-[12.8px] text-light-blue'>You scored {score}/{questions.length} correct answer{score > 1 ? "s":""}</h1>
  <button onClick={() => setNextPage(false)} className='w-[104px] h-[30px] rounded-[10px] font-inter font-semibold text-[10.24px] leading-[12.39px] text-white bg-light-purple'>Play again</button>
</div>
}


</div>
</div>
    </>
  )
}

export default QuestionPage