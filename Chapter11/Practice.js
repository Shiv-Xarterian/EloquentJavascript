function crackPasscode(networkID) {
  //network id to connect
  function nextDigit(code, digit) {
    //old correct code + extra digit
    let newCode = code + digit;
    // new code
    return (
      withTimeout(joinWifi(networkID, newCode), 50)
        //try to connect the wifi if taking too long timout after 50s
        .then(() => newCode)
        //if wifi get connected return the newCode
        .catch((failure) => {
          if (failure == "Timed out") {
            // failure is timeout means current digits are correct so put 1 more digit starts with 0
            return nextDigit(newCode, 0);
          } else if (digit < 9) {
            // if failure -> means digits is wrong then add the digit by 1 and retry
            return nextDigit(code, digit + 1);
          } else {
            // some magical happens
            throw failure;
          }
        })
    );
  }
  return nextDigit("", 0);
}
crackPasscode("HANGAR 2").then(console.log);
// → 555555

async function crackPasscode(networkID) {
  for (let code = ""; ; ) {
    for (let digit = 0; ; digit++) {
      let newCode = code + digit;
      try {
        await withTimeout(joinWifi(networkID, newCode), 50);
        return newCode;
      } catch (failure) {
        if (failure == "Timed out") {
          code = newCode;
          break;
        } else if (digit == 9) {
          throw failure;
        }
      }
    }
  }
}

//with async await

for (let addr = 1; addr < 256; addr++) {
  // 1-> 255
  let data = [];
  for (let n = 0; n < 1500; n++) {
    data.push(n < addr ? 3 : 0);
  }
  let ip = `10.0.0.${addr}`;
  request(ip, { command: "display", data })
    // sending message to ip address and if that successful then console log request accepted
    .then(() => console.log(`Request to ${ip} accepted`))
    .catch(() => {});
}

function displayFrame(frame) {
  return Promise.all(
    frame.map((data, i) => {
      return request(screenAddresses[i], {
        command: "display",
        data,
      });
    })
  );
}

// -> wait for all to complete then processing
// else through error

function wait(time) {
  return new Promise((accept) => setTimeout(accept, time));
  // return a promise which will complete after time s
}

class VideoPlayer {
  //creates class with the given images/frames adn the image time/frame time
  constructor(frames, frameTime) {
    this.frames = frames;
    this.frameTime = frameTime;
    this.stopped = true;
  }

  async play() {
    this.stopped = false;
    // mentioning that player is not stopped
    for (let i = 0; !this.stopped; i++) {
      // until not stopped
      let nextFrame = wait(this.frameTime);
      // switching to next frame
      await displayFrame(this.frames[i % this.frames.length]);
      //show the current frame based on indexing
      await nextFrame;
      // after some time go for next frame
    }
  }

  // async play to play the video player

  stop() {
    this.stopped = true;
  }
}

let video = new VideoPlayer(clipImages, 100);
//created a new video player with clips images as frames,and 100ms/s for each frame
video.play().catch((e) => {
  // playing the video play
  // if any error occur while playing then show that error
  console.log("Playback failed: " + e);
});
/// after 15000 ms means 15s the video will stop
setTimeout(() => video.stop(), 15000);

let start = Date.now();
setTimeout(() => {
  console.log("Timeout ran at", Date.now() - start);
}, 20);
while (Date.now() < start + 50) {}
console.log("Wasted time until", Date.now() - start);
// → Wasted time until 50
// → Timeout ran at 55
