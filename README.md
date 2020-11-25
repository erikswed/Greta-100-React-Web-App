<!--Start SHOW CO2 WIDGET by Pro Oxygen v15d-->
<a href="https://www.co2.earth/">
<img style="max-width:100%" title="Earth's latest data for atmospheric CO2" alt="Atmospheric CO2" src="https://assets.show.earth/widget-co2/ppm-0040.png" /></a>
<!--End CO2 Widget-->

<p><p>
           
 This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
            
# Greta Thunberg the first 100 weeks in pictures and more..


##### THE BIGGEST SOURCE FOR GRETA THUNBERG'S FRIDAYS FOR FUTURE INFORMATION IN THE FORM OF IMAGES, MOVIES, TEXT AND ARTICLES

This is a fan website built using ReactJS and Bulma as the CSS framework. 

(we are looking for contributors to help build this site!)

## [Check out the live site!](Http://greta.portplays.com/)

## [Connect with Us at Facebook!](https://www.facebook.com/Greta-Thunberg-the-first-100-weeks-in-pictures-246201326553309) 

![](http://greta.portplays.com/images/preview-film.gif)

## Requirements 
A website for Greta Thunberg Fridays For Future and for Greta's different engagements, such as award ceremonies, nominations, events and personal happenings. Practically everything about her journey. Greta Thunberg's concept is to every Friday make a protest, either outside or indoors, to let the world know about the climate and ecological crisis. One particularly important thing is the "weeks". Greta is now as-of writing on her 106'th week of protesting. By highlighting the "week" as a central organizer /, Fridays For Future have created their own time calendar era with the start at week "ONE" on Monday August 20 2018.

![](http://greta.portplays.com/images/weeks1.png)


##### A website portraying this must contain following:
- Images, text, films and other files related to protests must be organized under "weeks".  End users view a "week" and see only related material for that particular "week".
 - Must show the climate and ecological crisis protest both in images, text, films and articles.
- All material Images, text, films and other files must be tagged and have a description.
- Searching for material must be straightforward using tags or keywords. 
- End users must be able to edit/add description to any material simply by selecting it and "edit".
- End users must be able to upload new material (version 2.0).
- links to FFF and to Gretas Twitter, Facebook must exist. 
- All material must be organized over a central timeline. Like adding an image or a set of images/files they all must be tagged with date/time to fit in the timeline

##### ***THIS ABOVE LIST IS IN A DRAFT STATE..****

# Current version:  1.1.1

## Change log

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
A one page website easy access.

##  Development
If you want to help out we are very happy for that and you can chat with Us at [Facebook!](https://www.facebook.com/Greta-Thunberg-the-first-100-weeks-in-pictures-246201326553309) !

This is a Create React App ReactJs project.
Considering the requirements and on-going iteration discussions, feel free to contribute with Pull requests. 

To get starting developing you have to create a Firebase account and setting up your own credentials. Check Firebase.js for config, typically create some .env file in root for the constants. In the .env file at root the HTTPS=true is set to make Facebook login work and this require use of secure https://localhost:xxxx/

As of release V1.1.0: This is the Firestore-rules.json at root for Cloud Firestore db  setup.

At Cloud Firestore enable Sign-in providers:
- anonymous
- Google
- Facebook
- Twitter

That's it for now and probably forgot something just text me from Facebook group and expect changes since it's early beta..

## TODO:
+ Create Internationalization
+ Move json meta data to Firestore
+ The Menu header Toggle Button open a link page and all links need setup help.
+ Mobile screen layout is needed for: 
   + Top Menu layout below some 500px width need help:
      + on mobile a hamburger toggler is enough and some Header logo maybe
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
#### How it works: 

The app metadata is currently loaded from a json at ´public/resume.json´. By initially pre dev using an external json it becomes flexible since the app state can be changed without building the app again. The json data can when time comes easily be inserted on a remote backend later on running some flavor of NOSQL.

This is the main Overall json down below you see the json dedicated only for albums
This is up till now a [resume](https://jsonresume.org/) type of layout json because it was a handy starter but we will outgrow that. 
```json
{
  "basics": {
    "name": "Greta Thunberg",
    "label": "Climate and Environmental Activist",
    "picture": "images/GretaThunberg 2.jpg",
    "x_pictureFallback": "images/GretaThunberg-portrait.jpg",
    "x_title": "OUR HOUSE IS ON FIRE",
    "summary": "GRETA TINTIN ELEONORA ERNMAN THUNBERG\nborn January 3 2003 at 375PPM is a Swedish environmental activist who has gained international recognition for promoting the view that humanity is facing an existential crisis arising from climate change. Thunberg is known for her youth and her straightforward speaking manner both in public and to political leaders and assemblies, in which she criticises world leaders for their failure to take sufficient action to address the climate crisis.\nACTIVISM\nThunberg's activism started after convincing her parents to adopt several lifestyle choices to reduce their own carbon footprint. In August 2018, at age 15, she started spending her school days outside the Swedish parliament to call for stronger action on climate change by holding up a sign reading Skolstrejk för klimatet (School strike for climate). Soon, other students engaged in similar protests in their own communities. Together, they organised a school climate strike movement under the name Fridays for Future. After Thunberg addressed the 2018 United Nations Climate Change Conference, student strikes took place every week somewhere in the world. In 2019, there were multiple coordinated multi-city protests involving over a million students each. To avoid flying, Thunberg sailed to North America where she attended the 2019 UN Climate Action Summit. Her speech there, in which she exclaimed \"how dare you\", was widely taken up by the press and incorporated into music.\nAn Ikon\nHer sudden rise to world fame has made her both a leader and a target for critics. Her influence on the world stage has been described by The Guardian and other newspapers as the \"Greta effect\". She has received numerous honours and awards including: honorary Fellowship of the Royal Scottish Geographical Society; Time magazine's 100 most influential people and the youngest Time Person of the Year; inclusion in the Forbes list of The World's 100 Most Powerful Women (2019) and two consecutive nominations for the Nobel Peace Prize (2019 and 2020)...and more",
    "fansite": "This is a fansite under construction!! (we seek dev help if you're a Reactjs wizard please join). ",
    "description": "GRETA THUNBERG - THE FIRST 100 WEEKS IN PICTURES",
    "location": {
      "country": "Sweden",
      "countryCode": "SE",
      "region": "Stockholm"
    },
    "profiles": [
      {
        "network": "Friday For Future FFF",
        "username": "Greta Thunberg",
        "url": "https://fridaysforfuture.se/",
        "x_icon": "fas fa-home fa-2x"
      },
      {
        "network": "Facebook",
        "username": "Greta Thunberg",
        "url": "https://www.facebook.com/gretathunbergsweden/",
        "x_icon": "fab fa-2x fa-facebook"
      },
      {
        "network": "Twitter",
        "username": "Greta Thunberg",
        "url": "https://twitter.com/GretaThunberg",
        "x_icon": "fab fa-2x fa-twitter"
      }
    ]
  },
  "weeks": [
    {
      "weekNumber": "1",
      "year": "2018",
      "title": "Climate Strike Week 1, Parliament, Stockholm SE(Simon Rehnström)",
      "startDate": "2018-08-20",
      "albumDate": "Monday August 20",
      "summary": "Climate Strike Week 1, Parliament, Stockholm SE(Simon Rehnström"
    },
    {
      "weekNumber": "2",
      "year": "2018",
      "title": "Climate Strike Week 2, Parliament, Stockholm SE (Anders Hellberg))",
      "startDate": "2018-08-27",
      "albumDate": "Monday August 27",
      "summary": "Climate Strike Week 2, Parliament, Stockholm SE (Anders Hellberg)."
    },
    {
      "weekNumber": "3",
      "year": "2018",
      "title": "Rålambshovsparken Peoples Climate March Stockholm Kom till Rålis",
      "startDate": "2018-09-03",
      "albumDate": "Saturday September 8",
      "summary": "Rålambshovsparken Peoples Climate March Stockholm Kom till Rålis"
    }
  ]
}
```

Albums meta data json
```json
[
  {
    "id": "week-1",
    "weekNumber": "1",
    "coverImage": "coverImage.jpg",
    "media": [
      {
        "id": "week-1-1",
        "key": "1",
        "week": "1",
        "fileData": "4olpqsvfte5rubn47j936z7c5vn9lff.jpeg",
        "ratio": "0.6677181913774973",
        "background": "rgb(56, 230, 236)",
        "title": "dhdasdada",
        "description": "jkhkjhl",
        "size": "84427",
        "mediaType": "jpeg",
        "mimeType": "image/jpeg"
      },
      {
        "id": "week-1-2",
        "key": "2",
        "week": "1",
        "fileData": "9tlnx2sudu05jqxwij2evyvaifkrvbc.jpeg",
        "ratio": "0.7497371188222923",
        "background": "rgb(56, 230, 236)",
        "title": "dhdasdada",
        "description": "jkhkjhl",
        "size": "115603",
        "mediaType": "jpeg",
        "mimeType": "image/jpeg"
      },
      {
        "id": "week-1-3",
        "key": "3",
        "week": "1",
        "fileData": "Greta Thunberg \u0026 FatBoy Slim - Right Here, Right Now (Full Extended).mp3",
        "ratio": "1.41428571429",
        "background": "rgb(56, 230, 236)",
        "title": "dhdasdada",
        "description": "jkhkjhl",
        "size": "18005908",
        "mediaType": "mp3",
        "mimeType": "audio/mpeg"
      },
     ]
  },
  {
    "id": "week-2",
    "weekNumber": "2",
    "coverImage": "coverImage.jpg",
    "media": [
     {
        "id": "week-1-1",
        "key": "1",
        "week": "2",
        "fileData": "Greta-Thunbergs-first-speech-at-Saturday-September-8-2018.mp4",
        "ratio": "1.41428571429",
        "background": "rgb(56, 230, 236)",
        "title": "dhdasdada",
        "description": "jkhkjhl",
        "size": "10372097",
        "mediaType": "mp4",
        "mimeType": "video/mp4",
        "duration": "139111"
      },
      {
        "id": "week-1-2",
        "key": "2",
        "week": "2",
        "fileData": "h14-greta-thunberg-eu-leaders-climate-change.jpg",
        "ratio": "0.5625",
        "background": "rgb(56, 230, 236)",
        "title": "dhdasdada",
        "description": "jkhkjhl",
        "size": "56767",
        "mediaType": "jpg",
        "mimeType": "image/jpeg"
      },
      {
        "id": "week-1-3",
        "key": "3",
        "week": "3",
        "fileData": "LICENSE.txt",
        "ratio": "1.41428571429",
        "background": "rgb(56, 230, 236)",
        "title": "dhdasdada",
        "description": "jkhkjhl",
        "size": "11562",
        "mediaType": "txt",
        "mimeType": "text/plain"
      },
    ]
  },
```

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
