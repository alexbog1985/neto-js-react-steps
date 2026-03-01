import type {StepsData} from "../Form/Form.tsx";

interface TableProps {
  data: StepsData[];
  onDelete: (date: string) => void;
  onUpdate: (date: string, distance: number) => void;
}

function Table({ data, onDelete, onUpdate }: TableProps) {

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
    });
  }

  return (
      <div className='data-table'>
        <div className='table-header'>
          <div className='col-date'>Дата (ДД.ММ.ГГ)</div>
          <div className='col-distance'>Пройдено км</div>
          <div className='col-actions'>Действия</div>
        </div>
        <div className='table-body'>
          {data.length === 0 ? (<div className="empty-state">Нет данных о тренировках</div>) : (
            data.map((item) => (
              <div key={item.date} className='table-row' data-date={item.date}>
                <div className="col-date">{formatDate(item.date)}</div>
                <div className="col-distance">{item.distance}</div>
                <div className="col-actions">
                  <button className="action-btn edit-btn" title="Редактировать" onClick={() => onUpdate(item.date, item.distance)}>✎</button>
                  <button className="action-btn delete-btn" title="Удалить" onClick={() => onDelete(item.date)}>✕</button>
                </div>
              </div>
            )))
          }
        </div>
      </div>
  )
}

export default Table;