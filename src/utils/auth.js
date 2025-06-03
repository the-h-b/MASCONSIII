import { useNavigate } from 'react-router-dom';

// Utility function for handling sign out
export const useSignOut = () => {
  const navigate = useNavigate();
  
  const handleSignOut = () => {
    // Clear authentication data
    localStorage.removeItem('userRole');
    localStorage.removeItem('isLoggedIn');
    
    // Redirect to login page
    navigate('/');
  };
  
  return handleSignOut;
};

// Custom alert function to replace browser alert
export const customAlert = (message) => {
  const alertBox = document.createElement('div');
  alertBox.className = 'fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50';
  alertBox.innerHTML = `
    <div class="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full text-center">
      <p class="text-lg font-semibold mb-4">${message}</p>
      <button id="closeAlert" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none">
        OK
      </button>
    </div>
  `;
  document.body.appendChild(alertBox);

  document.getElementById('closeAlert').onclick = () => {
    document.body.removeChild(alertBox);
  };
};