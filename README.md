# FILMPIRE - Shubham Kadam
[View Demo](https://filmpire-ssk.netlify.app/)
## About the Project
![1](https://github.com/erkang-xia/Movie-Helper/blob/main/Screen%20Shot%202023-06-15%20at%201.28.11%20PM.png?raw=true)

Features include:
- A robust Node.js backend that powers the Personal Helper, embedded ChatGPT.
- Seamless User Authentication implemented through the TMDB API.
- Extensive utilization of Axios and Redux for efficient and responsive API calls.
- An intuitive user interface offering both Light and Dark modes
- Innovative integration of Alan AI Voice enabling hands-free functionality


![2](https://github.com/erkang-xia/Movie-Helper/blob/main/Screen%20Shot%202023-06-15%20at%201.28.43%20PM.png?raw=true)

![3](https://github.com/erkang-xia/Movie-Helper/blob/main/Screen%20Shot%202023-06-15%20at%201.20.40%20PM.png?raw=true)

## Getting Started
To get a local copy up and running follow these simple steps.
### Prerequisites
List of things you need to use and how to install them:
-   npm
    ```sh
    npm install npm@latest -g
    ```
### Installation
Setup:
1. Get a free TMDB API Key at [https://www.themoviedb.org/](https://www.themoviedb.org/).
2. Clone the repo:
    ```sh
    git clone https://github.com/jovan-vukic/filmpire.git
    git clone https://github.com/ShubhamSKadam/filmpire-AI_Powered_Movie_App.git
    ```
3. Install NPM packages for MovieHelper and openai:
    ```sh
    npm install
    ```
    Note: If you get the peer dependency error :
    ```sh
    npm install --legacy-peer-deps
    ```
4. Create your `.env` file as it is instructed in `.env.example`.
5. Enter your TMDB API key in your `.env`.
    ```sh
    REACT_APP_TMDB_KEY=<put your key here>
    ```

6. start the server and localhost
    ```sh
    cd MovieHelper 
    npm start
    ```
    ```sh
    cd openai
    node index.js
    ```

<!-- USAGE EXAMPLES -->
## Usage
_For more detailes regarding TMDB API calls, please refer to the [Documentation](https://developers.themoviedb.org/3/getting-started/introduction)._
See the [open issues](https://github.com/ShubhamSKadam/filmpire-AI_Powered_Movie_App/issues) for a full list of proposed features (and known issues).
