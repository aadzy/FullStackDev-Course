import http from 'node:http'
import {getDataFromDB} from './database/db.js'
import { sendJSONResponse } from './utils/sendJSONResponse.js'

const PORT=8000
const server= http.createServer(async(req,res)=>{
const players = await getDataFromDB()

const urlObj = new URL(req.url, `http://${req.headers.host}`)
  const queryObj = Object.fromEntries(urlObj.searchParams)
  

  if (urlObj.pathname === '/api' && req.method === 'GET') {
      let filteredData=getPlayersByQueryParams(players,queryObj)
      console.log(queryObj)
        sendJSONResponse(res,200,filteredData)
  }
  // else if (urlObj.pathname === '/api/players' && req.method === 'GET') {
  //     let filteredData = getPlayersByQueryParams(players, queryObj)
  //     console.log('Player query:', queryObj)
  //     sendJSONResponse(res,200,filteredData)
  // }
  // else if (urlObj.pathname === '/api/roles' && req.method === 'GET') {
  //     let filteredData = getPlayersByQueryParams(players, queryObj)
  //     console.log('Player query:', queryObj)
  //     sendJSONResponse(res,200,filteredData)
  // }
  else{
    sendJSONResponse(res,404,({error:'not found',message:'Requested route is not exist'}))

  }
  
})

// Function to filter players by query parameters
const getPlayersByQueryParams = (data, queryObj) => {
  const { team, role } = queryObj

  if (team) {
    data = data.filter(player =>
      player.team.toLowerCase() === team.toLowerCase()
    )
  }

  if (role) {
    data = data.filter(player =>
      player.role.toLowerCase() === role.toLowerCase()
    )
  }

  return data
}

server.listen(PORT, () => console.log(`Server is running on : ${PORT}`))