function displayMovie(){
    db.collection("movies")
    .get()
    .then(function(snap){
        snap.forEach(function(doc){
            console.log("Going through movies.")
  
            var movieTitle = doc.data().title;
            var movieDirector = doc.data().director;
            var movieYear = doc.data().year;
            var movieDescription = doc.data().description;
            
            document.getElementById('displayed-movie').innerHTML = movieTitle;
            document.getElementById('displayed-movie-small').innerHTML = movieTitle;
            document.getElementById('displayed-director').innerHTML = movieDirector;
            document.getElementById('displayed-year').innerHTML = movieYear;
            document.getElementById('displayed-description').innerHTML = movieDescription ;
            
            console.log(movieTitle);
            console.log(movieDirector);
            console.log("bless")
        })
    })
  }
  
  displayMovie();