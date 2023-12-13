# Final Project Documentation
## Intro to Web Development @NYU-IDM

***

### Overview

[Go to Website](https://killerwhalee.github.io/WebDev_NYUIDM/Assignment8/assignment8.html)

**Grid of Negatives**

Project *Grid of Negatives* is the gallery website for my film photographs. Instead of showing full image thumbnails on the main page, the website displays their *dominant color* to reduce page size. Additionally, users can sort images by their color.

**How I Implemented**

- HTML: I employed plain HTML for the main structure.
- CSS: For styling, CSS was utilized on each page.
- JavaScript: I implemented the main gallery page mechanism using JavaScript.

***

### Code Documentation

**Structure of Project**

- Root folder
  - assets folder
    - images folder
    - image data json
    - json generating python code
  - html files (2 pages)
  - css files (1 general, 2 customized)
  - javascript files (1 general, 1 customized)

Assets folder have only image data. All html/css/js files are in the same depth in root folder. This is because there are only two pages in this final project.

**Page Description**

1. Home(Gallery)
    This is the main page of the website. It shows every tile of image that site have at the point, and user can select filter, which is represented with the sentence: *I want to see the picture of _____*
2. About
    This page describes what the site is about, and the information of the author(it's me!).

**How Tiles are Generated**

Currently, there are about 400 images available on the page. Calling every image data and analyzing them using the `<canvas>` tag with JavaScript could require a significant amount of internet traffic. To address this issue, I have introduced a JSON file that contains metadata for each image. The structure of the JSON file is as follows:

```
[
    {
        "title": "Untitled",
        "caption": "Film Negative",
        "image": "assets/images/0.jpg",
        "color": "#a2a2a2"
    },
    ...
    {
        "title": "Untitled",
        "caption": "Film Negative",
        "image": "assets/images/000003 (2).JPG",
        "color": "#618252"
    }
]
```

To generate the JSON file from a collection of images, I utilized Python for ease of implementation. The process involves opening each image, blending all colors to calculate the average color in the photograph.

Following this preprocessing step, the JavaScript code is prepared to generate elements for each photograph.

I used *modal* display for photograph, which allows to pop up when you clicked a corresponding tile. From each element in JSON file, JavaScript creates a pair of tile and modal element.

```
fetch('assets/data.json')
.then(response => response.json())
.then(data => {
    ...
    data.forEach((element, index) => {
        // Create a new div for each element
        const newTile = document.createElement('button');
        newTile.setAttribute('class', 'tile');
        ...
        
        const newImage = document.createElement('div');
        newImage.setAttribute('id', `image-${index}`);
        newImage.setAttribute('class', 'modal');
        newImage.innerHTML = `
        <div class="modal-content">
        ...
        `
        
        // Append the new div to the target div
        document.getElementById('tile-container').appendChild(newTile);
        document.getElementById('tile-container').appendChild(newImage);
    });
});
```

Since each tile and modal has same number of id, so we can easliy connect modal with corresponding tile. This feature is achieved by using `addEventListener()`

**How Filter Works**

Each tile contains its color data in the `background-color`. The filter examines the color of each tile and displays only those tiles that match the specified filter.

Initially, the color, provided as a string of RGB values such as `rgb(32, 23, 100)`, is converted into a data structure. Subsequently, different operations are applied based on the type of filter in use.

1. Color / Black and White
    To determine whether a picture is in color or not, a function named `calculateColorSaturation()` is used. This function converts the RGB color into HSL and returns the S (saturation) value.

    If the saturation is over 0.05, the image is identified as being in color.

    If the saturation is under 0.05, the image is identified as monochrome or black and white.
2. Any other filters
    For other filters, each filter is defined by two values - `targetColor` and `preciseness`. 

   - `targetColor` represents the color that the filter is aiming to find.
     
   - JavaScript calculates the *distance* between the color of the tile and the `targetColor`. This distance is the Cartesian distance between the two colors.

   - `preciseness` is the maximum allowed distance for the filter. For instance, if `preciseness = 100`, the filter will search for images with a color distance of 100 or smaller from its specified `targetColor`.

***

## Further Plans

**Add Backend**

I focused primarily on enhancing the user experience and creating an environment for users to fully enjoy my photographs. Due to these considerations, the current page is front-end only. I plan to develop the backend using Django to further enhance the functionality and provide a more robust user experience.

**Make Page Public?**

It is indeed true that 400 photographs may not provide the full visual impact desired. Recognizing the need for a more extensive collection, I have identified that having over 1000 photographs could significantly enhance the visual appeal. However, obtaining such a large number of pictures, especially for film photography, can be challenging. To address this, I am considering seeking help from the public to contribute to the site's growth.

To facilitate this collaborative effort, I plan to implement a login/register system and member management system. This will allow users not only to view their own gallery collection but also to explore a collective wall showcasing everyone's precious photography. This collaborative approach will contribute to the expansion and enrichment of the site's content.

**Custom Filter**

As mentioned earlier, each filter, except for the built-in color/bw filters, is characterized by a `targetColor` and `preciseness` value. This flexibility allows users to freely choose their target color and preciseness according to their preferences. Consequently, users can create nearly infinite custom filters tailored to their specific criteria and visual preferences. This feature enhances the adaptability and customization options for users exploring the gallery.