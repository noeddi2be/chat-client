This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# Project Documentation
![Demo](github-media/demo.gif "Demo")
## Project Contributors
👨🏽‍💻 Manuel Notter

## Running the Project

To run the project first clone the repository with `git clone`.
Node Package Manager was used in the project, it's advised to use npm to run the application.

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

#### Problems faced:
```typescript
```
