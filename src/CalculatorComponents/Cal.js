import './Calculator.css'
import { React, useState } from 'react'

export default function Calculator() {
    const [value, setValue] = useState('')
    
    function clearDisplay() {
        setValue('');
    }

    function deleteLast() {
        setValue(value.slice(0, -1))
    }

    function appendNumber(number) {
        
        setValue(value + number)
    }

    function appendOperator(operator) {
        setValue(value + operator)
    }

    function appendDecimal() {
        if (!value.includes('.')) {
            setValue(value + '.')
        }
    }

    function toggleSign() {
        if (value) {
            setValue(String(parseFloat(value) * -1));
        }
    }

    function calculateResult() {
        try {
            const ans = eval(value).toString()
            setValue(ans)
        } catch (error) {
            setValue('Error');
        }
    }

    function calculateSqrt() {
        if (value) {
            setValue(Math.sqrt(parseFloat(value).toString()));
        }
    }

    function calculateSin() {
        if (value) {
            setValue(Math.sin(parseFloat(value) * Math.PI / 180).toString());
        }
    }

    function calculateCos() {
        if (value) {
            setValue(Math.cos(parseFloat(value) * Math.PI / 180).toString());
        }
    }

    function calculateTan() {
        if (value) {
            setValue(Math.tan(parseFloat(value) * Math.PI / 180).toString());
        }
    }

    function calculateLog() {
        if (value) {
            setValue(Math.log10(parseFloat(value)).toString());
        }
    }

    function calculateExp() {
        if (value) {
            setValue(Math.exp(parseFloat(value)).toString());
        }
    }

    function calculatePi() {
        setValue(value + Math.PI.toString());
    }

    function calculateE() {
        setValue(value + Math.E.toString());
    }
        
    
    
    
    
    
    
    
    
    
    
    
    
    
    return (<div className="cal">
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Scientific Calculator</title>
            <link rel="stylesheet" href="Calculator.css" />
        </head>
        <body>
            <div class="calculator">
                <input type="text" id="display" value={value}  />
                <div class="buttons">
                    <button onClick={clearDisplay}>C</button>
                    <button onClick={deleteLast}>DEL</button>
                    <button onClick={() => appendOperator('**')}>^</button>
                    <button onClick={() => appendOperator('/')}>/</button>

                    <button onClick={() => appendNumber('7')}>7</button>
                    <button onClick={() => appendNumber('8')}>8</button>
                    <button onClick={() => appendNumber('9')}>9</button>
                    <button onClick={() => appendOperator('*')}>*</button>

                    <button onClick={() => appendNumber('4')}>4</button>
                    <button onClick={() => appendNumber('5')}>5</button>
                    <button onClick={() => appendNumber('6')}>6</button>
                    <button onClick={() => appendOperator('-')}>-</button>

                    <button onClick={() => appendNumber('1')}>1</button>
                    <button onClick={() => appendNumber('2')}>2</button>
                    <button onClick={() => appendNumber('3')}>3</button>
                    <button onClick={() => appendOperator('+')}>+</button>

                    <button onClick={() => appendNumber('0')}>0</button>
                    <button onClick={appendDecimal}>.</button>
                    <button onClick={calculateResult}>=</button>
                    <button onClick={toggleSign}>±</button>

                    <button onClick={calculateSqrt}>√</button>
                    <button onClick={calculateSin}>sin</button>
                    <button onClick={calculateCos}>cos</button>
                    <button onClick={calculateTan}>tan</button>

                    <button onClick={calculateLog}>log</button>
                    <button onClick={calculateExp}>exp</button>
                    <button onClick={calculatePi}>π</button>
                    <button onClick={calculateE}>e</button>
                </div>
            </div>

            <script src="Calculator.js"></script>
        </body>
        </html>
    </div>)
}

