import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { useRecipeApp } from '../context/RecipeAppProvider';

const RecipeCard = ({ page }) => {
  const { foods, drinks } = useRecipeApp();
  const style = {
    width: '50px',
    heigth: '50px',
  };

  const filterRecipes = (recipes) => {
    const maxCard = 12;
    let cards = recipes;
    if (recipes && recipes.length > maxCard) cards = recipes.slice(0, maxCard);
    return cards;
  };
  console.log(filterRecipes(foods));
  return (
    <div>
      Card de Receita
      <div>Receita</div>
      { page === 'foods' && filterRecipes(foods).map((food, index) => (
        <div key={ food.strMeal }>
          <Link data-testid={ `${index}-recipe-card` } to={ `/foods/${food.idMeal}` }>
            <img
              data-testid={ `${index}-card-img` }
              src={ food.strMealThumb }
              alt={ `imagem da receita ${index}` }
              style={ style }
            />
            <div data-testid={ `${index}-card-name` }>{ food.strMeal }</div>
          </Link>
        </div>
      ))}
      { page === 'drinks' && filterRecipes(drinks).map((drink, index) => (
        <div key={ drink.strDrink }>
          <Link data-testid={ `${index}-recipe-card` } to={ `/drinks/${drink.idDrink}` }>
            <img
              data-testid={ `${index}-card-img` }
              src={ drink.strDrinkThumb }
              alt={ `imagem da receita ${index}` }
              style={ style }
            />
            <div data-testid={ `${index}-card-name` }>{ drink.strDrink }</div>
          </Link>
        </div>
      ))}
    </div>
  );
};

RecipeCard.propTypes = {
  page: PropTypes.string.isRequired,
};

export default RecipeCard;
