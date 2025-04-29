import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import './not-found.css';

const NotFound = (): JSX.Element => {
  useEffect(() => {
    const canvas = document.getElementById(
      'matrix-canvas'
    ) as HTMLCanvasElement;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);

    const drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }

    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$+-*/=%"\'#&_(),.;:?!\\|{}<>[]^~';

    function draw() {
      if (ctx) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#0F0';
        ctx.font = `${fontSize}px monospace`;
        for (let i = 0; i < drops.length; i++) {
          const text = chars[Math.floor(Math.random() * chars.length)];
          ctx.fillText(text, i * fontSize, drops[i] * fontSize);

          if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
          }

          drops[i]++;
        }
      }
    }

    const animationId = setInterval(draw, 33);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="page page--gray page--not-found">
      <main className="page__main page__main--not-found">
        <Helmet><title>Page not found</title></Helmet>;
        <canvas id="matrix-canvas" className="matrix-canvas"></canvas>
        <div className="not-found-content">
          <div className="not-found-box">
            <h1 className="not-found-title">404</h1>
            <p className="not-found-message">Page not found</p>
            <p className="not-found-description">
              Neo, you are lost in the Matrix...
            </p>
            <Link to="/" className="not-found-link">
              Back to Main Page
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
