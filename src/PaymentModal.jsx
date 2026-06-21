import React, { useState } from 'react';
import './PaymentModal.css';

const PaymentModal = ({ isDark, onClose }) => {
  const [selectedPayment, setSelectedPayment] = useState(null);

  const paymentMethods = [
    {
      id: 'paypal',
      name: 'PayPal',
      icon: '🅿️',
      emoji: '😎',
      color: '#003087'
    },
    {
      id: 'creditcard',
      name: 'Credit Card',
      icon: '💳',
      emoji: '💰',
      color: '#FF6B6B'
    },
    {
      id: 'bitcoin',
      name: 'Bitcoin (jk)',
      icon: '₿',
      emoji: '🤑',
      color: '#F7931A'
    },
    {
      id: 'grandma',
      name: 'Ask Grandma',
      icon: '👵',
      emoji: '🍪',
      color: '#9B59B6'
    }
  ];

  const handleProceed = () => {
    setSelectedPayment(null);
    onClose();
  };

  return (
    <div className={`payment-overlay ${isDark ? 'dark' : 'light'}`}>
      <div className={`payment-modal ${isDark ? 'dark' : 'light'}`}>
        <div className="payment-header">
          <h2>🎉 Premium Calculation Limit Reached! 🎉</h2>
          <p className="modal-subtitle">You've used 3 calculations! Time to pay up... (jk lol)</p>
        </div>

        <div className="payment-message">
          <p>Choose your payment method to unlock infinite calculations:</p>
        </div>

        <div className="payment-methods">
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              className={`payment-button ${selectedPayment === method.id ? 'selected' : ''}`}
              onClick={() => setSelectedPayment(method.id)}
              style={{
                borderColor: selectedPayment === method.id ? method.color : undefined,
                backgroundColor:
                  selectedPayment === method.id ? `${method.color}20` : undefined
              }}
            >
              <div className="payment-icon">{method.icon}</div>
              <div className="payment-emoji">{method.emoji}</div>
              <div className="payment-name">{method.name}</div>
            </button>
          ))}
        </div>

        <div className="payment-disclaimer">
          <p>
            <strong>Disclaimer:</strong> This is totally fake and no real money will be charged. We just wanted
            to make your calculator experience more entertaining! 😄
          </p>
        </div>

        <div className="payment-actions">
          <button className="btn-cancel" onClick={onClose}>
            Nah, I'm broke 😭
          </button>
          <button
            className="btn-proceed"
            onClick={handleProceed}
            disabled={!selectedPayment}
          >
            {selectedPayment ? `Pay with ${paymentMethods.find((m) => m.id === selectedPayment)?.name}` : 'Select a method'}
          </button>
        </div>

        <div className="payment-footer">
          <p>P.S. Just hit the button and we'll pretend to charge you! 🤣</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
