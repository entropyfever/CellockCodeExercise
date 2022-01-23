import fetch from "node-fetch";

function randomInteger(min, max) {
  return Math.floor( Math.random() * (max - min) + min );
}

function randomLongLat() {
  const precision = 1000000;
  const longitude = randomInteger(-180, 180) + randomInteger(0, precision) / precision;
  const latitude = randomInteger(-90, 90) + randomInteger(0, precision) / precision;

  return [longitude, latitude];
}

function randomPick(arr){
  if (arr.length === 0){
    return null;
  }
  const randomIndex = randomInteger(0, arr.length);
  return arr[randomIndex];
}

const fakeNames = [
  "Junaid Brandt",
  "Aneesha O'Ryan",
  "Jamie Byers",
  "Erin Norman",
  "Leila Scott",
  "Denise Bartlett",
  "Brandon Stott",
  "Yu Rocha",
  "Zachery Owens",
  "Teddie Nieves",
  "Delilah Smyth",
  "Lachlan Huerta",
  "Samuel Hutchings",
  "Kaison Briggs",
  "Sapphire Leigh",
  "Frank Oconnell",
  "Nella Macleod",
  "Leonardo Potter",
  "Britany Whyte",
  "Giselle Perkins",
  "Mccauley Hutchinson",
  "Ellie Parsons",
  "Dana Reeve",
  "Otis Hamer",
  "Susie Lake",
  "Aria Mays",
  "Nelson Rigby",
  "Rocco Foster",
  "Humera Galvan",
  "Shelly Moses",
  "Ameen Morley",
  "Rebekah Clarke",
  "Jonathon Haines",
  "Neave Rayner",
  "Zeenat Lyons",
  "Pixie Alexander",
  "Nabeela Serrano",
  "Presley Allison",
  "Ada Lucero",
  "Niall Clemons",
  "Kayleigh Stafford",
  "Zakariyya O'Moore",
  "Jordanna James",
  "Efan Munro",
  "Heena Buck",
  "Vinay Corrigan",
  "Menachem Hyde",
  "Saara Barnard",
  "Caleb Cartwright",
  "Esther Dunne",
]

const vehicleBrandNames = [
  "Acura",
  "Alfa Romeo",
  "Audi",
  "BMW",
  "Bentley",
  "Buick",
  "Cadillac",
  "Chevrolet",
  "Chrysler",
  "Dodge",
  "Fiat",
  "Ford",
  "GMC",
  "Genesis",
  "Honda",
  "Hyundai",
  "Infiniti",
  "Jaguar",
  "Jeep",
  "Kia",
  "Land Rover",
  "Lexus",
  "Lincoln",
  "Lotus",
  "Lucid",
  "Maserati",
  "Mazda",
  "Mercedes-Benz",
  "Mercury",
  "Mini",
  "Mitsubishi",
  "Nissan",
  "Polestar",
  "Pontiac",
  "Porsche",
  "Ram",
  "Rivian",
  "Rolls-Royce",
  "Saab",
  "Saturn",
  "Scion",
  "Smart",
  "Subaru",
  "Suzuki",
  "Tesla",
  "Toyota",
  "Volkswagen",
  "Volvo",
]

function createRide() {
  const [start_long, start_lat] = randomLongLat();
  const [end_long, end_lat] = randomLongLat();
  const rider_name = randomPick(fakeNames);
  const driver_name = randomPick(fakeNames);
  const driver_vehicle = randomPick(vehicleBrandNames)

  return {
    start_lat,
    start_long,
    end_lat,
    end_long,
    rider_name,
    driver_name,
    driver_vehicle,
  }
}


function createRides(numberOfRides){
  return Array.from({length: numberOfRides}, () => createRide());
}


async function postRide(ride){
  return await fetch('http://localhost:8010/rides', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(ride)
  });
}

async function main(){
  return await Promise.all(createRides(300).map(postRide))
}


(async () => {
  console.log('Please wait...');
  try {
    await main();
    console.log('ok');
  } catch (ex){
    console.debug(ex);
    console.debug('nok');
  }
})();

