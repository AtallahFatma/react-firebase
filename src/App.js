import './App.css';
import db from './config';
import { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, doc, updateDoc } from 'firebase/firestore/lite';
import MyForm from './components/myForm';

// firestore une base de données NoSQL permet aux programmeurs de transférer et de stocker facilement des données pour le développement frontend et backend

function App() {

  async function getMovies(db) {
    const moviesCol = collection(db, 'movie');
    const movieSnapshot = await getDocs(moviesCol);
    const movieList = movieSnapshot.docs.map(doc => {
      return ({
        id: doc.id,
        data: doc.data()})
      });
    return movieList;
  };

  const [movies, setMovies] = useState([]);
  const formData = {
    id: '',
    name: '',
    genre: '',
    year: ''
  };

  const [isDisplayedForm, setIsDisplayedForm] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [docId, setDocId] = useState(null)

  useEffect(() => {
    getMovies(db).then(movieList => {
      setMovies(movieList);
    })
  }, [isEditing, isDisplayedForm]);

  const onSubmit = (data) => {
    addDoc(collection(db, 'movie'), { ...data, id: data["name"].split(' ').join('_') });
    setIsDisplayedForm(!isDisplayedForm);
  }

  const addMovie = () => {
    setIsDisplayedForm(!isDisplayedForm);
  }

  const submitEdit = (data) => {
    const movieRef = doc(db, "movie", docId);
    console.log({ data }, { movieRef }, docId)
    updateDoc(movieRef, { ...data, id: data["name"].split(' ').join('_')});
    setIsEditing(!isEditing);
  }

  const enableEditing = (docId) => {
    setIsEditing(!isEditing); 
    setDocId(docId);
  }

  return (
    <div className="App padding-medium">
      Movies 
      <div className="movies-container">
        {movies && movies.map(({id,  data: { name, genre, year}}) =>
          <div key={id} className="padding-medium">
            {(isEditing && docId === id) ? 
              <MyForm name={name} genre={genre} year={year} id={id} onSubmit={submitEdit} /> :
              <div className="movie padding-medium">
                <span className="m-r">{name}</span>
                <span>{genre}</span>
                <span>{year}</span>
                <button type="submit" onClick={() => enableEditing(id)}>Edit</button>
              </div>
            }
          </div>
        )}
        
      </div>
      <button onClick={() => addMovie()}>Add new movie</button>

      <div hidden={!isDisplayedForm}>
        Add new movies:
        <MyForm name={formData.name} genre={formData.genre} year={formData.year} id={formData.id} onSubmit={onSubmit} />
      </div>
    </div>
  );
}

export default App;
