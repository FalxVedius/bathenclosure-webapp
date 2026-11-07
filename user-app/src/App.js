import React, { useMemo, useState } from "react";

// Place this file in your React app and keep the existing styles.css available.
// The image assets should be inside your public/UI/Pictures directory.

const OPTIONS = {
  systemType: ["Pivot", "Frameless", "Sliding", "Alcove", "Enclosure"],
  glassType: ["Clear", "Bronze", "Frosted", "Grey", "Hammered", "HD", "Low Iron", "Rain", "Tinted"],
  pullHandle: ["O-Style", "I-Style", "C-Style", "U-Style"],
  doorHinge: [
    "Trento", "Zero", "Lugano", "Como", "Bellagio", "Vienna", "Geneva",
    "Junior Geneva", "Cologne", "Prima", "Senior Prima", "Junior Prima",
    "Pinnacle", "Cardiff", "Victoria", "Vernon", "Plymouth", "Zurich",
    "Regal", "Palermo", "Melbourne", "Petite", "Concord", "Madrid",
    "Ultimate", "Roman", "Grande", "Sydney", "Atlas", "Light Duty",
  ],
  bracketType: [
    "Zero", "Center Mount", "Offset / Face Mount", "Glass to Glass",
    "Sleeve Over", "Operable Transom", "Glass Shelf", "Wall Mount",
  ],
  hardwareFinish: [
    "Polished Chrome", "Brushed Chrome", "Matte Black",
    "Polished Stainless Steel", "Brushed Stainless Steel", "Brushed Nickel",
    "Polished Nickel", "Satin Nickel", "Gunmetal", "Matte Gunmetal",
    "Oil Rubbed Bronze", "Polished Brass", "Satin Brass", "Vintage Brass",
    "Brushed Bronze", "Dark Brushed Bronze", "French Gold", "Modern Gold",
    "Rose Gold", "Unlacquered Brass",
  ],
};

const INITIAL_VALUES = {
  systemType: "Pivot",
  glassType: "Clear",
  pullHandle: "O-Style",
  doorHinge: "Trento",
  bracketType: "Zero",
  hardwareFinish: "Polished Chrome",
};

const ASSET_PATHS = {
  systemType: (value) => `/UI/Pictures/Systems/${value}.jpg`,
  glassType: (value) => `/UI/Pictures/Glass/${value}.png`,
  pullHandle: (value) => `/UI/Pictures/Pull Handles/${value}.jpg`,
  doorHinge: (value) => `/UI/Pictures/Door Hinges/${value}.jpg`,
  bracketType: (value) => `/UI/Pictures/Brackets/${value === "Offset / Face Mount" ? "Offset - Face Mount" : value}.jpg`,
  hardwareFinish: (value) => `/UI/Pictures/Finishes/${value}.png`,
};

const FIELD_CONFIG = [
  { key: "systemType", label: "Door System Type:", initialImage: "/UI/Pictures/Systems/Pivot.jpg" },
  { key: "glassType", label: "Type of Glass:", initialImage: "/UI/Pictures/Glass/Clear.png" },
  { key: "pullHandle", label: "Pull Handle Type:", initialImage: "/UI/Pictures/Pull Handles/O-Style.jpg" },
  { key: "doorHinge", label: "Door Hinge Type:", initialImage: "/UI/Pictures/Door Hinges/Trento.jpg" },
  { key: "bracketType", label: "Clamps and Brackets Type:", initialImage: "/UI/Pictures/Brackets/Zero.jpg" },
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
  const isSliding = values.systemType === "Sliding";

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
        const hiddenHinge = key === "doorHinge" && isSliding;
        const imageSrc = ASSET_PATHS[key](values[key]) || initialImage;

        return (
          <React.Fragment key={key}>
            <h3 className={hiddenHinge ? "hidden" : ""}>{label}</h3>
            <div className={`select-Container${hiddenHinge ? " hidden" : ""}`}>
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
        <button type="submit" disabled={isSubmitting}>
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
      let generatedImageIndex = Math.max(0, images.length - 1);

      for (const file of files) {
        const base64 = await fileToBase64(file);
        const values = editor.values;

        const payload = {
          system: values.systemType,
          systemImg: `public${ASSET_PATHS.systemType(values.systemType)}`,
          glass: values.glassType,
          glassImg: `public${ASSET_PATHS.glassType(values.glassType)}`,
          handle: values.pullHandle,
          handleImg: `public${ASSET_PATHS.pullHandle(values.pullHandle)}`,
          hinge: values.doorHinge,
          hingeImg: `public${ASSET_PATHS.doorHinge(values.doorHinge)}`,
          bracket: values.bracketType,
          bracketImg: `public${ASSET_PATHS.bracketType(values.bracketType)}`,
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
        if (!data.imgPath) {
          throw new Error("The server response did not include an image path.");
        }

        if (generatedImageIndex === 0) {
          setImages((current) => [fullPath, ...current.slice(1)]);
          setActiveImage(0);
        } else {
          setImages((current) => [...current, fullPath]);
          setActiveImage(generatedImageIndex);
        }
        generatedImageIndex += 1;
      }
    } catch (err) {
      setError(err.message || "Something went wrong while generating the image.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const showSlide = (index) => {
    if (!images.length) return;
    setActiveImage((index + images.length) % images.length);
  };

  return (
    <>
      <nav>
        <h1>Glassco Bath Shower Glass Generator</h1>
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

      <div id="dot-container" style={{ textAlign: "center" }}>
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`dot${activeImage === index ? " active" : ""}`}
            onClick={() => showSlide(index)}
            aria-label={`Show image ${index + 1}`}
          />
        ))}
      </div>

      <br />

      <div className="slideshow-container" id="slideshow-container">
        <div id="imgContainer">
          {images.map((src, index) => (
            <div
              key={`${src}-${index}`}
              className="mySlides fade"
              style={{ display: activeImage === index ? "block" : "none" }}
            >
              <img
                src={src}
                style={{ width: "100%" }}
                alt={`Generated shower glass design ${index + 1}`}
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          className="prev"
          onClick={() => showSlide(activeImage - 1)}
          aria-label="Previous image"
        >
          &#10094;
        </button>
        <button
          type="button"
          className="next"
          onClick={() => showSlide(activeImage + 1)}
          aria-label="Next image"
        >
          &#10095;
        </button>
      </div>
    </>
  );
}
