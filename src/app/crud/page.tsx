"use client"
import { useState } from "react"

const Crud = () => {
    const [item, setItem] = useState('')
    const [data, setData] = useState<string[]>([])
    const [editdata, setEditdata] = useState<number | null>(null)
    const inputValue = (val:string) => {
        setItem(val)
    }
    const addData = () => {
        if(editdata !== null){
            const updatedata = [...data]
            updatedata[editdata] = item
            setData(updatedata)
            setEditdata(null)
        }
        else{
            setData([...data, item])
            setItem("")
        }
       
    }
    const deleteData = (e:number) => {
       const alldata = data.filter((_,index) => e !== index);
       setData(alldata);
    }
    const editItem = (e:number) => {
        setItem(data[e])
        setEditdata(e)
    }

    console.log(editdata)
    return(
        <>
          <input className="border border-gray-700" name="name" value={item} onChange={(e) => inputValue(e.target.value)} />
          <input type="password"  className="border border-gray-700" />
          <button onClick={addData} className="bg-blue-700">Add</button>
          <ul>
            {data.map((item,index) => {
                return(
                    
                    <li key={index}>{item}
                     <button onClick={() => deleteData(index)} className="border border-gray-900 bg-red-700">X</button>
                     <button onClick={() => editItem(index)} className="border border-gray-900 bg-yellow-300">Edit</button>
                    </li>
                   
                )
            })}
          </ul>
        </>
    )
}

export default Crud