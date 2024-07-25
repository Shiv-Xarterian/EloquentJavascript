const edges = [
  "Alice's House-Bob's House",
  "Alice's House-Cabin",
  "Alice's House-Post Office",
  "Bob's House-Town Hall",
  "Daria's House-Ernie's House",
  "Daria's House-Town Hall",
  "Ernie's House-Grete's House",
  "Grete's House-Farm",
  "Grete's House-Shop",
  "Marketplace-Farm",
  "Marketplace-Post Office",
  "Marketplace-Shop",
  "Marketplace-Town Hall",
  "Shop-Town Hall",
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
          if (p.place != this.place) return p;
          return { place: destination, address: p.address };
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
    if (place != address) parcels.push({ place, address });
  }
  return new VillageState("Post Office", parcels);
};

const findRoute = (graph, from, to) => {
  let work = [{ at: from, route: [] }];
  for (let i = 0; i < work.length; i++) {
    let { at, route } = work[i];
    for (let place of graph[at]) {
      if (place == to) {
        return route.concat(place);
      }
      if (!work.some((w) => w.at == place)) {
        work.push({ at: place, route: route.concat(place) });
      }
    }
  }
};

const mergeparcels = (flag, state) => {
  const mergedparcels = {};
  for (let parcel of state.parcels) {
    if (flag) {
      if (parcel.place in mergedparcels) {
        mergedparcels[parcel.place] += 1;
      } else mergedparcels[parcel.place] = 1;
    } else {
      if (parcel.address in mergedparcels) {
        mergedparcels[parcel.address] += 1;
      } else mergedparcels[parcel.address] = 1;
    }
  }
  return mergedparcels;
};

const goalOrientedRobot = ({ place, parcels }, route) => {
  if (route.length == 0) {
    let parcel = parcels[0];
    if (parcel.place != place) {
      route = findRoute(graph, place, parcel.place);
    } else {
      route = findRoute(graph, place, parcel.address);
    }
  }
  return { direction: route[0], memory: route.slice(1) };
};

const mailRoute = [
  "Alice's House",
  "Cabin",
  "Alice's House",
  "Bob's House",
  "Town Hall",
  "Daria's House",
  "Ernie's House",
  "Grete's House",
  "Shop",
  "Grete's House",
  "Farm",
  "Marketplace",
  "Post Office",
];

function routeRobot(state, memory) {
  if (memory.length == 0) {
    memory = mailRoute;
  }
  return { direction: memory[0], memory: memory.slice(1) };
}

let placemerge = {};
let addressmerge = {};

const MyRobot = ({ place, parcels }, route) => {
  if (route.length == 0) {
    let freq = 0;
    let newplace = null;
    for (let item in placemerge) {
      if (placemerge[item] > freq) {
        freq = placemerge[item];
        newplace = item;
      }
    }
    // console.log(newplace, "New");
    delete placemerge[newplace];
    if (newplace != place && newplace) {
      route = findRoute(graph, place, newplace);
    } else route = findRoute(graph, place, parcels[0].address);
  }
  return { direction: route[0], memory: route.slice(1) };
};

const CountSteps = (state, robot, memory) => {
  for (let steps = 0; ; steps++) {
    if (state.parcels.length == 0) return steps;
    let action = robot(state, memory);
    state = state.move(action.direction);
    memory = action.memory;
  }
};

const MeasureRobots = (robot1, memory1, robot2, memory2) => {
  let res1 = 0;
  let res2 = 0;

  for (let i = 0; i < 100; i++) {
    let state = generateParcels(5);
    placemerge = mergeparcels(true, state);
    addressmerge = mergeparcels(false, state);
    res1 += CountSteps(state, robot1, memory1);
    res2 += CountSteps(state, robot2, memory2);
  }
  console.log(
    `MyRobot  moves ${
      ((res1 - res2) / res2) * 100
    } Efficent than goalOrientedRobot`
  );
};

MeasureRobots(MyRobot, [], goalOrientedRobot, []);
