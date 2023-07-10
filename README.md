<h1 align="center">API Usage Guide</h1>
This guide provides instructions on how to use the API to interact with streamers data.

[Server](https://streamer-spotlight-back-v2-e53ca344e263.herokuapp.com/streamers)

<h2 align="center">Prerequisites</h2>
Before using the API, ensure that you have the following:

- Node.js installed
- MongoDB installed and running
- AWS S3 bucket credentials (access key ID, secret access key)

<h2 align="center">Getting Started</h2>
To get started with the API, follow these steps:

- Clone the repository and navigate to the project directory.
- Install dependencies by running the following command:

``` bash
npm install
```

- Create a .env file in the project root directory and configure the following environment variables:

``` bash
BUCKET_NAME=your_s3_bucket_name
BUCKET_REGION=your_s3_bucket_region
ACCESS_KEY=your_aws_access_key
SECRET_ACCESS_KEY=your_aws_secret_access_key
MONGODB_URL=your_mongodb_connection_url
```

- Start the server by running the following command:

``` bash
npm start
```

The server will start running on http://localhost:3000.

<h2>API Endpoints</h2>
The following endpoints are available in the API:

<h3>Get All Streamers</h3>
<p>Endpoint: GET /streamers</p>
<p>Description: Get a list of all streamers.</p>
<p>Parameters:</p>

    - currentPage (optional): The current page number for pagination.
    - pageLimit (optional): The maximum number of streamers per page.
    - sortBy (optional): Sort the streamers by a field (e.g., createdAt, upvotes, downvotes).
    - sortOrder (optional): Sort order for the field (asc for ascending, desc for descending).
    
<p>Response with pagination (without pagination you will get just an array of streamer objects):</p>

    - currentPage: The current page number.
    - previousPage: The previous page number (null if on the first page).
    - nextPage: The next page number (null if on the last page).
    - totalPages: The total number of pages.
    - streamers: An array of streamer objects.



<h3>Get a Streamer</h3>
<p>Endpoint: GET /streamers/:streamerId</p>
<p>Description: Get a specific streamer by ID.</p>
<p>Parameters:</p>
    - streamerId: The ID of the streamer.
<p>Response:</p>

    - name: The name of the streamer.
    - platform: The platform where the streamer streams.
    - description: The description of the streamer.
    - upvotes: The number of upvotes received by the streamer.
    - downvotes: The number of downvotes received by the streamer.
    - image: The URL of the streamer's image.
    - createdAt: The date and time the streamer was created.
    
<h3>Create a Streamer</h3>
<p>Endpoint: POST /streamers</p>
<p>Description: Create a new streamer.</p>
<p>Request Body:</p>

    - name: The name of the streamer.
    - platform: The platform where the streamer streams.
    - description: The description of the streamer.
    - image (multipart/form-data): The image file of the streamer.
    
<p>Response:</p>

    - name: The name of the created streamer.
    - platform: The platform of the created streamer.
    - description: The description of the created streamer.
    - upvotes: The number of upvotes received by the streamer (default: 0).
    - downvotes: The number of downvotes received by the streamer (default: 0).
    - image: The URL of the streamer's image.
    - createdAt: The date and time the streamer was created.
    
<h3>Vote for a Streamer</h3>
<p>Endpoint: PUT /streamers/:streamerId/vote</p>
<p>Description: Vote for a streamer.</p>
<p>Parameters:</p>
    - streamerId: The ID of the streamer.
<p>Request Body:
    - voteType: The type of vote (upvote, downvote, unvoteUpvote, unvoteDownvote).
<p>Response:</p>
  
    - name: The name of the streamer.
    - platform: The platform of the streamer.
    - description: The description of the streamer.
    - upvotes: The updated number of upvotes received by the streamer.
    - downvotes: The updated number of downvotes received by the streamer.
    - image: The URL of the streamer's image.
    - createdAt: The date and time the streamer was created.
  
<h2>Example Usage</h2>
Here is an example of how to use the API endpoints:

<h3>Get all streamers:</h3>

``` bash
GET /streamers
```


<h3>Get a specific streamer:</h3>

``` bash
GET /streamers/:streamerId
```

<h3>Create a new streamer:</h3>

``` bash
POST /streamers
```

Request Body:

``` bash
{
  "name": "Streamer Name",
  "platform": "Twitch",
  "description": "Streamer description",
  "image": (multipart/form-data)
}
```


<h3>Vote for a streamer:</h3>

``` bash
PUT /streamers/:streamerId/vote
```

Request Body:

``` bash
{
  "voteType": "upvote"
}
```

Feel free to explore and use the API endpoints based on your needs! :)
