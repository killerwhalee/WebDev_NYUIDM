from PIL import Image
import random
import os
import json

def get_average_color(image_path):
    # Open the image
    image = Image.open(image_path)

    # Resize the image to a small size to speed up the calculation
    small_image = image.resize((10, 10))

    # Get pixel data
    pixels = list(small_image.getdata())

    # Calculate the average color
    avg_color = (
        sum([pixel[0] for pixel in pixels]) // len(pixels),
        sum([pixel[1] for pixel in pixels]) // len(pixels),
        sum([pixel[2] for pixel in pixels]) // len(pixels)
    )

    # DEBUGGING
    avg_color = (
        random.randint(0, 255),
        random.randint(0, 255),
        random.randint(0, 255)
    )

    return "#{:02x}{:02x}{:02x}".format(*avg_color)

image_list = []

#for image_path in os.listdir('images'):
for i in range(1000):
    image_path = "sample.jpg"

    image_data = {'title': 'Untitled', 'caption': 'Film Negative'}
    image_data["image"] = f"assets/{image_path}"
    
    average_color = get_average_color(f'{image_path}')
    print(f'Average Color: {average_color}')

    image_data["color"] = average_color
    
    image_list.append(image_data)

with open('data.json', 'w') as json_file:
    json.dump(image_list, json_file, indent=4)
