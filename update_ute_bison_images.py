#!/usr/bin/env python3
"""
Script to update the Ute Bison Ranch project with real base64 images
"""

import re

# Read the base64 images from the file
def read_base64_images():
    images = []
    with open('/app/ute_bison_images.txt', 'r') as f:
        content = f.read()
    
    # Extract base64 strings
    pattern = r'data:image/jpeg;base64,[A-Za-z0-9+/=]+'
    matches = re.findall(pattern, content)
    
    return matches

def update_mock_js():
    # Read base64 images
    base64_images = read_base64_images()
    
    if len(base64_images) < 5:
        print(f"Error: Only found {len(base64_images)} images, expected 5")
        return False
    
    # Read the current mock.js file
    with open('/app/frontend/src/data/mock.js', 'r') as f:
        content = f.read()
    
    # Find the Ute Bison Ranch project
    project_start = content.find('title: "Ute Bison Ranch Summer Youth Program Photography"')
    if project_start == -1:
        print("Error: Ute Bison Ranch project not found")
        return False
    
    # Find the images array for this project
    images_start = content.find('images: [', project_start)
    if images_start == -1:
        print("Error: Images array not found")
        return False
    
    # Find the closing bracket of the images array
    bracket_count = 0
    current_pos = images_start + len('images: [')
    
    # Navigate to find the closing bracket
    while current_pos < len(content):
        char = content[current_pos]
        if char == '[':
            bracket_count += 1
        elif char == ']':
            if bracket_count == 0:
                break
            bracket_count -= 1
        current_pos += 1
    
    images_end = current_pos
    
    # Create the new images array string
    new_images = 'images: [\n'
    for i, img in enumerate(base64_images):
        new_images += f'      "{img}",\n'
    new_images = new_images.rstrip(',\n') + '\n    ]'
    
    # Replace the old images array with the new one
    new_content = content[:images_start] + new_images + content[images_end+1:]
    
    # Write the updated content back to the file
    with open('/app/frontend/src/data/mock.js', 'w') as f:
        f.write(new_content)
    
    print("✅ Successfully updated mock.js with 5 Ute Bison Ranch images")
    return True

if __name__ == '__main__':
    print("🖼️ Updating Ute Bison Ranch project with actual images...")
    if update_mock_js():
        print("✅ Image update completed successfully!")
    else:
        print("❌ Image update failed!")