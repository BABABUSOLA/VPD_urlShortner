import { ShortUrl } from "./shortUrl.model.js";
export const createOne = async (req, res) => {
  const message = "Oops!.. Something went wrong. Please try again later.";
  try {
    
    if (
      !req.body.url 
    )
    {
      const message = `Missing parameter ${[
        "url",
      ]
        .filter((param) => !req.body.hasOwnProperty(param))
        .join(", ")}`;
      return res.status(400).json({ message });
    }
    const shorturl = await ShortUrl.create({
      full: req.body.url
  });

  if (!shorturl) {
    return res.status(400).send({ message });
  }

    res.status(200).send({ shorturl});
  } catch (error) {
    console.log(error);
    res.status(400).send({ message });
  }
};

export const getMany = async (req, res) => {
    const message = "Something went wrong. Please try again later.";
    try {
      const urlData = await ShortUrl.find()
        .lean()
        .exec();
      if (!urlData) {
        return res.status(400).send({ message });
      }
      console.log(urlData,'the url data')
      // const urls = urlData.map((urlData) => urlData._id);
      res.status(200).send({ urlData });
    } catch (error) {
      console.log(error);
      res
        .status(400)
        .send({ message: "Something went wrong. Please try again later." });
    }
  };

export const getOne = async (req, res) => {
  try {
    let shortUrl = await ShortUrl.find({ short: req.params.shortUrl })
      .exec();
    console.log(shortUrl,'the short url')
    if (!shortUrl) {
      return res.status(404).send({ message: "This Url is unavailable." });
    }
    
    shortUrl.clicks++
    shortUrl.save()

    res.redirect(shortUrl.full)

  } catch (error) {
    console.log(error);
    return res.status(400).send({ message });
  }
};
