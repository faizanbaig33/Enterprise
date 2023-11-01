import { useEffect, useState } from 'react';

export const useModelViewScript = () => {
  const modelViewUrl = 'https://unpkg.com/@google/model-viewer@^2.1.1/dist/model-viewer.min.js';

  const [state, setState] = useState(modelViewUrl ? 'loading' : 'idle');

  useEffect(() => {
    if (!modelViewUrl) {
      setState('idle');
      return;
    }
    let script = document.querySelector(`script[src="${modelViewUrl}"]`) as any;

    const handleScript = (e: Event) => {
      setState(e.type === 'load' ? 'ready' : 'error');
    };

    if (!script) {
      script = document.createElement('script');
      script.type = 'module';
      script.strategy = 'afterInteractive';
      script.src = modelViewUrl;
      script.async = true;
      document.body.appendChild(script);
      script.addEventListener('load', handleScript);
      script.addEventListener('error', handleScript);
    }

    script.addEventListener('load', handleScript);
    script.addEventListener('error', handleScript);

    return () => {
      script.removeEventListener('load', handleScript);
      script.removeEventListener('error', handleScript);
    };
  }, [modelViewUrl]);

  return state;
};
