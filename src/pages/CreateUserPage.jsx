import CreateUserForm from '../components/CreateUserForm';
import { useNavigate } from 'react-router-dom';

const CreateUserPage = () => {
     const navigate = useNavigate();
     return (
          <>

          <div className='navigation-bar-container'>
                    <button onClick={() => { navigate("/profiles") }}>Home</button>
               </div>
          <div>
               <CreateUserForm />
          </div>
          </>
     );
};

export default CreateUserPage;
