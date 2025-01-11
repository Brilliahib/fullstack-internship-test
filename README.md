<div align="center">
  
# FULLSTACK INTERNSHIP TEST

This repo will be used for internship test from Aksamedia.

</div>

## Account Testing

username: admin
password: pastibisa

## Backend

1. Repository backend (https://github.com/Brilliahib/be-internship-test)
2. Url backend (https://semuabeli.com)

## Prerequisite

1. NodeJS (^18)
2. npm

## Installation

1. Clone this repository

   ```sh
   git clone https://github.com/Brilliahib/fullstack-internship-test
   ```

2. Install dependencies

   ```sh
   npm install
   ```

3. Run app

   ```sh
   npm dev
   # or
   npm run dev
   ```

## Workflow

1. Git

   We will use git for version control system, please use branching workflow if you want to make the new feature or
   others works.

2. Branch

   We will use 3 important branch for the workflow development

   - main (the main or production branch)
   - staging (app is ready, but need testing first)
   - development (all the development process)

   There is not limited to only use 3 branch above, again if we want make a new feature please make the **new branch**
   from the source **development branch**.

3. Commit

   This project is already setup the checking commit message, so the commit message must follow the best practice commit
   message convention.

   The convention is follow this rules https://www.conventionalcommits.org/

4. Github

   All the source code will be saved on the remote repository (in this case Github), so after make changes in local,
   make sure to push the changes code to the Github.

5. Pull Request

   The changes of merging from the **3 important branch** (main, staging, and development) must be from the Pull Request
   flow, don't be directly push or merge the code when it's in the **3 important branch**.

## Folder Structure

```
.
└── fullstack-internship-test/
    ├── .next
    ├── node_modules
    ├── public
    ├── src/
    │   ├── app
    │   ├── components/
    │   │   ├── atoms
    │   │   ├── layouts
    │   │   ├── molecules
    │   │   └── organisms
    │   ├── hooks
    │   ├── http
    │   ├── lib
    │   ├── stores
    │   ├── utils
    │   ├── validators
    │   └── types
    └── ...configfiles
```

- .next : cache folder for nextjs
- node_modules : all dependencies of the app
- public : it's store all static files
- src : the main of source code app

  - app : the routing folder of nextjs
  - components : all the fraction of components site

    - atoms : smallest components
    - layouts : store the layout of pages
    - molecules : middle to large components (combination of atoms)
    - organisms : largest components (combination of atoms and molecules)

- hooks : custom react hooks
- http :http call api function
- lib : function related to local lib, like custom Axios, etc.
- stores : context related configuartion (redux, zustand, react-context, etc)
- utils : utilities custom function
- validators : validator function to validate data (like validate form, http request, etc)
- types : typescript custom types
