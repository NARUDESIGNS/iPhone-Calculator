import { useEffect, useState } from 'react';

import './app.css';
import Output from './Components/Output';
import Button from './Components/Button';

function App() {
  let [equation, setEquation] = useState('0');
  let [finalEquation, setFinalEquation] = useState('0');

  const operators = ['÷', 'x', '-', '+', '='];

  // compute value
  const calculate = (equation) => {
    // replace all occurrences of 'x' with '*' and '÷' with '/'
    equation = equation.replace(/x/g, '*').replace(/÷/g, '/'); 
    return eval(equation);
  }

  const handleClick = (type, value) => {
    // reset input
    if (type === 'special' && value === 'AC') {
      setEquation('0');
      setFinalEquation('0');
    }
    
    // click on '+/-' button
    if (type === 'special' && value === '+/-') {
      if (!equation.startsWith('-')) {
          setEquation(prevState => '-' + prevState);
      } else {
        setEquation((prevState) => prevState.replace('-', ''));
      }
    }

    // click on '%' button
    if (type === 'special' && value === '%' && Number(equation) !== 0) setEquation(prevState => prevState/100);

    // click on an operator
    if (type === 'operator') {
      // check if the final equation contains an operator and its last character is not an operator (e.g check that it is `5+10`, not `5+`)
      operators.map(operator => {
        if(finalEquation.includes(operator) && !operators.includes(finalEquation[finalEquation.length - 1])){
          console.log('contains a symbol');
          setEquation(`${calculate(finalEquation)}`); // set calculated value as string
          setFinalEquation(`${calculate(finalEquation)}`); //
        }
      })
      if (!operators.includes(finalEquation[finalEquation.length - 1])) {
        console.log('last char is symbol');
        // append operator to finalEquation (e.g `5+`)
        setFinalEquation(`${calculate(finalEquation)}${value}`);
      }
      if(value === '=') setFinalEquation(prevState => prevState.replace('=',''));
    }

    // click on a number
    if (type === 'number' && equation.length < 9) {
      if (equation.startsWith(0) || finalEquation.startsWith(0)) {
        setEquation(prevState => prevState.replace('0', ''));
        setFinalEquation(prevState => prevState.replace('0', ''));
      }
      // if last character of finalEquation is an operator, append the value to finalEquation (e.g `5+10`)
      if (operators.includes(finalEquation[finalEquation.length - 1])) {
        console.log('ends with operator');
        setFinalEquation(prevState => prevState + value);
        setEquation(value);
      } else {
        console.log('doesn`t end with operator');
        setEquation((prevState) =>  prevState + value);
        setFinalEquation((prevState) =>  prevState + value);
      }
    }
  }
  
  useEffect(() => {
    console.log(finalEquation);
  }, [finalEquation]);
  
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
