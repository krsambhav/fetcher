var traceValue = generateRandomStringBytes(16);
var parentValue = generateRandomStringBytes(8);

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
async function fetchPrimaryID() {
  var homePageResponse = await fetch(
    "https://www.usvisascheduling.com/en-US/",
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
      referrer:
        "https://www.usvisascheduling.com/en-US/ofc-schedule/?reschedule=true",
      referrerPolicy: "strict-origin-when-cross-origin",
      method: "GET",
      mode: "cors",
      credentials: "include",
    }
  );
  var homePageData = await homePageResponse.text();
  const primaryNameRegex =
    /(?<=<span class="username">\s*)[^<]+?(?=\s*\(\d+\)\s*<\/span>)/;
  const applicationIDRegex = /"applicationId": "([a-f0-9-]{36})"/;

  // Use the match() method to find matches
  const primaryNameMatches = homePageData.match(primaryNameRegex);
  console.log(primaryNameMatches);
  const applicationIDMatches = homePageData.match(applicationIDRegex);

  // Check if a match is found and extract the applicationId value
  if (applicationIDMatches) {
    var primaryNameAndIDDict = {
      primaryName: primaryNameMatches[0].trim(),
      primaryID: applicationIDMatches[1],
    };
    return primaryNameAndIDDict;
  } else {
    console.log("No applicationId found");
  }
}

async function checkReschedule() {
  var data = await fetch(
    "https://www.usvisascheduling.com/en-US/appointment-confirmation/"
  );
  var text = await data.text();
  try {
    var ofcCount = text.match(/OFC APPOINTMENT DETAILS/g).length;
    if (ofcCount == 0) return false;
    else return true;
  } catch (error) {
    return false;
  }
}

async function fetchDependentIDs(primaryID, isReschedule) {
  const now = Date.now();
  var url = `https://www.usvisascheduling.com/en-US/custom-actions/?route=/api/v1/schedule-group/query-family-members-ofc&cacheString=${now}`;
  if (isReschedule == "true") {
    url = `https://www.usvisascheduling.com/en-US/custom-actions/?route=/api/v1/schedule-group/query-family-members-ofc-reschedule&cacheString=${now}`;
  }
  var dependentDataResponse = await fetch(url, {
    headers: {
      accept: "application/json, text/javascript, */*; q=0.01",
      "accept-language": "en-US,en;q=0.8",
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      "request-id": generateRequestID(),
      "sec-ch-ua": '"Chromium";v="122", "Not(A:Brand";v="24", "Brave";v="122"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-model": '""',
      "sec-ch-ua-platform": '"Linux"',
      "sec-ch-ua-platform-version": '"5.15.0"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "sec-gpc": "1",
      traceparent: generateTranceparent(),
      "x-requested-with": "XMLHttpRequest",
    },
    referrer: "https://www.usvisascheduling.com/en-US/ofc-schedule/",
    referrerPolicy: "strict-origin-when-cross-origin",
    body: `parameters={"primaryId":"${primaryID}","visaClass":"all"}`,
    method: "POST",
    mode: "cors",
    credentials: "include",
  });
  var familyData = await dependentDataResponse.json();
  var membersArr = familyData["Members"];
  var dependentIDsArr = [];
  if (membersArr.length == 0) return primaryID;
  membersArr.forEach((member) => {
    dependentIDsArr.push(member["ApplicationID"]);
  });
  return JSON.stringify(dependentIDsArr);
}

async function returnRandom() {
  var primaryInput = document.getElementById("primary-id-input");
  primaryInput.value = "1";
}
function fillInput() {
  document.getElementById("primary-id-input").value = "OFC";
}

document.addEventListener("DOMContentLoaded", async function () {
  // Find the button by its ID
  var fillButton = document.getElementById("fill-btn");
  var primaryIDButton = document.getElementById("set-primary-id-btn");
  var dependentIDButton = document.getElementById("set-dependents-id-btn");
  var startAllButton = document.getElementById("start-btn");
  var OFCOnlyButton = document.getElementById("start-ofc-btn");
  var consularOnlyButton = document.getElementById("start-consular-btn");
  var citySelector = document.getElementById("city-selector");
  // var checkRescheduleButton = document.getElementById("check-res-btn");
  var fetchTimeout;
  var primaryName = "";
  var primaryID = "";
  var dependentsIDs = "";
  var lastMonth = "";
  var lastDate = "";
  var earliestMonth = "";
  var earliestDate = "";
  var city = "mumbai";
  var awaitChecker = "";
  var delay = 1;
  var isConsularOnly;
  var isOFCOnly;

  async function handlePrimaryButtonClick() {
    primaryIDAndNameDict = await fetchPrimaryID();
    primaryName = primaryIDAndNameDict["primaryName"];
    primaryID = primaryIDAndNameDict["primaryID"];
    // Code to execute when the button is clicked
    // console.log(primaryName)
    document.getElementById("primary-id-input").value = primaryID;
    document.getElementById("primary-user-name-span").innerHTML = primaryName;
  }
  async function handleCheckRescheduleButtonClick() {
    var applicationIsReschedule = await checkReschedule();
    if (applicationIsReschedule) document.getElementById("res-input").value = 1;
    else document.getElementById("res-input").value = 0;
  }
  async function handleDependentButtonClick() {
    isReschedule = parseInt(document.getElementById("res-input").value);
    if (isReschedule == 0) isReschedule = "false";
    else isReschedule = "true";
    dependentsIDs = await fetchDependentIDs(primaryID, isReschedule);
    document.getElementById("dependents-id-input").value = dependentsIDs;
  }
  // Attach an onclick event listener to the button
  fillButton.onclick = async function () {
    await handlePrimaryButtonClick();
    await handleCheckRescheduleButtonClick();
    await handleDependentButtonClick();
    // await handleCheckRescheduleButtonClick();
    // await handleDependentButtonClick();
  };
  primaryIDButton.onclick = handlePrimaryButtonClick;
  citySelector.onchange = async function () {
    city = citySelector.value;
  };
  // checkRescheduleButton.onclick = handleCheckRescheduleButtonClick;
  dependentIDButton.onclick = handleDependentButtonClick;
  OFCOnlyButton.onclick = async function () {
    lastMonth = parseInt(document.getElementById("last-month-input").value);
    lastDate = parseInt(document.getElementById("last-date-input").value);
    fetchTimeout = parseInt(document.getElementById("timeout-input").value);
    earliestMonth = parseInt(
      document.getElementById("earliest-month-input").value
    );
    earliestDate = parseInt(
      document.getElementById("earliest-date-input").value
    );
    isReschedule = parseInt(document.getElementById("res-input").value);
    if (isReschedule == 0) isReschedule = "false";
    else isReschedule = "true";
    isSleeper = parseInt(document.getElementById("sleeper-input").value);
    if (isSleeper == 0) isSleeper = false;
    else isSleeper = true;
    awaitChecker = parseInt(document.getElementById("await-input").value);
    if (awaitChecker == 0) awaitChecker = false;
    else awaitChecker = true;
    delay = parseInt(document.getElementById("delay-input").value);
    isOFCOnly = true;
    isConsularOnly = false;
    // city = document.getElementById("city-id-input").value.toLowerCase();
    var userDetails = {
      primaryName,
      primaryID,
      dependentsIDs,
      lastMonth,
      lastDate,
      earliestMonth,
      earliestDate,
      city,
      isReschedule,
      isSleeper,
      awaitChecker,
      delay,
      fetchTimeout,
      isOFCOnly,
      isConsularOnly,
    };
    chrome.runtime.sendMessage(userDetails, function (response) {
      console.log(response);
    });
  };
  startAllButton.onclick = async function () {
    console.log('OK')
    lastMonth = parseInt(document.getElementById("last-month-input").value);
    lastDate = parseInt(document.getElementById("last-date-input").value);
    fetchTimeout = parseInt(document.getElementById("timeout-input").value);
    earliestMonth = parseInt(
      document.getElementById("earliest-month-input").value
    );
    earliestDate = parseInt(
      document.getElementById("earliest-date-input").value
    );
    isReschedule = parseInt(document.getElementById("res-input").value);
    if (isReschedule == 0) isReschedule = "false";
    else isReschedule = "true";
    isSleeper = parseInt(document.getElementById("sleeper-input").value);
    if (isSleeper == 0) isSleeper = false;
    else isSleeper = true;
    awaitChecker = parseInt(document.getElementById("await-input").value);
    if (awaitChecker == 0) awaitChecker = false;
    else awaitChecker = true;
    delay = parseInt(document.getElementById("delay-input").value);
    isConsularOnly = false;
    isOFCOnly = false;
    // city = document.getElementById("city-id-input").value.toLowerCase();
    var userDetails = {
      primaryName,
      primaryID,
      dependentsIDs,
      lastMonth,
      lastDate,
      earliestMonth,
      earliestDate,
      city,
      isReschedule,
      isSleeper,
      awaitChecker,
      delay,
      fetchTimeout,
      isOFCOnly,
      isConsularOnly,
    };
    chrome.runtime.sendMessage(userDetails, function (response) {
      console.log(response);
    });
  };
  consularOnlyButton.onclick = async function () {
    lastMonth = parseInt(document.getElementById("last-month-input").value);
    lastDate = parseInt(document.getElementById("last-date-input").value);
    fetchTimeout = parseInt(document.getElementById("timeout-input").value);
    earliestMonth = parseInt(
      document.getElementById("earliest-month-input").value
    );
    earliestDate = parseInt(
      document.getElementById("earliest-date-input").value
    );
    isReschedule = parseInt(document.getElementById("res-input").value);
    if (isReschedule == 0) isReschedule = "false";
    else isReschedule = "true";
    isSleeper = parseInt(document.getElementById("sleeper-input").value);
    if (isSleeper == 0) isSleeper = false;
    else isSleeper = true;
    awaitChecker = parseInt(document.getElementById("await-input").value);
    if (awaitChecker == 0) awaitChecker = false;
    else awaitChecker = true;
    delay = parseInt(document.getElementById("delay-input").value);
    isConsularOnly = true;
    isOFCOnly = false;
    // city = document.getElementById("city-id-input").value.toLowerCase();
    var userDetails = {
      primaryName,
      primaryID,
      dependentsIDs,
      lastMonth,
      lastDate,
      earliestMonth,
      earliestDate,
      city,
      isReschedule,
      isSleeper,
      awaitChecker,
      delay,
      fetchTimeout,
      isOFCOnly,
      isConsularOnly,
    };
    chrome.runtime.sendMessage(userDetails, function (response) {
      console.log(response);
    });
  };
});
