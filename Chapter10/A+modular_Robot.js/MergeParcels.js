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
module.exports = { mergeparcels };
