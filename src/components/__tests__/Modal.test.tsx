import { render, screen } from '@testing-library/react'
import Modal from '../Modal'

describe('Modal', () => {
  it('renders when open', () => {
    render(<Modal isOpen={true} onClose={() => {}}>Test content</Modal>)
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })
}) 