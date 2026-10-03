const { stringify } = require('querystring');
const client = require('../config/openaiConfig');
const fs = require('fs');

const generateAnswer = async (req, res) => {

  function encodeImage(filePath) {
  return fs.readFileSync(filePath, "base64");
}
  //Sets up the Variables to pass the AI the Message
  let currentPath = "a";

  let system = "a " + req.body.system + " shower system ";
  currentPath = req.body.systemImg;
  let systemImg = encodeImage(currentPath);

  let glass = "with " + req.body.glass + " glass, ";
  currentPath = req.body.glassImg;
  let glassImg = encodeImage(currentPath);

  let handle = "a " + req.body.handle + " handle based on the 2nd image, ";
  currentPath = req.body.handleImg;
  let handleImg = encodeImage(currentPath);

  let hinge = "a " + req.body.hinge + " door hinge design based on the 3rd image, ";
  currentPath = req.body.hingeImg;
  let hingeImg = encodeImage(currentPath);

  let bracket = "a " + req.body.bracket + " clamp and bracket design based on the 4th image, ";
  currentPath = req.body.bracketImg;
  let bracketImg = encodeImage(currentPath);

  let finish = "and the hardware with a " + req.body.finish + " finish based on the 5th image.";
  currentPath = req.body.hardwareFinishImg;
  let finishImg = encodeImage(currentPath);

  let prompt = "Default";

  //Adjust if it is a sliding door to remove Door Hinge
  if(req.body.system == "Sliding")
  {
      prompt = "Edit the 1st image to use " + system + glass + handle + hinge + bracket + finish + " Remove any bottles in the shower enclosure. Do not add any new hardware not requested.";
  }
  else {

      prompt = "Edit the 1st image to use " + system + glass + handle + bracket + finish + " Remove any bottles in the shower enclosure. Do not add any new hardware not requested.";
  }


  let image = req.body.image;

  let base64Image1 = image;
  let imageIndex = req.body.imageIndex;

  console.log(prompt);

  //Message Sent off to the AI - FOR NOW not sending system and glass Image as it confuses the AI
  let response = await client.responses.create({
    model: "gpt-5.6-luna",
    input: [
      {
        role: "user",
        content: [
          { type: "input_text", text: prompt},
          {
            type: "input_image",
            image_url: `data:image/png;base64,${base64Image1}`,
            detail: "auto",
          },
          // {
          //   type: "input_image",
          //   image_url: `data:image/png;base64,${systemImg}`,
          //   detail: "auto",
          // },
          // {
          //   type: "input_image",
          //   image_url: `data:image/png;base64,${glassImg}`,
          //   detail: "auto",
          // },
          {
            type: "input_image",
            image_url: `data:image/png;base64,${handleImg}`,
            detail: "auto",
          },
          {
            type: "input_image",
            image_url: `data:image/png;base64,${hingeImg}`,
            detail: "auto",
          },
          {
            type: "input_image",
            image_url: `data:image/png;base64,${bracketImg}`,
            detail: "auto",
          },
          {
            type: "input_image",
            image_url: `data:image/png;base64,${finishImg}`,
            detail: "auto",
          },
        ],
      },
    ],
    tools: [{ type: "image_generation", action: "edit", quality: "low" }],
  });

  //Parse AI response
  let imageData = response.output
    .filter((output) => output.type === "image_generation_call")
    .map((output) => output.result);

  //Send back Finished Image and data to Server
  if (imageData.length > 0) {

    let imageBase64 = imageData[0];
    fs.writeFileSync("public/FinishedExample" + imageIndex + ".png", Buffer.from(imageBase64, "base64"))
    res.json({
      imgPath: "/FinishedExample" + imageIndex + ".png"
    })

  } else {
    console.log(response.output_text);
  }
}
  
module.exports = { generateAnswer }