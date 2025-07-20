import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken'


export const getDatefromToken = (request) =>{


try {
  
const token = request.cookies.get('token')?.value || ''


const tokenDecoded = jwt.verify(token,process.env.tokendata)

return tokenDecoded.id



} catch (error) {
  
  throw new Error(error.message)
}


}