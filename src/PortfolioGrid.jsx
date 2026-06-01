import { useState, useEffect } from "react";
import projects from "./projectsData.js";

export default function PortfolioGrid() {
  const [active, setActive] = useState("PRINT");
  const [selected, setSelected] = useState(null);
  const [index, setIndex] = useState(0);

  const categoryColors = {
  PRINT: "#DDE8D5",
  EDITION: "#D9EEFF",
  VOLUME: "#FFF4C9",
  INFO: "#FFDCE8"
};

const categoryAccent = {
  PRINT: "#5D7A54",
  EDITION: "#4A79A8",
  VOLUME: "#A78528",
  INFO: "#A25A74"
};

const currentAccent = categoryAccent[active];

const [loadedImages, setLoadedImages] = useState({});

const [visibleProjects, setVisibleProjects] = useState(4);

const currentBg = categoryColors[active] || "#111";
  const filtered = projects.filter(p => p.category === active);
  const isInfo = active === "INFO";

  useEffect(() => {
  setVisibleProjects(4);

  const interval = setInterval(() => {
    setVisibleProjects(prev => {
      if (prev >= filtered.length) {
        clearInterval(interval);
        return prev;
      }

      return prev + 2;
    });
  }, 250);

  return () => clearInterval(interval);
}, [active]);

  const isMobile =
    typeof window !== "undefined" && window.innerWidth < 768;

  // ======================
  // PAGE PROJET
  // ======================
  if (selected) {
    const gallery = Array.from(
  { length: selected.images },
  (_, i) => `/images/${selected.folder}/${i + 1}.jpg`
);

    return (
      <div
        style={{
          minHeight: "100vh",
          width: "100%",
          background: "#111",
          color: "#fff",
          overflowX: "hidden",
          display: "block"
        }}
      >
        {/* TEXTE */}
        <div
          style={{
            width: "100%",
            maxWidth: "900px",
            padding: "40px",
            boxSizing: "border-box"
          }}
        >
          <button
            onClick={() => setSelected(null)}
            style={{ marginBottom: "20px" }}
          >
            ← Back
          </button>

          <h2>{selected.title}</h2>

          <p style={{ marginTop: "20px", opacity: 0.7 }}>
            {selected.description}
          </p>
        </div>

        {/* CAROUSEL */}
        <div
  style={{
    width: "100%",
    height: "88vh",
    position: "relative",
    backgroundColor: "#111",
    padding: "0 40px",
    boxSizing: "border-box"
  }}
>
  <img
    src={gallery[index]}
    loading="lazy"
    style={{
      width: "100%",
      height: "100%",
      objectFit: "contain",
      display: "block",
      backgroundColor: "#111"
    }}
  />

          {/* PREV */}
          <button
            onClick={() =>
              setIndex((index - 1 + gallery.length) % gallery.length)
            }
            style={{
              position: "absolute",
              left: 20,
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: "20px",
              background: "transparent",
              color: "#fff",
              border: "none",
              cursor: "pointer"
            }}
          >
            ‹
          </button>

          {/* NEXT */}
          <button
            onClick={() =>
              setIndex((index + 1) % gallery.length)
            }
            style={{
              position: "absolute",
              right: 20,
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: "20px",
              background: "transparent",
              color: "#fff",
              border: "none",
              cursor: "pointer"
            }}
          >
            ›
          </button>
        </div>
        {/* FOOTER */}
<div
  style={{
    width: "100%",
    padding: "20px 40px",
    boxSizing: "border-box",
    marginTop: "20px"
  }}
>
  {/* LINE */}
  <div
    style={{
      height: "1px",
      width: "100%",
      backgroundColor: "rgba(255,255,255,0.2)",
      marginBottom: "15px"
    }}
  />

  {/* TEXT */}
  <div
    style={{
      fontSize: "12px",
      opacity: 0.7,
      letterSpacing: "0.5px"
    }}
  >
    creuspaul@gmail.com - @paul.creus
  </div>
</div>
      </div>
    );
  }

  if (isInfo) {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        width: "100%",
      background: currentBg,
color: "#111",
      }}
    >

      {/* MENU */}
      <div
        style={{
          width: "220px",
          flexShrink: 0,
          padding: "30px",
          boxSizing: "border-box"
        }}
      >
        <h2
  style={{
    marginBottom: "30px",
    color: currentAccent,
    transition: "color 0.5s ease"
  }}
>
  Paul Creus
</h2>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px"
          }}
        >
          {["PRINT", "EDITION", "VOLUME", "INFO"].map((item) => {
            const isActive = active === item;

            return (
              <button
                key={item}
                onClick={() => setActive(item)}
                style={{
                  textAlign: "left",
                  background: isActive
                    ? "rgba(255,255,255,0.06)"
                    : "transparent",
                  border: "none",
                  color: isActive ? currentAccent : "#333",
                  fontSize: "14px",
                  cursor: "pointer",
                  padding: "8px 10px",
                  width: "100%",
                  opacity: isActive ? 1 : 0.35,
                  fontWeight: isActive ? "500" : "300",
                  borderLeft: isActive
  ? `2px solid ${currentAccent}`
  : "2px solid transparent",
                  transition: "all 0.25s ease"
                }}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>

      {/* INFO CONTENT */}
      <div
        style={{
          flex: 1,
          padding: "60px",
          maxWidth: "900px"
        }}
      >
<h2
  style={{
    marginBottom: "40px",
    fontWeight: "400",
    color: currentAccent,
    transition: "color 0.5s ease"
  }}
>
  Informations
</h2>

        {/* PRESENTATION */}
        <div style={{ marginBottom: "60px" }}>
          <p
            style={{
              lineHeight: "1.8",
              fontSize: "15px",
              opacity: 0.8,
              maxWidth: "700px"
            }}
          >
            Diplômé en 2016 des Arts Décoratifs de Strasbourg, Paul Creus est un artiste visuel dont la 
pratique mêle image imprimée, création numérique et mise en volume. Installé à Nantes de
puis 2019, il y mène un travail d’exploration plastique figuratif s’intéressant à différents états 
de la matière et du tangible, depuis le fantomatique jusqu’au palpable. En jouant des biais et 
des failles des systèmes de représentation augmentés par la technologie, son travail ouvre 
sur des espaces parallèles étranges et oniriques. 
Il s’implique également dans le milieu culturel associatif, notamment à travers l’atelier 
Projéta qu’il contribue à fonder, proposant expositions, ateliers et spectacle vivant en lien 
avec les habitants et artistes locaux. 
          </p>
        </div>

        {/* CONTACT */}
        <div>
          <p
            style={{
              fontSize: "14px",
              opacity: 0.7,
              lineHeight: "1.8"
            }}
          >
            creuspaul@gmail.com
            <br />
            @paul.creus
          </p>
        </div>
      </div>
    </div>
  );
}

  // ======================
  // HOME PAGE
  // ======================
return (
  <div
    style={{
      display: "flex",
      minHeight: "100vh",
      width: "100%",
      background: currentBg,
     color: active === "INFO" ? "#111" : "#1a1a1a",
      overflowX: "hidden",
      transition: "background-color 0.5s ease"
    }}
  >
      {/* MENU */}
      <div
        style={{
          width: "220px",
          flexShrink: 0,
          padding: "30px",
          boxSizing: "border-box"
        }}
      >
        <h2
  style={{
    marginBottom: "30px",
    color: categoryAccent[active] || "#111",
    transition: "color 0.5s ease"
  }}
>
  Paul Creus
</h2>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px"
          }}
        >
          {["PRINT", "EDITION", "VOLUME", "INFO"].map((item) => {
  const isActive = active === item;

  return (
    <button
      key={item}
      onClick={() => setActive(item)}
      style={{
  textAlign: "left",
  background: isActive
    ? `${categoryAccent[item]}15`
    : "transparent",

  border: "none",

  color: isActive
    ? categoryAccent[item]
    : "#444",

  fontSize: "14px",
  cursor: "pointer",
  padding: "8px 10px",
  width: "100%",

  opacity: isActive ? 1 : 0.4,
  fontWeight: isActive ? "500" : "300",

  letterSpacing: isActive ? "0.8px" : "0.3px",

  borderLeft: isActive
    ? `2px solid ${categoryAccent[item]}`
    : "2px solid transparent",

  transition: "all 0.25s ease"
}}
    >
      {item}
    </button>
  );
})}
        </div>
      </div>

      {/* GRID */}
      <div
        style={{
          flex: 1,
          minWidth: 0,
          padding: "40px",
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          alignContent: "flex-start"
        }}
      >
        {filtered.slice(0, visibleProjects).map(p => {
          const isLandscape = p.orientation === "landscape";

          return (
            <div
              key={p.id}
              style={{
                flexShrink: 0,
                flexBasis: isLandscape ? "440px" : "260px",
                maxWidth: "100%"
              }}
            >
              <div
  style={{
    position: "relative",
    overflow: "hidden"
  }}
>
<div
  style={{
    position: "relative",
    overflow: "hidden",
    width: "100%",
    height: "320px",
    background: "#1a1a1a"
  }}
>
  {/* TINY IMAGE */}
  <img
    src={`/images/${p.folder}/tiny.jpg`}
    style={{
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      filter: "blur(20px)",
      transform: "scale(1.08)",
      opacity: loadedImages[p.id] ? 0 : 1,
      transition: "opacity 0.6s ease"
    }}
  />

  {/* HD THUMB */}
  <img
    src={`/images/${p.folder}/thumb.jpg`}
    loading="lazy"

    onLoad={() =>
      setLoadedImages(prev => ({
        ...prev,
        [p.id]: true
      }))
    }

    onClick={() => {
      setSelected(p);
      setIndex(0);
    }}

    style={{
      position: "relative",
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block",
      cursor: "pointer",

      opacity: loadedImages[p.id] ? 1 : 0,

      transition:
        "opacity 0.7s ease, transform 0.35s ease",

      transform: "scale(1)"
    }}

    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "scale(1.015)";
    }}

    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "scale(1)";
    }}
  />
</div>
</div>

              <p
                style={{
                  marginTop: "8px",
                  fontSize: "12px",
                  opacity: 0.65
                }}
              >
                {p.title}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}