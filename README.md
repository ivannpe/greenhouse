# The Greenhouse 

## Overview

Studies show that having plants in your home can boost productivity, improve concentration, reduce stress levels and improve your mood. Having a place to keep track of the plants in your home, when to water them, how much light they need, and find new plants to add your collection, could help you keep your plants alive, and be a great source of relief. That's where The Greenhouse comes in.  

The Greenhouse is a web app that serves as a plant manager, allowing users to add the plants of their home to get information on when to water them, how much to water them, and how much light they need, and search for other plants for their home. The Greenhouse would be an all-in-one place for plant care, with a space to view your plants, a toolkit to help take care of them, and a place to explore and find new plants to add to your plant family.


## Data Model


The application will store Plants and Plant Details

* each plant can have multiple informative details (by embedding)


An Example Plant with Embedded Details:

```javascript
const Plant = new mongoose.Schema({
  name: {type: String, required: true},
  nickname: {type: String, required: false},
  image_url: {type: String, required: false},
  space: {type: String, required: false},
  waterFreq: {type: String, required: false},
  light: {type: String, required: false}
});
```


## Wireframes

/home - page for site information and features

![home](documentation/home.png)

/myplants - page to view all plants

![myplants](documentation/myplants.png)

/toolkit- page for tool kit to help take care of plants

![tool kit](documentation/toolkit.png)  

/search- page to search for new plants

![search](documentation/search.png)

## Site map


![sitemap](documentation/sitemap.png)

## User Stories or Use Cases


1. as a user, I can add a plant
2. as a user, I can view all of the plants I have added
3. as a user, I can search in the toolkit to learn more about how to take care of my plants  



## Annotations / References Used

1. [Trefly API Documentation](https://docs.trefle.io/)  
