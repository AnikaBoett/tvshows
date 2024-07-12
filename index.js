const express = require("express");
const model = require("./model");
const cors = require("cors");

const app = express();
app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.get("/tvshows", async (request, response) => {
  try {
    let tvshows = await model.TVShow.find();
    response.json(tvshows);
  } catch (error) {
    console.log(error);
    response.status(400).send("Generic error");
  }
});

app.post("/tvshows", async (request, response) => {
  const data = request.body;
  console.log(request.body); 
  //^Add this line back if you would like to do console error checking
  
  try {
      //create a new MongoStudent using our model
      //Game and time are required, rating is not
      let newTVShow = new model.TVShow({
          title: data.title,
          seasons: data.seasons,
          genre: data.genre,
      });

      let error = newTVShow.validateSync();
      
      if(error) {
          response.json(400).json(error);
          return;
      }

      await newTVShow.save();
      response.status(201).json(newTVShow);

  } catch(error) {
      //Send a generic error message if there is an issue
      console.log(error);
      response.status(400).send("Generic Error");
  }
});

app.delete("/tvshows/:id", async (request, response) => {
  try {
      let isDeleted = await model.TVShow.findOneAndDelete({
          _id: request.params.id,
      });

      if(!isDeleted) {
          response.status(404).send("Could not find show :(");
          return;
      }

      response.status(204).send("Show Deleted");
  } catch (error) {
      console.log(error);
      response.status(400).send("Generic Error");
  }
});

app.get("/tvshows/:id", async (request, response) => {
  try {
    let tvshow = await model.TVShow.findById(request.params.id);
    if (!tvshow) {
      response.status(404).send("Could not find TV Show");
      return;
    }
    response.json(tvshow);
  } catch (error) {
    console.log(error);
    response.status(400).send("Generic error message");
  }
});

app.put("/tvshows/:id", async (request, response) => {
  try {
    const updatedTVShow = {
      title: request.body.title,
      seasons: request.body.seasons,
      genre: request.body.genre,
    };
    let putTVShow = await model.TVShow.findByIdAndUpdate({_id: request.params.id} , updatedTVShow, {new: true
    },);
    if (!putTVShow) {
      response.status(404).send("Could not find TV Show");
      return;
    } 
    
    response.status(204).json();

  } catch (error) {
    console.log(error);
    response.status(400).send("Generic error message");
  }
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
