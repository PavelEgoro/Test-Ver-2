import { Column } from '../Interfaces';
import './TableStyles.css'; 

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
}

function Table<T>({ data, columns }: TableProps<T>): JSX.Element {
  return (
    <div className="tableContainer"> 
      <table className="table"> 
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index}>{col.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col, colIndex) => (
                <td key={colIndex}>
                  {
                    col.render ? col.render(item) : typeof item[col.key as keyof T] === 'object' ? JSON.stringify(item[col.key as keyof T]) : String(item[col.key as keyof T])
                  }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;


