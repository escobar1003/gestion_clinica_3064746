import { useEffect, useState } from "react";

export default function Medico(){

  const [nombre,setNombre]=useState("");
  const [medicos,setMedicos]=useState([]);

  useEffect(()=>{
    cargarDatos()
  },[])

  async function cargarDatos(){
    await fetch("https://pghrprnrnmeayjnqpeil.supabase.co/rest/v1/medico",{
      headers:{
        "Authorization":"Bearer sb_publishable_SpQx6omDaYh9yBy1Xxf5lQ_4S8IUanE",
        "apikey":"sb_publishable_SpQx6omDaYh9yBy1Xxf5lQ_4S8IUanE",
        "Content-Type":"application/json"
      }
    })
    .then(res=>res.json())
    .then(data=>setMedicos(data))
  }

  async function guardar(){
    await fetch("https://pghrprnrnmeayjnqpeil.supabase.co/rest/v1/medico",{
      method:"POST",
      headers:{
        "Authorization":"Bearer sb_publishable_SpQx6omDaYh9yBy1Xxf5lQ_4S8IUanE",
        "apikey":"sb_publishable_SpQx6omDaYh9yBy1Xxf5lQ_4S8IUanE",
        "Content-Type":"application/json",
        "Prefer":"return=representation"
      },
      body: JSON.stringify({
        nombre: nombre
      })
    })
    setNombre("")
    cargarDatos()
  }

  return (
    <div>
      <h1>MEDICOS</h1>

      <input 
        type="text"
        placeholder="nombre"
        value={nombre}
        onChange={(e)=>setNombre(e.target.value)}
      />

      <button onClick={guardar}>Guardar</button>

      <table border="1">
        <thead>
          <tr>
            <th>id</th>
            <th>nombre</th>
          </tr>
        </thead>

        <tbody>
          {medicos.map((m)=>(
            <tr key={m.id}>
              <td>{m.id}</td>
              <td>{m.nombre}</td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  )
}