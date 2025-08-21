import express from 'express'
import cors from 'cors'
import {getDataFromDB} from './database/db.js'

const app=express()
app.use(cors());
const PORT=8000

const players = await getDataFromDB()
  

 app.get("/api",(req,res)=>{
  let filteredData = getPlayersByQueryParams(players, req.query)
  console.log('Player query:', req.query)
  res.json(filteredData)
 })

 app.get("/api/roles",(req,res)=>{
  let filteredData = getPlayersByQueryParams(players, {role:req.query.role})
  console.log('Player query:', req.query)
  res.json(filteredData)
 })

 app.use((req,res)=>{
  res.status(404).json({error:'not found',message:'Requested route is not exist'})
 })

 app.listen(PORT,()=>console.log(`Server is running on : ${PORT}`))
  
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
