import React, { useMemo, useState, useEffect } from "react";
import GeneratedImageCarousel from "./Carousel";

// Place this file in your React app and keep the existing styles.css available.
// The image assets should be inside your public/UI/Pictures directory.

const OPTIONS = {
  systemType: ["Sliding", "Hinged", "Panel Only"],  
  doorHinge: ["Beavaled", "Square"], 
  slidingType: ["Barn Door", "Bypass"],
  barnDoorType: ["Square Header", "Rounded Header"], 
  bypassType: ["Framed", "Frameless"], 
  pullHandle: ["Pull", "Knob", "Finger Pull", "Ladder Pull", "Towel Bar"], 
  bracketType: ["Beavaled", "Square"], 
  glassType: ["Clear", "Rain", "Frosted"], 
  hardwareFinish: [
    "Polished Chrome", "Brushed Chrome", "Matte Black",
    "Polished Stainless Steel", "Brushed Stainless Steel", "Brushed Nickel",
    "Polished Nickel", "Satin Nickel", "Gunmetal", "Matte Gunmetal",
    "Oil Rubbed Bronze", "Polished Brass", "Satin Brass", "Vintage Brass",
    "Brushed Bronze", "Dark Brushed Bronze", "French Gold", "Modern Gold",
    "Rose Gold", "Unlacquered Brass",], 
};

const INITIAL_VALUES = {
  systemType: "Sliding",
  doorHinge: "Beavaled",
  slidingType: "Barn Door",
  barnDoorType: "Square Header",
  bypassType: "Framed",
  pullHandle: "Pull",
  bracketType: "Beavaled",
  glassType: "Clear",
  hardwareFinish: "Polished Chrome",
};

const ASSET_PATHS = {
  systemType: (value) => `/UI/Pictures/Systems/${value}.png`,
  doorHinge: (value) => `/UI/Pictures/Door Hinges/${value}.png`,
  slidingType: (value) => `/UI/Pictures/Sliding/${value}.png`,
  barnDoorType: (value) => `/UI/Pictures/Barn Door/${value}.png`,
  bypassType: (value) => `/UI/Pictures/Bypass/${value}.png`,
  pullHandle: (value) => `/UI/Pictures/Pull Handles/${value}.png`,
  bracketType: (value) => `/UI/Pictures/Brackets/${value === "Offset / Face Mount" ? "Offset - Face Mount" : value}.png`,
  glassType: (value) => `/UI/Pictures/Glass/${value}.png`,
  hardwareFinish: (value) => `/UI/Pictures/Finishes/${value}.png`,
};

const FIELD_CONFIG = [
  { key: "systemType", label: "Enclosure Type:", initialImage: "/UI/Pictures/Systems/Sliding.png" },
  { key: "doorHinge", label: "Hinge Type:", initialImage: "/UI/Pictures/Door Hinges/Beavaled.png" },
  { key: "slidingType", label: "Sliding Type:", initialImage: "/UI/Pictures/Door Hinges/Barn Door.png" },
  { key: "barnDoorType", label: "Barn Door Type:", initialImage: "/UI/Pictures/Door Hinges/Square Header.png" },
  { key: "bypassType", label: "Bypass Type:", initialImage: "/UI/Pictures/Door Hinges/Framed.png" },
  { key: "pullHandle", label: "Handle Type:", initialImage: "/UI/Pictures/Pull Handles/Pull.png" },
  { key: "bracketType", label: "Clamps and Brackets Type:", initialImage: "/UI/Pictures/Brackets/Beavaled.png" },
  { key: "glassType", label: "Glass Type:", initialImage: "/UI/Pictures/Glass/Clear.png" },
  { key: "hardwareFinish", label: "Hardware Finish:", initialImage: "/UI/Pictures/Finishes/Polished Chrome.png" },
];

function createEditor(id) {
  return { id, values: { ...INITIAL_VALUES } };
}

async function fileToBase64(file) {
  const arrayBuffer = await file.arrayBuffer();
  let binary = "";
  const bytes = new Uint8Array(arrayBuffer);
  // Chunking avoids exceeding the argument limit of String.fromCharCode.
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }
  return btoa(binary);
}

function EditorForm({ editor, onChange, onSubmit, isSubmitting }) {
  const { values } = editor;

  const update = (key, value) => onChange(editor.id, key, value);
  const noHinge = (values.systemType === "Sliding" || values.systemType === "Panel Only");
  const noHandle = ( values.systemType === "Panel Only");
  const noSliding = (values.systemType === "Panel Only" || values.systemType === "Hinged");
  const noBarnDoor = (values.systemType === "Panel Only" || values.systemType === "Hinged" || values.slidingType === "Bypass");
  const noBypass = (values.systemType === "Panel Only" || values.systemType === "Hinged" || values.slidingType === "Barn Door");

  return (
    <form
      className="image-form"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(editor.id, event.currentTarget);
      }}
    >
      <h2>What would you like to edit about the image?</h2>
      <br />

      {FIELD_CONFIG.map(({ key, label, initialImage }) => {
        const hiddenHinge = key === "doorHinge" && noHinge;
        const hiddenHandle = key === "pullHandle" && noHandle;
        const hiddenSliding = key === "slidingType" && noSliding;
        const hiddenBarnDoor = key === "barnDoorType" && noBarnDoor;
        const hiddenBypass = key === "bypassType" && noBypass;
        const imageSrc = ASSET_PATHS[key](values[key]) || initialImage;

        return (
          <React.Fragment key={key}>
            <h3 className={(hiddenHinge || hiddenSliding || hiddenBarnDoor || hiddenBypass || hiddenHandle) ? "hidden" : ""}>{label}</h3>
            <div className={`select-Container${(hiddenHinge || hiddenSliding || hiddenBarnDoor || hiddenBypass || hiddenHandle) ? " hidden" : ""}`}>
              <select
                name={key}
                value={values[key]}
                onChange={(event) => update(key, event.target.value)}
              >
                {OPTIONS[key].map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              <img
                src={imageSrc}
                id={`${key}Img`}
                className="selection-Image"
                alt={`${label.replace(":", "")} preview`}
              />
            </div>
          </React.Fragment>
        );
      })}

      <h2>Image(s) To Edit</h2>
      <label>
        <input type="file" name="image" accept="image/*" multiple />
        <button type="submit" className="submittionBtn" disabled={isSubmitting}>
          {isSubmitting ? "Generating..." : "Generate Photo(s)"}
        </button>
      </label>
    </form>
  );
}



export default function GlasscoBathShowerGlassGenerator() {
  const [editors, setEditors] = useState([createEditor(1)]);
  const [nextEditorId, setNextEditorId] = useState(2);
  const [images, setImages] = useState(["https://placehold.co/1024x1024"]);
  const [activeImage, setActiveImage] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [generatedImageIndex, updateIndex] = useState(0);

  const updateEditor = (id, key, value) => {
    setEditors((current) =>
      current.map((editor) =>
        editor.id === id
          ? { ...editor, values: { ...editor.values, [key]: value } }
          : editor
      )
    );
  };

  const addVariation = (event) => {
    event.preventDefault();
        console.log(generatedImageIndex);
    setEditors((current) => [...current, createEditor(nextEditorId)]);
    setNextEditorId((id) => id + 1);
  };

  const submitEditor = async (editorId, formElement) => {

    const editor = editors.find((item) => item.id === editorId);
    if (!editor) return;

    const files = Array.from(formElement.elements.image.files || []);
    if (!files.length) {
      setError("Please select at least one image to edit.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {

      for (const file of files) {
        const base64 = await fileToBase64(file);
        const values = editor.values;

        const payload = {
          system: values.systemType,
          systemImg: `public${ASSET_PATHS.systemType(values.systemType)}`,
          hinge: values.doorHinge,
          hingeImg: `public${ASSET_PATHS.doorHinge(values.doorHinge)}`,
          sliding: values.slidingType,
          slidingImg: `public${ASSET_PATHS.slidingType(values.slidingType)}`,
          barnDoor: values.barnDoorType,
          barnDoorImg: `public${ASSET_PATHS.barnDoorType(values.barnDoorType)}`,
          bypass: values.bypassType,
          bypassImg: `public${ASSET_PATHS.bypassType(values.bypassType)}`,
          handle: values.pullHandle,
          handleImg: `public${ASSET_PATHS.pullHandle(values.pullHandle)}`,
          bracket: values.bracketType,
          bracketImg: `public${ASSET_PATHS.bracketType(values.bracketType)}`,
          glass: values.glassType,
          glassImg: `public${ASSET_PATHS.glassType(values.glassType)}`,
          finish: values.hardwareFinish,
          hardwareFinishImg: `public${ASSET_PATHS.hardwareFinish(values.hardwareFinish)}`,
          image: base64,
          imageIndex: generatedImageIndex,
        };

        const response = await fetch("https://bathenclosure-hgahcmbdcge4e0du.eastus2-01.azurewebsites.net/openai/answer", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`Image generation failed (${response.status}).`);
        }

        const data = await response.json();
        const fullPath = "data:image/png;base64," + data.imgPath;
        console.log(fullPath)
        if (!data.imgPath) {
          throw new Error("The server response did not include an image path.");
        }

        if (generatedImageIndex === 0) {
          setImages((current) => [fullPath, ...current.slice(1)]);
        } else {
          setImages((current) => [...current, fullPath]);
        }
        updateIndex(generatedImageIndex + 1);
      }
    } catch (err) {
      setError(err.message || "Something went wrong while generating the image.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <nav>
        <h1>Glassco Shower Enclosure Generator</h1>
      </nav>

      <div className="container">
        {editors.map((editor) => (
          <EditorForm
            key={editor.id}
            editor={editor}
            onChange={updateEditor}
            onSubmit={submitEditor}
            isSubmitting={isSubmitting}
          />
        ))}
      </div>

      <form className="variation-form" onSubmit={addVariation}>
        <button className="variationBtn" type="submit">Add Variation</button>
      </form>

      {error && <p role="alert" className="error-message">{error}</p>}

      <br />

      <GeneratedImageCarousel 
        images={images}
        generatedImageIndex={generatedImageIndex} 
      />

    </>
  );
}