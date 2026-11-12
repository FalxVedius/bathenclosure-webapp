import { useState } from 'react';


function GeneratedImageCarousel({ images, generatedImageIndex }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const nextImage = () => {
    setActiveIndex((current) => (current + 1) % images.length);
  };

  const previousImage = () => {
    setActiveIndex((current) => (current - 1 + images.length) % images.length);
  };

  const downloadImage = () => {
    const link = document.createElement("a");
    link.href = images[activeIndex];
    link.download = `generated-image-${activeIndex + 1}.png`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    };

  return (
    <div>
      {generatedImageIndex > 0 ? (
        <div className="generated-carousel">
        <h2>Generated Images</h2>

        <div className="carousel-main">
            {images.length > 1 && (
            <button
                type="button"
                className="carousel-arrow prev"
                onClick={previousImage}
                aria-label="Previous image"
            >
                &#10094;
            </button>
            )}

            <img
            src={images[activeIndex]}
            alt={`Generated image ${activeIndex + 1}`}
            className="carousel-image"
            />

            {images.length > 1 && (
            <button
                type="button"
                className="carousel-arrow next"
                onClick={nextImage}
                aria-label="Next image"
            >
                &#10095;
            </button>
            )}
        </div>

        <div className="carousel-counter">
            Image {activeIndex + 1} of {images.length}
        </div>
        
        <button
            type="button"
            className="download-image-btn"
            onClick={downloadImage}
            >
            &#8681; Download Image
            </button>

        {images.length > 1 && (
            <div className="carousel-thumbnails">
            {images.map((image, index) => (
                <button
                type="button"
                key={index}
                className={`thumbnail ${
                    activeIndex === index ? "active" : ""
                }`}
                onClick={() => setActiveIndex(index)}
                aria-label={`View image ${index + 1}`}
                >
                <img src={image} alt={`Thumbnail ${index + 1}`} />
                </button>
            ))}
            </div>
        )}
        </div>
    ) : (
        <div
          style={{
            padding: "60px 20px",
            textAlign: "center",
            background: "#f1f1f1",
            borderRadius: "8px",
          }}
        >
          <p>No generated images yet.</p>
          <p>Upload an image and click Generate Photo(s) to get started.</p>
        </div>
      )}
    </div>
  );
}

export default GeneratedImageCarousel;