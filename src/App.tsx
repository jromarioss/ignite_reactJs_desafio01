import { Header } from './components/Header/Header';
import { NewTask } from './components/NewTask/NewTask';

import './global.css';

export function App() {
  return (
    <div>
      <Header />
      <NewTask />
    </div>
  );
}