import * as React from 'react'
import { Card, Form, Button, Icon, Grid } from 'semantic-ui-react'
import { Task } from '../../interfaces/Task'
import Router, { useRouter } from 'next/router'
import Layout from 'src/components/Layout'

const NewTask: React.FunctionComponent = () => {
  const [task, setTask] = React.useState({
    title: '',
    description: '',
  })

  const router = useRouter()

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setTask({ ...task, [name]: value })

  const createTask = async (task: Task) => {
    await fetch('http://localhost:3000/api/tasks/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    })
  }

  const updateTask = async (id: string, task: Task) => {
    const response = await fetch('http://localhost:3000/api/tasks/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    })
  }

  const loadTask = async (id: string) => {
    const response = await fetch('http://localhost:3000/api/tasks/' + id)
    const task = await response.json()
    setTask({ title: task[0].title, description: task[0].description })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      if (typeof router.query.id === 'string') {
        updateTask(router.query.id, task)
      } else {
        createTask(task)
      }
      router.push('/tasks')
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    if (typeof router.query.id === 'string') {
      loadTask(router.query.id)
    }
  }, [router.query])

  return (
    <Layout>
      <Grid
        centered
        columns={3}
        verticalAlign="middle"
        style={{ height: '70%' }}
      >
        <Grid.Column>
          <Card>
            <Card.Content>
              <Form onSubmit={handleSubmit}>
                <Form.Field>
                  <label htmlFor="title">Title:</label>
                  <input
                    type="text"
                    placeholder="Write your title"
                    name="title"
                    onChange={handleChange}
                    value={task.title}
                  />
                </Form.Field>
                <Form.Field>
                  <label htmlFor="description">Description:</label>
                  <textarea
                    placeholder="Write your description"
                    name="description"
                    onChange={handleChange}
                    rows={2}
                    value={task.description}
                  ></textarea>
                </Form.Field>
                {router.query.id ? (
                  <Button color="teal">
                    <Icon name="save" />
                    Update
                  </Button>
                ) : (
                  <Button primary>
                    <Icon name="save" />
                    Save
                  </Button>
                )}
              </Form>
            </Card.Content>
          </Card>

          <Button>
            
          </Button>
        
        </Grid.Column>
      </Grid>
    </Layout>
  )
}

export default NewTask
