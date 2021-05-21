/*** Create a THING ***/

let ThingName = "..."; // STRING: the name of the THING entity to create
let ProjectName = "..."; // STRING: the name of an existing PROJECT entity

if (Things[ThingName]) { // delete if already existing
    Resources["EntityServices"].DeleteThing({ name: ThingName });
}

Resources["EntityServices"].CreateThing({
    name: ThingName,
    description: "...",
    thingTemplateName: "GenericThing", // or other THINGTEMPLATE
    projectName: ProjectName
});

let thing = Things[ThingName];
thing.EnableThing();
/*
  After enabling the thing but before restarting it, can modify it...
  ...by invoking thing services that change its state.
*/
thing.RestartThing();

