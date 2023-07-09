import { useRef, useState, useEffect } from "react";
import "../App.css";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const schema = z.object({
  title: z
    .string()
    .nonempty({ message: "Must enter a title" })
    .min(3, "Title must be at least 3 characters long")
    .max(50, "Title cannot exceed 50 characters"),
});

type FormData = z.infer<typeof schema>;

function Form1() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const dateRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLSelectElement>(null);
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

  const onSubmit = (data: FormData) => {
    const newData = {
      title: data.title,
      date: dateRef.current!.value,
      category: categoryRef.current!.value,
    };

    const updatedData = [...tableData, newData];
    setTableData(updatedData);
    localStorage.setItem("tableData", JSON.stringify(updatedData));

    reset();
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            id="title"
            type="text"
            className="form-control"
            {...register("title")}
          />
          {errors.title && (
            <p className="error-message">{errors.title.message}</p>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Due Date
          </label>
          <input ref={dateRef} id="date" type="date" className="form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select id="category" className="form-control" ref={categoryRef}>
            <option></option>
            <option>Groceries</option>
            <option>Utilities</option>
            <option>Entertainment</option>
          </select>
        </div>
        <button type="submit" className="submit-button">
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
