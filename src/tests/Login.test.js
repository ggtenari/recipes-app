import React from 'react';
import App from '../App'
import {render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import renderWithRouter from '../helpers/renderWithRouter'

describe('testando o componente Login', () => {
  it('testa a renderizacao dos componentes de input e o botao', () => {
    renderWithRouter(<App />)
    const emailInput = screen.getByTestId('email-input')
    const passwordInput = screen.getByTestId('password-input')
    const enterButton = screen.getByRole('button', {
      name: /enter/i
    })
    const autoLoginButton = screen.getByRole('button', {
      name: /Auto Login/i
    })

    expect(emailInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
    expect(enterButton).toBeInTheDocument()
    expect(autoLoginButton).toBeInTheDocument()
  })
  it('testa se o botao esta desabilitado caso seja digitado email ou senha invalidos', async () => {
    const {history} = renderWithRouter(<App />)
    const emailInput = screen.getByTestId('email-input')
    const passwordInput = screen.getByTestId('password-input')
    const enterButton = screen.getByRole('button', {
      name: /enter/i
    })
    expect(enterButton).toHaveProperty('disabled', true)
    userEvent.type(emailInput, 'email@mail.com')
    userEvent.type(passwordInput, '1234567')
    expect(enterButton).toHaveProperty('disabled', false)
    userEvent.click(enterButton)
    await waitFor(() => expect(screen.getByText(/PAGINA DO FOODSPAGE/i)).toBeInTheDocument())
  })
  it('testa o botao autoLogin', async () => {
    const {history} = renderWithRouter(<App />)
    const autoLoginButton = screen.getByRole('button', {
      name: /Auto Login/i
    })
    userEvent.click(autoLoginButton);
    localStorage.getItem('user', JSON.stringify({ email: 'user@user.com' }));
    localStorage.getItem('mealsToken', '1');
    localStorage.getItem('cocktailsToken', '1');
    expect(history.location.pathname).toBe('/foods');
  })
})