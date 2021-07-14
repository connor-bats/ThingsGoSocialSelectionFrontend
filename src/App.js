
import './App.css';
import { useState,   } from 'react';
import { WithContext as ReactTags } from 'react-tag-input';
import { toJS } from 'mobx';
import styles from './ReactTags.module.scss';
import axios from 'axios';

function App() {

  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [subjects,setSubjects] = useState([])
  const [standard, setStandard] = useState('')
  const [society, setSociety] = useState([])
  const [year, setYear] = useState(new Date().getFullYear())




 const formSubmitHandler = (e) =>{
   e.preventDefault()
   console.log(name, contact, standard, year)
   
   let society_arr =[]
   let subject_arr = []

   society.forEach(soc =>{
     society_arr.push(soc.id)
   })

   subjects.forEach(sub =>{
    subject_arr.push(sub.id)
  })


  console.log(society_arr)
  console.log(subject_arr)



  if(name === '' || contact === '' || standard === '' || year === '' || year <1900 || subjects.length < 1){
    alert('Fill details properly')
    return;
  }

  else{
    const student = {
      name : name,
      contact: contact,
      class: standard,
      year: year,
      subjects: subject_arr,
      society: society_arr

    }


    axios.post('http://localhost:5000/input',student)
      .then(res =>{
        console.log(res.data)
      })


      setName('')
      setContact('')
      setStandard('')
      setSociety([])
      setSubjects([])
      setYear(new Date().getFullYear())

  }

 }




  const handleDeleteSubject = (i) => {
    let newTags = subjects.filter((tag, index) => index !== i)
    setSubjects(newTags)
}

  const handleDragSubject = (tag, currPos, newPos) => {
    const newTags = [...subjects].slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    setSubjects(newTags)
}

  const handleAdditionSubject = (newTag) => {
    let newTags = toJS(subjects)
    newTags.push(newTag);

    setSubjects(newTags);
}



const handleDeleteSociety = (i) => {
  let newTags = society.filter((tag, index) => index !== i)
  setSociety(newTags)
}

const handleDragSociety = (tag, currPos, newPos) => {
  const newTags = [...society].slice();

  newTags.splice(currPos, 1);
  newTags.splice(newPos, 0, tag);

  setSociety(newTags)
}

const handleAdditionSociety = (newTag) => {
  let newTags = toJS(society)
  newTags.push(newTag);

  setSociety(newTags);
}





  return (
    <div className='App'>

      <div className = "container-outside">
        <div className="form-div">
          <form onSubmit={formSubmitHandler}>
            
            <input type="text" placeholder="Name" 
            onChange = {(e) => setName(e.target.value)} 
            value={name} className="form-control form-group"/>

            <input type="text" placeholder="Contact no" 
            onChange = {(e) => setContact(e.target.value)} 
            value={contact} className="form-control form-group"/>

            
            <input type="text" placeholder="Class" 
            onChange = {(e) => setStandard(e.target.value)} 
            value={standard} className="form-control form-group"/>


            <input type="text" placeholder="Year" 
            onChange = {(e) => setYear(e.target.value)} 
            value={year} className="form-control form-group"/>






      <div className={styles.ReactTags}>  
        <ReactTags
          handleDelete={handleDeleteSubject}
          handleAddition={handleAdditionSubject}
          handleDrag={handleDragSubject}
          placeholder="Enter subjects..."
          minQueryLength={0}
          maxLength={50}
          autofocus={false}
          allowDeleteFromEmptyInput={true}
          autocomplete={true}
          readOnly={false}
          allowUnique={true}
          allowDragDrop={true}
          inline={true}
          allowAdditionFromPaste={true}
          tags={subjects}
        />
      </div>


      <div className={styles.ReactTags}>
        <ReactTags
          handleDelete={handleDeleteSociety}
          handleAddition={handleAdditionSociety}
          handleDrag={handleDragSociety}
          placeholder="Enter societies..."
          minQueryLength={0}
          maxLength={50}
          autofocus={false}
          allowDeleteFromEmptyInput={true}
          autocomplete={true}
          readOnly={false}
          allowUnique={true}
          allowDragDrop={true}
          inline={true}
          allowAdditionFromPaste={true}
          tags={society}
        />
      </div>




      <button type="submit">
        Submit
      </button>

          </form>


        </div>
      </div>
    </div>
  );
}

export default App;
