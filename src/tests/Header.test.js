import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import RecipeAppProvider from '../context/RecipeAppProvider';

describe('7 - Implemente o header de acordo com a necessidade de cada tela', () => {
  it('testa elementos', () => {
    const { history } = renderWithRouter(<RecipeAppProvider><App /></RecipeAppProvider>);
    history.push('/foods');

    const titleIconInput = screen.getByTestId('profile-top-btn');
    const searchIconInput = screen.getByTestId('search-top-btn');
    const titleInput = screen.getByTestId('page-title');

    expect(titleIconInput).toBeInTheDocument()
    expect(searchIconInput).toBeInTheDocument()
    expect(titleInput).toBeInTheDocument()

    userEvent.click(searchIconInput)

    const searchInput = screen.getByTestId('search-input');

    expect(searchInput).toBeInTheDocument()

    userEvent.click(searchIconInput)

    expect(searchInput).not.toBeInTheDocument()

  })

  it('testa rota com render', () => {
    const { history } = renderWithRouter(<RecipeAppProvider><App /></RecipeAppProvider>);

    history.push('/foods');
    
    const titleIconInput = screen.getByTestId('profile-top-btn');
    const searchIconInput = screen.getByTestId('search-top-btn');
    const titleInput = screen.getByTestId('page-title');

    expect(titleIconInput).toBeInTheDocument()
    expect(searchIconInput).toBeInTheDocument()
    expect(titleInput).toBeInTheDocument()

  });
});

  it('o header renderiza sem o search', () => {
  renderWithRouter(<App />);
  
  const titleIconInput = screen.getByTestId('profile-top-btn')
  const searchIconInput = screen.getByTestId('search-top-btn')
  const titleInput = screen.getByTestId('page-title')

    expect(titleIconInput).toBeInTheDocument()
    expect(searchIconInput).not.toBeInTheDocument()
    expect(titleInput).toBeInTheDocument()
  });

describe('9 - Desenvolva o botão de busca que, ao ser clicado, a barra de busca deve aparecer. O mesmo serve para escondê-la', () => {
  it('Verificando se a barra de pesquisa aparece ao clicar no botão', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/foods');
    const textSearch = screen.getByTestId('search-input');
    const searchIconInput = screen.getByTestId('search-top-btn')
    expect(textSearch).not.toBeInTheDocument();

    userEvent.click(searchIconInput);
    expect(textSearch).toBeInTheDocument();
    userEvent.click(searchIconInput);
    expect(textSearch).not.toBeInTheDocument();
  });
  
  it('Verifica os inputs radio', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');

    const searchIconInput = screen.getByTestId('search-top-btn');
    userEvent.click(searchIcon);

    expect(screen.queryByTestId('search-input')).toBeInTheDocument();
    expect(screen.getByTestId('ingredient-search-radio')).toBeInTheDocument();
    expect(screen.getByTestId('name-search-radio')).toBeInTheDocument();
    expect(screen.getByTestId('first-letter-search-radio')).toBeInTheDocument();
    expect(screen.getByTestId('exec-search-btn')).toBeInTheDocument();

    userEvent.click(searchIconInput);
    expect(screen.queryByTestId('search-input')).not.toBeInTheDocument();
  });
