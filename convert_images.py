#!/usr/bin/env python3
"""
Script to convert provided Ute Bison Ranch images to base64 format
and update the project data in both frontend and backend.
"""

import base64
import json
import sys
from pathlib import Path

# Base64 encoded images provided by the user
ute_bison_images_base64 = [
    # Image 1: Youth walking on bridge/walkway with mountains
    """data:image/jpeg;base64,""",
    # Image 2: Bison in their enclosure 
    """data:image/jpeg;base64,""",
    # Image 3: Youth observing bison from viewing area
    """data:image/jpeg;base64,""",
    # Image 4: Group of people walking outdoors
    """data:image/jpeg;base64,""",
    # Image 5: Friendly dog close-up
    """data:image/jpeg;base64,"""
]

def update_mock_data():
    """Update the frontend mock.js file with new base64 images."""
    mock_file = Path('/app/frontend/src/data/mock.js')
    
    if not mock_file.exists():
        print("Error: mock.js file not found")
        return False
    
    with open(mock_file, 'r') as f:
        content = f.read()
    
    # The new images array
    new_images_str = '[\n'
    for i, img in enumerate(ute_bison_images_base64):
        new_images_str += f'      "{img}",\n'
    new_images_str = new_images_str.rstrip(',\n') + '\n    ]'
    
    # Find the Ute Bison Ranch project images array and replace it
    start_marker = 'title: "Ute Bison Ranch Summer Youth Program Photography"'
    start_pos = content.find(start_marker)
    
    if start_pos == -1:
        print("Error: Ute Bison Ranch project not found in mock.js")
        return False
    
    # Find the images array for this project
    images_start = content.find('images: [', start_pos)
    if images_start == -1:
        print("Error: Images array not found for Ute Bison Ranch project")
        return False
    
    # Find the end of the images array
    bracket_count = 0
    images_end = images_start + len('images: [')
    i = images_end
    while i < len(content):
        if content[i] == '[':
            bracket_count += 1
        elif content[i] == ']':
            bracket_count -= 1
            if bracket_count == -1:
                images_end = i + 1
                break
        i += 1
    
    # Replace the images array
    new_content = content[:images_start] + f'images: {new_images_str}' + content[images_end:]
    
    with open(mock_file, 'w') as f:
        f.write(new_content)
    
    print("✅ Updated mock.js with new Ute Bison Ranch images")
    return True

if __name__ == '__main__':
    print("🖼️ Converting and updating Ute Bison Ranch project images...")
    
    if update_mock_data():
        print("✅ Image conversion and update completed successfully!")
    else:
        print("❌ Image conversion failed!")
        sys.exit(1)