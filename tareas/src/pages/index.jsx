import React,{useState,useEffect} from "react";
import Eliminar from "../assets/iconos/Icono_Eliminar.svg";
import Icono_PorHacer from "../assets/iconos/Icono_PorHacer.png";
import finalizada from "../assets/iconos/finalizada.png";
import {getActivity} from "../api/index";

export default function Index() {

    const [formData, setFormData] = useState({
        persona: "",
      });
    const [activity, setActivity] = useState([]);
    const [count, setCount] = useState(0);

    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };

      
    const enviar = (event) => {
        event.preventDefault();
        getActivity(formData.persona)
        .then((data) => {

            let array = {act:data['activity'],estado:0};
   
            setActivity([...activity, array])
        })
        .catch((error) => {
            console.log(error)
        });
    }

    const handleOnclickDelete = (item) => {
        let array = activity.filter((data) => data.act !== item);
        setActivity(array)
      };


      const handleOnclickAction = (item) => {
        let array = activity
        array.forEach(function(datos){
            if(datos.act === item){
                if(datos.estado === 1){
                    datos.estado = 0
                }else{
                    datos.estado = 1
                }
            }
          })
        setActivity(array)
        console.log(count)
        setCount(count+1)
      };


      useEffect(() => {
        console.log(activity)
      }, [count]);

    return (
        <>
        <div className="w-full flex justify-center">
        <form onSubmit={enviar}>
        <div className="mb-6 flex items-center justify-center grid grid-cols-2 gap-2 pt-10">
                <div className="grid grid-cols-3 gap-0">
                 
                  <div className="flex items-center justify-center">
                    <label
                      className="block text-black text-label2 font-bold md:text-right mb-1 md:mb-0 pr-4 flex justify-start font-sans not-italic"
                      htmlFor="usuario"
                    >
                      Número de Persona
                    </label>
                  </div>
                
                <div className="flex items-center justify-center">
                  <input
                    className="rounded-lg focus:outline-none focus:bg-white focus:border-purple-400 border-purple-400 border-2 py-2 px-4 w-full appearance-none text-opacity font-rococo"
                    id="persona"
                    name="persona"
                    type="number"
                    placeholder="Número de Persona"
                    value={formData.persona}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="flex items-center justify-center">
                    <button type="submit" className="bg-purple-400 w-[90%] h-full text-white">Añadir</button>
                </div>
                </div>
              </div>
            </form>
        </div>

        <div className="flex items-center justify-center pt-10">
        <ul>
        {activity.map((item, key) => (
           <li key={key}>
            <div className="flex items-center justify-center grid grid-cols-3 gap-1">
                <div><button onClick={()=>handleOnclickAction(item.act)} type={"button"}>
                <img src={item.estado === 0 ? Icono_PorHacer :   finalizada } alt="" className="w-5"/></button>
                </div>
                <div className="flex items-center justify-center">
                    {item.act}
                </div>
                <div>
                    <button onClick={()=>handleOnclickDelete(item.act,key)} type={"button"}>
                    <img src={Eliminar} alt="" /></button>
                </div>
            </div>
            </li>
        ))}
        </ul>
        </div>
        </>
    );
}