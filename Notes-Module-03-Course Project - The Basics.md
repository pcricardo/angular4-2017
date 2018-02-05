## Module 03 - Course Project - The Basics

### Planning the App 
**Features**
- Shopping List
- Recipe Book

**Components**
- Root 
- Hearder
- Shopping List
- Shopping List Edit
- Recipe List
- Recipe Item
- Recipe Datail

**Model**
- Ingredient
- Recipe

### Setting up the Application

**Pre-requisits:**
- install NodeJs
- install CLI 
	- `npm install -g @angular/cli`

**Create App using CLI**
- in command line, run the commands:
	- `ng new recipe-app` - create a new app with all necessary setup
	- `cd recipe-app` - navigate to the folder
	- `ng serve` - run the app
		- the outpt should show someting like '** NG Live Development Server is listening on localhost:4200, open your browser on http://localhost:4200/ **'
	- in the browser to to 'http://localhost:4200/'
- install boostrap css
	- in command line
		- navigate to the project folder
		- `npm install -- save bootstrap`
	- in the IDE
		- in the file '.angular-cli.json', look for '"styles": [ "styles.css" ],'
			- upper "styles.css", add '"../node_modules/bootstrap/dist/css/bootstrap.min.css"'
- if the default page show any contect 
	- remove all default code from the files 
	- add just a simple demo line text
- finally run the app again `ng serve`

### Creating Components
- app (root)
	- header
	- recipes
		- recipe-details
		- recipe-list
			- recipe-item
	- shopping-list
		- shopping-edit