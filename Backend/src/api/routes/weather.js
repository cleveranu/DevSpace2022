// to do
const { join } = require("path");
const router = require("express").Router();
const { getWeather, getforecast, isCropAbleToGrow } = require(join(__dirname, "..", "functions", "weather"));
const Details = require(join(__dirname, "..", "models", "Details"));

router.get("/", async (req, res) => {
  const { city } = req.body;
  if (!city) return res.status(400).json({ message: "City is required" });  
  try {
    // need to parse the response
    // add checks 
    const data = await getWeather(city);
    if (!data) return res.status(400).json({ message: "City not found" });
    const response = {
      city: data.location.name,
      country: data.location.country,
      temperature: data.current.temp_c,
      region: data.location.region,
      condition: data.current.condition.text
    };
    return res.status(200).json({ response });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

router.get("/upcoming", async (req, res) => {
  const {days, city} = req.body;
  if (!city) return res.status(400).json({ message: "City is required" });
  if (!days) return res.status(400).json({ message: "Days is required" });
  try {
    const data = await getforecast(city, days);
    if (!data) return res.status(400).json({ message: "City or Crop not found" });
    return res.status(200).json({ data });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

router.get("/status", async (req, res) => {
  let crop = req.body.crop;
  const { city } = req.body;
  if (!crop) crop = "paddy";
  if (!city) return res.status(400).json({ message: "City is required" });
  try {
    const data = await isCropAbleToGrow(crop, city);
    if (!data) return res.status(400).json({ message: "Crop in DataBase not found, Please ask admin to update database" });
    return res.status(200).json({ data });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

// router.post("/add", async (req, res) => {
//   const { crop, maxTemp, minTemp, avgTemp, avghumidity, maxwind, howOld, estimatedTime } = req.body;
//   if (!crop) return res.status(400).json({ message: "Crop is required" });
//   if (!maxTemp) return res.status(400).json({ message: "Max Temp is required" });
//   if (!minTemp) return res.status(400).json({ message: "Min Temp is required" });
//   if (!avgTemp) return res.status(400).json({ message: "Avg Temp is required" });
//   if (!avghumidity) return res.status(400).json({ message: "Avg Humidity is required" });
//   if (!maxwind) return res.status(400).json({ message: "Max Wind is required" });
//   try {
//     const data = await Details.create({
//       crop,
//       maxTemp,
//       minTemp,
//       avgTemp,
//       avghumidity,
//       maxwind,
//       howOld,
//       estimatedTime
//     });
//     await data.save().then(() => {
//       return res.status(200).json({ message: "Details added successfully" });
//     })
//       .catch(err => {
//         console.log(err);
//         return res.status(500).json({ message: "Something went wrong" });
//       }
//       );
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ message: "Something went wrong" });
//   }
// });

module.exports = router;
