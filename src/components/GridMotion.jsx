import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import '../GridMotion.css';

const GridMotion = ({ items = [], gradientColor = 'black' }) => {
  const gridRef = useRef(null);
  const rowRefs = useRef([]);

  const totalItems = 28;
  const defaultItems = Array.from({ length: totalItems }, (_, index) => `Item ${index + 1}`);
  const combinedItems = items.length > 0 ? items.slice(0, totalItems) : defaultItems;

  useEffect(() => {
    gsap.ticker.lagSmoothing(0);

    rowRefs.current.forEach((row, index) => {
      if (row) {
        const direction = index % 2 === 0 ? -1 : 1;
        const distance = 80 + index * 20; // varied motion
        const duration = 4 + index * 1.2;

        gsap.to(row, {
          x: direction * distance,
          duration: duration,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        });
      }
    });
  }, []);

  return (
    <div className="noscroll loading rounded-[10rem]" ref={gridRef}>
      <section className="intro">
        <div className="gridMotion-container">
          {[...Array(4)].map((_, rowIndex) => (
            <div
              key={rowIndex}
              className="row"
              ref={(el) => (rowRefs.current[rowIndex] = el)}
            >
              {[...Array(7)].map((_, itemIndex) => {
                const content = combinedItems[rowIndex * 7 + itemIndex];
                return (
                  <div key={itemIndex} className="row__item">
                    <div className="row__item-inner">
                      {typeof content === 'string' && content.startsWith('http') ? (
                        <div
                          className="row__item-img"
                          style={{ backgroundImage: `url(${content})` }}
                        ></div>
                      ) : (
                        <div className="row__item-content">{content}</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <div className="fullview"></div>
      </section>
    </div>
  );
};

export default GridMotion;
