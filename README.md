<!--Start SHOW CO2 WIDGET by Pro Oxygen v15d-->
<a href="https://www.co2.earth/">
<img style="max-width:100%" title="Earth's latest data for atmospheric CO2" alt="Atmospheric CO2" src="https://assets.show.earth/widget-co2/ppm-0040.png" /></a>
<!--End CO2 Widget-->

<p title='Hectares of forests cut down or burned'
src='https://www.theworldcounts.com/embed/challenges/93?background_color=white&color=black&font_family=%22Helvetica+Neue%22%2C+Arial%2C+sans-serif&font_size=14'
style={{ border: 'none', paddingRight: '5px' }} height='100' width='300'>
</p>
           
            
# Greta Thunberg the first 100 weeks in pictures


##### THE BIGGEST SOURCE FOR GRETA THUNBERG'S FRIDAYS FOR FUTURE INFORMATION IN THE FORM OF IMAGES, MOVIES, TEXT AND ARTICLES

This is a fan website built using ReactJS and Bulma as the CSS framework. 

(we are looking for contributors to help build this site!)

[Check out the live site!](Http://greta.portplays.com/)

![Alt text](https://github.com/erikswed/Greta-100-React-Web-App/blob/master/preview-film.gif)

## Requirements 
A website for Greta Thunberg Fridays For Future and for Greta's different engagements, such as award ceremonies, nominations, events and personal happenings. Practically everything about her journey. Greta Thunberg's concept is to every Friday make a protest, either outside or indoors, to let the world know about the climate and ecological crisis. One particularly important thing is the "weeks". Greta is now as-of writing on her 106'th week of protesting. By highlighting the "week" as a central organizer /, Fridays For Future have created their own time calendar era with the start at week ONE on Monday August 2018.

![Alt text](https://github.com/erikswed/Greta-100-React-Web-App/blob/master/weeks1.png)



##### A website portraying this must contain following:
- Images, text, films and other files related to protests must be organized under "weeks".  End users view a "week" and see only related material for that particular "week".
 - Must show the climate and ecological crisis protest both in images, text, films and articles.
- All material Images, text, films and other files must be tagged and have a description.
- Searching for material must be straightforward using tags or keywords. 
- End users must be able to edit/add description to any material simply by selecting it and "edit".
- End users must be able to upload new material (version 2.0).
- links to FFF and to Gretas Twitter, Facebook must exist. 

##### ***THIS ABOVE LIST IS IN A DRAFT STATE..****

## Design
A one page website with menus only for mobiles.

##  Development
This is a ReactJs project.    
Considering the requirements and on-going iteration discussions, feel free to contribute with Pull requests. 

#### How it works: 

The app metadata is loaded from a json at ´public/resume.json´. By using an external json it becomes flexible since the app state can be changed without building the app again. The json data can easily be inserted on a remote backen later on running some flavor of NOSQL.

This is the main json down below you see the json for albums
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
        "fileData": "0_sJ1A5jGwSm66KCdV.png",
        "ratio": "0.7482859941234085",
        "background": "rgb(56, 230, 236)",
        "title": "dhdasdada",
        "description": "jkhkjhl",
        "size": "1591511"
      },
      {
        "id": "week-1-2",
        "key": "2",
        "week": "1",
        "fileData": "4olpqsvfte5rubn47j936z7c5vn9lff.jpeg",
        "ratio": "0.6677181913774973",
        "background": "rgb(56, 230, 236)",
        "title": "dhdasdada",
        "description": "jkhkjhl",
        "size": "84427"
      },
      {
        "id": "week-1-3",
        "key": "3",
        "week": "1",
        "fileData": "9tlnx2sudu05jqxwij2evyvaifkrvbc.jpeg",
        "ratio": "0.7497371188222923",
        "background": "rgb(56, 230, 236)",
        "title": "dhdasdada",
        "description": "jkhkjhl",
        "size": "115603"
      },
      {
        "id": "week-1-4",
        "key": "4",
        "week": "1",
        "fileData": "116713220_10223391513399025_3767860584776395314_n.jpg",
        "ratio": "1.3333333333333333",
        "background": "rgb(56, 230, 236)",
        "title": "dhdasdada",
        "description": "jkhkjhl",
        "size": "76472"
      },
      {
        "id": "week-1-5",
        "key": "5",
        "week": "1",
        "fileData": "bte3eukll19t7635ly2rjgbpu1cliae.jpeg",
        "ratio": "1.4124137931034482",
        "background": "rgb(56, 230, 236)",
        "title": "dhdasdada",
        "description": "jkhkjhl",
        "size": "156824"
      },
      {
        "id": "week-1-6",
        "key": "6",
        "week": "1",
        "fileData": "c33752c4-1bc3-42d6-b288-54f9cb226ba0.jpg",
        "ratio": "0.6654545454545454",
        "background": "rgb(56, 230, 236)",
        "title": "dhdasdada",
        "description": "jkhkjhl",
        "size": "99653"
      },
      {
        "id": "week-1-7",
        "key": "7",
        "week": "1",
        "fileData": "DlGoaxCX0AEcrEN.jpg",
        "ratio": "1.0",
        "background": "rgb(56, 230, 236)",
        "title": "dhdasdada",
        "description": "jkhkjhl",
        "size": "158286"
      },
      {
        "id": "week-1-8",
        "key": "8",
        "week": "1",
        "fileData": "DlGoaxEX0AAjY-7.jpg",
        "ratio": "0.75",
        "background": "rgb(56, 230, 236)",
        "title": "dhdasdada",
        "description": "jkhkjhl",
        "size": "152837"
      },
      {
        "id": "week-1-9",
        "key": "9",
        "week": "1",
        "fileData": "h14-greta-thunberg-eu-leaders-climate-change.jpg",
        "ratio": "0.5625",
        "background": "rgb(56, 230, 236)",
        "title": "dhdasdada",
        "description": "jkhkjhl",
        "size": "56767"
      },
      {
        "id": "week-1-10",
        "key": "10",
        "week": "1",
        "fileData": "week1SimonRehnstrom.png",
        "ratio": "0.5333333333333333",
        "background": "rgb(56, 230, 236)",
        "title": "dhdasdada",
        "description": "jkhkjhl",
        "size": "2839881"
      }
    ]
  },
  {
    "id": "week-2",
    "weekNumber": "2",
    "coverImage": "coverImage.jpg",
    "media": [
      {
        "id": "week-2-1",
        "key": "1",
        "week": "2",
        "fileData": "1.jpg",
        "ratio": "1.3333333333333333",
        "background": "rgb(56, 230, 236)",
        "title": "dhdasdada",
        "description": "jkhkjhl",
        "size": "935670"
      },
      {
        "id": "week-2-2",
        "key": "2",
        "week": "2",
        "fileData": "1_vtY9uCjeKSa1jIXm504jlg.jpeg.jpg",
        "ratio": "0.75",
        "background": "rgb(56, 230, 236)",
        "title": "dhdasdada",
        "description": "jkhkjhl",
        "size": "2943656"
      },
      {
        "id": "week-2-3",
        "key": "3",
        "week": "2",
        "fileData": "2.jpg",
        "ratio": "0.75",
        "background": "rgb(56, 230, 236)",
        "title": "dhdasdada",
        "description": "jkhkjhl",
        "size": "505009"
      },
      {
        "id": "week-2-4",
        "key": "4",
        "week": "2",
        "fileData": "3.png",
        "ratio": "0.8100208768267223",
        "background": "rgb(56, 230, 236)",
        "title": "dhdasdada",
        "description": "jkhkjhl",
        "size": "1299525"
      },
      {
        "id": "week-2-5",
        "key": "5",
        "week": "2",
        "fileData": "4.jpg",
        "ratio": "1.3333333333333333",
        "background": "rgb(56, 230, 236)",
        "title": "dhdasdada",
        "description": "jkhkjhl",
        "size": "84173"
      },
      {
        "id": "week-2-6",
        "key": "6",
        "week": "2",
        "fileData": "5-20-August-2018.jpg",
        "ratio": "1.3",
        "background": "rgb(56, 230, 236)",
        "title": "dhdasdada",
        "description": "jkhkjhl",
        "size": "191617"
      },
      {
        "id": "week-2-7",
        "key": "7",
        "week": "2",
        "fileData": "6.jpg",
        "ratio": "0.7708333333333334",
        "background": "rgb(56, 230, 236)",
        "title": "dhdasdada",
        "description": "jkhkjhl",
        "size": "77595"
      },
      {
        "id": "week-2-8",
        "key": "8",
        "week": "2",
        "fileData": "7.jpg",
        "ratio": "0.68",
        "background": "rgb(56, 230, 236)",
        "title": "dhdasdada",
        "description": "jkhkjhl",
        "size": "121155"
      },
      {
        "id": "week-2-9",
        "key": "9",
        "week": "2",
        "fileData": "8.jpg",
        "ratio": "0.6848591549295775",
        "background": "rgb(56, 230, 236)",
        "title": "dhdasdada",
        "description": "jkhkjhl",
        "size": "228293"
      },
      {
        "id": "week-2-10",
        "key": "10",
        "week": "2",
        "fileData": "116055257_10223391553080017_9108849133976520567_n.jpg",
        "ratio": "0.7489583333333333",
        "background": "rgb(56, 230, 236)",
        "title": "dhdasdada",
        "description": "jkhkjhl",
        "size": "103979"
      },
      {
        "id": "week-2-11",
        "key": "11",
        "week": "2",
        "fileData": "116713220_10223391513399025_3767860584776395314_n.jpg",
        "ratio": "1.3333333333333333",
        "background": "rgb(56, 230, 236)",
        "title": "dhdasdada",
        "description": "jkhkjhl",
        "size": "76472"
      },
      {
        "id": "week-2-12",
        "key": "12",
        "week": "2",
        "fileData": "116907529_10223391553480027_6253077748365461515_n.jpg",
        "ratio": "0.75",
        "background": "rgb(56, 230, 236)",
        "title": "dhdasdada",
        "description": "jkhkjhl",
        "size": "95594"
      },
      {
        "id": "week-2-13",
        "key": "13",
        "week": "2",
        "fileData": "original.jpg",
        "ratio": "0.56181818181",
        "background": "rgb(56, 230, 236)",
        "title": "dhdasdada",
        "description": "jkhkjhl",
        "size": "811768"
      },
      {
        "id": "week-2-14",
        "key": "14",
        "week": "2",
        "fileData": "originfalcopy.jpg",
        "ratio": "1.1378947368421053",
        "background": "rgb(56, 230, 236)",
        "title": "dhdasdada",
        "description": "jkhkjhl",
        "size": "159969"
      },
      {
        "id": "week-2-15",
        "key": "15",
        "week": "2",
        "fileData": "thunbergafp.jpg",
        "ratio": "0.5",
        "background": "rgb(56, 230, 236)",
        "title": "dhdasdada",
        "description": "jkhkjhl",
        "size": "119188"
      }
  
    ]
  },
```
# Current version:  0.1.5

## Change log
##### App Version: 1.0.5 - 04/05/2016App Version: 0.1.4 Build: 1598170287004 Date: (23.08.2020 10:11:27)
Changes:
- Added component ShowBuildAndVersion to show app Version.
- Fixed when clicking the same album the TimelineViewer disappears.

##### App Version: 0.1.5 Build: 1598179258474 Date: (23.08.2020 12:40:58)
Changes:
 - Just added the text "(we seek dev help if you're a Reactjs wizard please join)." in the Resume.json

##### App Version: 0.1.6 (UPCOMING) - BRANSH feature-add-redux merged with master ok)
CHANGES:
- Fixed: on mobile screen menu text too long pushed screen out.
- Fixed: Images with space in their names did not render in img added encodeURIComponent()
- System: Introduced React-Redux. 
- Moved out all json files metadata into public folder as a prep for a new backend later



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

You can also test the app with a development server, just run:

```console
> npm start
```

## Contributing

Feel free to fork this project and help out

## License

MIT
