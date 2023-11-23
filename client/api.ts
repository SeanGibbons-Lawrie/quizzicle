import request from 'superagent'
import { Quiz} from '../models/quiz.ts'
import { Question } from '../models/question.ts'

const rootUrl = '/api/v1'

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function getQuizzes(): Promise<Quiz[]> {
  await sleep(1500)

  return [
    {
      quizId: 1,
      quizName: 'My First Quiz',
      lastUpdated: new Date(),
      isPublic: true,
    },
    {
      quizId: 2,
      quizName: 'My Second Quiz',
      lastUpdated: new Date(),
      isPublic: false,
      authorId: '1',
    },
    {
      quizId: 3,
      quizName: 'My Fancy Quiz',
      lastUpdated: new Date(),
      isPublic: true,
      authorId: '2',
    },
  ]
}

function logError(err: Error) {
  console.error('Error consuming the API (in client/api.js):', err.message)
}
interface addQuestionParams {
  quiz_id:undefined|string
  text:Question
}
//adding question
export async function addQuestion({quiz_id,text}:addQuestionParams){
  const response = await request.post(`${rootUrl}/questions/${quiz_id}/add-question`).send(text)
  return response
}

//get specific id for quiz
export async function getQuizName(quizId:string|undefined){
  const response = await request.get(`${rootUrl}/quizzes/${quizId}`)
  console.log("api",response.body)
  return response.body.quiz_name
}