import { dogsData } from "./data";
import { useState } from "react";
import DogDetails from "./DogDetails";
import { v1 as generateUniqueID } from "uuid";

function App() {

  const [dogs, setDogs] = useState(dogsData);

  // Function tied to our add dog button
  function addDog() {
    // console.log("New Puppy");

    // Creating a new dog named Rover, give it a unique id
    const puppy = {
      id: generateUniqueID(),
      name: "Rover",
      present: false,
      grade: "100",
      notes: "Poops rainbows, be careful..."
    };
    // Make a copy of the DOGS array using destructuring
    // add rover, in this case, it s a dog
    // In the first position 
    setDogs([puppy, ...dogs]);
    // In the last position
    // setDogs([...dogs, rover])
  }

  // Function tied to our remove puppy button
  function removePuppy(dogID) {
    console.log(`Remove dog with id of: ${dogID}`);
    // We will use FILTER method to remove any dogs that have a matching ID
    const filteredDogArr = dogs.filter((dog) => dog.id !== dogID);
    // Set the dogs array, to the new array that will NOT have the removed dog
    setDogs(filteredDogArr);
  }

  // We want to account for if a dog is present or not
  // Function tied to our Dog attendance
  function dogAttendance(dogID) {
    console.log("Update attendance", dogID);
    const dogArray = [...dogs];
    // Find the dog with the matching ID number's array POSITION 
    const index = dogArray.findIndex((dog) => dogID === dog.id)
    // Access the dog's present property and UPDATE the value
    // By using ! to toggle the vlaue of present
    dogArray[index].present = !dogArray[index].present;
    // Put the updated array into setDogs to update the state
    setDogs(dogArray);
  }

  return (
    <div className="App">
      <header>
        <h1> Bark and Bowl Doggy Day Care</h1>
        <h2>{new Date().toDateString()}</h2>
      </header>
      <button onClick={addDog}>Add a new dog</button>
      <aside></aside>
      <main></main>
      <ul>
        {
          dogs.map((dog, index) => {
            return (
              <li key={dog.id}>
                <span
                  onClick={() => dogAttendance(dog.id)}
                  // For the attendance, we create a TERNARY ties to this SPAN, that checks the TRUTHY-ness of dog.present
                  style={
                    dog.present
                      ? { textDecoration: "none" }
                      : { textDecoration: "line-through" }
                  }
                >
                  {dog.name}{" "}
                </span>
                {/* Writing the below function this way, creates a nameless function that will call back our funciton  */}
                <button onClick={() => removePuppy(dog.id)}>Remove Puppy</button>
                <DogDetails dog={dog} />
              </li>
            )
          })
        }
      </ul>
    </div>
  );
}

export default App;
