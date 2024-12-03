import os

# Get all .txt files in the current directory
txt_files = [file for file in os.listdir('.') if file.endswith('.txt')]

# Process each file
for file in txt_files:
    with open(file, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        for line in lines:
            # Strip newline characters and print formatted output
            print(f'<option>{line.strip()}</option>')
