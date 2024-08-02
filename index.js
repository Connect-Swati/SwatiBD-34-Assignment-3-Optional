let express = require("express");
let cors = require("cors");
let app = express();
app.use(cors());
let port = 3000;
app.listen(port, () => {
  console.log(`Fitness Tracker Backend is running on port ${port}`);
});
let activities = [
  { activityId: 1, type: "Running", duration: 30, caloriesBurned: 300 },
  { activityId: 2, type: "Swimming", duration: 45, caloriesBurned: 400 },
  { activityId: 3, type: "Cycling", duration: 60, caloriesBurned: 500 },
];

/*
Hints

Add an Activity: Use the push method to add a new activity to the activities array.

Sort Activities by Duration: Use the sort method and make a copy of the array using slice() before sorting.

Filter Activities by Type: Use the filter method to return activities that match the specified type.

Calculate Total Calories Burned: Use a for loop to sum the caloriesBurned for all activities.

Update Activity Duration by ID: Use a for loop to find and update the duration of an activity by its ID.

Delete Activity by ID: Use the filter method to remove an activity from the array by its ID.

Delete Activities by Type: Use the filter method to remove all activities of a specific type from the array.
*/

/*
Endpoint 1: Add an Activity

Objective: Add a new activity to the tracker.

Query Parameters:

activityId (integer)

type (string)

duration (integer)

caloriesBurned (integer)

Tasks: Implement a function to push a new activity to the activities array.

API Call:

http://localhost:3000/activities/add?activityId=4&type=Walking&duration=20&caloriesBurned=150

Expected Output:

{
	activities: [
	  { 'activityId': 1, 'type': 'Running', 'duration': 30, 'caloriesBurned': 300 },
	  { 'activityId': 2, 'type': 'Swimming', 'duration': 45, 'caloriesBurned': 400},
	  { 'activityId': 3, 'type': 'Cycling', 'duration': 60, 'caloriesBurned': 500 },
	  { 'activityId': 4, 'type': 'Walking', 'duration': 20, 'caloriesBurned': 150 }
	]
}
*/

// Function to add an activity to the tracker
function addActivity(activityId, type, duration, caloriesBurned) {
  let newActivity = {
    activityId: activityId,
    type: type,
    duration: duration,
    caloriesBurned: caloriesBurned,
  };
  activities.push(newActivity);
}

// Endpoint 1: Add an activity to the tracker
app.get("/activities/add", (req, res) => {
  console.log("API Call: /activities/add");

  let activityId = parseInt(req.query.activityId);
  let type = req.query.type;
  let duration = parseInt(req.query.duration);
  let caloriesBurned = parseInt(req.query.caloriesBurned);

  if (!activityId || !type || !duration || !caloriesBurned) {
    return res.status(400).json({ error: "Invalid query parameters" });
  }

  addActivity(activityId, type, duration, caloriesBurned);
  res.json({ activities: activities });
});

/*
Endpoint 2: Sort Activities by Duration

Objective: Sort activities by their duration in ascending order.

Query Parameters: None

Tasks: Implement a function to sort the activities array by duration.

API Call:

http://localhost:3000/activities/sort-by-duration

Expected Output:

{
	activities: [
	  { 'activityId': 1, 'type': 'Running', 'duration': 30, 'caloriesBurned': 300 },
	  { 'activityId': 2, 'type': 'Swimming', 'duration': 45, 'caloriesBurned': 400},
	  { 'activityId': 3, 'type': 'Cycling', 'duration': 60, 'caloriesBurned': 500 }
	]
}
*/

// Function to sort activities by duration
function sortActivitiesByDurationAsc() {
  let sortedActivities = activities
    .slice()
    .sort((a, b) => a.duration - b.duration); /// make shallow copy

  return sortedActivities;
}

// Endpoint 2: Sort activities by duration
app.get("/activities/sort-by-duration", (req, res) => {
  console.log("API Call: /activities/sort-by-duration");
  let sortedActivities = sortActivitiesByDurationAsc();
  res.json({ activities: sortedActivities });
});

/*
Endpoint 3: Filter Activities by Type

Objective: Filter activities by their type.

Query Parameters:

type (string)

Tasks: Implement a function to filter the activities array by type.

API Call:

http://localhost:3000/activities/filter-by-type?type=Running

Expected Output:

{
	activities: [
   { 'activityId': 1, 'type': 'Running', 'duration': 30, 'caloriesBurned': 300 }
	]
}
*/

// Function to filter activities by type
function filterActivitiesByType(type) {
  return activities.filter((activity) => activity.type === type);
}

// Endpoint 3: Filter Activities by Type
app.get("/activities/filter-by-type", (req, res) => {
  console.log("API Call: /activities/filter-by-type");

  let type = req.query.type;
  if (!type) {
    return res.status(400).json({ error: "Invalid query parameters" });
  }
  let filteredActivities = filterActivitiesByType(type);

  res.json({ activities: filteredActivities });
});

/*
Endpoint 4: Calculate Total Calories Burned

Objective: Calculate the total calories burned for all activities.

Query Parameters: None

Tasks: Implement a function to sum the total calories burned for all activities.

API Call:

http://localhost:3000/activities/total-calories

Expected Output:

{ 'totalCaloriesBurned': 1200 }
*/

// Function to calculate total calories burned
function calculateTotalCaloriesBurned() {
  let total = 0;
  for (let i = 0; i < activities.length; i++) {
    total += activities[i].caloriesBurned;
  }
  return total;
}
// Endpoint 4: Calculate Total Calories Burned
app.get("/activities/total-calories", (req, res) => {
  console.log("API Call: /activities/total-calories");

  let totalCaloriesBurned = calculateTotalCaloriesBurned();

  res.json({ totalCaloriesBurned: totalCaloriesBurned });
});

/*
Endpoint 5: Update Activity Duration by ID

Objective: Update the duration of an activity identified by its ID.

Query Parameters:

activityId (integer)

duration (integer)

Tasks: Implement a function to find and update the duration of an activity in the activities array.

API Call:

http://localhost:3000/activities/update-duration?activityId=1&duration=35

Expected Output:

{
	activities: [
	  { 'activityId': 1, 'type': 'Running', 'duration': 35, 'caloriesBurned': 300 },
	  { 'activityId': 2, 'type': 'Swimming', 'duration': 45, 'caloriesBurned': 400 },
	  { 'activityId': 3, 'type': 'Cycling', 'duration': 60, 'caloriesBurned': 500 },
	]
}
*/

// Function to update activity duration by ID
function updateActivityDurationById(activityId, duration) {
  for (let i = 0; i < activities.length; i++) {
    if (activities[i].activityId === activityId) {
      activities[i].duration = duration;
      return true; // Successfully updated
    }
  }
  console.log("Activity not found in activities list.");

  return false; // Activity not found
}

// Endpoint 5: Update Activity Duration by ID
app.get("/activities/update-duration", (req, res) => {
  console.log("API Call: /activities/update-duration");

  let activityId = parseInt(req.query.activityId);
  let duration = parseInt(req.query.duration);

  if (!activityId || !duration) {
    return res.status(400).json({ error: "Invalid query parameters" });
  }

  console.log("Original activities: ", activities);

  if (updateActivityDurationById(activityId, duration)) {
    console.log("Activities after updating duration: ", activities);

    res.json({ activities: activities });
  } else {
    return res.status(404).json({ error: "Activity not found" });
  }
});

/*
Endpoint 6: Delete Activity by ID

Objective: Delete an activity from the tracker by its ID.

Query Parameters:

activityId (integer)

Tasks: Implement a function to filter out an activity from the activities array by its ID.

API Call:

http://localhost:3000/activities/delete?activityId=2

Expected Output:

{
	activities: [
  { 'activityId': 1, 'type': 'Running', 'duration': 30, 'caloriesBurned': 300 },
  { 'activityId': 3, 'type': 'Cycling', 'duration': 60, 'caloriesBurned': 500 },
	]
}*/

// Function to delete an activity by ID
function deleteActivityById(activityId) {
  let initialLength = activities.length;
  activities = activities.filter(
    (activity) => activity.activityId !== activityId,
  );

  return activities.length !== initialLength; // Return true if an activity was deleted
}

// Endpoint 6: Delete Activity by ID
app.get("/activities/delete", (req, res) => {
  console.log("API Call: /activities/delete");

  let activityId = parseInt(req.query.activityId);

  if (!activityId) {
    return res.status(400).json({ error: "Invalid query parameters" });
  }

  console.log("Original activities: ", activities);

  if (deleteActivityById(activityId)) {
    console.log("Activities after deleting activity: ", activities);

    res.json({ activities: activities });
  } else {
    return res.status(404).json({ error: "Activity not found" });
  }
});

/*
Endpoint 7: Delete Activities by Type

Objective: Delete all activities of a specific type from the tracker.

Query Parameters:

type (string)

Tasks: Implement a function to filter out all activities of a specific type from the activities array.

API Call:

http://localhost:3000/activities/delete-by-type?type=Running

Expected Output:

{
	activities: [
  { 'activityId': 2, 'type': 'Swimming', 'duration': 45, 'caloriesBurned': 400 },
  { 'activityId': 3, 'type': 'Cycling', 'duration': 60, 'caloriesBurned': 500 }
	]
}


*/

// Function to delete activities by type
function deleteActivitiesByType(type) {
  let initialLength = activities.length;
  activities = activities.filter((activity) => activity.type !== type);
  return activities.length !== initialLength; // Return true if activities were deleted
}
// Endpoint 7: Delete Activities by Type
app.get("/activities/delete-by-type", (req, res) => {
  console.log("API Call: /activities/delete-by-type");

  let type = req.query.type;
  if (!type) {
    return res.status(400).json({ error: "Invalid query parameters" });
  }

  console.log("Original activities: ", activities);

  if (deleteActivitiesByType(type)) {
    console.log("Activities after deleting activities of type: ", activities);

    res.json({ activities: activities });
  } else {
    return res
      .status(404)
      .json({ error: "No activities found of the specified type" });
  }
});
