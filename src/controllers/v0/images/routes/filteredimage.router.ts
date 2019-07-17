import { Router, Request, Response } from 'express';
import multer from 'multer';

import { filterImageFromURL, deleteLocalFiles } from '../../../../util/util';


const upload = multer({ dest: `${process.cwd()}/util/tmp/` });

const router: Router = Router();

// GET /filteredimage?image_url={{URL}}
  // QUERY PARAMATERS
  //   image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]
router.get('', async (req: Request, res: Response) => {
    const { image_url } = req.query;
    if (typeof image_url !== 'string') res.status(400).send('valid image_url is required');
    
    let filteredImage = '';
    try {
        filteredImage = await filterImageFromURL(image_url);
    } catch {
        return res.status(422).send('Unable to filter image, ensure an image URL was provided');
    }

    res.sendFile(filteredImage, () => {
        deleteLocalFiles([filteredImage]);
    });
});

router.post('', upload.single('image'), async (req: Request, res: Response) => {
    const { file: { path } } = req;
    if (typeof path !== 'string') res.status(400).send('an image is required');

    let filteredImage = '';
    try {
        filteredImage = await filterImageFromURL(path);
    } catch {
        return res.status(422).send('Unable to filter image, ensure a valid image was provided');
    }

    res.sendFile(filteredImage, () => {
        deleteLocalFiles([filteredImage, path]);
    });
})


export const FilteredImageRouter: Router = router;