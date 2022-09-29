import { ChangeEvent, FormEvent, useState } from 'react';
import { PlusCircle } from 'phosphor-react';
import { v4 as uuidV4 } from 'uuid';

import styles from './NewTask.module.css';
import ClipBoard from '../../assets/ClipBoard.svg';
import { ListTasks } from '../ListTasks/ListTasks';

interface Tasks {
  id: string;
  title: string;
  done: boolean;
}

export function NewTask() {
  const [tasks, setTask] = useState<Tasks[]>([]);
  const [newTaskText, setNewTaskText] = useState('');

  const tasksCount = tasks.reduce((acc, task) => {
    if (task.done) {
      acc.done++
    }
    acc.total++;
    return acc
  }, {
    done: 0,
    total: 0
  });

  function handleNewTasks(event: FormEvent) {
    event.preventDefault();

    const newTask = {
      id: uuidV4(),
      title: newTaskText,
      done: false
    }

    setTask([...tasks, newTask]);
    setNewTaskText('');
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    setNewTaskText(event.target.value);
  }

  function handleMarkTaskDone(id: string) {

    setTask(tasks.map(task => {
      if (task.id === id) {
        task.done = !task.done;
      }
      return task
    }));
  }

  function hanldeDeleteTask(id: string) {
    const tasksWithoutDeleteOne = tasks.filter((task) => {
      return task.id !== id;
    });

    setTask(tasksWithoutDeleteOne);
  }

  const isNewTaskEmpty = newTaskText.length === 0;
  return (
    <div className={styles.newTask}>
      <form onSubmit={handleNewTasks}>
        <input
          type="text"
          placeholder="Adicione uma nova tarefa"
          value={newTaskText}
          onChange={handleNewTaskChange}
          required
        />

        <button type='submit' disabled={isNewTaskEmpty}>
          Criar
          <PlusCircle className={styles.icon} />
        </button>
      </form>

      <div className={styles.wrapper}>
        <header>
          <div className={styles.tasksCountCreated}>
            <p>Tarefas criadas <span>{tasksCount.total}</span></p>
          </div>

          <div className={styles.tasksCountDone}>
            <p>Concluídas <span>{tasksCount.total} de {tasksCount.done}</span></p>
          </div>
        </header>

        {tasks.length < 1 ?
          <div className={styles.todoEmpty}>
            <img src={ClipBoard} alt="Icon ClipBoard" />
            <p style={{fontWeight: 'bold'}}>
              Você ainda não tem tarefas cadastradas
            </p>
            <p>Crie tarefas e organize seus itens a fazer</p>
          </div>
          :
          tasks.map(tasks => {
            return (
              <ListTasks
                key={tasks.id}
                id={tasks.id}
                title={tasks.title}
                done={tasks.done}
                onDeleteTask={hanldeDeleteTask}
                onMarkTaskDone={handleMarkTaskDone}
              />
            );
          })
        }
      </div>
    </div>
  );
}