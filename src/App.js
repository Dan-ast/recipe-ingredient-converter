import React from "react";
import './App.css';

function App() {
  return (
    <div className="App">
      <main className="container">
        <h1>Recipe Ingredient Converter</h1>
        <form>
          <div>
            <label htmlFor="ingredient">Ingredient: </label>
            <input type="text" id="ingredient" required/>
          </div>

          <div>
            <label htmlFor="quantity">Quantity: </label>
            <input type="number" id="quantity" step="any" required/>
          </div>

          <div>
            <label htmlFor="unit">Unit: </label>
            <select id="unit">
              <option>Select a unit</option>
              <option value="cup">Cup</option>
              <option value="gram">Gram</option>
              <option value="ounce">Ounce</option>
              <option value="teaspoon">Teaspoon</option>
            </select>
          </div>

          <div>
            <label htmlFor="servings">Number of Servings: </label>
            <input type="number" id="servings" step="any" required/>
          </div>

          <button type="submit">Convert</button>
        </form>
      </main>
    </div>
  );
}

export default App;
