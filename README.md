# Myelino Technical Test

This repository contains the base project for the Myelino technical test in React Native. Follow the instructions below to clone the project, install dependencies, initialize the project, and review the pre-installed packages.

---

## Table of Contents

1. [Project Cloning](#project-cloning)
2. [Dependency Installation](#dependency-installation)
3. [Project Initialization](#project-initialization)
4. [Pre-installed Packages](#pre-installed-packages)
5. [Developer Instructions](#developer-instructions)

---

## Project Cloning

Clone the repository to your local machine using the following command:

```bash
git clone https://github.com/Myelino-MVP/myelino-technical-test
```

Navigate to the project directory:

```bash
cd myelino-technical-test
```

---

## Dependency Installation

Run the following command to install the required dependencies:

```bash
npm install
```

This will install all necessary packages for the project, including both core dependencies and any pre-installed packages.

---

## Project Initialization

To start the project in development mode, use the following command:

```bash
npx react-native run-android
```

or

```bash
npx react-native run-ios
```

> **Note:** Make sure to have an Android or iOS emulator running, or connect a physical device.

For easier debugging and live reloading, you can also use:

```bash
npx expo start
```

---

## Pre-installed Packages

This project includes the following pre-installed packages:

1. **Expo Router**: For seamless navigation between screens.

   - Installed with core dependencies for navigation structure.
   - Ensure to follow [Expo Router setup instructions](https://docs.expo.dev/router/introduction/) if additional configuration is required.

2. **Axios**: For handling HTTP requests and interactions with external APIs.
   - Used for calling endpoints and managing API responses.
   - Basic setup is included for quickly making API requests.

---

## Developer Instructions

1. **State Management**: Use a global state management solution of your choice (e.g., Redux, Zustand, or Context API) to handle application-wide data, such as user sessions, API responses, and any other shared data.
2. **TypeScript**: Use TypeScript to define types based on the structure of API responses, ensuring type safety across the app.

3. **Project Structure**: Follow modular and organized folder structures for easier maintenance:

   - `components/`: Reusable UI components.
   - `app/screens/`: Separate file for each screen in the app.

4. **Figma Design Reference**: Implement screen layouts as specified in the provided Figma file.

---

For any issues or questions, refer to the documentation of the pre-installed packages or contact the project maintainer.


-----------------------

## MY ADDITIONS

1. Upgraded Expo SDK to Latest Version

   To leverage the latest features, bug fixes, and performance improvements provided in Expo SDK 52.

2. Designed Layouts

   Implemented layouts as per the Figma design provided. Used responsive styling to match the design closely, ensuring consistency across devices.

3. Fetched Data from the API Endpoint

   Used axios for API requests, with error handling to provide feedback in case of failures.

4. Cached API data

   Cached fetched data to optimize performance and reduce redundant API calls
   Used Context and a caching strategy to store data locally in memory

5. Created context to use in app with Custom Hook
   
   Setup Context for authentication and for data fetched from API endpoint, to share and manage data across app
   Created Custom hook to simplify data access and improve code reusability.

6. Used Context over Redux

   I used context over redux and other state management tools because of it's simplicity and it is sufficient for the needs of the test app

7. Persisted Login state
   
   Implemented login state persistence so users remain logged in even after closing the app until they click the logout button
   Used AsyncStorage to monitor user Login and Logout

8. Structured data according to Figma design
   
   Transformed API data to match structure required by the UI

9. Navigation Choice

   Maintained the Existing Expo Router instead of switching to React Navigation because of it's simplicity and recent updates which makes it preferrable
   Expo router uses file-base routing techinque, which eliminates the need to manually define routes in  a config file.

10. Svg image setup
    
   added react-native-svg-transformer and react-native-svg packages to the app so that i can use Svg images in the app
   reason: react native does not support using svg images out of the box
   benefit: Svg images are clearer and sharper for icons in the app, instead of jpg or png which are oftentimes blurry.

## CHALLENGES & OBSERVATIONS

1. no UI to delete events or plans
2. some data are missing or are not included in the API endpoint
3. all the data in the endpoint were removed today, thereby returning empty arrays and objects from the endpoint (not enabling me to finish the structure for the quick plan screen)
4. no sufficient explanation for me on where to place some data seen in the api Endpoint on the UI
5. API endpoints should be seperated (best practice) for example /plan, /events thereby enabling me to know what endpoint is for what part of the UI

   



