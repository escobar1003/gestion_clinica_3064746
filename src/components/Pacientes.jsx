import { useEffect, useState } from "react";

export default function Pacientes(){

  const [nombre,setNombre]=useState("");
  
  const [cedula, setCedula] = useState("");
  const [pacientes,setPacientes]=useState([]);
  

  useEffect(()=>{
    cargarDatos()
  },[])

  async function cargarDatos(){
  await fetch("https://msieiafazgauhfydhizg.supabase.co/rest/v1/paciente",{
    headers:{
      "Authorization":"Bearer sb_publishable_3mtLxaSdMQdPBVuR1kk8Jw_YEyAGnd_",
      "apikey":"sb_publishable_3mtLxaSdMQdPBVuR1kk8Jw_YEyAGnd_",
      "Content-Type":"application/json"
    }
  })
  .then(res=>res.json())
  .then(data=>setPacientes(data))
}

  async function guardar(){
    await fetch("https://msieiafazgauhfydhizg.supabase.co/rest/v1/paciente",{
      method:"POST",
      headers:{
        "Authorization":"Bearer sb_publishable_3mtLxaSdMQdPBVuR1kk8Jw_YEyAGnd_",
        "apikey":"sb_publishable_3mtLxaSdMQdPBVuR1kk8Jw_YEyAGnd_",
        "Content-Type":"application/json",
        "Prefer":"return=representation"
      },
      body: JSON.stringify({
        nombre: nombre,
        cedula: cedula
      })
    })
    setNombre("")
    setCedula("")
    cargarDatos()
  }

  

  return (
    <div>
      <h1>PACIENTES</h1>

      <input 
        type="text"
        placeholder="nombre"
        value={nombre}
        onChange={(e)=>setNombre(e.target.value)}
      />
      <input 
        type="text"
        placeholder="cedula"
        value={cedula}
        onChange={(e)=>setCedula(e.target.value)}
      />

      <button onClick={guardar}>Guardar</button>

      <table border="1">
        <thead>
          <tr>
            <th>id</th>
            <th>nombre</th>
            <th>cedula</th>
          </tr>
        </thead>

        <tbody>
          {pacientes.map((p)=>(
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.nombre}</td>
              <td>{p.cedula}</td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  )
}