# Amazing Game

This is a simple game made using React where the purpose is to place blockers to create the longest path between the generated waypoints. The backend is written in Node/Express.

# Core Features

## React/Redux

This application is built using unidirectional data flow based on redux actions.

## Procedural Generation

The game board is generated using a different seed every day. Users can use any string to generate their own game state if they do not wish to play the daily seed. This provides users with infinite puzzles to play. The generation algorithm was developed by me and seems to work well.

## Pathfinding

The A* pathfinding algorithm was implemented to calculate the shortest path between a set of way points. This algorithm is much more efficient than a breadth-first or depth-first search.

## Authentication

Users can log in using firebase. This prevents duplicate entries for high scores and keeps
the leaderboard clean.

## Leaderboard tracking

The backend API allows users to submit their high scores to a server which validates the user solutions and tracks scores. The client updates the high score every 30 seconds so that users have a current score to beat. Users can check seeds for previous days and seeds to check other user's solutions, but cannot check solutions for the current seed. The leaderboard displays the top 10 scores and, if the user is not in the top 10, the scores closest to the user's score.

## Try it

You can try the live version at zhenlu.info/mazer or build it yourself.
npm build will generate a build folder where you can run index.html.