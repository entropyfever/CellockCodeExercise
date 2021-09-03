# Cellock Coding Exercise

The goal of these exercises are to assess your proficiency in software engineering that is related to the daily work that we do at Cellock. Please follow the instructions below to complete the assessment.

## Setup

1. Create a new repository in your own git profile  and commit the contents of this folder
2. Ensure `node (>8.6 and <= 10)` and `npm` are installed
3. Run `npm install`
4. Run `npm test`
5. Run `npm start`
6. Hit the server to test health `curl localhost:8010/health` and expect a `200` response 

## Tasks

Below will be your set of tasks to accomplish. Please work on each of these tasks in order. Success criteria will be defined clearly for each task

1. [Documentation](#documentation)
2. [Implement Pagination](#implement-pagination)
3. [Refactoring](#refactoring)
4. [Security](#security)
5. [UI Creation](#ui-creation)

### 1.Documentation

Please deliver documentation of the server that clearly explains the goals of this project and clarifies the API response that is expected.

#### Success Criteria

1. A pull request against `master` of your fork with a clear description of the change and purpose and merge it
3. **[BONUS]** Create an easy way to deploy and view the documentation in a web format and include instructions to do so  


### 2.Implement Pagination

Please implement pagination to retrieve pages of the resource `rides`.

1. Create a pull request against `master` with your changes to the `GET /rides` endpoint to support pagination including:
    1. Code changes
    2. Tests
    3. Documentation

#### Success Criteria

1. A pull request against `master` of your fork with :
    1. Code changes
    2. Tests

### 3.Refactoring

Please implement the following refactors of the code:

1. Convert callback style code to use `async/await`
2. Reduce complexity at top level control flow logic and move logic down and test independently
3. **[BONUS]** Split between functional and imperative function and test independently
4. **[BONUS]** Add Typescript support

#### Success Criteria

1. A pull request against `master` of your fork for each of the refactors above with:
    1. Code changes
    2. Tests

### 4.Security

Please implement the following security controls for your system:

1. Ensure the system is not vulnerable to [SQL injection](https://www.owasp.org/index.php/SQL_Injection)
2. **[BONUS]** Implement an additional security improvement of your choice

#### Success Criteria

1. A pull request against `master` of your fork with:
    1. Changes to the code
    2. Tests ensuring the vulnerability is addressed

### 5.UI Creation 

Please implement basic UI for displaying a list of rides 


#### Success Criteria

1. Implement a simple User interface for displaying and updating the 'rides' in React/Vuew/Anjular 
    1. Add a list to display all 'rides'
    2. Add insert new functionality
    3. Add Update Functionality 
    4. Add view functionality
    5.**[BONUS]** Add a seperate client page called /map to display the rides in a map 

#### Deliverable

A link to your git account with access to all commits you make for the final deliverable 

#### Duration 

Duration of the project should not be more than one day . 

#### Scoring

You will be scored based on the deliverable for each one of the tasks . You can deliver  one or all tasks based on your experience and you will be scored accordingly .


GOOD LUCK



