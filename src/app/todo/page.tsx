"use client";
import { useState } from "react";

interface Objectsprop {
  id: number;
  name: string;
  number: string;
}

const Todo = () => {
  // ✅ Ensure data state is an array of Objectsprop[]
  const [data, setData] = useState<Objectsprop[]>([]);
  const [item, setItem] = useState<Objectsprop>({ id: 0, name: "", number: "" });
  const [editData, setEditData] = useState<boolean>(false);

  const changeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  const addHandle = () => {
    if (editData) {
      const updatedData = data.map((existingItem) =>
        existingItem.id === item.id ? item : existingItem
      );
      setData(updatedData);
      setEditData(false);
    } else {
      setData([...data, { ...item, id: new Date().getTime() }]);
    }
  };

  const removeData = (id: number) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
  };

  const edit = (id: number) => {
    const itemToEdit = data.find((item) => item.id === id);
    if (itemToEdit) {
      setItem(itemToEdit);
      setEditData(true);
    }
  };

  return (
    <div className="app">
      <input name="name" className="border" value={item.name} onChange={changeHandle} />
      <input name="number" className="border" value={item.number} onChange={changeHandle} />
      <button onClick={addHandle}>{editData ? "Update" : "Add"}</button>

      <table className="w-1/2">
        <thead>
          <tr>
            <th className="border">Id</th>
            <th className="border">Name</th>
            <th className="border">Number</th>
            <th className="border">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td className="border">{item.id}</td>
              <td className="border">{item.name}</td>
              <td className="border">{item.number}</td>
              <td className="border">
                <button onClick={() => edit(item.id)} className="rounded bg-blue-900 text-white px-2">
                  Edit
                </button>
                <button onClick={() => removeData(item.id)} className="rounded bg-red-900 text-white px-2">
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Todo;
