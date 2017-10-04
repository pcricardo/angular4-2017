## Module 01 - Getting Started

### What is Angular

Angular is a __JavaScript Framework__ which allows you to create reactive __Single-Page-Applications__ (SPAs).

### Angular vs Angular 2 vs Angular 4

- **Angular 1** = AngularJS - a very popular JS framework
- **Angular 2** = complete re-write of Angular 1
- **Angular 3** = was shipped due to version number conflit
- **Angular 4** = Simply an update to Angular 2

### CLI Deep Dive & Troubleshooting

In the next lecture, we're going to build our first little app!

The CLI generates a different welcome screen than you're going to see in my video though. No worries, you'll still be able to follow along without issues! Just make sure to code along so that your code equals mine - Angular itself didn't change a bit :)

Depending on the CLI version you're using, you might also need to add the __FormsModule__  to the __imports[]__  array in your __app.module.ts__  file (add it if you don't see it there). You might not fully understand what that all means but we're going to cover that in this course, no worries.

If you don't have __FormsModule__  in __imports[]__  in __AppModule__ , please do add it and also add an import at the top of that file: `import { FormsModule } from '@angular/forms';` 

-----

**If you want to dive deeper into the CLI and learn more about its usage, have a look at its official documentation: https://github.com/angular/angular-cli/wiki**

You encountered issues during the installation of the CLI or setup of a new Angular project?

A lot of problems are solved by making sure you're using the latest version of NodeJS, npm and the CLI itself.

**Updating NodeJS:**

Go to nodejs.org and download the latest version - uninstall (all) installed versions on your machine first.

**Updating npm:**

Run `[sudo] npm install -g npm`  (sudo  is only required on Mac/ Linux)

**Updating the CLI**

`[sudo] npm uninstall -g angular-cli @angular/cli` 

`npm cache clean` 

`[sudo] npm install -g @angular/cli` 

Here are some common issues & solutions:

- Creation of a new project takes forever (longer than 3 minutes). That happens on Windows from time to time => Try running the command line as administrator. 
- You get an EADDR error (Address already in use). You might already have another ng serve process running - make sure to quit that or use ng serve --port ANOTHERPORT  to serve your project on a new port
- My changes are not reflected in the browser (App is not compiling). Check if the window running ng serve  displays an error. If that's not the case, make sure you're using the latest CLI version and try restarting your CLI

### Project Setup and First App

**Pre-requisits:**
- install NodeJs (because CLI need it)

**NodeJs**
- will manages dependencies
- build the project

**How to install NodeJs**
- download file in https://nodejs.org/en/
- just install
- see the version installed. In the command line `node -v` (result: 8.6.0)

**Steps to Create First Agular with CLI**

in command line run the following comamnds:
- `npm install -g @angular/cli` 
	- install CLI in global (-g)
	- it is ONLY need run the fisrt time we install CLI in the machine
- `ng new my-first-app` - create a new app with all necessary setup 
- `cd my-first-app` - navigate to the folder
- `ng serve` - run the app
	- the outpt should show someting like '** NG Live Development Server is listening on localhost:4200, open your browser on http://localhost:4200/ **'
	- in the browser to to 'http://localhost:4200/'

### Editing the First App
**add input that interact with other element**

Steps:
- app.module.ts: add import to forms module
	- `import { FormsModule } from '@angular/forms';`
	- `imports: [ BrowserModule, **FormsModule** ],`
- app.component.ts : add property name to the class AppComponent
	- `name = '';`
- app.componemt.html - add input and text
	- `<input type="text" [(ngModel)]="name">`
	- `<p>{{name}}</p>`
	
The result is, when change the input, the text will apear bellow the input


### What is TypeScript
- Upper set of JavaScript
- Does not run in the browser. It is necessary to compyle to JavaScript in the end.
- The CLI will compile TypeScript to JavaScript

### A Basic Project Setup using Bootstrap for Styling

Steps:
- in command line
	- navigate to the project folder
	- `npm install -- save bootstrap`
- in the IDE
	- in the file '.angular-cli.json', look for '"styles": [ "styles.css" ],'
		- upper "styles.css", add '"../node_modules/bootstrap/dist/css/bootstrap.min.css"'
