# Project Title

Brief description of your project.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Routes](#routes)
- [Authentication](#authentication)
- [Caching](#caching)
- [Contributing](#contributing)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/sanu-basak/movate-test.git


## Install dependencies:
cd movate-test
npm install

## Set up environment variables:
Create a .env file in the root directory and define the required environment variables (e.g., SECRET_KEY).

## Start the server:
npm start


## Usage
Describe how to use your project. Include any configuration or setup instructions.

## Routes
/search: Perform searching against the JSON file data.
/sort: Perform sorting against the JSON file data.
/filter: Perform filtering against the JSON file data.
/pagination: Perform pagination against the JSON file data.
For detailed usage of each route, refer to the corresponding route files in the project.

## Authentication
Protect the API by passing the secret key through the Authorization Header.
authorization: YOUR_SECRET_KEY
Replace YOUR_SECRET_KEY with your actual secret key.

## Caching
The project includes caching to avoid reading data from the file every time. Cached data is stored in memory.

## Contributing
If you'd like to contribute to this project, feel free to submit a pull request or open an issue.
