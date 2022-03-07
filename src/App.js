import { useEffect, useState } from 'react';

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
      return eval(equation);
    }

    // reset input
    if (type === 'special' && value === 'AC') {
      setEquation('0');
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
    if (type === 'special' && value === '%' && equation != 0) setEquation(prevState => prevState/100);

    // click on an operator
    if (type === 'operator') {
      if (!operators.includes(equation[equation.length - 1])) setFinalEquation(equation + value);
    }

    // click on a number
    if (type === 'number' && equation.length < 9) {
      if (equation.startsWith(0)) setEquation(prevState => prevState.replace('0', ''));
      if (operators.includes(finalEquation[finalEquation.length - 1])) {
        console.log('ends with operator');
        setFinalEquation(prevState => prevState + value);
        setEquation(value);
      } else {
        setEquation((prevState) =>  prevState + value);
        setFinalEquation(equation + value);
      }
    }
  }

  useEffect(() => {
    console.log(finalEquation);
  }, [equation]);
  
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
