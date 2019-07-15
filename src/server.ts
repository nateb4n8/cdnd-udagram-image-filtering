import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

import {filterImageFromURL, deleteLocalFiles} from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // QUERY PARAMATERS
  //   image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]
  app.get('/filteredimage', async (req: Request, res: Response) => {
    const { image_url } = req.query;
    //  validate the image_url query
    if (typeof image_url !== 'string') res.status(400).send('valid image_url is required');

    // TODO call filterImageFromURL(image_url) to filter the image
    // TODO send the resulting file in the response
    // TODO deletes any files on the server on finish of the response
    
    res.send(`you sent ${image_url}`);
  })
  // endpoint to filter an image from a public url.

  /**************************************************************************** */

  //! END @TODO1
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    console.log('root hit');
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();