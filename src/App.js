import './App.css';
import db from './config';
import { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, doc, updateDoc } from 'firebase/firestore/lite';
import { useForm } from 'react-hook-form';
import { Form, Field } from 'react-final-form'

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
  const { register, handleSubmit, setValue, reset } = useForm({
    defaultValues: {
      name: '',
      genre: '',
      year: ''}
    });

  const [movies, setMovies] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    genre: '',
    year: ''
  });

  const [isDisplayedForm, setIsDisplayedForm] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [docId, setDocId] = useState(null)

  useEffect(() => {
    getMovies(db).then(movieList => {
      console.log(movieList)
      setMovies(movieList);
      reset(movieList);
    })
  }, [reset, isEditing]);

  const onSubmit = () => {
    addDoc(collection(db, 'movie'), formData);
  }

  const addMovie = () => {
    setIsDisplayedForm(!isDisplayedForm);
  }

  const submitEdit = (data) => {
    setValue("id", data["name"].split(' ').join('_'));

    const movieRef = doc(db, "movie", docId);
    console.log({ data }, { movieRef }, docId)
    updateDoc(movieRef, data);
    setIsEditing(!isEditing);
  }

  const enableEditing = (docId) => {
    console.log({docId})
    setIsEditing(!isEditing); 
    setDocId(docId);
  }

  return (
    <div className="App padding-medium">
      Movies 
      <div className="movies-container">
        {movies && movies.map(({id,  data: { name, genre, year}}) =>
          <div key={id} className="padding-medium">
            {(isEditing && docId === id) ? <form onSubmit={handleSubmit(submitEdit)} className="movie padding-medium">
                <label>{name}
                Nom du film : <input {...register("name")} defaultValue={name} type="text" /> 
                </label>
                <label>
                Genre : <input type="text" {...register("genre")} defaultValue={genre} />
                </label>
                <label>
                Année de realisation : <input {...register("year")} type="date" name="year" defaultValue={year}/>
                </label>
                <input type="submit" value="Modifier" />
              </form> :
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
        <form onSubmit={onSubmit.bind(this)}>
          <label>
            Nom du film :
            <input type="text" value={formData.name} name="name" onChange={(e) => setFormData({ ...formData, name: e.target.value, id: (e.target.value).split(' ').join('_') })} />
          </label>
          <label>
            Genre :
            <input type="text" value={formData.genre} name="genre" onChange={(e) => setFormData({ ...formData, genre: e.target.value })} />
          </label>
          <label>
            Année de realisation :
            <input type="date" value={formData.year} name="year" onChange={(e) => setFormData({ ...formData, year: e.target.value })} />
          </label>
          <input type="submit" value="Envoyer" />
        </form>
      </div>
      
    </div>
  );
}

export default App;
