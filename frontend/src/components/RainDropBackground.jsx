// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const Raindrop = ({ delay, duration, xPos }) => {
  return (
    <motion.div
      initial={{ y: '-10vh', opacity: 0 }}
      animate={{ y: ['-10vh', '110vh'], opacity: [0, 0.05, 0.05] }}
      transition={{
        duration,
        repeat: Infinity,
        repeatType: 'loop',
        delay,
        ease: 'linear',
      }}
      style={{
        position: 'absolute',
        left: `${xPos}%`,
        width: '2px',
        height: '26px',
        backgroundColor: 'rgba(160,210,235,0.9)', // visible light blue
        borderRadius: '50%',
        transform: 'translateX(-50%)',
      }}
      aria-hidden="true"
    />
  );
};

const RainingBackground = ({ dropCount = 60 }) => {
  const drops = Array.from({ length: dropCount }).map((_, index) => {
    const delay = Math.random() * 5; // random delay
    const duration = 1.2 + Math.random() * 1.8; // 1.2 - 3s
    const xPos = Math.random() * 100;
    return <Raindrop key={index} delay={delay} duration={duration} xPos={xPos} />;
  });

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        zIndex: 0,            // keep visible; put your content above with zIndex > 0
        pointerEvents: 'none',
        backgroundColor: 'transparent',
      }}
    >
      {drops}
    </div>
  );
};

export default RainingBackground;