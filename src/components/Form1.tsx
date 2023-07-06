import { FormEvent, useRef, useState, useEffect } from "react";
import "../App.css";

function Form1() {
  const titleRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLInputElement>(null);
  const [tableData, setTableData] = useState<any[]>([]);

  useEffect(() => {
    const storedData = localStorage.getItem("tableData");
    if (storedData) {
      setTableData(JSON.parse(storedData));
    }
  }, []);

  const deleteTableData = (index: number) => {
    const updatedData = [...tableData];
    updatedData.splice(index, 1);
    setTableData(updatedData);
    localStorage.setItem("tableData", JSON.stringify(updatedData));
  };

  const handleClickSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (
      titleRef.current?.value &&
      dateRef.current?.value &&
      categoryRef.current?.value
    ) {
      alert("Thanks for the input!");

      const newData = {
        title: titleRef.current!.value,
        date: dateRef.current!.value,
        category: categoryRef.current!.value,
      };

      const updatedData = [...tableData, newData];
      setTableData(updatedData);
      localStorage.setItem("tableData", JSON.stringify(updatedData));

      titleRef.current!.value = "";
      dateRef.current!.value = "";
      categoryRef.current!.value = "";
    } else {
      alert("You must fill in all the input fields.");
    }
  };

  return (
    <div className="form-container">
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            ref={titleRef}
            id="title"
            type="text"
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Due Date
          </label>
          <input
            ref={dateRef}
            id="date"
            type="date"
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <input
            ref={categoryRef}
            id="category"
            type="text"
            className="form-control"
            required
          />
        </div>
        <button className="submit-button" onClick={handleClickSubmit}>
          Submit
        </button>
      </form>

      {tableData.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Due Date</th>
              <th>Category</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((data, index) => (
              <tr key={index}>
                <td>{data.title}</td>
                <td>{data.date}</td>
                <td>{data.category}</td>
                <td>
                  <button onClick={() => deleteTableData(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Form1;
