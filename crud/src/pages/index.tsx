import * as React from 'react'
import { Task } from 'src/interfaces/Task'
import { Grid, Button } from 'semantic-ui-react'
import { useRouter } from 'next/router'

export const getServerSideProps = async () => {
  const res = await fetch('http://localhost:3000/api/tasks/')
  const tasks = await res.json()
  return {
    props: { tasks: tasks },
  }
}

interface TaskProps {
  tasks: Task[]
}

export default function index({ tasks }: TaskProps) {
  const router = useRouter()

  return (
    <>
      {tasks.length === 0 ? (
        <Grid columns={3} centered verticalAlign="middle">
          <Grid.Row>
            <Grid.Column>
              <h1>No tasks yet</h1>
              <Button onClick={() => router.push('/tasks/new')}>Create one</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      ) : (
        <h1>tasks</h1>
      )}
    </>
  )
}
