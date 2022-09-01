Things i did in the final assignment


- AddedPATCH "/api/v2/films" in films.js in films directory

ipconfig getifaddr en0 to get ipaddress for macos


Hi My name is Omera Ezike and im going to walk you through my knowledge of this final assignment. First i'll talk about Step 1

Step 1 make sure your existing web UI is response (on web and mobile)

- The first thing i did was do some research on minimum screen dimensions on mobile. 

-  According to the article on Altamira, Common Screen Sizes for Responsive Web Design, 
"The minimal mobile screen resolution is 320px in width that is suitable 
for iPhone 5SE. For the latest version of smartphones, screen resolution depends on the target audience.
So it can be 320, 360, or 375 in width. For example, it is for iPhone8 or iPhone X."

https://www.altamira.ai/blog/common-screen-sizes-for-responsive-web-design/#:~:text=The%20minimal%20mobile%20screen%20resolution,for%20iPhone8%20or%20iPhone%20X.

- I used basic css changes to ensure the UI was responsive. Not a lot of changes had to be made to the UI other than ensuring film titles wrap around if they're too long. For example I can add the film, 'A very long film name to overflow into the next line'

Step 2: Make your API accessible from outside your local machine

- I grepped through my project and replaced any instances of localhost with the ip address of my local machine using the terminal command 'ipconfig getifaddr en0'.

- The changes were made to index.js in the server and and films.js on the client side

- I was able to verify this on web as well as my smartphone

- show demo

Step 3: Build a native mobile app that intergrates with my existing project

- I was going to use Android studio to for my mobile app, but instead, I created a native app using Flutter because I thought it would be fun to learn something new.

- Flutter is an open source framework made by Google used to develop cross platform applications and I read a lot of documentation and followed a lot of tutorials to build the application.

- Flutter is similar to Java because every UI element is a widget with other widgets nested in eachother to create the functionality you need. 

- A lot is going on here, but i'll walk you through some of the essential things I had to learn to build this app.

    - Creating a widget, positioning it, and populating it with meaningful info

    - Switching Pages