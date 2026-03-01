import './App.css'
import Form, {type StepsData} from "./components/Form/Form.tsx";
import {useState} from "react";
import Table from "./components/Table/Table.tsx";

function App() {
  const [formData, setFormData] = useState<StepsData[]>([])

  const handlerFormSubmit = (data: StepsData) => {
    setFormData(prev => {
      const existingIndex = prev.findIndex(item => item.date === data.date);
      let updatedData;

      if (existingIndex > -1) {
        updatedData = prev.map(item =>
          item.date === data.date
            ? { ...item, distance: item.distance + data.distance }
            : item
        );
      } else {
        updatedData = [...prev, data];
      }

      return updatedData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    });
  };

  const onUpdate = (date: string, distance: number) => {
    console.log('Редактирование:', { date, distance });
  };

  const onDelete = (date: string) => {
    setFormData(prev => prev.filter(item => item.date !== date));
  };

  return (
    <div className='container'>
      <Form onSubmit={handlerFormSubmit} />
      <Table
        data={formData}
        onDelete={onDelete}
        onUpdate={onUpdate}
      />
    </div>
  )
}

export default App
