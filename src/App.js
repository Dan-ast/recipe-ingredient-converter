import React, { useState }  from "react";
import './App.css';

function App() {
  const [ingredient, setIngredient] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('cup');
  const [servings, setServings] = useState('');
  const [results, setResults] = useState([]);

  const conversionTable = {
    cup: { gram: 240, ounce: 8.0, teaspoon: 48 },
    gram: { cup: 1 / 240, ounce: 0.0353, teaspoon: 0.2 },
    ounce: { cup: 0.125, gram: 28.35, teaspoon: 6 },
    teaspoon: { cup: 1 / 48, gram: 5, ounce: 0.167 },
  };

  const units = ["cup", "gram", "ounce", "teaspoon"];

  const convertQuantity = (fromUnit) => (toUnit) => (quantity) => {

    if (!conversionTable[fromUnit] || !conversionTable[fromUnit][toUnit]) {
    console.error(`Conversion not possible: ${fromUnit} -> ${toUnit}`);
    return 0;
  }

    const conversionRate = conversionTable[fromUnit][toUnit];
    return quantity * conversionRate;
  };

  const adjustForServings = (baseQuantity) => (newServings) =>
    (baseQuantity / 1) * newServings;

  const processIngredient = (baseQuantity, baseUnit, newUnit, newServings) => {
    const adjustedQuantity = adjustForServings(baseQuantity)(newServings);
    const convertedQuantity = convertQuantity(baseUnit)(newUnit)(adjustedQuantity);
    return convertedQuantity.toFixed(2);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const newResults = [];
    units.forEach(currentUnit => {
      if (currentUnit !== unit) {
        const convertedQuantity = processIngredient(
          parseFloat(quantity), 
          unit, 
          currentUnit, 
          parseFloat(servings)
        );
        newResults.push(`${ingredient}: ${convertedQuantity} ${currentUnit}`);
      }
    });
    
    setResults(newResults);
  };

  return (
    <div className="App">
      <main className="container">
        <h1>Recipe Ingredient Converter</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="ingredient">Ingredient: </label>
            <input type="text" id="ingredient" value={ingredient} onChange={(e) => setIngredient(e.target.value)} required/>
          </div>

          <div>
            <label htmlFor="quantity">Quantity: </label>
            <input type="number" id="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} step="any" required/>
          </div>

          <div>
            <label htmlFor="unit">Unit: </label>
            <select id="unit" value={unit} onChange={(e) => setUnit(e.target.value)} >
              <option value="cup">Cup</option>
              <option value="gram">Gram</option>
              <option value="ounce">Ounce</option>
              <option value="teaspoon">Teaspoon</option>
            </select>
          </div>

          <div>
            <label htmlFor="servings">Number of Servings: </label>
            <input type="number" id="servings" value={servings} onChange={(e) => setServings(e.target.value)} step="any" required/>
          </div>

          <button type="submit">Convert</button>
        </form>

        <h2>Converted Ingredients</h2>
        <ul id="result-list">
          {results.map((result, index) => (
            <li key={index}>{result}</li>
          ))}
        </ul>
      </main>

      <footer>
        This project was coded by {" "}
            <a href="https://github.com/Dan-ast" target="_blank">Anastasiia Dekret</a> {" "}
             and is {" "}
            <a href="https://github.com/Dan-ast/recipe-ingredient-converter" target="_blank">open-sourced on Github</a>
            {" "} and hosted {" "}
            <a href="https://recipe-ingredient-converter.netlify.app/" target="_blank">on Netlify</a>.
      </footer>
    </div>
  );
}

export default App;
