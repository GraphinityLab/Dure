/**
 * DureText Component - Renders "Dure" with a manually added accent mark
 * since the Soligant font doesn't support the é character
 * Usage: <DureText /> or <DureText suffix=" Aesthetics" />
 */
const DureText = ({ suffix = "", className = "" }) => {
  return (
    <span className={`inline-flex items-baseline ${className}`}>
      Dur
      <span className="relative inline-block">
        e
        {/* Accent mark using CSS */}
        <span 
          className="absolute left-1/2 -translate-x-1/2 pointer-events-none select-none"
          style={{ 
            top: '-0.0em',
            width: '0.15em',
            height: '0.05em',
            backgroundColor: 'currentColor',
            borderRadius: '1px',
            transform: 'translateX(0%) translateY(500%) rotate(-50deg)',
            opacity: 0.9
          }}
          aria-hidden="true"
        />
      </span>
      {suffix}
    </span>
  );
};

export default DureText;

