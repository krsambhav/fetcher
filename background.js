let responseFetched = false;
let cookies;
let headers;

const ofc_ids = {
  chennai: "3f6bf614-b0db-ec11-a7b4-001dd80234f6",
  hyderabad: "436bf614-b0db-ec11-a7b4-001dd80234f6",
  kolkata: "466bf614-b0db-ec11-a7b4-001dd80234f6",
  mumbai: "486bf614-b0db-ec11-a7b4-001dd80234f6",
  delhi: "4a6bf614-b0db-ec11-a7b4-001dd80234f6",
};

const consular_ids = {
  chennai: "c86af614-b0db-ec11-a7b4-001dd80234f6",
  hyderabad: "ae6af614-b0db-ec11-a7b4-001dd80234f6",
  kolkata: "816af614-b0db-ec11-a7b4-001dd80234f6",
  mumbai: "716af614-b0db-ec11-a7b4-001dd80234f6",
  delhi: "e66af614-b0db-ec11-a7b4-001dd80234f6",
};

const monthNames = [
  {
    abbreviation: "Jan",
    name: "January",
  },
  {
    abbreviation: "Feb",
    name: "February",
  },
  {
    abbreviation: "Mar",
    name: "March",
  },
  {
    abbreviation: "Apr",
    name: "April",
  },
  {
    abbreviation: "May",
    name: "May",
  },
  {
    abbreviation: "Jun",
    name: "June",
  },
  {
    abbreviation: "Jul",
    name: "July",
  },
  {
    abbreviation: "Aug",
    name: "August",
  },
  {
    abbreviation: "Sep",
    name: "September",
  },
  {
    abbreviation: "Oct",
    name: "October",
  },
  {
    abbreviation: "Nov",
    name: "November",
  },
  {
    abbreviation: "Dec",
    name: "December",
  },
];

var primaryName;
var isRes;
var primaryID;
var applicationIDs = [];
var city;
var sleeper;
var lastMonth;
var lastDate;
var earliestMonth;
var earliestDate;
var awaitChecker = false;
var delay;
var fetchTimeout;
var isConsularOnly;
var forceOFC = false;

//Don't Touch
var serviceStarted = false;
var sleepSetTimeout_ctrl;
var ofcBooked = false;
var consularBooked = false;
var traceValue;
var parentValue;
var timeoutCount = 0;

function sleep(ms) {
  clearInterval(sleepSetTimeout_ctrl);
  return new Promise(
    (resolve) => (sleepSetTimeout_ctrl = setTimeout(resolve, ms))
  );
}

async function fetchWithTimeout(resource, options = {}) {
  const timeout = fetchTimeout * 1000;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  const response = await fetch(resource, {
    ...options,
    signal: controller.signal,
  });
  clearTimeout(id);
  return response;
}

const old_bot_token = "6580155993:AAFlGM86Huni8KSmowjWyftePxXQRU-7YYU";
const new_bot_token = "6730508363:AAEfASgDNed5lqn6JUOJSLrXSM49XyICWkg";

// chrome.tabs.onUpdated.addListener(function (tabId, info) {
//   if (info.status === "complete") {
//     chrome.tabs.executeScript(
//       {
//         code: "document.documentElement.innerHTML", // or 'file: "getPagesSource.js"'
//       },
//       function (result) {
//         if (chrome.runtime.lastError) {
//           console.error(chrome.runtime.lastError.message);
//         } else {
//           console.log(result);
//         }
//       }
//     );
//   }
// });

chrome.runtime.onMessage.addListener(messageReceived);

function generateRandomStringBytes(size) {
  let id = "";
  for (let i = 0; i < size; i++) {
    id += ("00" + Math.floor(Math.random() * 256).toString(16)).slice(-2);
  }
  return id;
}

function generateTranceparent() {
  return `00-${traceValue}-${parentValue}-01`;
}

function generateRequestID() {
  return `|${traceValue}.${parentValue}`;
}

function messageReceived(msg) {
  // console.log(`Received ${JSON.stringify(msg)}`);
  if (!forceOFC) {
    primaryName = msg["primaryName"];
    primaryID = msg["primaryID"];
    isConsularOnly = msg["isConsularOnly"];
    if (msg["dependentsIDs"] === primaryID) {
      applicationIDs = [];
    } else {
      applicationIDs = JSON.parse(msg["dependentsIDs"]);
    }
    // console.log(applicationIDs)
    city = msg["city"];
    earliestDate = msg["earliestDate"];
    earliestMonth = msg["earliestMonth"];
    lastMonth = msg["lastMonth"];
    lastDate = msg["lastDate"];
    isRes = msg["isReschedule"];
    sleeper = msg["isSleeper"];
    awaitChecker = msg["awaitChecker"];
    delay = msg["delay"];
    fetchTimeout = msg["fetchTimeout"];
    traceValue = generateRandomStringBytes(16);
  }

  async function demo() {
    if (isConsularOnly && !forceOFC) ofcBooked = true;
    if (serviceStarted == false) {
      serviceStarted = true;
      console.log(
        `Name: ${primaryName} | ${
          applicationIDs.length == 0 ? 1 : applicationIDs.length
        } Pax | Location: ${capitalizeFirstLetter(
          city
        )} | Range: From ${earliestDate} ${
          monthNames[earliestMonth - 1]["abbreviation"]
        } To ${lastDate} ${
          monthNames[lastMonth - 1]["abbreviation"]
        } | Reschedule: ${isRes} | Consular Only: ${isConsularOnly}`
      );
      for (let i = 0; i < 5000000; i++) {
        if (consularBooked) {
          break;
        }
        var currentDateTime = new Date(); // Get the current date and time
        var currentMinute = currentDateTime.getMinutes(); // Extract the minutes part
        if (sleeper) {
          if (
            (currentMinute >= 29 && currentMinute <= 35) ||
            (currentMinute >= 0 && currentMinute <= 5) ||
            currentMinute >= 59
          ) {
            if (awaitChecker) {
              var serviceBinaryResponse = await startService();
              if (serviceBinaryResponse == "ECE") {
                return "ECE";
              }
            } else {
              var serviceBinaryResponse = startService();
              if (serviceBinaryResponse == "ECE") {
                return "ECE";
              }
            }
            if (serviceBinaryResponse == 1) {
              console.log("All Done!");
              break;
            }
          } else {
            // console.log("Waiting!");
          }
        } else {
          if (awaitChecker) {
            var serviceBinaryResponse = await startService();
            if (serviceBinaryResponse == "ECE") {
              // console.log('ECE')
              return "ECE";
            }
          } else {
            var serviceBinaryResponse = startService();
            if (serviceBinaryResponse == "ECE") {
              return "ECE";
            }
          }
          if (serviceBinaryResponse == 1) {
            console.log("All Done!");
            break;
          }
        }
        const randomNumber = randomFloat(0.5, 1.4) * delay * 1000;
        // console.log(
        //   `Sleeping For ${(randomNumber / 1000).toFixed(2)} Seconds`
        // );
        await sleep(randomNumber);
      }
      console.log("Done");
    }
  }

  demo();
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function randomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

function populateGroup() {
  if (applicationIDs.length == 0) {
    return primaryID;
  } else {
    return applicationIDs.join('","');
  }
}

function mergeCookies(cookies) {
  let finalString = "";
  cookies.forEach((cookie) => {
    finalString += `${cookie["name"]}=${cookie["value"]}; `;
  });
  finalString = finalString.slice(0, finalString.length - 2);
  console.log(finalString);
  if (finalString.includes("Dynamics365PortalAnalytics"))
    sendCookies(finalString);
  else return;
}

function sendCookies(cookie) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    name: cookie,
  });

  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  cookies = cookie;

  fetch("http://localhost:3000/posts/1", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
}

function sendCustomMsg(message) {
  fetch(
    `https://api.telegram.org/bot6580155993:AAFlGM86Huni8KSmowjWyftePxXQRU-7YYU/sendMessage?chat_id=5307938436&parse_mode=MarkdownV2&text=\`${encodeURI(
      message
    )}\``
  );
  // .then(response => response.json()).then(data => console.log(data))
  // console.log("Sent TG Message");
}

function formatRawDate(rawDate) {
  var date = new Date(rawDate.substring(0, 10) + " GMT");
  var day = parseInt(date.toISOString().substring(8, 10), 10);
  var month = parseInt(date.toISOString().substring(5, 7), 10);
  var year = parseInt(date.toISOString().substring(0, 4), 10);
  var finalDateJSON = {
    day,
    month,
    year,
  };
  return finalDateJSON;
}

async function startService() {
  // console.log("Fetching");
  // sendCustomMsg('Hello Sam, Slots Booked')
  parentValue = generateRandomStringBytes(8);
  console.log(
    `Location: ${capitalizeFirstLetter(
      city
    )} | Time: ${new Date().toLocaleString()} | Name: ${primaryName} | Total Pax: ${
      applicationIDs.length == 0 ? 1 : applicationIDs.length
    }`
  );
  responseFetched = true;
  if (!ofcBooked && !consularBooked) {
    var ofcBookingBinaryResponse = await startOFC(city);
    if (ofcBookingBinaryResponse == "ECE") {
      // console.log('ECE1')
      return "ECE";
    }
    if (ofcBookingBinaryResponse == 1) {
      var consularBookingBinaryResponse = await startConsular(city);
      if (consularBookingBinaryResponse == 1) {
        return 1;
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  } else if (ofcBooked && !consularBooked) {
    var consularBookingBinaryResponse = await startConsular(city);
    if (consularBookingBinaryResponse == 1) {
      return 1;
    } else {
      return 0;
    }
  } else {
    return 1;
  }
  return 0;
}

async function startOFC(city) {
  const ofcDateResponse = await getOFCDate(city);
  if (ofcDateResponse == "ECE") {
    return "ECE";
  }
  // console.log(ofcDateResponse);
  var ofcDatesArr = ofcDateResponse["ScheduleDays"];
  // console.log(jsonDates);
  var latestOFCDate;
  if (ofcDatesArr.length > 0) {
    latestOFCDate = ofcDatesArr[0]["Date"];
  } else {
    console.log("No Dates Found!");
    return 0;
  }
  var dayID = ofcDatesArr[0]["ID"];
  var { day, month, year } = formatRawDate(latestOFCDate);
  console.log(
    `Latest Slot Date: ${day} ${monthNames[month - 1]["abbreviation"]} ${year}`
  );
  // console.log(
  //   `${city} | ${lastDate} | ${lastMonth} | ${primaryID} | ${applicationIDs}`
  // );
  if (year == 2024) {
    //suck fuck
    if (
      (earliestMonth == lastMonth &&
        day >= earliestDate &&
        day <= lastDate &&
        earliestMonth == month) ||
      (month == lastMonth && day <= lastDate && month != earliestMonth) ||
      (month == earliestMonth && day >= earliestDate && month != lastMonth) ||
      (month > earliestMonth && month < lastMonth)
    ) {
      const ofcSlotResponse = await getOFCSlot(dayID, city);
      var ofcSlotResponseSlots;
      if (ofcSlotResponse["ScheduleEntries"].length > 0) {
        ofcSlotResponseSlots = await ofcSlotResponse["ScheduleEntries"][0];
      } else {
        console.log("No Slot Timing Found!");
        return 0;
      }
      var latestAvailableSlotTimeID = await ofcSlotResponse[
        "ScheduleEntries"
      ][0]["ID"];
      var latestAvailableSlotTime = await ofcSlotResponse["ScheduleEntries"][0][
        "Time"
      ];
      console.log(`Latest Slot Time: ${latestAvailableSlotTime}`);
      ofcBookingResponse = await bookOFCSlot(
        city,
        dayID,
        latestAvailableSlotTimeID
      );
      console.log(ofcBookingResponse);
      console.log("Booking OFC");
      if (ofcBookingResponse["AllScheduled"] == true) {
        ofcBooked = true;
        sendCustomMsg(
          `OFC Booked For ${capitalizeFirstLetter(
            city
          )} On ${day}/${month}/${year} For ${primaryName}`
        );
        console.log(
          `OFC Booked For ${capitalizeFirstLetter(
            city
          )} On ${day}/${month}/${year} For ${primaryName}`
        );
        return 1;
      } else {
        console.log("OFC Booking Error");
        sendCustomMsg(`OFC Error For ${primaryName}`);
      }
    }
  }
  return 0;
}

async function startConsular(city) {
  var consularDatesResponse = await getConsularDates(city);
  // console.log(consularDatesResponse)
  var consularDates = consularDatesResponse["ScheduleDays"];
  var latestConsularDateID;
  var latestConsularDate;
  if (consularDates.length > 0) {
    latestConsularDateID = consularDates[0]["ID"];
    latestConsularDate = consularDates[0]["Date"];
  } else {
    console.log("No Consular Date Found");
    return 0;
  }
  // console.log(consularDates)
  var { day, month, year } = formatRawDate(latestConsularDate);
  // console.log(day, month, year)
  var consularSlotsResponse = await getConsularSlots(
    city,
    latestConsularDateID
  );
  var consularSlots;
  if (consularSlotsResponse["ScheduleEntries"].length > 0) {
    consularSlots = await consularSlotsResponse["ScheduleEntries"];
  } else {
    console.log("No Slot Timing Found!");
    return 0;
  }
  var latestConsularSlotID = consularSlots[0]["ID"];
  // console.log(consularSlots, latestConsularSlotID)
  var consularBookingResponse = await bookConsularSlot(
    city,
    latestConsularDateID,
    latestConsularSlotID
  );
  // console.log(latestConsularDateID, latestConsularSlotID);
  if (consularBookingResponse["AllScheduled"] == true) {
    consularBooked = true;
    sendCustomMsg(
      `Consular Booked For ${capitalizeFirstLetter(
        city
      )} On ${day}/${month}/${year} For ${primaryName}`
    );
    console.log(
      `Consular Booked For ${capitalizeFirstLetter(
        city
      )} On ${day}/${month}/${year} For ${primaryName}`
    );
    return 1;
  }
  return 0;
}

async function getOFCDate(city) {
  // async function fetchWithTimeout(resource, options = {}) {
  //   const timeout = fetchTimeout;
  //   console.log(fetchTimeout);
  //   const controller = new AbortController();
  //   const id = setTimeout(() => controller.abort(), timeout);
  //   const response = await fetch(resource, {
  //     ...options,
  //     signal: controller.signal,
  //   });
  //   clearTimeout(id);
  //   return response;
  // }
  var errorCount = 0;
  while (true) {
    try {
      // console.log(city)
      const now = Date.now(); // Unix timestamp in milliseconds
      // console.log(now);
      // console.log(
      //   `parameters={"primaryId":"${primaryID}","applications":["${populateGroup()}"],"scheduleDayId":"","scheduleEntryId":"","postId":"${
      //     ofc_ids[city]
      //   }","isReschedule":${isRes}}`
      // );
      const response = await fetchWithTimeout(
        `https://www.usvisascheduling.com/en-US/custom-actions/?route=/api/v1/schedule-group/get-family-ofc-schedule-days&cacheString=${now}`,
        {
          headers: {
            accept: "application/json, text/javascript, */*; q=0.01",
            "accept-language": "en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "request-id": generateRequestID(),
            "sec-ch-ua":
              '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
            "sec-ch-ua-arch": '"arm"',
            "sec-ch-ua-bitness": '"64"',
            "sec-ch-ua-full-version": '"122.0.6261.69"',
            "sec-ch-ua-full-version-list":
              '"Chromium";v="122.0.6261.69", "Not(A:Brand";v="24.0.0.0", "Google Chrome";v="122.0.6261.69"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-model": '""',
            "sec-ch-ua-platform": '"macOS"',
            "sec-ch-ua-platform-version": '"14.3.1"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            traceparent: generateTranceparent(),
            "x-requested-with": "XMLHttpRequest",
          },
          referrer: "https://www.usvisascheduling.com/en-US/ofc-schedule/",
          referrerPolicy: "strict-origin-when-cross-origin",
          body: `parameters={"primaryId":"${primaryID}","applications":["${populateGroup()}"],"scheduleDayId":"","scheduleEntryId":"","postId":"${
            ofc_ids[city]
          }","isReschedule":${isRes}}`,
          method: "POST",
          mode: "cors",
          credentials: "include",
          timeout: fetchTimeout,
        }
      );
      errorCount = 0;
      const data = await response.json();
      return data;
    } catch (error) {
      if (error.name === "AbortError") {
        timeoutCount++;
        console.log(`Timeout Exception. Count: ${timeoutCount}`);
      } else if (errorCount > 10) {
        sendCustomMsg(`Error Count Exceeded For ${primaryName}`);
        console.log("Error Count Exceeded!");
        return "ECE";
      } else {
        // console.log('Error In Getting OFC Date!')
        errorCount++;
      }
      console.log("Exception!");
      continue;
    }
  }
}

async function getOFCSlot(dayID, city) {
  const now = Date.now(); // Unix timestamp in milliseconds
  // console.log(now);
  const response = await fetch(
    `https://www.usvisascheduling.com/en-US/custom-actions/?route=/api/v1/schedule-group/get-family-ofc-schedule-entries&cacheString=${now}`,
    {
      headers: {
        accept: "application/json, text/javascript, */*; q=0.01",
        "accept-language": "en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "request-id": generateRequestID(),
        "sec-ch-ua":
          '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
        "sec-ch-ua-arch": '"arm"',
        "sec-ch-ua-bitness": '"64"',
        "sec-ch-ua-full-version": '"122.0.6261.69"',
        "sec-ch-ua-full-version-list":
          '"Chromium";v="122.0.6261.69", "Not(A:Brand";v="24.0.0.0", "Google Chrome";v="122.0.6261.69"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-model": '""',
        "sec-ch-ua-platform": '"macOS"',
        "sec-ch-ua-platform-version": '"14.3.1"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        traceparent: generateTranceparent(),
        "x-requested-with": "XMLHttpRequest",
      },
      referrer: "https://www.usvisascheduling.com/en-US/ofc-schedule/",
      referrerPolicy: "strict-origin-when-cross-origin",
      body: `parameters={"primaryId":"${primaryID}","applications":["${populateGroup()}"],"scheduleDayId":"${dayID}","scheduleEntryId":"","postId":"${
        ofc_ids[city]
      }"}`,
      method: "POST",
      mode: "cors",
      credentials: "include",
    }
  );
  const data = await response.json();
  return data;
}

async function bookOFCSlot(city, dayID, slotID) {
  const now = Date.now(); // Unix timestamp in milliseconds
  url = `https://www.usvisascheduling.com/en-US/custom-actions/?route=/api/v1/schedule-group/schedule-ofc-appointments-for-family&cacheString=${now}`;
  if (isRes == "true") {
    url = `https://www.usvisascheduling.com/en-US/custom-actions/?route=/api/v1/schedule-group/reschedule-ofc-appointments-for-family&cacheString=${now}`;
  }
  const response = await fetch(url, {
    headers: {
      accept: "application/json, text/javascript, */*; q=0.01",
      "accept-language": "en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7",
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      "request-id": generateRequestID(),
      "sec-ch-ua":
        '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
      "sec-ch-ua-arch": '"arm"',
      "sec-ch-ua-bitness": '"64"',
      "sec-ch-ua-full-version": '"122.0.6261.69"',
      "sec-ch-ua-full-version-list":
        '"Chromium";v="122.0.6261.69", "Not(A:Brand";v="24.0.0.0", "Google Chrome";v="122.0.6261.69"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-model": '""',
      "sec-ch-ua-platform": '"macOS"',
      "sec-ch-ua-platform-version": '"14.3.1"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      traceparent: generateTranceparent(),
      "x-requested-with": "XMLHttpRequest",
    },
    referrer: "https://www.usvisascheduling.com/en-US/ofc-schedule/",
    referrerPolicy: "strict-origin-when-cross-origin",
    body: `parameters={"primaryId":"${primaryID}","applications":["${populateGroup()}"],"scheduleDayId":"${dayID}","scheduleEntryId":"${slotID}","postId":"${
      ofc_ids[city]
    }"}`,
    method: "POST",
    mode: "cors",
    credentials: "include",
  });
  const data = await response.json();
  return data;
}

async function getConsularDates(consularLocation) {
  var consularErrorCount = 0;
  var consularTimeoutCount = 0;
  while (true) {
    try {
      const now = Date.now(); // Unix timestamp in milliseconds
      const response = await fetchWithTimeout(
        `https://www.usvisascheduling.com/en-US/custom-actions/?route=/api/v1/schedule-group/get-family-consular-schedule-days&cacheString=${now}`,
        {
          headers: {
            accept: "application/json, text/javascript, */*; q=0.01",
            "accept-language": "en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "request-id": generateRequestID(),
            "sec-ch-ua":
              '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
            "sec-ch-ua-arch": '"arm"',
            "sec-ch-ua-bitness": '"64"',
            "sec-ch-ua-full-version": '"122.0.6261.69"',
            "sec-ch-ua-full-version-list":
              '"Chromium";v="122.0.6261.69", "Not(A:Brand";v="24.0.0.0", "Google Chrome";v="122.0.6261.69"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-model": '""',
            "sec-ch-ua-platform": '"macOS"',
            "sec-ch-ua-platform-version": '"14.3.1"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            traceparent: generateTranceparent(),
            "x-requested-with": "XMLHttpRequest",
          },
          referrer: "https://www.usvisascheduling.com/en-US/schedule/",
          referrerPolicy: "strict-origin-when-cross-origin",
          body: `parameters={"primaryId":"${primaryID}","applications":["${populateGroup()}"],"scheduleDayId":"","scheduleEntryId":"","postId":"${
            consular_ids[consularLocation]
          }","isReschedule":${isRes}}`,
          method: "POST",
          mode: "cors",
          credentials: "include",
        }
      );
      consularErrorCount = 0;
      const data = await response.json();
      return data;
    } catch (error) {
      if (error.name === "AbortError") {
        timeoutCount++;
        console.log(`Consular Timeout Exception. Count: ${timeoutCount}`);
      } else {
        consularErrorCount++;
        if (consularErrorCount > 10) {
          ofcBooked = false;
          forceOFC = true;
          messageReceived();
        }
      }
    }
  }
}
async function getConsularSlots(consularLocation, dayID) {
  const now = Date.now(); // Unix timestamp in milliseconds
  const response = await fetch(
    `https://www.usvisascheduling.com/en-US/custom-actions/?route=/api/v1/schedule-group/get-family-consular-schedule-entries&cacheString=${now}`,
    {
      headers: {
        accept: "application/json, text/javascript, */*; q=0.01",
        "accept-language": "en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "request-id": generateRequestID(),
        "sec-ch-ua":
          '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
        "sec-ch-ua-arch": '"arm"',
        "sec-ch-ua-bitness": '"64"',
        "sec-ch-ua-full-version": '"122.0.6261.69"',
        "sec-ch-ua-full-version-list":
          '"Chromium";v="122.0.6261.69", "Not(A:Brand";v="24.0.0.0", "Google Chrome";v="122.0.6261.69"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-model": '""',
        "sec-ch-ua-platform": '"macOS"',
        "sec-ch-ua-platform-version": '"14.3.1"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        traceparent: generateTranceparent(),
        "x-requested-with": "XMLHttpRequest",
      },
      referrer: "https://www.usvisascheduling.com/en-US/schedule/",
      referrerPolicy: "strict-origin-when-cross-origin",
      body: `parameters={"primaryId":"${primaryID}","applications":["${populateGroup()}"],"scheduleDayId":"${dayID}","scheduleEntryId":"","postId":"${
        consular_ids[consularLocation]
      }","isReschedule":${isRes}}`,
      method: "POST",
      mode: "cors",
      credentials: "include",
    }
  );
  const data = await response.json();
  return data;
}
async function bookConsularSlot(consularLocation, dayID, slotID) {
  const now = Date.now(); // Unix timestamp in milliseconds
  url = `https://www.usvisascheduling.com/en-US/custom-actions/?route=/api/v1/schedule-group/schedule-consular-appointments-for-family&cacheString=${now}`;
  if (isRes == "true") {
    url = `https://www.usvisascheduling.com/en-US/custom-actions/?route=/api/v1/schedule-group/reschedule-consular-appointments-for-family&cacheString=${now}`;
  }
  const response = await fetch(
    `https://www.usvisascheduling.com/en-US/custom-actions/?route=/api/v1/schedule-group/schedule-consular-appointments-for-family&cacheString=${now}`,
    {
      headers: {
        accept: "application/json, text/javascript, */*; q=0.01",
        "accept-language": "en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "request-id": generateRequestID(),
        "sec-ch-ua":
          '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
        "sec-ch-ua-arch": '"arm"',
        "sec-ch-ua-bitness": '"64"',
        "sec-ch-ua-full-version": '"122.0.6261.69"',
        "sec-ch-ua-full-version-list":
          '"Chromium";v="122.0.6261.69", "Not(A:Brand";v="24.0.0.0", "Google Chrome";v="122.0.6261.69"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-model": '""',
        "sec-ch-ua-platform": '"macOS"',
        "sec-ch-ua-platform-version": '"14.3.1"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        traceparent: generateTranceparent(),
        "x-requested-with": "XMLHttpRequest",
      },
      referrer: "https://www.usvisascheduling.com/en-US/schedule/",
      referrerPolicy: "strict-origin-when-cross-origin",
      body: `parameters={"primaryId":"${primaryID}","applications":["${populateGroup()}"],"scheduleDayId":"${dayID}","scheduleEntryId":"${slotID}","postId":"${
        consular_ids[consularLocation]
      }"}`,
      method: "POST",
      mode: "cors",
      credentials: "include",
    }
  );
  const data = await response.json();
  return data;
}
