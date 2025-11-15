import React, { useEffect, useMemo, useState } from "react";

type Category = "all" | "Digital Dimensions" | "objects" | "scenes" | "brand";

interface GalleryItem {
    id: number;
    title: string;
    description: string;
    category: Exclude<Category, "all">;
    image: string;
}

const galleryData: GalleryItem[] = [
    {
        id: 1,
        title: "Collected Data In AI",
        category: "Digital Dimensions",
        image:
            "https://images.pexels.com/photos/17486101/pexels-photo-17486101.png",
        description:
            "This image represents storage of collected data in AI.",
    },
    {
        id: 2,
        title: "Abstract spheres in studio light",
        category: "objects",
        image:
            "https://static.vecteezy.com/system/resources/previews/057/338/728/large_2x/minimalist-coral-scene-featuring-geometric-solids-textured-forms-and-spheres-on-a-stepped-platform-under-soft-diffused-lighting-free-photo.jpg",
        description:
            "Minimalist coral scene featuring geometric solids, textured forms, and spheres.",
    },
    {
        id: 3,
        title: "AI could",
        category: "Digital Dimensions",
        image:
            "https://images.pexels.com/photos/17485657/pexels-photo-17485657.png",
        description:
            "This image depicts how AI could adapt to an infinite amount of uses.",
    },
    {
        id: 4,
        title: "Ethereal scene",
        category: "objects",
        image:
            "https://static.vecteezy.com/system/resources/previews/057/294/317/non_2x/ethereal-scene-featuring-a-luminous-sphere-amidst-moody-lighting-spheres-and-atmospheric-mist-creating-a-surreal-and-captivating-ambiance-free-photo.jpg",
        description:
            "Spheres and atmospheric mist, creating a surreal and captivating ambiance.",
    },
    {
        id: 5,
        title: "Japanese style",
        category: "scenes",
        image:
            "https://static.vecteezy.com/system/resources/previews/026/433/067/large_2x/podium-background-with-cream-color-tone-japanese-style-made-by-ai-generative-free-photo.jpg",
        description:
            "Podium background with cream color tone japanese style made .",
    },
    {
        id: 6,
        title: "Purple Cubes",
        category: "brand",
        image:
            "https://static.vecteezy.com/system/resources/previews/070/313/248/large_2x/elegant-purple-cubes-with-metallic-spheres-and-mockup-space-for-branding-free-photo.jpg",
        description:
            "Elegant Purple Cubes with Metallic Spheres and Mockup Space for Branding.",
    },
    {
        id: 7,
        title: "White pillars ",
        category: "scenes",
        image:
            "https://static.vecteezy.com/system/resources/previews/035/512/101/large_2x/ai-generated-scene-with-white-pillars-and-blue-scenery-along-with-rocky-mountains-free-photo.jpg",
        description:
            "Scene with white pillars and blue scenery along with rocky mountains .",
    },
    {
        id: 8,
        title: "Black and White ",
        category: "brand",
        image:
            "https://static.vecteezy.com/system/resources/previews/070/266/236/large_2x/abstract-3d-render-of-black-and-white-geometric-shapes-on-dark-background-free-photo.jpg",
        description:
            "Abstract 3D Render of Black and White Geometric Shapes.",
    },
];

const categories: { id: Category; label: string }[] = [
    { id: "all", label: "All shots" },
    { id: "Digital Dimensions", label: "Digital Dimensions" },
    { id: "objects", label: "3D objects" },
    { id: "scenes", label: "Scenes" },
    { id: "brand", label: "Brand & concept" },
];

const TabGallery: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState<Category>("all");

    // index în lista FILTRATĂ pentru lightbox, sau null dacă e închis
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    const filteredItems = useMemo(() => {
        if (activeCategory === "all") return galleryData;
        return galleryData.filter((item) => item.category === activeCategory);
    }, [activeCategory]);

    const filteredCount = filteredItems.length;

    // când schimb tab-ul, închid lightbox-ul ca să nu rămână cu index invalid
    useEffect(() => {
        setLightboxIndex(null);
    }, [activeCategory]);

    // tastatură: ESC, stânga, dreapta
    useEffect(() => {
        if (lightboxIndex === null || filteredCount === 0) return;

        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setLightboxIndex(null);
            } else if (e.key === "ArrowRight") {
                setLightboxIndex((prev) =>
                    prev === null ? 0 : (prev + 1) % filteredCount
                );
            } else if (e.key === "ArrowLeft") {
                setLightboxIndex((prev) =>
                    prev === null ? 0 : (prev - 1 + filteredCount) % filteredCount
                );
            }
        };

        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [lightboxIndex, filteredCount]);

    const openLightbox = (indexInFiltered: number) => {
        setLightboxIndex(indexInFiltered);
    };

    const closeLightbox = () => {
        setLightboxIndex(null);
    };

    const showNext = () => {
        if (!filteredCount) return;
        setLightboxIndex((prev) =>
            prev === null ? 0 : (prev + 1) % filteredCount
        );
    };

    const showPrev = () => {
        if (!filteredCount) return;
        setLightboxIndex((prev) =>
            prev === null ? 0 : (prev - 1 + filteredCount) % filteredCount
        );
    };

    return (
        <div className="tab-gallery">
            {/* Tabs row */}
            <div className="tab-gallery-tabs">
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        type="button"
                        className={
                            "tab-gallery-tab" +
                            (activeCategory === cat.id ? " tab-gallery-tab--active" : "")
                        }
                        onClick={() => setActiveCategory(cat.id)}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <div className="tab-gallery-grid">
                {filteredItems.length === 0 ? (
                    <div className="tab-gallery-no-results">
                        No visuals in this category yet.
                    </div>
                ) : (
                    filteredItems.map((item, index) => (
                        <article
                            key={item.id}
                            className="tab-gallery-item"
                            style={{ animationDelay: `${index * 0.08}s` }}
                            onClick={() => openLightbox(index)}
                            tabIndex={0}
                            role="button"
                        >
                            <div className="tab-gallery-image-wrapper">
                                <img src={item.image} alt={item.title} />
                            </div>
                            <div className="tab-gallery-info">
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                            </div>
                        </article>
                    ))
                )}
            </div>

            {/* LIGHTBOX FULLSCREEN */}
            {lightboxIndex !== null && filteredItems[lightboxIndex] && (
                <div
                    className="gallery-lightbox-overlay"
                    onClick={closeLightbox}
                >
                    {/* Close */}
                    <button
                        type="button"
                        className="gallery-lightbox-close"
                        onClick={(e) => {
                            e.stopPropagation();
                            closeLightbox();
                        }}
                    >
                        ×
                    </button>

                    {/* Prev */}
                    <button
                        type="button"
                        className="gallery-lightbox-nav gallery-lightbox-nav--prev"
                        onClick={(e) => {
                            e.stopPropagation();
                            showPrev();
                        }}
                    >
                        ‹
                    </button>

                    {/* Next */}
                    <button
                        type="button"
                        className="gallery-lightbox-nav gallery-lightbox-nav--next"
                        onClick={(e) => {
                            e.stopPropagation();
                            showNext();
                        }}
                    >
                        ›
                    </button>

                    <div
                        className="gallery-lightbox-inner"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={filteredItems[lightboxIndex].image}
                            alt={filteredItems[lightboxIndex].title}
                            className="gallery-lightbox-image"
                        />

                        <div className="gallery-lightbox-caption">
                            <div className="gallery-lightbox-text">
                                <span className="gallery-lightbox-title">
                                    {filteredItems[lightboxIndex].title}
                                </span>
                                <span className="gallery-lightbox-desc">
                                    {filteredItems[lightboxIndex].description}
                                </span>
                            </div>
                            <span className="gallery-lightbox-counter">
                                {lightboxIndex + 1} / {filteredCount}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TabGallery;
