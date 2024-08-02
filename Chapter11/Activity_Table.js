async function activityTable(day) {
  let logFileList = await textFile("camera_logs.txt");
  let result = new Array(24).fill(0);

  // Split logFileList by newline to get individual file names
  let logFiles = logFileList.split("\n").filter((file) => file.trim() !== "");
  for (const logFile of logFiles) {
    const data = await textFile(logFile.trim());
    let timestamps = data.split("\n").filter((ts) => ts.trim() !== "");

    for (const timestamp of timestamps) {
      const date = new Date(parseInt(timestamp.trim(), 10));
      if (date.getDay() === day) {
        const hours = date.getHours();
        result[hours]++;
      }
    }
  }

  return result;
}

// Assuming activityGraph is a provided function
activityTable(1)
  .then((table) => console.log(activityGraph(table)))
  .catch((error) => console.error(error));
