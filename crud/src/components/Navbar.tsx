import { Menu, Container, Button } from 'semantic-ui-react'
import Image from 'next/image'
import { useRouter } from 'next/router'

export default function Navbar() {
  const router = useRouter()

  return (
    <Menu inverted attached style={{ padding: '1.5rem' }}>
      <Container>
        <Menu.Item onClick={() => router.push('/tasks')}>
          <Image
            src="https://react.semantic-ui.com/logo.png"
            width={30}
            height={30}
            alt="logo"
          />
        </Menu.Item>
        <Menu.Item position="right">
          <Button onClick={() => router.push('/tasks/new')}>new task</Button>
        </Menu.Item>
      </Container>
    </Menu>
  )
}
