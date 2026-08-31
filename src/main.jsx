import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles/index.css';

// StrictMode 미사용: WebGL 지도(MapLibre)가 dev 이중 마운트에서
// 생성→제거→재생성되며 스타일 로드가 중단되는 문제 방지.
createRoot(document.getElementById('root')).render(<App />);
