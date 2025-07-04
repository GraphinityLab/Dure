import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "../GridMotion.css"; // Ensure this is in the same folder or update path

const GridMotion = ({ items = [], gradientColor = "#000" }) => {
  const [columns, setColumns] = useState(7);
  const rows = 4;
  const gridRef = useRef(null);
  const rowRefs = useRef([]);

  useEffect(() => {
    const updateCols = () => {
      const width = window.innerWidth;
      if (width < 480) setColumns(2);
      else if (width < 768) setColumns(3);
      else if (width < 1024) setColumns(4);
      else setColumns(7);
    };

    updateCols();
    window.addEventListener("resize", updateCols);
    return () => window.removeEventListener("resize", updateCols);
  }, []);

  const totalItems = columns * rows;
  const defaultItems = Array.from({ length: totalItems }, (_, i) => `Item ${i + 1}`);
  const gridItems = (items.length ? items : defaultItems).slice(0, totalItems);

  useEffect(() => {
    gsap.ticker.lagSmoothing(0);

    rowRefs.current.forEach((row, i) => {
      const direction = i % 2 === 0 ? -1 : 1;
      const distance = 40 + i * 15;
      const duration = 5 + i * 0.8;

      gsap.to(row, {
        x: direction * distance,
        duration,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    });
  }, [columns]);

  return (
    <div className="gridMotion-wrapper noscroll rounded-[4rem]" ref={gridRef}>
      <section className="intro relative z-10">
        <div
          className="gridMotion-container"
          style={{
            gridTemplateRows: `repeat(${rows}, 1fr)`,
          }}
        >
          {[...Array(rows)].map((_, rowIdx) => (
            <div
              key={`row-${rowIdx}`}
              className="row"
              ref={(el) => (rowRefs.current[rowIdx] = el)}
              style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
            >
              {[...Array(columns)].map((_, colIdx) => {
                const index = rowIdx * columns + colIdx;
                const item = gridItems[index];

                return (
                  <div key={`item-${rowIdx}-${colIdx}`} className="row__item">
                    <div className="row__item-inner">
                      {typeof item === "string" && item.startsWith("http") ? (
                        <div
                          className="row__item-img"
                          style={{
                            backgroundImage: `url(${item})`,
                            backgroundColor: gradientColor,
                          }}
                        />
                      ) : (
                        <div className="row__item-content">{item}</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <div className="fullview" />
      </section>
    </div>
  );
};

export default GridMotion;
