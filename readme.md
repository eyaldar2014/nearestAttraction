# after cloning the project type in the console:

- npm install

- npm run client-install


--------------------------------------------------------

basic planning ;


1. create project on github, including:
    
    react frontend side
    
    nodeJS express backend side
    
    db at mongodb, add 40 attractions


--------------------------------------------------------

2. tasks :


    1. HOME

      - front : btn get location, than unveil 2nd btn - 'find near attractions' (opens in new route)

      - back : get location from db


    2. 2nd btn operation

      - front : table of attractions sorted by distance from user + additional info (name, id, adderess, opening hours(if there is), distance from user(sorting parameter), website link)

      - back : get data from db. calculate distance from user (Haversine formula). sort after calculation (list of numbers).


    3. Attraction_Type btn

      - *not fully understood the task - UNKNOWN 
          - update : attraction_type dropdown, select type, and filter the rest from the list. dynamic

    4. Bounus (Nice To Have) : 
    
      - favorite list. each attraction to have btn that adds, or remove, to/from favorite + approval indication for the user

      - favorite btn to present and edit.

      - local storage for favorites
 

--------------------------------------------------------

Unknowns :

check with Omri :
  
  - 3; does it mean to find which attraction is most popular in the 40km radius? and afterwards this btn presents sorted list by details with those attractions and distances details?

  - 3; answer : attraction_type dropdown, select type, and filter the rest from the list. dynamic


# most important :

* eliminate UNKNOWNS - talk with Omri

* great code - readable and well functioning

* code comments and straight forward process managment

* use git(public) often and upload to heroko - keep heroku clean from bugs (production)

* focus on backend side ! basic design. detailed server. 

* submit the task through whatsapp :  Github & Heroku links. 