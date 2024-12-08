import os

# Get all .txt files in the current directory
kingdom_files = [f for f in os.listdir('.') if f.endswith('.txt')]

# Print each filename (without extension) as an <option> tag
for kingdom_file in kingdom_files:
    kingdom_name = os.path.splitext(kingdom_file)[0]  # Remove the .txt extension
    print(f'<option>{kingdom_name}</option>')
