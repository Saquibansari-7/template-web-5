import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import leftGateD from '../assets/opening/left-h-gate-d.png';
import rightGateD from '../assets/opening/right-h-gate-d.png';
import leftGateM from '../assets/opening/left-h-gate-mo.png';
import rightGateM from '../assets/opening/right-h-gate-mo.png';
import sealImg from '../assets/opening/h-stamp.png';
import { useMusic } from './MusicProvider';

export default function OpeningAnimation({ onOpen }: { onOpen: () => void }) {
  const [done, setDone] = useState(false);
  const sceneRef = useRef<HTMLDivElement>(null);
  const leftGateDRef = useRef<HTMLImageElement>(null);
  const rightGateDRef = useRef<HTMLImageElement>(null);
  const leftGateMRef = useRef<HTMLImageElement>(null);
  const rightGateMRef = useRef<HTMLImageElement>(null);
  const openedRef = useRef(false);
  const { play } = useMusic();

  useEffect(() => {
    // center each seal horizontally via transform, keep its own CSS top (desktop vs mobile)
    gsap.set('.seal', { xPercent: -50, x: 0, y: 0 });
    const breathe = gsap.to('.seal', {
      scale: 1.08,
      duration: 1.4,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      transformOrigin: '50% 50%',
    });
    return () => {
      breathe.kill();
    };
  }, []);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    const prevTouch = document.body.style.touchAction;
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';
    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.touchAction = prevTouch;
    };
  }, []);

  const startShow = () => {
    if (openedRef.current) return;
    openedRef.current = true;

    play();

    gsap.killTweensOf('.seal');
    gsap.set('.seal', { pointerEvents: 'none' });

    const tl = gsap.timeline({
      onComplete: () => {
        setDone(true);
        onOpen();
      },
    });

    tl.to('.seal', { scale: 1.4, rotation: 15, duration: 0.3 })
      .to('.seal', { scale: 0, opacity: 0, duration: 0.6, ease: 'back.in(2)' })
      .to(
        [leftGateDRef.current, leftGateMRef.current],
        { x: '-50vw', duration: 2.5, ease: 'power4.inOut' },
        '-=0.4'
      )
      .to(
        [rightGateDRef.current, rightGateMRef.current],
        { x: '50vw', duration: 2.5, ease: 'power4.inOut' },
        '<'
      )
      .to(sceneRef.current, { opacity: 0, duration: 1.6, ease: 'power2.inOut' }, '-=0.2');
  };

  if (done) return null;

  return (
    <div
      id="scene"
      ref={sceneRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        width: '100vw',
        height: '100dvh',
        overflow: 'hidden',
        background:
          'radial-gradient(circle at 50% 40%, #6B0000 0%, #8B0000 45%, #4a0000 100%)',
      }}
    >
      <img ref={leftGateDRef} src={leftGateD} alt="" className="gate gateDesktop" id="leftGateD" />
      <img ref={rightGateDRef} src={rightGateD} alt="" className="gate gateDesktop" id="rightGateD" />
      <img ref={leftGateMRef} src={leftGateM} alt="" className="gate gateMobile" id="leftGateM" />
      <img ref={rightGateMRef} src={rightGateM} alt="" className="gate gateMobile" id="rightGateM" />

      <img src={sealImg} alt="Tap to open" className="seal sealDesktop" id="sealD" onClick={startShow} />
      <img src={sealImg} alt="Tap to open" className="seal sealMobile" id="sealM" onClick={startShow} />
    </div>
  );
}
