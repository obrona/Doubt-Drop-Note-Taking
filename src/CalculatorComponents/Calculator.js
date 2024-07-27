// JavaScript code for calculator functionality

// // CalculatorComponent.js
// import React, { useEffect } from 'react';
// import './Calculator.css'; // Import your CSS file

// const CalculatorComponent = () => {
//   useEffect(() => {
//     // Load the JavaScript for the calculator
//     const script = document.createElement('script');
//     script.src = '/Calculator/Calculator.js'; // Adjust the path if needed
//     script.async = true;
//     document.body.appendChild(script);
    
//     return () => {
//       document.body.removeChild(script); // Cleanup on unmount
//     };
//   }, []);

//   return (
//     <div>
//       <iframe
//         title="Calculator"
//         src="/Calculator/Calculator.html"
//         style={{ border: 'none', width: '100%', height: '500px' }} // Adjust dimensions as needed
//       />
//     </div>
//   );
// };

// export default CalculatorComponent;
let display = document.getElementById('display');

function clearDisplay() {
    display.value = '';
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function appendNumber(number) {
    display.value += number;
}

function appendOperator(operator) {
    display.value += operator;
}

function appendDecimal() {
    if (!display.value.includes('.')) {
        display.value += '.';
    }
}

function toggleSign() {
    if (display.value) {
        display.value = String(parseFloat(display.value) * -1);
    }
}

function calculateResult() {
    try {
        display.value = eval(display.value);
    } catch (error) {
        display.value = 'Error';
    }
}

function calculateSqrt() {
    if (display.value) {
        display.value = Math.sqrt(parseFloat(display.value));
    }
}

function calculateSin() {
    if (display.value) {
        display.value = Math.sin(parseFloat(display.value) * Math.PI / 180);
    }
}

function calculateCos() {
    if (display.value) {
        display.value = Math.cos(parseFloat(display.value) * Math.PI / 180);
    }
}

function calculateTan() {
    if (display.value) {
        display.value = Math.tan(parseFloat(display.value) * Math.PI / 180);
    }
}

function calculateLog() {
    if (display.value) {
        display.value = Math.log10(parseFloat(display.value));
    }
}

function calculateExp() {
    if (display.value) {
        display.value = Math.exp(parseFloat(display.value));
    }
}

function calculatePi() {
    display.value += Math.PI;
}

function calculateE() {
    display.value += Math.E;
}