import { useState } from 'react'

import 'primeicons/primeicons.css';  // Icons
import './index.css'; // Tailwind CSS
import CustomButton from './systemdesign/CustomeButton';
import { MultiSelect } from 'primereact/multiselect';
import 'primereact/resources/themes/lara-light-blue/theme.css'; 
import 'primereact/resources/primereact.min.css';             
import 'primeicons/primeicons.css';
import { Calendar } from 'primereact/calendar';
import { Checkbox } from 'primereact/checkbox';



function App() {
  const [count, setCount] = useState(0)
  const [date, setDate] = useState(null);
  const [checked, setChecked] = useState(false);




  const handleClick = () => {
    setCount(prevCount => prevCount + 1)
  }
  return (
    <div className='bg-red-300'>

      <div className="card flex justify-content-center">
        <Calendar />
        <Checkbox onChange={e => setChecked(e.checked)} checked={checked}></Checkbox>

      </div>
    </div>
  )
}

export default App
