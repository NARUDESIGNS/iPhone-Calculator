import { useState } from 'react';

import './app.css';
import Output from './Components/Output';
import Button from './Components/Button';

function App() {
  let [equation, setEquation] = useState('0');
  let [finalEquation, setFinalEquation] = useState('0');

  const operators = ['÷', 'x', '-', '+', '='];

  
  const handleClick = (type, value) => {
    // compute value
    const calculate = (equation) => {
      // replace all occurrences of 'x' with '*' and '÷' with '/'
      equation = equation.replace(/x/g, '*').replace(/÷/g, '/'); 
      const result = eval(equation);
      return `${result}`.includes('.') ? result.toFixed(2) : result;
    }
  
    // add comma (not implemented yet)
    // const commafy = (value) => {
    //   return value.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
    // }

    const removeZeros = () => {
      // unless equation or finalEquation includes '.' (e.g 0.56) clear leading zeros (remove: 056, set: 56)
      if ((equation.startsWith(0) || finalEquation.startsWith(0)) && (!equation.includes('.') || !equation.includes('.'))) {
        setEquation(prevState => prevState.replace('0', ''));
        setFinalEquation(prevState => prevState.replace('0', ''));
      }
    }

    // reset input
    if (type === 'special' && value === 'AC') {
      setEquation('0');
      setFinalEquation('0');
    }
    
    // click on '+/-' button
    if (type === 'special' && value === '+/-') {
      // remove leading zeros from equation and finalEquation
      removeZeros();
      if (!equation.startsWith('-')) {
          setEquation(prevState => '-' + prevState);
          setFinalEquation(prevState => '-' + prevState);
      } else {
        setEquation((prevState) => prevState.replace('-', ''));
        setFinalEquation((prevState) => prevState.replace('-', ''));
      }
    }

    // click on '%' button
    if (type === 'special' && value === '%' && Number(equation) !== 0) {
      setEquation(prevState => `${prevState/100}`);
      setFinalEquation(prevState => `${prevState/100}`);
    }

    // click on '.'
    if (type === 'special' && value === '.' && !equation.includes('.')) {
      setEquation(prevState => prevState + value);
      setFinalEquation(prevState => prevState + value);
    }

    // click on an operator
    if (type === 'operator') {
      // check if the final equation contains an operator and its last character is not an operator (e.g check that it is `5+10`, not `5+`)
      operators.map(operator => {
        if(finalEquation.includes(operator) && !operators.includes(finalEquation[finalEquation.length - 1])){
          setEquation(`${calculate(finalEquation)}`); // set calculated value as string
          setFinalEquation(`${calculate(finalEquation)}`); // set calculated value as string
        }
      })
      // if last character is not an operator, append operator to finalEquation (e.g `5+`)
      if (!operators.includes(finalEquation[finalEquation.length - 1])) {
        setFinalEquation(`${calculate(finalEquation)}${value}`);
      }
      if(value === '=') setFinalEquation(prevState => prevState.replace('=',''));
    }

    // click on a number
    if (type === 'number' && equation.length <= 15) {
      // remove leading zeros from equation and finalEquation
      removeZeros();
      // if last character of finalEquation is an operator and and finalEquation contains more than 1 character (e.g `5+` and not `-`), 
      // append the value to finalEquation (e.g `5+10`)
      if (operators.includes(finalEquation[finalEquation.length - 1]) && finalEquation.length > 1) {
        setFinalEquation(prevState => prevState + value);
        setEquation(value);
      } else {
        setEquation((prevState) =>  prevState + value);
        setFinalEquation((prevState) =>  prevState + value);
      }
    }
  }
  
  return (
    <div className="container">
      <Output value={equation}/>
      <div className="buttons">
        <Button className="specials" handleClick={handleClick} type="special" value="AC"/>
        <Button className="specials" handleClick={handleClick} type="special" value="+/-"/>
        <Button className="specials" handleClick={handleClick} type="special" value="%"/>
        <Button className="operators" handleClick={handleClick} type="operator" value="÷"/>
        <Button handleClick={handleClick} type="number" value="7"/>
        <Button handleClick={handleClick} type="number" value="8"/>
        <Button handleClick={handleClick} type="number" value="9"/>
        <Button className="operators" handleClick={handleClick} type="operator" value="x"/>
        <Button handleClick={handleClick} type="number" value="4"/>
        <Button handleClick={handleClick} type="number" value="5"/>
        <Button handleClick={handleClick} type="number" value="6"/>
        <Button className="operators" handleClick={handleClick} type="operator" value="-"/>
        <Button handleClick={handleClick} type="number" value="1"/>
        <Button handleClick={handleClick} type="number" value="2"/>
        <Button handleClick={handleClick} type="number" value="3"/>
        <Button className="operators" handleClick={handleClick} type="operator" value="+"/>
        <Button className="zero-btn" handleClick={handleClick} type="number" value="0"/>
        <Button handleClick={handleClick} type="special" value="."/>
        <Button className="operators" handleClick={handleClick} type="operator" value="="/>
      </div>
    </div>
  );
}

export default App;
