import { useAuthStore } from '../../hooks/useAuthStore';

export const NavBar = () => {

  const { user, startLogout } = useAuthStore();

  return (
    <nav className='navbar navbar-dark bg-info bg-opacity-50 mb-4 px-4'>
      <div className='container-fluid'>
        <span className='navbar-brand '>
          <i className='fas fa-calendar-check p-2'></i>
          { user.name }
        </span>

        <button className='btn btn-outline-danger' onClick={startLogout}>
          <i className='fas fa-right-from-bracket'></i>
        </button>
      </div>
    </nav>
  );
}
