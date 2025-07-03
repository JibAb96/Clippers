import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import Page from '../page'

// Mock the SignIn component
jest.mock('../components/SignIn', () => {
  return function MockSignIn() {
    return <div data-testid="signin-component">SignIn Component</div>
  }
})

// Create a mock store
const mockStore = configureStore({
  reducer: {
    user: (state = {}) => state,
    isOpen: (state = {}) => state,
  },
})

describe('Signin Page', () => {
  it('renders the SignIn component', () => {
    render(
      <Provider store={mockStore}>
        <Page />
      </Provider>
    )
    
    expect(screen.getByTestId('signin-component')).toBeInTheDocument()
  })

  it('renders without crashing', () => {
    render(
      <Provider store={mockStore}>
        <Page />
      </Provider>
    )
    
    expect(screen.getByTestId('signin-component')).toBeInTheDocument()
  })
}) 