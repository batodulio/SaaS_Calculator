import React, { useState } from 'react';
import './Calculator.css';
import PaymentModal from './PaymentModal';

const Calculator = ({ isDark }) => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);
  const [history, setHistory] = useState([]);
  const [equalsCount, setEqualsCount] = useState(0);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handleNumber = (num) => {
    if (waitingForNewValue) {
      setDisplay(String(num));
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const handleDecimal = () => {
    if (!display.includes('.')) {
      setDisplay(display + '.');
      setWaitingForNewValue(false);
    }
  };

  const handleOperation = (op) => {
    const currentValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(currentValue);
    } else if (operation) {
      const result = calculate(previousValue, currentValue, operation);
      setDisplay(String(result));
      setPreviousValue(result);
    }

    setOperation(op);
    setWaitingForNewValue(true);
  };

  const calculate = (prev, current, op) => {
    switch (op) {
      case '+':
        return prev + current;
      case '-':
        return prev - current;
      case '×':
        return prev * current;
      case '÷':
        return prev / current;
      default:
        return current;
    }
  };

  const handleEquals = () => {
    if (operation && previousValue !== null) {
      const currentValue = parseFloat(display);
      const result = calculate(previousValue, currentValue, operation);
      const historyEntry = `${previousValue} ${operation} ${currentValue} = ${result}`;
      
      setDisplay(String(result));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewValue(true);
      
      // Add to history
      setHistory([...history, historyEntry]);
      
      // Increment equals count
      const newCount = equalsCount + 1;
      setEqualsCount(newCount);
      
      // Check if reached 3 equals
      if (newCount === 3) {
        setShowPaymentModal(true);
      }
    }
  };

  const handlePercentage = () => {
    const currentValue = parseFloat(display);
    const percentValue = currentValue / 100;
    setDisplay(String(percentValue));
    setWaitingForNewValue(true);
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };

  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const handlePaymentClose = () => {
    setShowPaymentModal(false);
    // Reset equals count to continue using calculator
    setEqualsCount(0);
    setHistory([]);
    setDisplay('0');
  };

  return (
    <div className={`calculator-wrapper ${isDark ? 'dark' : 'light'}`}>
      <div className={`calculator-container ${isDark ? 'dark' : 'light'}`}>
        <div className="calculator">
          <div className="display-section">
            <div className="display">{display}</div>
          </div>

          <div className="buttons-grid">
            <button className="btn btn-function" onClick={handleClear}>
              AC
            </button>
            <button className="btn btn-function" onClick={handleBackspace}>
              DEL
            </button>
            <button className="btn btn-function" onClick={handlePercentage}>
              %
            </button>
            <button className="btn btn-operator" onClick={() => handleOperation('÷')}>
              ÷
            </button>

            <button className="btn btn-number" onClick={() => handleNumber(7)}>
              7
            </button>
            <button className="btn btn-number" onClick={() => handleNumber(8)}>
              8
            </button>
            <button className="btn btn-number" onClick={() => handleNumber(9)}>
              9
            </button>
            <button className="btn btn-operator" onClick={() => handleOperation('×')}>
              ×
            </button>

            <button className="btn btn-number" onClick={() => handleNumber(4)}>
              4
            </button>
            <button className="btn btn-number" onClick={() => handleNumber(5)}>
              5
            </button>
            <button className="btn btn-number" onClick={() => handleNumber(6)}>
              6
            </button>
            <button className="btn btn-operator" onClick={() => handleOperation('-')}>
              −
            </button>

            <button className="btn btn-number" onClick={() => handleNumber(1)}>
              1
            </button>
            <button className="btn btn-number" onClick={() => handleNumber(2)}>
              2
            </button>
            <button className="btn btn-number" onClick={() => handleNumber(3)}>
              3
            </button>
            <button className="btn btn-operator" onClick={() => handleOperation('+')}>
              +
            </button>

            <button className="btn btn-number btn-zero" onClick={() => handleNumber(0)}>
              0
            </button>
            <button className="btn btn-number" onClick={handleDecimal}>
              .
            </button>
            <button className="btn btn-equals" onClick={handleEquals}>
              =
            </button>
          </div>
        </div>
      </div>

      <div className={`history-card ${isDark ? 'dark' : 'light'}`}>
        <h3>History</h3>
        <div className="history-list">
          {history.length === 0 ? (
            <p className="empty-message">No operations yet</p>
          ) : (
            history.map((item, index) => (
              <div key={index} className="history-item">
                {item}
              </div>
            ))
          )}
        </div>
        <div className="equals-counter">
          <span className="counter-text">Equals used: {equalsCount}/3</span>
          <div className="counter-dots">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`dot ${i < equalsCount ? 'active' : ''}`}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {showPaymentModal && <PaymentModal isDark={isDark} onClose={handlePaymentClose} />}
    </div>
  );
};

export default Calculator;
