import './Info.css';

function Info({ progress, buffered, currentTime, duration, onProgressClick }) {
  return (
    <> 

    <div className='progress-container' onClick={onProgressClick}>
      <div className='buffered-bar' style={{ width: `${buffered}%` }}></div>
      <div className='progress-bar' style={{ width: `${progress}%` }}></div>
      <div className='time-display'>
        <span>{currentTime}</span> / <span>{duration}</span>
      </div>
    </div>
    </>

   
  );
}

export default Info;