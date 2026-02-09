import puzzleLogo from 'figma:asset/9396ee5f76cba453dfc3c47361ae0174ba109340.png';

export function KinonoLogo() {
  return (
    <div className="flex items-center justify-center gap-2">
      <div className="relative w-12 h-9 flex items-center justify-center">
        {/* Left puzzle piece */}
        <div
          className="absolute"
          style={{
            width: '48px',
            height: '36px',
            left: '0',
            top: '0',
            clipPath: 'inset(0 50% 0 0)',
          }}
        >
          <img 
            src={puzzleLogo} 
            alt="Kinono puzzle - left" 
            className="w-full h-full object-contain"
          />
        </div>

        {/* Right puzzle piece */}
        <div
          className="absolute"
          style={{
            width: '48px',
            height: '36px',
            left: '0',
            top: '0',
            clipPath: 'inset(0 0 0 50%)',
          }}
        >
          <img 
            src={puzzleLogo} 
            alt="Kinono puzzle - right" 
            className="w-full h-full object-contain"
          />
        </div>
      </div>
      <span className="text-white font-light text-lg">kinono</span>
    </div>
  );
}
