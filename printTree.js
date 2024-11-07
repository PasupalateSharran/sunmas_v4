const fs = require('fs');
const path = require('path');

/**
 * Function to print the tree structure of a directory
 * @param {string} dir - The directory path
 * @param {string} [indent=''] - The indentation for formatting
 */
function printDirectoryTree(dir, indent = '') {
    // Read the contents of the directory
    const files = fs.readdirSync(dir);

    files.forEach((file, index) => {
        // Create a full path for each file
        const fullPath = path.join(dir, file);
        // Determine if the current file is the last one
        const isLast = index === files.length - 1;

        // Print the current file or directory name
        console.log(indent + (isLast ? '└── ' : '├── ') + file);

        // If it's a directory, recurse into it
        if (fs.statSync(fullPath).isDirectory()) {
            // Increase indentation for the next level
            printDirectoryTree(fullPath, indent + (isLast ? '    ' : '│   '));
        }
    });
}

// Call the function with the directory you want to print
const directoryPath = './'; // Change this to your target directory
printDirectoryTree(directoryPath);
