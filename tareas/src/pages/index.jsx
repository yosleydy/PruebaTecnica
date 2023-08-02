import React,{useState} from "react";
import Eliminar from "../assets/iconos/Icono_Eliminar.svg";
import Icono_PorHacer from "../assets/iconos/Icono_PorHacer.png";
import finalizada from "../assets/iconos/finalizada.png";
import {getActivity} from "../api/index";

export default function Index() {

    const [formData, setFormData] = useState({
        persona: "",
      });
    const [activity, setActivity] = useState([]);

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

    const handleOnclickDelete = (id) => {
        let array = activity.filter((data,index) => index !== id);
        setActivity(array)
      };


      const handleOnclickAction = (id) => {
       const nextCounters = activity.map((c, i) => {
          if (i === id) {
            c.estado === 1 ? c.estado = 0 : c.estado = 1;
            return c;
          }else{ return c;}
        });
        setActivity(nextCounters)
      };

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

        <div className="w-full flex justify-center pt-10 pb-4">
        <ul>
        {activity.map((item, key) => (
           <li key={key} className="pt-3">
            <div className="flex items-center justify-center grid-inline grid-cols-3">
                <div className="flex items-center justify-start w-1/4"><button onClick={()=>handleOnclickAction(key)} type={"button"}>
                <img src={item.estado === 0 ? Icono_PorHacer :   finalizada } alt="" className="w-5"/></button>
                </div>
                <div className="flex items-center justify-start  w-3/4">
                    {item.act}
                </div>
                <div className="flex items-center justify-start w-1/4">
                    <button onClick={()=>handleOnclickDelete(key)} type={"button"}>
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