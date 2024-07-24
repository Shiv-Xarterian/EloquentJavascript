const edges = [
  "A-B",
  "B-C",
  "C-D",
  "D-E",
  "E-F",
  "F-G",
  "G-H",
  "H-I",
  "I-J",
  "J-A",
  "B-D",
  "D-F",
  "F-H",
  "H-J",
  "J-B",
  "C-E",
  "E-G",
  "G-I",
  "I-A",
  "A-C",
  "D-H",
  "H-B",
  "B-F",
  "F-J",
  "J-D",
  "E-I",
  "I-C",
  "C-G",
  "G-A",
  "A-E",
  "F-J",
  "J-B",
  "B-H",
  "H-D",
  "D-F",
  "G-I",
  "I-C",
  "C-E",
  "E-A",
  "A-G",
  "H-J",
  "J-D",
  "D-B",
  "B-F",
  "F-H",
  "I-A",
  "A-C",
  "C-E",
  "E-G",
  "G-I",
  "J-B",
  "B-D",
  "D-F",
  "F-H",
  "H-J",
  "A-C",
  "C-E",
  "E-G",
  "G-I",
  "I-A",
  "B-F",
  "F-H",
  "H-J",
  "J-D",
  "D-B",
  "C-G",
  "G-E",
  "E-A",
  "A-I",
  "I-C",
  "D-F",
  "F-B",
  "B-J",
  "J-H",
  "H-D",
  "E-G",
  "G-A",
  "A-C",
  "C-I",
  "I-E",
  "F-H",
  "H-J",
  "J-B",
  "B-D",
  "D-F",
  "G-I",
  "I-A",
  "A-C",
  "C-E",
  "E-G",
];
//all the roads

function buildGraph(edges) {
  let graph = Object.create(null);
  function addEdge(from, to) {
    if (from in graph) {
      graph[from].push(to);
    } else {
      graph[from] = [to];
    }
  }

  for (let [from, to] of edges.map((r) => r.split("-"))) {
    addEdge(from, to);
    addEdge(to, from);
  }

  return graph;
}

const graph = buildGraph(edges);

class VillageState {
  constructor(place, parcels) {
    this.place = place;
    this.parcels = parcels;
  }

  move(destination) {
    if (!graph[this.place].includes(destination)) {
      return this;
    } else {
      //updating parcels
      let parcels = this.parcels
        .map((p) => {
          if (p.place != this.place) {
            //Take that parcel anywhere else not here
            return p;
          } else {
            return { place: destination, address: p.address };
          }
        })
        .filter((p) => p.place != p.address);
      return new VillageState(destination, parcels);
    }
  }
}

const randomPick = (arr) => {
  let len = arr.length;
  let idx = parseInt(Math.random() * len);
  return arr[idx];
};

const generateParcels = (parcelcount = 5) => {
  let parcels = [];
  for (let i = 0; i < parcelcount; i++) {
    let address = randomPick(Object.keys(graph));
    let place;
    do {
      place = randomPick(Object.keys(graph));
    } while (place == address);
    parcels.push({ place, address });
  }
  return new VillageState("A", parcels);
};

const findRoute = (graph, from, to) => {
  let work = [{ at: from, route: [] }];
  for (let i = 0; i < work.length; i++) {
    let { at, route } = work[i];
    //node in the queue
    for (let place of graph[at]) {
      //traversing adjacency
      if (place == to) {
        return route.concat(place);
        // destination node -> route me usse add krdo
      }
      if (!work.some((w) => w.at == place)) {
        //checking if the this node is adj is visited or not
        work.push({ at: place, route: route.concat(place) });
        //visit that node
      }
    }
  }
};

const goalOrientedRobot = ({ place, parcels }, route) => {
  if (route.length == 0) {
    //all directions cover then select top undelivered parcel
    let parcel = parcels[0];
    if (parcel.place != place) {
      // means need to pick this parcel
      route = findRoute(graph, place, parcel.place);
    } else {
      route = findRoute(graph, place, parcel.address);
      // parcel pickedup needed to deliver
    }
  }
  console.log("route", route);
  return { direction: route[0], memory: route.slice(1) };
};

function routeRobot(state, memory) {
  if (memory.length == 0) {
    memory = mailRoute;
  }
  return { direction: memory[0], memory: memory.slice(1) };
}

const CountSteps = (state, robot, memory) => {
  for (let steps = 0; ; steps++) {
    if (state.parcels.length == 0) return steps;
    let action = routeRobot(state, memory);
    state = state.move(action.direction);
    memory = action.memory;
  }
};

const MeasureRobots = (robot1, memory1, robot2, memory2) => {
  let res1 = 0;
  let res2 = 0;
  let state = generateParcels(5);
  for (let i = 0; i < 100; i++) {
    res1 += CountSteps(state, robot1, memory1);
    res2 += CountSteps(state, robot2, memory2);
  }
  console.log(res1, res2);
};

MeasureRobots("R1", [], "R2", []);
