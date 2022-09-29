import { Trash } from 'phosphor-react';

import styles from './ListTasks.module.css';

interface TasksProps {
  title: string;
  id: string;
  done: boolean;
  onDeleteTask: (id: string) => void;
  onMarkTaskDone: (id: string) => void;
}

export function ListTasks({ title, id, onDeleteTask, done, onMarkTaskDone }: TasksProps ) {

  function handleDeleteTask() {
    onDeleteTask(id);
  }

  function handleMarkDone() {
    onMarkTaskDone(id)
  }

  return (
    <div className={styles.listTask}>
      <div className={styles.task}>
        <label htmlFor={`checked${id}`}>
          <input 
            type="checkbox" 
            onClick={handleMarkDone} 
            id={`checked${id}`} 
          />
          <div className={styles.divRadio}></div>
        </label>

        <p className={done ? styles.taskDone : ''}>{title}</p>

        <button onClick={handleDeleteTask} title="Deletar Tarefa">
          <Trash className={styles.trashInput} />
        </button>
      </div>
    </div>
  );
}