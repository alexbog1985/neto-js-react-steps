import * as React from "react";
import {useState} from "react";

export interface StepsData {
  date: string;
  distance: number;
}

interface FormProps {
  onSubmit: (data: StepsData) => void;
}

function Form({ onSubmit }: FormProps) {
  const today = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState<StepsData>({
    date: today,
    distance: 0
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'distance' ? Number(value) : e.target.value
    }));
  }

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  }

  return (
    <div className="form-container">
      <form id="trainingForm" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="date">Дата (ДД.ММ.ГГ)</label>
            <input
              type="date"
              id="date"
              name="date"
              onChange={handleFormChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="distance">Пройдено км</label>
            <input
              type="number"
              id="distance"
              name="distance"
              placeholder="5.7"
              step="0.1"
              min="0"
              onChange={handleFormChange}
              required
            />
          </div>
          <button type="submit" className="submit-btn">OK</button>
        </div>
      </form>
    </div>
  )
}

export default Form