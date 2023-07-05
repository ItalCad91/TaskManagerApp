import "../App.css";

function Header() {
  return (
    <div className="app-container">
      <div className="logo-container">
        <img src="./logo.png" alt="Logo" className="logo-img" />
        <h1 className="app-title">Task Manager App</h1>
      </div>
    </div>
  );
}

export default Header;
