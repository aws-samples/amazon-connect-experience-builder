#!/bin/bash

# Create deployment directory if it doesn't exist
mkdir -p ../deployment

# Navigate to the lambda directory
cd lambdas

# For each directory in the lambda folder
for dir in */; do
    # Remove trailing slash from directory name
    dirname=${dir%/}
    
    echo "Processing $dirname..."
    
    # Navigate into the directory
    cd "$dirname"
    
    # Create zip file with same name as directory
    zip -r "../$dirname.zip" ./*
    
    # Copy the zip file to the deployment folder
    cp "../$dirname.zip" "../../deployment/"
    
    # Remove the original zip file
    rm "../$dirname.zip"
    
    # Go back to lambda directory
    cd ..
    
    echo "Created and copied $dirname.zip to deployment folder"
done

echo "All folders have been zipped and copied to deployment folder!"
