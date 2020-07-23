import React, { useState, useEffect } from "react";
import { useLocation, useParams, useHistory } from "react-router-dom";
import axios from "axios";

const initialMovie = {
  title: "",
  director: "",
  metascore: "",
  stars: [],
};

function UpdateMovie(props) {
  const location = useLocation();
  const params = useParams();
  const { push } = useHistory();
  const [movie, setMovie] = useState(initialMovie);

  //   useEffect(() => {
  //     if (location.state) {
  //       location.state = {
  //         ...location.state,
  //         stars: location.state.stars.join(", "),
  //       };
  //       setMovie(location.state);
  //     } else {
  //       axios
  //         .get(`http://localhost:5000/api/movies/${params.id}`)
  //         .then((res) => {
  //           setMovie(res.data);
  //           console.log(res.data);
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //         });
  //     }
  //   }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${params.id}`)
      .then((res) => {
        setMovie(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChanges = (event) => {
    event.persist();

    let { name, value } = event.target;

    if (name === "stars") {
      value = value.split(", ");
    }

    setMovie({
      ...movie,
      [name]: value,
    });
  };

  //   const handleSubmit = (event) => {
  //     event.preventDefault();
  //     // make a PUT request to edit the item
  //     let varMovies = {
  //       ...movie,
  //       stars: movie.stars.split(", "),
  //     };

  //     console.log(varMovies);

  //     axios
  //       .put(`http://localhost:5000/api/movies/${movie.id}`, varMovies)
  //       .then((res) => {
  //         // res.data ==> full array with updated item
  //         console.log(res.data);
  //         // props.setMovieList([...props.movieList, res.data]);
  //         push("/");
  //         // push(`/movies/${movie.id}`);
  //       })
  //       .catch((err) => console.log(err));
  //   };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then((res) => {
        // setMovie(res.data);
        // props.setMovieList([
        //   ...movieList
        // ])
        push("/");
        // window.location.reload(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <form className="update-movie-form" onSubmit={handleSubmit}>
      <label htmlFor="title">Title: </label>
      <input
        id="title"
        name="title"
        type="text"
        value={movie.title}
        onChange={handleChanges}
      />
      <label htmlFor="director">Director: </label>
      <input
        id="director"
        name="director"
        type="text"
        value={movie.director}
        onChange={handleChanges}
      />
      <label htmlFor="metascore">Metascore: </label>
      <input
        id="metascore"
        name="metascore"
        type="text"
        value={movie.metascore}
        onChange={handleChanges}
      />
      <label htmlFor="stars">Stars: </label>
      <input
        id="stars"
        name="stars"
        type="text"
        value={movie.stars}
        onChange={handleChanges}
      />
      <button>Update</button>
    </form>
  );
}

export default UpdateMovie;
