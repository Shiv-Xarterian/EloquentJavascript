function activityTable(day) {
  let result = new Array(24).fill(0);

  // Read the camera_logs.txt file to get the list of log files
  return textFile("camera_logs.txt").then((logFileList) => {
    let logFiles = logFileList.split("\n").filter((file) => file.trim() !== "");
    let filePromises = [];

    // Use a for loop to create file processing promises
    for (const logFile of logFiles) {
      let promise = textFile(logFile.trim()).then((data) => {
        let timestamps = data.split("\n").filter((ts) => ts.trim() !== "");

        // Process each timestamp
        timestamps.forEach((timestamp) => {
          const date = new Date(parseInt(timestamp.trim(), 10));
          if (date.getDay() === day) {
            const hours = date.getHours();
            result[hours]++;
          }
        });
      });

      filePromises.push(promise);
    }

    // Wait for all file processing promises to complete
    return Promise.all(filePromises).then(() => {
      return result;
    });
  });
}

// Assuming activityGraph is a provided function
activityTable(6)
  .then((table) => console.log(activityGraph(table)))
  .catch((error) => console.error(error));
