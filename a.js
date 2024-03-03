// let responseFetched = false;
// let cookies;
// let headers;

// const ofc_ids = {
//   chennai: "3f6bf614-b0db-ec11-a7b4-001dd80234f6",
//   hyderabad: "436bf614-b0db-ec11-a7b4-001dd80234f6",
//   kolkata: "466bf614-b0db-ec11-a7b4-001dd80234f6",
//   mumbai: "486bf614-b0db-ec11-a7b4-001dd80234f6",
//   delhi: "4a6bf614-b0db-ec11-a7b4-001dd80234f6",
// };

// const consular_ids = {
//   chennai: "c86af614-b0db-ec11-a7b4-001dd80234f6",
//   hyderabad: "ae6af614-b0db-ec11-a7b4-001dd80234f6",
//   kolkata: "816af614-b0db-ec11-a7b4-001dd80234f6",
//   mumbai: "716af614-b0db-ec11-a7b4-001dd80234f6",
//   delhi: "e66af614-b0db-ec11-a7b4-001dd80234f6",
// };

// const monthNames = [
//   {
//     abbreviation: "Jan",
//     name: "January",
//   },
//   {
//     abbreviation: "Feb",
//     name: "February",
//   },
//   {
//     abbreviation: "Mar",
//     name: "March",
//   },
//   {
//     abbreviation: "Apr",
//     name: "April",
//   },
//   {
//     abbreviation: "May",
//     name: "May",
//   },
//   {
//     abbreviation: "Jun",
//     name: "June",
//   },
//   {
//     abbreviation: "Jul",
//     name: "July",
//   },
//   {
//     abbreviation: "Aug",
//     name: "August",
//   },
//   {
//     abbreviation: "Sep",
//     name: "September",
//   },
//   {
//     abbreviation: "Oct",
//     name: "October",
//   },
//   {
//     abbreviation: "Nov",
//     name: "November",
//   },
//   {
//     abbreviation: "Dec",
//     name: "December",
//   },
// ];

// const isRes = "true";
// const isGroup = false;
// var primaryID = "3c4e0b2d-0cb3-ee11-a81c-001dd80a6ca6";
// var applicationID = "3c4e0b2d-0cb3-ee11-a81c-001dd80a6ca6";
// var city = "mumbai";
// var sleeper = true;

// var serviceStarted = false;
// var sleepSetTimeout_ctrl;
// var consularBooked = false;

// function sleep(ms) {
//   clearInterval(sleepSetTimeout_ctrl);
//   return new Promise(
//     (resolve) => (sleepSetTimeout_ctrl = setTimeout(resolve, ms))
//   );
// }

// const old_bot_token = "6580155993:AAFlGM86Huni8KSmowjWyftePxXQRU-7YYU";
// const new_bot_token = "6730508363:AAEfASgDNed5lqn6JUOJSLrXSM49XyICWkg";

// function capitalizeFirstLetter(string) {
//   return string.charAt(0).toUpperCase() + string.slice(1);
// }

// function randomFloat(min, max) {
//   return Math.random() * (max - min) + min;
// }

// chrome.webRequest.onBeforeSendHeaders.addListener(
//   async function (details) {
//     // console.log(details.requestHeaders);
//     // const url = new URL(details.url);
//     // const domain = url.hostname;
//     // Now, use the chrome.cookies API to get cookies for this domain.
//     function sleep(ms) {
//       return new Promise((resolve) => setTimeout(resolve, ms));
//     }

//     async function demo() {
//       if (serviceStarted == false) {
//         serviceStarted = true;
//         console.log('Service Started!')
//         for (let i = 0; i < 5000000; i++) {
//           if (consularBooked) {
//             break;
//           }
//           var currentDateTime = new Date(); // Get the current date and time
//           var currentMinute = currentDateTime.getMinutes(); // Extract the minutes part
//           if (sleeper) {
//             if (
//               currentMinute === 60 ||
//               currentMinute === 0 ||
//               currentMinute === 1 ||
//               currentMinute === 2 ||
//               currentMinute === 30 ||
//               currentMinute === 31 ||
//               currentMinute === 32
//             ) {
//               startService();
//             } else {
//               // console.log("Waiting!");
//             }
//           } else {
//             await startService();
//           }
//           const randomNumber = randomFloat(0.5, 1.4) * 5000;
//           // console.log(
//           //   `Sleeping For ${(randomNumber / 1000).toFixed(2)} Seconds`
//           // );
//           await sleep(randomNumber);
//         }
//         console.log("Done");
//       }
//     }

//     demo();
//   },
//   { urls: ["https://www.usvisascheduling.com/*"] }, // Filter to capture all URLs
//   ["requestHeaders"]
// );

// function mergeCookies(cookies) {
//   let finalString = "";
//   cookies.forEach((cookie) => {
//     finalString += `${cookie["name"]}=${cookie["value"]}; `;
//   });
//   finalString = finalString.slice(0, finalString.length - 2);
//   console.log(finalString);
//   if (finalString.includes("Dynamics365PortalAnalytics"))
//     sendCookies(finalString);
//   else return;
// }

// function sendCookies(cookie) {
//   var myHeaders = new Headers();
//   myHeaders.append("Content-Type", "application/json");

//   var raw = JSON.stringify({
//     name: cookie,
//   });

//   var requestOptions = {
//     method: "PUT",
//     headers: myHeaders,
//     body: raw,
//     redirect: "follow",
//   };

//   cookies = cookie;

//   fetch("http://localhost:3000/posts/1", requestOptions)
//     .then((response) => response.text())
//     .then((result) => console.log(result))
//     .catch((error) => console.log("error", error));
// }

// function sendCustomMsg(message) {
//   fetch(
//     `https://api.telegram.org/bot6580155993:AAFlGM86Huni8KSmowjWyftePxXQRU-7YYU/sendMessage?chat_id=5307938436&parse_mode=MarkdownV2&text=${encodeURI(
//       message
//     )}`
//   );
//   // .then(response => response.json()).then(data => console.log(data))
//   console.log("Sent TG Message");
// }

// function formatRawDate(rawDate) {
//   var date = new Date(rawDate.substring(0, 10) + " GMT");
//   var day = parseInt(date.toISOString().substring(8, 10), 10);
//   var month = parseInt(date.toISOString().substring(5, 7), 10);
//   var year = parseInt(date.toISOString().substring(0, 4), 10);
//   var finalDateJSON = {
//     day,
//     month,
//     year,
//   };
//   return finalDateJSON;
// }

// async function startService() {
//   // console.log("Fetching");
//   // sendCustomMsg('Hello Sam, Slots Booked')
//   console.log(
//     `Location: ${capitalizeFirstLetter(
//       city
//     )} | Time: ${new Date().toLocaleString()}`
//   );
//   responseFetched = true;
//   const ofcDateResponse = await getOFCDate(city);
//   // console.log(ofcDateResponse);
//   var ofcDatesArr = ofcDateResponse["ScheduleDays"];
//   // console.log(jsonDates);
//   var latestOFCDate;
//   if (ofcDatesArr.length > 0) {
//     latestOFCDate = ofcDatesArr[0]["Date"];
//   } else {
//     console.log("No Dates Found!");
//     return 0;
//   }
//   var dayID = ofcDatesArr[0]["ID"];
//   var { day, month, year } = formatRawDate(latestOFCDate);
//   console.log(
//     `Latest Slot Date: ${day} ${monthNames[month - 1]["abbreviation"]} ${year}`
//   );
//   if (year == 2024) {
//     //suck fuck
//     if ((month == 3 && day < 6) || (month == 3 && day > 11 && day <= 15)) {
//       const ofcSlotResponse = await getOFCSlot(dayID, city);
//       var ofcSlotResponseSlots;
//       if (ofcSlotResponse["ScheduleEntries"].length > 0) {
//         ofcSlotResponseSlots = await ofcSlotResponse["ScheduleEntries"][0];
//       } else {
//         console.log("No Slot Timing Found!");
//         return 0;
//       }
//       var latestAvailableSlotTimeID = await ofcSlotResponse[
//         "ScheduleEntries"
//       ][0]["ID"];
//       var latestAvailableSlotTime = await ofcSlotResponse["ScheduleEntries"][0][
//         "Time"
//       ];
//       console.log(`Latest Slot Time: ${latestAvailableSlotTime}`);
//       ofcBookingResponse = await bookOFCSlot(
//         city,
//         dayID,
//         latestAvailableSlotTimeID
//       );
//       console.log(ofcBookingResponse);
//       console.log("Booking Slot");
//       if (ofcBookingResponse["AllScheduled"] == true) {
//         sendCustomMsg(
//           `OFC Booked For ${capitalizeFirstLetter(
//             city
//           )} On ${day}/${month}/${year}`
//         );
//         console.log(
//           `OFC Booked For ${capitalizeFirstLetter(
//             city
//           )} On ${day}/${month}/${year}`
//         );
//         var consularDatesResponse = await getConsularDates(city);
//         // console.log(consularDatesResponse)
//         var consularDates = consularDatesResponse["ScheduleDays"];
//         var latestConsularDateID;
//         var latestConsularDate;
//         if (consularDates.length > 0) {
//           latestConsularDateID = consularDates[0]["ID"];
//           latestConsularDate = consularDates[0]["Date"];
//         } else {
//           console.log("No Consular Date Found");
//           return 0;
//         }
//         // console.log(consularDates)
//         var { day, month, year } = formatRawDate(latestConsularDate);
//         // console.log(day, month, year)
//         var consularSlotsResponse = await getConsularSlots(
//           city,
//           latestConsularDateID
//         );
//         var consularSlots;
//         if (consularSlotsResponse["ScheduleEntries"].length > 0) {
//           consularSlots = await consularSlotsResponse["ScheduleEntries"];
//         } else {
//           console.log("No Slot Timing Found!");
//           return 0;
//         }
//         var latestConsularSlotID = consularSlots[0]["ID"];
//         // console.log(consularSlots, latestConsularSlotID)
//         var consularBookingResponse = await bookConsularSlot(
//           city,
//           latestConsularDateID,
//           latestConsularSlotID
//         );
//         console.log(latestConsularDateID, latestConsularSlotID);
//         if (consularBookingResponse["AllScheduled"] == true) {
//           consularBooked = true;
//           sendCustomMsg(
//             `Consular Booked For ${capitalizeFirstLetter(
//               city
//             )} On ${day}/${month}/${year}`
//           );
//           console.log(
//             `Consular Booked For ${capitalizeFirstLetter(
//               city
//             )} On ${day}/${month}/${year}`
//           );
//         }
//       }
//     }
//   }
//   return "Check Cycle Completed!";
// }

// async function getOFCDate(city) {
//   // console.log(city)
//   const now = Date.now(); // Unix timestamp in milliseconds
//   // console.log(now);
//   const response = await fetch(
//     `https://www.usvisascheduling.com/en-US/custom-actions/?route=/api/v1/schedule-group/get-family-ofc-schedule-days&cacheString=${now}`,
//     {
//       headers: {
//         accept: "application/json, text/javascript, */*; q=0.01",
//         "accept-language": "en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7",
//         "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
//         "request-id": "|86350a23908f432b897a84a74db4cb70.0c4d083bd75841b0",
//         "sec-ch-ua":
//           '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
//         "sec-ch-ua-arch": '"arm"',
//         "sec-ch-ua-bitness": '"64"',
//         "sec-ch-ua-full-version": '"122.0.6261.69"',
//         "sec-ch-ua-full-version-list":
//           '"Chromium";v="122.0.6261.69", "Not(A:Brand";v="24.0.0.0", "Google Chrome";v="122.0.6261.69"',
//         "sec-ch-ua-mobile": "?0",
//         "sec-ch-ua-model": '""',
//         "sec-ch-ua-platform": '"macOS"',
//         "sec-ch-ua-platform-version": '"14.3.1"',
//         "sec-fetch-dest": "empty",
//         "sec-fetch-mode": "cors",
//         "sec-fetch-site": "same-origin",
//         traceparent: "00-86350a23908f432b897a84a74db4cb70-0c4d083bd75841b0-01",
//         "x-requested-with": "XMLHttpRequest",
//       },
//       referrer: "https://www.usvisascheduling.com/en-US/ofc-schedule/",
//       referrerPolicy: "strict-origin-when-cross-origin",
//       body: `parameters={"primaryId":"${primaryID}","applications":["${primaryID}"],"scheduleDayId":"","scheduleEntryId":"","postId":"${ofc_ids[city]}","isReschedule":${isRes}}`,
//       method: "POST",
//       mode: "cors",
//       credentials: "include",
//     }
//   );
//   const data = await response.json();
//   return data;
// }

// async function getOFCSlot(dayID, city) {
//   const now = Date.now(); // Unix timestamp in milliseconds
//   // console.log(now);
//   const response = await fetch(
//     `https://www.usvisascheduling.com/en-US/custom-actions/?route=/api/v1/schedule-group/get-family-ofc-schedule-entries&cacheString=${now}`,
//     {
//       headers: {
//         accept: "application/json, text/javascript, */*; q=0.01",
//         "accept-language": "en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7",
//         "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
//         "request-id": "|5ff5f351e3714206bbe49ccc8fc7efb2.9693f88422de40e4",
//         "sec-ch-ua":
//           '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
//         "sec-ch-ua-arch": '"arm"',
//         "sec-ch-ua-bitness": '"64"',
//         "sec-ch-ua-full-version": '"122.0.6261.69"',
//         "sec-ch-ua-full-version-list":
//           '"Chromium";v="122.0.6261.69", "Not(A:Brand";v="24.0.0.0", "Google Chrome";v="122.0.6261.69"',
//         "sec-ch-ua-mobile": "?0",
//         "sec-ch-ua-model": '""',
//         "sec-ch-ua-platform": '"macOS"',
//         "sec-ch-ua-platform-version": '"14.3.1"',
//         "sec-fetch-dest": "empty",
//         "sec-fetch-mode": "cors",
//         "sec-fetch-site": "same-origin",
//         traceparent: "00-5ff5f351e3714206bbe49ccc8fc7efb2-9693f88422de40e4-01",
//         "x-requested-with": "XMLHttpRequest",
//       },
//       referrer: "https://www.usvisascheduling.com/en-US/ofc-schedule/",
//       referrerPolicy: "strict-origin-when-cross-origin",
//       body: `parameters={"primaryId":"${primaryID}","applications":["${primaryID}"],"scheduleDayId":"${dayID}","scheduleEntryId":"","postId":"${ofc_ids[city]}"}`,
//       method: "POST",
//       mode: "cors",
//       credentials: "include",
//     }
//   );
//   const data = await response.json();
//   return data;
// }

// async function bookOFCSlot(city, dayID, slotID) {
//   const now = Date.now(); // Unix timestamp in milliseconds
//   url = `https://www.usvisascheduling.com/en-US/custom-actions/?route=/api/v1/schedule-group/schedule-ofc-appointments-for-family&cacheString=${now()}`;
//   if (isRes == "true") {
//     url = `https://www.usvisascheduling.com/en-US/custom-actions/?route=/api/v1/schedule-group/reschedule-ofc-appointments-for-family&cacheString=${now()}`;
//   }
//   const response = await fetch(url, {
//     headers: {
//       accept: "application/json, text/javascript, */*; q=0.01",
//       "accept-language": "en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7",
//       "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
//       "request-id": "|11d150d6e1dd49d3a96ca3cd7273882c.85ae99925e524ad0",
//       "sec-ch-ua":
//         '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
//       "sec-ch-ua-arch": '"arm"',
//       "sec-ch-ua-bitness": '"64"',
//       "sec-ch-ua-full-version": '"122.0.6261.69"',
//       "sec-ch-ua-full-version-list":
//         '"Chromium";v="122.0.6261.69", "Not(A:Brand";v="24.0.0.0", "Google Chrome";v="122.0.6261.69"',
//       "sec-ch-ua-mobile": "?0",
//       "sec-ch-ua-model": '""',
//       "sec-ch-ua-platform": '"macOS"',
//       "sec-ch-ua-platform-version": '"14.3.1"',
//       "sec-fetch-dest": "empty",
//       "sec-fetch-mode": "cors",
//       "sec-fetch-site": "same-origin",
//       traceparent: "00-11d150d6e1dd49d3a96ca3cd7273882c-85ae99925e524ad0-01",
//       "x-requested-with": "XMLHttpRequest",
//     },
//     referrer: "https://www.usvisascheduling.com/en-US/ofc-schedule/",
//     referrerPolicy: "strict-origin-when-cross-origin",
//     body: `parameters={"primaryId":"${primaryID}","applications":["${primaryID}"],"scheduleDayId":"${dayID}","scheduleEntryId":"${slotID}","postId":"${ofc_ids[city]}"}`,
//     method: "POST",
//     mode: "cors",
//     credentials: "include",
//   });
//   const data = await response.json();
//   return data;
// }

// async function getConsularDates(consularLocation) {
//   const now = Date.now(); // Unix timestamp in milliseconds
//   const response = await fetch(
//     `https://www.usvisascheduling.com/en-US/custom-actions/?route=/api/v1/schedule-group/get-family-consular-schedule-days&cacheString=${now}`,
//     {
//       headers: {
//         accept: "application/json, text/javascript, */*; q=0.01",
//         "accept-language": "en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7",
//         "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
//         "request-id": "|a655e829ef304713b1e31074a8a82593.97c062265a9b437b",
//         "sec-ch-ua":
//           '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
//         "sec-ch-ua-arch": '"arm"',
//         "sec-ch-ua-bitness": '"64"',
//         "sec-ch-ua-full-version": '"122.0.6261.69"',
//         "sec-ch-ua-full-version-list":
//           '"Chromium";v="122.0.6261.69", "Not(A:Brand";v="24.0.0.0", "Google Chrome";v="122.0.6261.69"',
//         "sec-ch-ua-mobile": "?0",
//         "sec-ch-ua-model": '""',
//         "sec-ch-ua-platform": '"macOS"',
//         "sec-ch-ua-platform-version": '"14.3.1"',
//         "sec-fetch-dest": "empty",
//         "sec-fetch-mode": "cors",
//         "sec-fetch-site": "same-origin",
//         traceparent: "00-a655e829ef304713b1e31074a8a82593-97c062265a9b437b-01",
//         "x-requested-with": "XMLHttpRequest",
//       },
//       referrer: "https://www.usvisascheduling.com/en-US/schedule/",
//       referrerPolicy: "strict-origin-when-cross-origin",
//       body: `parameters={"primaryId":"${primaryID}","applications":["${primaryID}"],"scheduleDayId":"","scheduleEntryId":"","postId":"${consular_ids[consularLocation]}","isReschedule":${isRes}}`,
//       method: "POST",
//       mode: "cors",
//       credentials: "include",
//     }
//   );
//   const data = await response.json();
//   return data;
// }
// async function getConsularSlots(consularLocation, dayID) {
//   const now = Date.now(); // Unix timestamp in milliseconds
//   const response = await fetch(
//     `https://www.usvisascheduling.com/en-US/custom-actions/?route=/api/v1/schedule-group/get-family-consular-schedule-entries&cacheString=${now}`,
//     {
//       headers: {
//         accept: "application/json, text/javascript, */*; q=0.01",
//         "accept-language": "en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7",
//         "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
//         "request-id": "|a655e829ef304713b1e31074a8a82593.97c062265a9b437b",
//         "sec-ch-ua":
//           '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
//         "sec-ch-ua-arch": '"arm"',
//         "sec-ch-ua-bitness": '"64"',
//         "sec-ch-ua-full-version": '"122.0.6261.69"',
//         "sec-ch-ua-full-version-list":
//           '"Chromium";v="122.0.6261.69", "Not(A:Brand";v="24.0.0.0", "Google Chrome";v="122.0.6261.69"',
//         "sec-ch-ua-mobile": "?0",
//         "sec-ch-ua-model": '""',
//         "sec-ch-ua-platform": '"macOS"',
//         "sec-ch-ua-platform-version": '"14.3.1"',
//         "sec-fetch-dest": "empty",
//         "sec-fetch-mode": "cors",
//         "sec-fetch-site": "same-origin",
//         traceparent: "00-a655e829ef304713b1e31074a8a82593-97c062265a9b437b-01",
//         "x-requested-with": "XMLHttpRequest",
//       },
//       referrer: "https://www.usvisascheduling.com/en-US/schedule/",
//       referrerPolicy: "strict-origin-when-cross-origin",
//       body: `parameters={"primaryId":"${primaryID}","applications":["${primaryID}"],"scheduleDayId":"${dayID}","scheduleEntryId":"","postId":"${consular_ids[consularLocation]}","isReschedule":${isRes}}`,
//       method: "POST",
//       mode: "cors",
//       credentials: "include",
//     }
//   );
//   const data = await response.json();
//   return data;
// }
// async function bookConsularSlot(consularLocation, dayID, slotID) {
//   const now = Date.now(); // Unix timestamp in milliseconds
//   url = `https://www.usvisascheduling.com/en-US/custom-actions/?route=/api/v1/schedule-group/schedule-consular-appointments-for-family&cacheString=${now()}`;
//   if (isRes == "true") {
//     url = `https://www.usvisascheduling.com/en-US/custom-actions/?route=/api/v1/schedule-group/reschedule-consular-appointments-for-family&cacheString=${now()}`;
//   }
//   const response = await fetch(
//     `https://www.usvisascheduling.com/en-US/custom-actions/?route=/api/v1/schedule-group/schedule-consular-appointments-for-family&cacheString=${now}`,
//     {
//       headers: {
//         accept: "application/json, text/javascript, */*; q=0.01",
//         "accept-language": "en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7",
//         "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
//         "request-id": "|0c7e6c011adb4756aaa213643fc42b07.24b831d39e204f0a",
//         "sec-ch-ua":
//           '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
//         "sec-ch-ua-arch": '"arm"',
//         "sec-ch-ua-bitness": '"64"',
//         "sec-ch-ua-full-version": '"122.0.6261.69"',
//         "sec-ch-ua-full-version-list":
//           '"Chromium";v="122.0.6261.69", "Not(A:Brand";v="24.0.0.0", "Google Chrome";v="122.0.6261.69"',
//         "sec-ch-ua-mobile": "?0",
//         "sec-ch-ua-model": '""',
//         "sec-ch-ua-platform": '"macOS"',
//         "sec-ch-ua-platform-version": '"14.3.1"',
//         "sec-fetch-dest": "empty",
//         "sec-fetch-mode": "cors",
//         "sec-fetch-site": "same-origin",
//         traceparent: "00-0c7e6c011adb4756aaa213643fc42b07-24b831d39e204f0a-01",
//         "x-requested-with": "XMLHttpRequest",
//       },
//       referrer: "https://www.usvisascheduling.com/en-US/schedule/",
//       referrerPolicy: "strict-origin-when-cross-origin",
//       body: `parameters={"primaryId":"${primaryID}","applications":["${primaryID}"],"scheduleDayId":"${dayID}","scheduleEntryId":"${slotID}","postId":"${consular_ids[consularLocation]}"}`,
//       method: "POST",
//       mode: "cors",
//       credentials: "include",
//     }
//   );
//   const data = await response.json();
//   return data;
// }