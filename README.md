# Employee Tracker

## License
This application is under the cover of the MIT license.
![badge](https://img.shields.io/badge/license-MIT-brightgreen)

## Table of Contents
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Contribution](#contribution)
- [Connect](#connect)

## Description
This command line application allows you to keep track of the details of employees within your company. View departments, roles, employees, and edit each section as you please, whether that be 
to delete some info or add new info. 

## Installation

- Use the follow command at your terminal, **git clone** (Create a working copy at your local repository):

```
git clone git@github.com:hucklebun/employee-tracker.git
```

Once cloned, move into the directory of this project inside the terminal, then enter into your terminal:

```
npm i
```

You will want to make sure you have mysql properly installed onto your machine. If installed, enter the following into your terminal:

```
mysql -u root -p
```

You will then be prompted for your mysql password. Once you are logged into mysql inside the terminal, enter the following commands:

```
source db/db.sql;
```
```
source db/schema.sql;
```
```
source db/seeds.sql;
```

Once everything runs with no errors, you can quit out of mysql by entering **quit**.

Once you have properly installed NPM and ran all the sql commands within the mysql terminal, enter this into your terminal:

```
npm start
```

This will run the program and you are all good to go!

## Usage
With easy navigation, you can completely keep track of, remove, add, and update your employee's information all within the terminal.

## Contribution
Micah Duehring (hucklebun)

## Have questions? Connect with me.
GitHub: [hucklebun](https://github.com/hucklebun/)
</br>
Email: micah@theduehrings.com
