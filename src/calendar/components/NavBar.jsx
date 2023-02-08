export const NavBar = () => {
  return (
    <nav className='navbar navbar-dark bg-info bg-opacity-50 mb-4 px-4'>
      <div className='container-fluid'>
        <span className='navbar-brand '>
          <i className='fas fa-calendar-check p-2'></i>
          Alvaro Veloz
        </span>

        <button className='btn btn-outline-danger'>
          <i className='fas fa-right-from-bracket'></i>
        </button>
      </div>
    </nav>
  );
}
