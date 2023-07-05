import { FormEvent, useRef } from "react";
import "../App.css";

function Form1() {
  const titleRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLInputElement>(null);

  const handleClickSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (
      titleRef.current &&
      dateRef.current &&
      categoryRef.current &&
      titleRef.current.value &&
      dateRef.current.value &&
      categoryRef.current.value
    ) {
      alert("Thanks for the input!");
      // Reset input field values
      titleRef.current.value = "";
      dateRef.current.value = "";
      categoryRef.current.value = "";
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
    </div>
  );
}

export default Form1;
