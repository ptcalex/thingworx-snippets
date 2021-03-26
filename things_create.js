/*** CREATE A THING ***/

// Name:THINGNAME

if (Things[Name]) { // delete if already existing
    Resources["EntityServices"].DeleteThing({ name: Name });
}

Resources["EntityServices"].CreateThing({
    name: Name,
    description: "Describe your thing",
    thingTemplateName: "GenericThing",
    projectName: "AM.YourProject.PJ"
});
    
let thing = Things[Name];
thing.EnableThing();
thing.RestartThing();




