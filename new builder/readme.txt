Using ContentBuilder.js in React

---------------------------------------

Setup React Project

1) Extract the react-contentbuilder.zip file and start the installation

    > cd react-contentbuilder
    > npm install

2) To start:

    Run NodeJs server for image upload handling (Optional, but needed for this example)

    > node server.js

    And start the project:

    > npm start


---------------------------------------

Image File Upload using NodeJs

Image file upload is not part of ContentBuilder functionality.
It is optional and in this sample project, we will use NodeJS to perform this task.
With this functionality you can upload local images for embedding into your content.

To start, go to vue-contentbuilder folder and run:

    > node server.js

Note:
    - Image files will be uploaded in public/uploads/ folder.

    - Upload handler configuration can be found in:

        src/containers/Edit.js

        <BuilderControl 
            ...
            base64Handler={"/upload"}
            largerImageHandler={"/upload"} /> 

    - The upload handler implementation in NodeJS can be found in:

        server.js

      The handler is using Express and running on port 8001.


    - To make port 8001 accessible from the react project (making it "same domain"),
      this line is added in package.json:

        "proxy": "http://localhost:8001"
       
    - When embedding/uploading an image, React dev server may get refreshed caused by file addition in public/uploads/ folder.
      You can update this config file to prevent the refresh: 

      node_modules/react-scripts/config/webpackDevServer.config.js

      Find watchOptions parameter and update with this value:
        
        watchOptions: {
            ignored: /public/
        },

---------------------------------------


