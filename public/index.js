//Main Containers and Forms
const mainContainer = document.querySelector('.container');
const imageForm = document.querySelector('.image-form');
const variationForm = document.querySelector('.variation-form');

//Variables for Hiding Door Hinge on Sliding Selection
const systemSelection = document.getElementById('systemType');
const doorHingeSelection = document.getElementById('doorHinge');
const doorHingeSelectionText = document.getElementById('doorHingeText');

//Variables for Image Swaping
const systemTypeImg = document.getElementById('systemTypeImg');
const glassTypeImg = document.getElementById('glassTypeImg');
const pullHandleImg = document.getElementById('pullHandleImg');
const doorHingeImg = document.getElementById('doorHingeImg');
const bracketTypeImg = document.getElementById('bracketTypeImg');
const hardwareFinishImg = document.getElementById('hardwareFinishImg');

//Variables for file Input and Uploading Images from the AI
const fileInput = document.getElementById('imageInput');
const thumbnail0 = document.getElementById('thumbnail0');
let currentImageIndex = 0;

//Variable List for all the selectable Options and their coresponding selection
const systemsList = ["Pivot", "Frameless", "Sliding", "Alcove", "Enclosure"];
const glassList = ["Clear", "Bronze", "Frosted", "Grey", "Hammered", "HD", "Low Iron", "Rain", "Tinted"];
const handleList = ["O-Style", "I-Style", "C-Style", "U-Style"];
const hingeList = ["Trento", "Zero", "Lugano", "Como", "Bellagio", "Vienna", "Geneva", "Junior Geneva", "Cologne", "Prima", "Senior Prima", "Junior Prima", "Pinnacle", "Cardiff", "Victoria", "Vernon", "Plymouth", "Zurich", "Regal", "Palermo", "Melbourne", "Petite", "Concord", "Madrid", "Ultimate", "Roman", "Grande", "Sydney", "Atlas", "Light Duty"];
const bracketList = ["Zero", "Center Mount", "Offset / Face Mount", "Glass to Glass", "Sleeve Over", "Operable Transom", "Glass Shelf", "Wall Mount"];
const finishList = ["Polished Chrome", "Brushed Chrome", "Matte Black", "Polished Stainless Steel", "Brushed Stainless Steel", "Brushed Nickel", "Polished Nickel", "Satin Nickel", "Gunmetal", "Matte Gunmetal", "Oil Rubbed Bronze", "Polished Brass", "Satin Brass", "Vintage Brass", "Brushed Bronze", "Dark Brushed Bronze", "French Gold", "Modern Gold", "Rose Gold", "Unlacquered Brass"];


//-----------------------------------
//Function:
//Takes in the file input and converts it to base64 to give to the AI
//
//-----------------------------------
const fileToBase64 = async (file) => {

  let arrayBuffer = await file.arrayBuffer();
  let uint8Array = new Uint8Array(arrayBuffer);
  let binary = '';

  for (let i = 0; i < uint8Array.length; i++) {
    binary += String.fromCharCode(uint8Array[i]);
  }

  return btoa(binary);
};


//-----------------------------------
//Function:
//Adds a listener to the main form submit button to take in the information from all the selects and send them off to the AI
//
//-----------------------------------
imageForm.addEventListener('submit', async (e) => {

  e.preventDefault();

  let systemSubmission = "public/UI/Pictures/Systems/" + imageForm.systemType.value + ".jpg";
  let glassSubmission = "public/UI/Pictures/Glass/" + imageForm.glassType.value + ".png";
  let handleSubmission = "public/UI/Pictures/Pull Handles/" + imageForm.pullHandle.value + ".jpg";
  let doorHingeSubmission = "public/UI/Pictures/Door Hinges/" + imageForm.doorHinge.value + ".jpg";
  let bracketSubmission = "public/UI/Pictures/Brackets/" + imageForm.bracketType.value + ".jpg";
  let finishSubmission = "public/UI/Pictures/Finishes/" + imageForm.hardwareFinish.value + ".png";

  submitInformation(fileInput, imageForm, systemSubmission, glassSubmission, handleSubmission, doorHingeSubmission, bracketSubmission, finishSubmission);
});


//-----------------------------------
//Function:
//Creates a variation form as well adds the appropriate listeners to each part of the respective form
//
//-----------------------------------
variationForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  //----------Create Beginning of the Form------------
  let myBR = document.createElement("br");
  mainContainer.appendChild(myBR); 

  let myForm = document.createElement("form");
  myForm.classList = "image-form";
  mainContainer.appendChild(myForm); 
  

  let myH2 = document.createElement("h2");
  myH2.textContent = "What would you like to edit about the image?";
  myForm.appendChild(myH2); 

  let myBR2 = document.createElement("br");
  mainContainer.appendChild(myBR2); 
  //--------------------------------------------------------

  //----------Create System Selection------------
  let doorH3 = document.createElement("h3");
  doorH3.textContent = "Door System Type:";
  myForm.appendChild(doorH3);

  let systemContainer= document.createElement("div")
  systemContainer.classList = "select-Container";
  myForm.appendChild(systemContainer);

  let systemSelect = document.createElement("select");
  systemSelect.name = "systemType";
  systemSelect.id = "systemType";
  systemContainer.appendChild(systemSelect);

  for (i = 0; i < systemsList.length; i++) {

    let option = document.createElement("option");
    option.value = systemsList[i];
    option.textContent = systemsList[i];
    systemSelect.appendChild(option); 
  }

  let systemSelectImg = document.createElement("img");
  systemSelectImg.src = "UI/Pictures/Systems/Pivot.jpg";
  systemSelectImg.id = "systemTypeImg";
  systemSelectImg.classList = "selection-Image";
  systemContainer.appendChild(systemSelectImg);
  //---------------------------------------------

  //----------Create Glass Selection------------
  let glassH3 = document.createElement("h3");
  glassH3.textContent = "Type of Glass:";
  myForm.appendChild(glassH3);

  let glassContainer= document.createElement("div")
  glassContainer.classList = "select-Container";
  myForm.appendChild(glassContainer);

  let glassSelect = document.createElement("select");
  glassSelect.name = "glassType";
  glassSelect.id = "glassType";
  glassContainer.appendChild(glassSelect); 

  for (i = 0; i < glassList.length; i++) {

    let option = document.createElement("option");
    option.value = glassList[i];
    option.textContent = glassList[i];
    glassSelect.appendChild(option); 
  }

  let glassSelectImg = document.createElement("img");
  glassSelectImg.src = "UI/Pictures/Glass/Clear.png";
  glassSelectImg.id = "glassTypeImg";
  glassSelectImg.classList = "selection-Image";
  glassContainer.appendChild(glassSelectImg);
  //---------------------------------------------

  //----------Create Handle Selection------------
  let handleH3 = document.createElement("h3");
  handleH3.textContent = "Pull Handle Type:";
  myForm.appendChild(handleH3);

  let handleContainer= document.createElement("div")
  handleContainer.classList = "select-Container";
  myForm.appendChild(handleContainer);

  let handleSelect = document.createElement("select");
  handleSelect.name = "pullHandle";
  handleSelect.id = "pullHandle";
  handleContainer.appendChild(handleSelect); 

  for (i = 0; i < handleList.length; i++) {

    let option = document.createElement("option");
    option.value = handleList[i];
    option.textContent = handleList[i];
    handleSelect.appendChild(option); 
  }

  let handleSelectImg = document.createElement("img");
  handleSelectImg.src = "UI/Pictures/Pull Handles/O-Style.jpg";
  handleSelectImg.id = "pullHandleImg";
  handleSelectImg.classList = "selection-Image";
  handleContainer.appendChild(handleSelectImg);
  //---------------------------------------------

  //----------Create Door Hinge Selection------------
  let hingeH3 = document.createElement("h3");
  hingeH3.textContent = "Door Hinge Type:";
  myForm.appendChild(hingeH3);

  let hingeContainer= document.createElement("div")
  hingeContainer.classList = "select-Container";
  myForm.appendChild(hingeContainer);

  let hingeSelect = document.createElement("select");
  hingeSelect.name = "doorHinge";
  hingeSelect.id = "doorHinge";
  hingeContainer.appendChild(hingeSelect); 

  for (i = 0; i < hingeList.length; i++) {

    let option = document.createElement("option");
    option.value = hingeList[i];
    option.textContent = hingeList[i];
    hingeSelect.appendChild(option); 
  }

  let doorHingeSelectImg = document.createElement("img");
  doorHingeSelectImg.src = "UI/Pictures/Door Hinges/Trento.jpg";
  doorHingeSelectImg.id = "doorHingeImg";
  doorHingeSelectImg.classList = "selection-Image";
  hingeContainer.appendChild(doorHingeSelectImg);
  //---------------------------------------------

  //----------Create Bracket Selection------------
  let bracketH3 = document.createElement("h3");
  bracketH3.textContent = "Clamps and Brackets Type:";
  myForm.appendChild(bracketH3);

  let bracketContainer= document.createElement("div")
  bracketContainer.classList = "select-Container";
  myForm.appendChild(bracketContainer);

  let bracketSelect = document.createElement("select");
  bracketSelect.name = "bracketType";
  bracketSelect.id = "bracketType";
  bracketContainer.appendChild(bracketSelect); 

  for (i = 0; i < bracketList.length; i++) {

    let option = document.createElement("option");
    option.value = bracketList[i];
    option.textContent = bracketList[i];
    bracketSelect.appendChild(option); 
  }

  let bracketSelectImg = document.createElement("img");
  bracketSelectImg.src = "UI/Pictures/Brackets/Zero.jpg";
  bracketSelectImg.id = "bracketTypeImg";
  bracketSelectImg.classList = "selection-Image";
  bracketContainer.appendChild(bracketSelectImg);
  //---------------------------------------------

  //----------Create Bracket Selection------------
  let finishH3 = document.createElement("h3");
  finishH3.textContent = "Hardware Finish:";
  myForm.appendChild(finishH3);

  let finishContainer= document.createElement("div")
  finishContainer.classList = "select-Container";
  myForm.appendChild(finishContainer);

  let finishSelect = document.createElement("select");
  finishSelect.name = "hardwareFinish";
  finishSelect.id = "hardwareFinish";
  finishContainer.appendChild(finishSelect); 

  for (i = 0; i < finishList.length; i++) {

    let option = document.createElement("option");
    option.value = finishList[i];
    option.textContent = finishList[i];
    finishSelect.appendChild(option); 
  }

  let finishSelectImg = document.createElement("img");
  finishSelectImg.src = "UI/Pictures/Finishes/Polished Chrome.png";
  finishSelectImg.id = "bracketTypeImg";
  finishSelectImg.classList = "selection-Image";
  finishContainer.appendChild(finishSelectImg);
  //---------------------------------------------

  //----------Create File upload and Submit Button------------
  let myH22 = document.createElement("h2");
  myH22.textContent = "Image(s) To Edit";
  myForm.appendChild(myH22); 

  let myLabel = document.createElement("label");
  myForm.appendChild(myLabel); 

  let myInput = document.createElement("input");
  myInput.type = "file";
  myInput.id = "imageInput";
  myInput.name = "image";
  myInput.multiple = true;
  myForm.appendChild(myInput);
  
  let myBtn = document.createElement("button");
  myBtn.textContent = "Generate Photo(s)";
  myForm.appendChild(myBtn);
  //---------------------------------------------

  //----------Add Listeners------------


  //-----------------------------------
  //Function:
  //Adds a listener to the variation form submit button to take in the information from all the selects and send them off to the AI
  //
  //-----------------------------------
  myForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    let systemSubmission = "public/UI/Pictures/Systems/" + myForm.systemType.value + ".jpg";
    let glassSubmission = "public/UI/Pictures/Glass/" + myForm.glassType.value + ".png";
    let handleSubmission = "public/UI/Pictures/Pull Handles/" + myForm.pullHandle.value + ".jpg";
    let doorHingeSubmission = "public/UI/Pictures/Door Hinges/" + myForm.doorHinge.value + ".jpg";
    let bracketSubmission = "public/UI/Pictures/Brackets/" + myForm.bracketType.value + ".jpg";
    let finishSubmission = "public/UI/Pictures/Finishes/" + myForm.hardwareFinish.value + ".png";

    submitInformation(myInput, myForm, systemSubmission, glassSubmission, handleSubmission, doorHingeSubmission, bracketSubmission, finishSubmission);
  });


  //-----------------------------------
  //Function:
  //Handles the Selection change for System Select in the variation form
  //
  //-----------------------------------
  myForm.systemType.addEventListener('change', async (e) => {

    e.preventDefault();

    if (myForm.systemType.value === "Sliding") {

      hingeSelect.classList.add('hidden');
      hingeH3.classList.add('hidden');
      doorHingeSelectImg.classList.add('hidden');

    } else {

      hingeSelect.classList.remove('hidden');
      hingeH3.classList.remove('hidden');
      doorHingeSelectImg.classList.remove('hidden');
    }

    systemSelectImg.src = "UI/Pictures/Systems/" + myForm.systemType.value + ".jpg";

  });


  //-----------------------------------
  //Function:
  //Handles the Selection change for Glass Select in the variation form
  //
  //-----------------------------------
  myForm.glassType.addEventListener('change', async (e) => {

    e.preventDefault();

    glassSelectImg.src = "UI/Pictures/Glass/" + myForm.glassType.value + ".png";

  });


  //-----------------------------------
  //Function:
  //Handles the Selection change for Pull Handle Select in the variation form
  //
  //-----------------------------------
  myForm.pullHandle.addEventListener('change', async (e) => {

    e.preventDefault();

    handleSelectImg.src = "UI/Pictures/Pull Handles/" + myForm.pullHandle.value + ".jpg";

  });


  //-----------------------------------
  //Function:
  //Handles the Selection change for Door Hinge Select in the variation form
  //
  //-----------------------------------
  myForm.doorHinge.addEventListener('change', async (e) => {

    e.preventDefault();

    doorHingeSelectImg.src = "UI/Pictures/Door Hinges/" + myForm.doorHinge.value + ".jpg";

  });


  //-----------------------------------
  //Function:
  //Handles the Selection change for Bracket Select in the variation form
  //
  //-----------------------------------
  myForm.bracketType.addEventListener('change', async (e) => {

    e.preventDefault();

    bracketSelectImg.src = "UI/Pictures/Brackets/" + myForm.bracketType.value + ".jpg";

  });


  //-----------------------------------
  //Function:
  //Handles the Selection change for Hardware Finish Select in the variation form
  //
  //-----------------------------------
  myForm.hardwareFinish.addEventListener('change', async (e) => {

    e.preventDefault();

    finishSelectImg.src = "UI/Pictures/Finishes/" + myForm.hardwareFinish.value + ".png";

  });
  //---------------------------------------------

});


//-----------------------------------
//Function:
//Handles the Selection change for System Select in the main form
//
//-----------------------------------
imageForm.systemType.addEventListener('change', async (e) => {

  e.preventDefault();

  if (imageForm.systemType.value === "Sliding") {

    doorHingeSelection.classList.add('hidden');
    doorHingeSelectionText.classList.add('hidden');
    doorHingeImg.classList.add('hidden');

  } else {

    doorHingeSelection.classList.remove('hidden');
    doorHingeSelectionText.classList.remove('hidden');
    doorHingeImg.classList.remove('hidden');
  }

  systemTypeImg.src = "UI/Pictures/Systems/" + imageForm.systemType.value + ".jpg";

});


//-----------------------------------
//Function:
//Handles the Selection change for Glass Select in the main form
//
//-----------------------------------
imageForm.glassType.addEventListener('change', async (e) => {

  e.preventDefault();

  glassTypeImg.src = "UI/Pictures/Glass/" + imageForm.glassType.value + ".png";

});


//-----------------------------------
//Function:
//Handles the Selection change for Pull Handle Select in the main form
//
//-----------------------------------
imageForm.pullHandle.addEventListener('change', async (e) => {

  e.preventDefault();

  pullHandleImg.src = "UI/Pictures/Pull Handles/" + imageForm.pullHandle.value + ".jpg";

});


//-----------------------------------
//Function:
//Handles the Selection change for Door Hinge Select in the main form
//
//-----------------------------------
imageForm.doorHinge.addEventListener('change', async (e) => {

  e.preventDefault();

  doorHingeImg.src = "UI/Pictures/Door Hinges/" + imageForm.doorHinge.value + ".jpg";

});


//-----------------------------------
//Function:
//Handles the Selection change for Bracket Select in the main form
//
//-----------------------------------
imageForm.bracketType.addEventListener('change', async (e) => {

  e.preventDefault();

  bracketTypeImg.src = "UI/Pictures/Brackets/" + imageForm.bracketType.value + ".jpg";

});


//-----------------------------------
//Function:
//Handles the Selection change for Hardware Finish Select in the main form
//
//-----------------------------------
imageForm.hardwareFinish.addEventListener('change', async (e) => {

  e.preventDefault();

  hardwareFinishImg.src = "UI/Pictures/Finishes/" + imageForm.hardwareFinish.value + ".png";

});


//Variables for the Image Carousel
let slideIndex = 1;

//Sets up the Image Carousel
showSlides(slideIndex);

//-----------------------------------
//Function:
//Next/Previous Controls
//
//-----------------------------------
function plusSlides(n) {

  showSlides(slideIndex += n);
}

//-----------------------------------
//Function:
//Thumbnail image controls
//
//-----------------------------------
function currentSlide(n) {

  showSlides(slideIndex = n);
}


//-----------------------------------
//Function:
//Handles the Image Carousel
//
//-----------------------------------
function showSlides(n) {

  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");

  if (n > slides.length) {

    slideIndex = 1
  }

  if (n < 1) {

    slideIndex = slides.length
  }

  for (i = 0; i < slides.length; i++) {

    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {

    dots[i].className = dots[i].className.replace("active", "");
  }

  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}


//-----------------------------------
//Function:
//Takes in the file input and converts it to base64 to give to the AI
//
//-----------------------------------
async function submitInformation(fileInput, form, sImg, gImg, pHImg, dHImg, bImg, hFImg) {

  //For each file submitted go through and convert the Image to base64 and send it off to the AI
  for (let i = 0; i < fileInput.files.length; i++) {

      let base64 = await fileToBase64(fileInput.files[i]);

      //Message Send off to AI
      let res = await fetch('/openai/answer', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ system: form.systemType.value, systemImg: sImg, glass: form.glassType.value, glassImg: gImg, handle: form.pullHandle.value, handleImg: pHImg, hinge: form.doorHinge.value, hingeImg: dHImg, bracket: form.bracketType.value, bracketImg: bImg, finish: form.hardwareFinish.value, hardwareFinishImg: hFImg, image: base64, imageIndex: currentImageIndex })
      });

      let data = await res.json();

      //Setting the received Image
      if(currentImageIndex == 0)
      {
        thumbnail0.src = data.imgPath;
        currentImageIndex = currentImageIndex + 1;
      }
      else
      {
        //Creates the Dots and Connects up the Image to the corresponding Dot for Image Carousel
        let dotContainer = document.getElementById("dot-container");

        let myDot = document.createElement("span");
        myDot.classList = "dot";
        let dotNum = currentImageIndex + 1;
        myDot.setAttribute("onclick","currentSlide("+ dotNum + ");");
        dotContainer.appendChild(myDot); 



        let imageContainer = document.getElementById("imgContainer");

        let mySlide = document.createElement("div");
        mySlide.classList = "mySlides fade";
        imageContainer.appendChild(mySlide); 


        let myImg = document.createElement("img");
        myImg.src = data.imgPath;
        myImg.style = "width:100%";
        myImg.alt = "SlideShowImg";
        mySlide.appendChild(myImg); 

        currentImageIndex = currentImageIndex + 1;
      }
    }

}