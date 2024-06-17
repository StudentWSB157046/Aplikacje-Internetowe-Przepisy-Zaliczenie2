import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const RecipeSearch = () => {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const APP_ID = '290f3d00';
  const APP_KEY = '106affb0bad419317c21b2508840de17';

  const searchRecipes = async () => {
    if (query) {
      const response = await axios.get(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
      setRecipes(response.data.hits);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      searchRecipes();
    }
  };

  return (
    <div className="container">
      <div className="top-bar">
        <h1>Recipe Finder</h1>
        <h2>Find your <b>favourite</b> recipe</h2>
      </div>

      <div className="input-group mb-3 mt-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search for recipes"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <div className="input-group-append">
          <button className="btn btn-primary" onClick={searchRecipes}>
            Search
          </button>
        </div>
      </div>
      <div className="row">
        {recipes.map((recipe, index) => (
          <div className="col-md-4" key={index}>
            <div className="card mb-4">
              <img src={recipe.recipe.image} className="card-img-top" alt={recipe.recipe.label} />
              <div className="card-body">
                <h5 className="card-title">{recipe.recipe.label}</h5>
                <p className="card-text">
                  {recipe.recipe.dietLabels.join(', ')}
                </p>
                <a href={recipe.recipe.url} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                  View Recipe
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeSearch;
