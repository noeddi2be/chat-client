# Project Documentation
Demo of the Application: **demo.gif**
![Demo](github-media/demo.gif "Demo")

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).
## Project Contributors
👨🏽‍💻 Manuel Notter

## Running the Project

To run the project first clone the repository with `git clone`.
Node.js is required for serverside JavaScript execution.
Node Package Manager was used in the project, it's advised to use npm to run the application.
There seems to be a small bug present, when the application is started the first time and the buttons on the sidebar are not working correctly - just refresh the page.

**Install Node.js on Fedora**
```shell
sudo dnf install nodejs npm
```

**Install Node.js on MacOS**
```shell
brew install node
```

**Verify the installation**
```shell
node -v
```
```shell
npm -v
```

**Install the necessary dependencies with:**
```shell
npm install
```

**Start the project with:**
```shell
npm run dev
```

The App is a single page application accessible on `http://localhost:3000`.

## Summary

The goal was to create a client according to the project specification for project option 2 provided. 

```text
Project option 2: Implement a client

Create a client application using of the following technologies: 
Java (JavaFX), Android (Jetpack Compose), or browser-based (React).
It must be possible to enter the server address and port.
You can use javaprojects.ch:50001 as the default, but it must be 
possible to change this! Send a “ping” to confirm that the address is 
correct. The client must support all API functions of the server listed 
in this document, except for the “debug functionalities”.
Chats with different users must be separated – don’t mix them together!
```

## General Remarks
The project is a React App created with NextJS, using Tailwind for styling the application.
I have experimented using TypeScript in this project, because i want to get to know the language better and I am also using TypeScript in another project at the moment.
I really like the approach of using React components in a frontend project, and I plan to transfer my React skill to React Native in the future.

I am still a beginner in frontend development, so I have used Copilot in this project to help me with autocompletion and problem solving for various functionalities, explaining different syntax that was new to me as well as for helping me to debug my code.

For styling, TailwindCSS has been used, of which I really like the approach.
Even though, in Tailwind different heroicons are available, i have used svg files from Googles Meterial Design Icons as well as one Icon from W3.

For linting JSX and TSX as well as HTML and TypeScript, i have setup ESLint, which I am also learning to configure at the moment. When I started the project, I first also setup Prettier, but it has been to much work to configure and the configuration was not working as expected.
I will take a closer look at Prettier in the future, for the moment I have just used the built in functionalities of VSCodium for autoformatting.

Overall it was a great project, I had a lot of fun and learnt a lot from it!

## Application Structure
The project is a single page application with two main files, the `layout.tsx` and `page.tsx`.

In `layout.tsx` i only have added the base layout with the title and the background. I first wanted to add the sidebar to the layout so I could have the sidebar and the main page as two seperate children in the layout. But I have encountered some problems with Prop-Drilling, which was a new concept to me and therefore I added both of the components as children of the main page.

There are different components that are rendered on the main page.
- Chat
- Login
- Register
- ServerAddress
- Sidebar
- UserList

I also have a service folder with `api.tsx` as the only service inside of it.
All the API calls are handled in this file and imported to where they are needed.

## Functionality
The Application consists of the main window, as well as the sidebar. In the sidebar, different buttons are available to provide all the functionality of the application.

<p align="center">
    <img src="github-media/main.png" width="80%" height="auto" allign-center>
</p>

When starting the client, the user can view, set and ping the current server address by clicking on the `Server` button.

<p align="center">
    <img src="github-media/server.png" width="60%" height="auto" allign-center>
</p>

After login, the current token can be verified by clicking on the `Token` button.

<p align="center">
    <img src="github-media/check-token.png" width="60%" height="auto" allign-center>
</p>

Using `Login` and `Register`, users can create an account and login to their account. When users are logged in, they can check their current account by clicking on the `Login` button again. Registering an account requires users to logout again.

<p align="center">
    <img src="github-media/register.png" width="60%" height="auto" allign-center>
</p>
<br>
<p align="center">
    <img src="github-media/login.png" width="60%" height="auto" allign-center>
</p>

To see users, or to chat with a user, users must be logged in.

<p align="center">
    <img src="github-media/not-logged-in.png" width="60%" height="auto" allign-center>
</p>

When logged in, users can view the accounts registered on the server by clicking on the `User` button. This is only a debug functionality, but I have impmenented it for selecting a user to chat with. As stated, in a real-world application this would not be good practice. But in chat applications, there almost always is a list of friends for example. So this functionality could be seen as a 'Friends List' for this project.

<p align="center">
    <img src="github-media/select-user.png" width="60%" height="auto" allign-center>
</p>

When clicking on a user, and then on `Chat`, the chat window opens.
For debugging, one can also chat with himself to see if messages are received.

<p align="center">
    <img src="github-media/chat.png" width="60%" height="auto" allign-center>
</p>

**EDIT:**
The API endpoint `/users` from the server `http://javaprojects.ch:5001` seems to have been disabled. The endpoint `/users/online` is still working at this time. I have adjusted to select the users from the returned list of online users, which makes more sense anyway. Additionally, to prevent the application not working if this endpoint will get disabled as well, I have implemented a text input field, to choose the username manually. I think this is not a great solution and i like the list better, but now the app will work in any case. It's to be noted, that when entering a username that does not exist, the user will just show as offline.

Code snippet from the user input field:
```ts
<input
type="text"
placeholder="Username"
value={undefined}
onChange={(e) => setSelectedUser(e.target.value)}
className="mb-2 p-2 border rounded text-dark"
required
/>
```

When the chat window is opened, the online status of the current user is indicated to the on top of the chat. Messages in the chat are only stored as long as the window is opened. The server deletes all the messages from the chats, and in the current implementation of this app, the messages are also not persisted by the client.
**EDIT:**
Chats are now stored in local storage. Whenever a new message arives, the message get's stored in local storage. This functionality has been added very quickly and Copilot was used to support developing the process of storing the elements in local storage:

```tsx
if (response.data.messages && response.data.messages.length > 0) {
response.data.messages.forEach((msg) => {
    // Update the message stack for each user
    // Added with the help of Copilot
    setMessagesByUser((prev) => {
    const updatedMessages = {
        ...prev,
        [msg.username]: [
        ...(prev[msg.username] || []),
        { username: msg.username, text: msg.message },
        ],
    };
    // Save to localStorage
    // Added with the help of Copilot
    localStorage.setItem('messages', JSON.stringify(updatedMessages));
    return updatedMessages;
    });
});
}
```
Additionally, I have altered the selection for the user to chat with, so there is also an element that displays all the users who have sent messages. In a further step, the stored element could be adjusted to hold an additional value (read / unread). Through that, colorization for new messages would be supported. In that every time that a message is added to the stack, or the messages are retrieved from the stack, that state would be updated and rendered accordingly in the UI.

<p align="center">
    <img src="github-media/select-user-2.png" width="60%" height="auto" allign-center>
</p>

Finally, after clicking `Logout` the current user is logged out, the token and the username are deleted from local storage on the client side, and also from the server.

<p align="center">
    <img src="github-media/logged-out.png" width="60%" height="auto" allign-center>
</p>

## Code Structure
### Layout
Layout does not have much content. As it is a single page application, only the contents of `page.tsx` in the app folder accessing `layout.tsx`.

```tsx
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>

          {children}

      </body>
    </html>
  );
}
```

### Main Page
The main page `page.tsx` is the entry point to the application. It renders the different components depending on the set view.

```tsx
<div className="flex items-center space-x-5 w-full">
          <div className="flex rounded-lg items-center justify-center bg-background w-1/12">
            <Sidebar
              onRegisterClick={handleRegisterClick}
              onLoginClick={handleLoginClick}
              onLogoutClick={handleLogoutClick}
              onChatClick={handleChatClick}
              onUsersClick={handleUsersClick} 
              onServerClick={handleServerClick}
              onTokenClick={handleCheckToken}
            />
          </div>
          <div className="flex flex-col rounded-lg items-center justify-center min-h-[80vh] bg-gray-100 w-11/12">
            {currentView === 'server' && <ServerAddress />}
            {currentView === 'register' && <Register />}
            {currentView === 'login' && <Login />}
            {currentView === 'users' && <UserList onUserSelect={handleUserSelect} />}
            {currentView === 'chat' && selectedUser && <Chat chatWith={selectedUser} />}
            {currentView === 'welcome' && (
              <>
                <h1 className="text-5xl font-medium subpixel-antialiased text-medium font-leckerli">Welcome to ChatApp!</h1>
                <p className="mt-4 text-lg font-bold text-dark">
                  Connect with friends and start chatting...
                </p>
                {message && <p className="mt-2 text-green-500">{message}</p>}
              </>
            )}
          </div>
        </div>
```

It is also the place where the functionality of the Sidebar Buttons is defined. This is an example of for the `Login` click.

```tsx
  const handleLoginClick = () => {
    const token = localStorage.getItem('token');
    if (token !== null && token !== 'undefined') {
      alert("You are already logged in as: " + localStorage.getItem('username'));
      console.log(localStorage.getItem('token'));
    } else {
      setCurrentView('login');
    }
  };
```

### Components
The different components in the component folder provide the content to be rendered on the main page.
All of them are structured similarly:

**Imports**
```tsx
import React, { useState } from 'react';
import { loginUser } from '../services/api';
```

**Component Definition**
```tsx
const Login = () => {
```

**State Variables using a react hook**
```tsx
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [error, setError] = useState('');
const [success, setSuccess] = useState('');
```

**Event Handlers**
```tsx
const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await loginUser(username, password);
      const token = response.data.token; 
      localStorage.setItem('token', token); 
      console.log('Token: ' + localStorage.getItem('token'));
      setUsername('');
      setPassword('');
      ...
```

**JSX to render the Component**
```tsx
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold text-dark">Login to Your Account</h2>
      <form onSubmit={handleLogin} className="flex flex-col mt-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mb-2 p-2 border rounded text-dark"
          required
        />
        ...
```

**Exporting of the Component**
```tsx
export default Login;
```

### Services
There is only one service used in this project so far. It handles the API calls for the web application. The service uses the `Axios` library.

**Exporting of the setApiUrl function**
```tsx
export const setApiUrl = (url) => {
  API_URL = url;
  axios.defaults.baseURL = API_URL;
};
```

**Exporting the different API-Calls Functions**
```tsx
export const pingServer = () => axios.get(`${API_URL}/ping`);

export const checkToken = (token) => 
  axios.post(`${API_URL}/ping`, { token });
```