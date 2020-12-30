<!--Start SHOW CO2 WIDGET by Pro Oxygen v15d-->
<a href="https://www.co2.earth/">
<img style="max-width:100%" title="Earth's latest data for atmospheric CO2" alt="Atmospheric CO2" src="https://assets.show.earth/widget-co2/ppm-0040.png" /></a>
<!--End CO2 Widget-->

<p><p>
           
 This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
            
# Greta Thunberg the first 100 weeks in pictures and more..(Greta's Week's)


##### THE BIGGEST SOURCE FOR GRETA THUNBERG'S FRIDAYS FOR FUTURE INFORMATION IN THE FORM OF IMAGES, MOVIES, TEXT AND ARTICLES

This is a fan website built using ReactJS Material-UI for frontend and React Redux with Firebase Firestore as backend.

(we are looking for contributors to help build this site!)

## [Check out the live site!](Https://greta.portplays.com/)

## [Connect with Us at Facebook!](https://www.facebook.com/Greta-Thunberg-the-first-100-weeks-in-pictures-246201326553309) 

![](https://greta.portplays.com/images/preview-film.gif)

## Requirements 
A website for Greta Thunberg Fridays For Future and for Greta's different engagements, such as award ceremonies, nominations, events and personal happenings. Practically everything about her journey. Greta Thunberg's concept is to every Friday make a protest, either outside or indoors, to let the world know about the climate and ecological crisis. One particularly important thing is the "weeks". Greta is now as-of writing on her 106'th week of protesting. By highlighting the "week" as a central organizer /, Fridays For Future have created their own time calendar era with the start at week ONE on Monday August 20 2018.

![](https://greta.portplays.com/images/weeks1.png)


##### A website portraying this must contain following:
- Images, text, films and other files related to protests must be organized under "weeks".  End users view a "week" and see only related material for that particular "week".
 - Must show the climate and ecological crisis protest both in images, text, films and articles.
- All material Images, text, films and other files must be tagged and have a description.
- Searching for material must be straightforward using tags or keywords. 
- End users must be able to edit/add description to any material simply by selecting it and "edit".
- End users must be able to upload new material (version 2.0).
- links to FFF and to Gretas Twitter, Facebook must exist. 
- All material must be organized over a central timeline. Like adding an image or a set of images/files they all must be tagged with date/time to fit in the timeline
- All added material must be approved by role=admin regarding its correctness. 

##### ***THIS ABOVE LIST IS IN A DRAFT STATE..****

# Current version:  1.2.6

## Change log

##### App Version: 1.2.6 Build: 1608830433717 Date: (24.12.2020 18:20:33)
CHANGES:    
- New Dashboard with Theming. This Dashboard is an outlining of features and the next step is to implement them. So have a look around and feel free to come with code to input.

##### App Version: 1.1.1 Build: 1606246094943 Date: (24.11.2020 20:28:14)
CHANGES:
- FIxed the top navigation bar so it also works on mobile screens     

##### App Version: 1.1.0 Build: 1605289836481 Date: (13.11.2020 18:50:36)
CHANGES:
- Added Firebase full login flow. Check Navbar User icon for login. 
- Note that most changes are still happening under the hood as of now.

##### App Version: 1.0.9 Build: 1602012032253 Date: (06.10.2020 21:20:32)
CHANGES:
- Added React-Bootstrap Navbar addition

##### App Version: 1.0.8 Build: 1600892449056 Date: (23.09.2020 22:20:49)
CHANGES:
- Added feature-add-items-overlay-with-options-like-download-open-change-description

##### App Version: 1.0.7 Build: 1600071819377 Date: (14.09.2020 10:23:39)
CHANGES:
- This is now a development release for presentation only! This version is not production ready!
- Added support for docx, xlsx, mp3, pdf, mp4 and txt files to be shown in albums. (You can view demo files under week1 that will be removed later)
- Cleanup code with Eslint and Pretty print

##### App Version: 1.0.6 Build: 1599076010736 Date: (02.09.2020 21:46:50)
CHANGES:
- Fixed: on mobile screen menu text too long pushed screen out.
- Fixed: Images with space in their names did not render in img added encodeURIComponent()
- System: Introduced React-Redux. 
- Moved out all json files metadata into public folder as a prep for a new backend later

##### App Version: 1.0.5 Build: 1598179258474 Date: (23.08.2020 12:40:58)
Changes:
 - Just added the text "(we seek dev help if you're a Reactjs wizard please join)." in the Resume.json
 - running some tests


##### App Version: 1.0.4 - 04/05/2016App Version: 0.1.4 Build: 1598170287004 Date: (23.08.2020 10:11:27)
Changes:
- Added component ShowBuildAndVersion to show app Version.
- Fixed when clicking the same album the TimelineViewer disappears.


## Roadmap

- [ ] Get sponsors 
- [ ] Full server backend location
- [ ] 
- [ ] 

## Design
A one page website easy access SPA.

##  Development
If you want to help out we are very happy for that and you can chat with Us at [Facebook!](https://www.facebook.com/Greta-Thunberg-the-first-100-weeks-in-pictures-246201326553309) !

This is a Create React App ReactJs project.
Considering the requirements and on-going iteration discussions, feel free to contribute with Pull requests. 

To get starting developing you have to create a Firebase account and setting up your own credentials. Check Firebase.js for config, typically create some .env file in root for the constants. 
- In the .env file at root the HTTPS=true is set to make Facebook login work-
- As of release V1.1.0: the Firestore-rules.json at root for Cloud Firestore.

At Cloud Firestore enable Sign-in providers:
- anonymous
- Google
- Facebook
- Twitter
- E-mail

That's it for now just text me from Facebook group and expect changes since it's early beta..

## TODO:
+ Continue building on the Dashboard features it's a blanks slate right now
+ Create Internationalization
+ Move json meta data to Firestore
+ The Menu header Toggle Button open a link page and all links need setup help.
+ In the Masonry the overlay for all items Docs, Tex's are not for mobile and need help
+ Proposal for a Top Menu search feature like autocomplete search to start with then expand it to [look something like this](https://codesandbox.io/s/react-tutorial-search-button-forked-q05kq?file=/main/Main.js)
+ The structure for how albums "weeks" all the way to individual files images, movies and docs are going to be handled. Specifically that an "item" can have this metadata: 
   + Overall description text
   + "fileData": "someImage.jpeg",
   + "ratio": "0.7497371188222923", (all items not only images must have a ratio so Masonry can lay them out)
   + "title": "Some title text",
   + "description": "some description text",
   + "size": "115603",
   + "mediaType": "jpeg",
   + "mimeType": "image/jpeg"
   + Tag text
   + coming more....
   
   and that this metadata can be changed by end user. Basically different flows can be: 
   + User add an album containing images, movies and docs and every "item" must have the above 
   metadata. 
   + User search for images, movies and docs and then the metadata is used by user to filter result.
   + User add to an album a single images, movie or doc and by so must add the above metadata.

## Build

1. Clone the repo:
```console
> git clone https://github.com/erikswed/Greta-100-React-Web-App.git'
```

2. Install dependencies and run build command:
```console
> npm install
> npm run build
```
3 During dev use secure https://localhost:xxxx/ since Facebook require it. Disable this in .env file. 

You can also test the app with a development server, just run:

```console
> npm start
```

## Contributing

Feel free to fork this project and help out

## License

LGPLv3
