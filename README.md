# prayer-book-template

Created by [Cendy](https://www.upwork.com/freelancers/~01b3ada479ef818cc7)

Modified by Krysztof



    bundle data into state
    set up editing system
    Change "sort" to "checked, unchecked, all" button
    add in "delete question" option
    add in back button  
cleanup readme
    setup default select menu
Populate with questions


Mod template modifications
-prune folderslint
-add back in redux and some utils
-maybe retire layout
-add back in missing packages


<details><summary>Description</summary>
<p>

The draft of the SaintMaker PWA. Will eventually include a prayerbook, confession guide, habit tracker, Lectio Divina guide, and more.

</p>
</details>
<details><summary>Coding Standards</summary>
<p>

Krysztof: I pulled the bulk of the coding standards from this guide by [jondjones](https://www.jondjones.com/frontend/react/react-tutorials/react-coding-standards-and-practices-to-level-up-your-code/) (thank you Jon, I owe you a beer) and converted as many as I could to automated coding standards (eslint rules, prettier rules, etc). In addition to that, there is a bundle of other misc/manual coding standards that can be found at the end of this segment.

### Legend:
- (dropped): we aren't following this rule
- (manual): we are following this rule but couldn't find a way to automate it
- (automated): this rule is automatically being followed

## Naming Conventions
- (automated) Component’s names should be written using pascal case
- (automated) Non-components should be written using camel case
- (manual) Unit test files should use the same name as its corresponding file
- (automated) Attribute name should be camel case:
- (dropped) Inline styles should be camel case:
- (automated) Variable names should be camel case. Variable names can contain number and special characters:
- (dropped) CSS files should be named the same as the component:
- (dropped) If a component requires multiple files (css, test) locate all files within component a folder
- (manual) Use .jsx or .tsx extension a for React components

## Bug Avoidance
- (automated) Use optional chaining if things can be null
- (automated) Use the guard pattern/prop types/typescript to ensure your passed in parameters are valid
- (manual) Create PURE functions and avoid side-effects
- (manual) Avoid mutating state when working with arrays
- (automated) Remove all console.log()
- (automated) Treat props as read-only. Do not try to modify them.

## Architecture & Clean Code
- (automated) No DRY violations. Create utility files to avoid duplicate code.
- (dropped) Follow the component/presentation pattern where appropriate. Components should follow the single responsibility principle
- (dropped) Use Higher Order Components where appropriate
- (manual) Split code into respective files, JavaScript, test, and CSS
- (dropped) Create a index.js within each folder for exporting. This will reduce repeating names on the imports
- (automated) Only include one React component per file
- (dropped) Favour functionless components
- (dropped) Do not use mixins
- (automated) No unneeded comments
- (automated) Methods that are longer than the screen should be refactored into smaller units
- (automated) Commented out code should be deleted, not committed

## ES6
- (automated) Can you use spread operator be used instead?
- (automated) Can you use destructuring be used instead?
- (automated) Only use let or const
- (automated) Favour arrow functions
- (automated) Can the optional chain operator be used instead of an explicit null check
- (automated) Can nullish coalescing by used instead of a explicit null comparison

## Testing
- Addressed in a separate segment

## CSS
- (automated) Avoid Inline CSS
- (dropped) A naming convention is defined and followed (BEM, SUIT, etc..)

<hr/>

## Misc
- (automated) Auto-fixed typescript aliases: the custom rule prefer-alias-imports automatically processes relative imports and converts them into alias imports
- (automated) Prefer arrow functions for React component definition: enforced by an eslint rule
- (automated) Import sorting: we sort imports into two categories: external (first) and internal (second).
- (automated) Prohibit default export: keeping exports composable.
- Loading, please wait...

## Other
- (manual) Minimum supported screen size in the SaintMaker is 360px width. As per this article https://worship.agency/mobile-screen-sizes-for-2022-based-on-data-from-2021 that will cover approximately 73% of 2021 mobile users (and I assume an even higher percentage of 2022 mobile users).
- (manual) We use the react-icons library within this app: https://react-icons.github.io/react-icons/search
- (automated) We use folderslint to enforce a folder structure: https://github.com/denisraslov/folderslint
- (automated) We use husky to run unimported, eslint, folderslint, and prettier before you commit your code

</p>
</details>
<details><summary>Testing Standards</summary>
<p>

We use the running of yarn coverage to, for now, ensure that the utils folder is at a 100% code coverage (lines, functions, branches, and statements). This forces us to write tests and sets a quality benchmark for our testing

## Testing
- (kinda automated) Write tests
- (automated) Define a quality gate using coveralls
- (manual) Don't test more than one thing in a test
- (manual) No logic should exist within your test code
- (dropped) Test classes only test one class
- (manual) Code that needs to talk to a network, or, database is mocked

</p>
</details>
<details><summary>Development Log</summary>
<p>

12/10/22

- make the header and drawer reusable between pages
- start work on the habit tracker

12/17/22

- wrap up draft of habit tracker
- move habit data into indexdb
- fix editing behavior of habits
- add prayer book and habits to hamburger

1/3/23

- store at least 4 weeks worth of data per habit
- explore more readable way to push out old weeks
- add unit testing for utils via vitest

1/8/23

- convert individual habit blocks into a component
- store 4 weeks of habit data by default

1/9/23

- set up import/export prayerbook functionality
- filter prayer html when implementing import/export prayerbook functionality
- simplify alert modal component

1/28/23

- setup prettier
- setup most of the eslint rules
- implement husky

1/29/23

- set up additional eslint rules

1/30/23

- setup custom rules (credit for 99% of the prefer-alias-imports rule goes to [Jeff Chen](https://jeffchen.dev/posts/Automatically-Fixing-Relative-Imports-with-ESLint/))
- decide on and implement coding standards

2/3/23
- figure out why prettier isn't applying singlequotes
- have unimported code/packages check run before commit

2/4/23
- Move in-depth coding standard breakdown into this readme

2/12/23
- update husky to test code coverage on commit (just checks the code coverage of the utils folder for now)
- fix eslint linebreak system to work regardless of windows or linux

2/13/23
- integrate jscpd to keep the code dry

Backlog
- ensure that past habit data (when a habit is made) is not marked in red
- figure out text truncation for habit titles
- handle habit editing locally instead of in state
- determine PR standards and create github PR template

</p>
</details>
