import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PaymentMethods = () => {
  const navigate = useNavigate();
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [methodType, setMethodType] = useState('Credit/Debit Card');
  const [cardNumber, setCardNumber] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handleAddPaymentMethod = (e) => {
    e.preventDefault();
    console.log({
      methodType,
      cardNumber,
      nameOnCard,
      expiryDate,
      cvv,
    });

    setPaymentMethods([...paymentMethods, {
      id: Date.now(),
      type: methodType,
      lastFour: cardNumber.slice(-4),
      name: nameOnCard,
    }]);

    setCardNumber('');
    setNameOnCard('');
    setExpiryDate('');
    setCvv('');
  };

  const goToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="text-xl font-bold text-blue-600">MASCONSIII</div>
        </div>

        <nav className="flex items-center space-x-8 text-sm font-medium text-gray-700">
          <a href="#" onClick={(e) => { e.preventDefault(); goToDashboard(); }}>Dashboard</a>
          <a href="#" className="text-blue-600">Payment Methods</a>
          <div className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-full">
            <span>HARSH BHUTRA</span>
            <span className="bg-purple-500 text-white text-xs px-2 py-0.5 rounded-full">Pro</span>
            <img
              src="https://www.svgrepo.com/show/384674/account-avatar-profile-user-11.svg"
              alt="avatar"
              className="w-5 h-5"
            />
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Payment Methods</h1>
            <p className="text-sm text-gray-500">
              Manage your payment methods for automatic collections
            </p>
          </div>
          <button 
            onClick={goToDashboard}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium"
          >
            Back to Dashboard
          </button>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl mx-auto">
          {paymentMethods.length === 0 && (
            <div className="bg-blue-50 text-blue-700 p-4 rounded-md text-center mb-6">
              No payment methods added yet.
            </div>
          )}

          {paymentMethods.length > 0 && (
            <div className="mb-6 border-t border-gray-200 pt-4">
              <h2 className="text-xl font-medium text-gray-700 mb-3">Your Payment Methods</h2>
              {paymentMethods.map((method) => (
                <div key={method.id} className="flex justify-between items-center bg-gray-50 p-3 rounded-md mb-2">
                  <span className="font-medium">{method.type} ending in {method.lastFour}</span>
                  <span className="text-gray-600">{method.name}</span>
                </div>
              ))}
            </div>
          )}

          <h2 className="text-xl font-semibold text-gray-800 mb-4 border-t border-gray-200 pt-6">Add New Payment Method</h2>

          <form onSubmit={handleAddPaymentMethod}>
            <div className="mb-4">
              <label htmlFor="methodType" className="block text-sm font-medium text-gray-700 mb-1">Method Type</label>
              <div className="relative">
                <select
                  id="methodType"
                  name="methodType"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md shadow-sm"
                  value={methodType}
                  onChange={(e) => setMethodType(e.target.value)}
                >
                  <option>Credit/Debit Card</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim())}
                maxLength="19"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="nameOnCard" className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
              <input
                type="text"
                id="nameOnCard"
                name="nameOnCard"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="John Doe"
                value={nameOnCard}
                onChange={(e) => setNameOnCard(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="MM/YY"
                  value={expiryDate}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '');
                    if (value.length > 2) {
                      setExpiryDate(`${value.slice(0, 2)}/${value.slice(2, 4)}`);
                    } else {
                      setExpiryDate(value);
                    }
                  }}
                  maxLength="5"
                />
              </div>
              <div>
                <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="123"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
                  maxLength="4"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Payment Method
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default PaymentMethods;