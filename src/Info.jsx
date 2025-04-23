import './Info.css';

function Info() {
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('0:00');
  
  const handleProgressClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = pos * audioRef.current.duration;
  };

  return (

    <div className='progress-container' onClick={handleProgressClick}>
       <div className='progress-bar' style={{ width: `${progress}%` }}></div>
  </div>
  );
}

export default Info;