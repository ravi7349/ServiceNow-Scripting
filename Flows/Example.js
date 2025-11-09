//When an incident is created and the category is ‘Network’, then the assignment group should automatically be set to the Network group.”

//Created
//When the Short Description contains 'Network', the Assignment Group should automatically be set to 'Network'."

//Updated
//When category is network and Assignment Group is not Network trigeer sholud update to assignment group should be Network

//Created//Updated

//Scheduled

// Set up a Daily Scheduled Trigger that will automatically create an Incident record every day."

Open Flow Designer
Click New → Flow
Give a name → Click Done
Click Add Trigger → Select Scheduled
Set Run = Daily → Save
Click Add Action → Create Record
Choose Table = Incident
Fill fields like Short Description, Category, Assignment Group
Save the Flow
Activate the Flow