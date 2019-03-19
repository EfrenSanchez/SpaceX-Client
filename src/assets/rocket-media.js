//Dependencies
import React from 'react';
import YouTube from 'react-youtube';

//Images
import imgFalcon1 from './rockets/falcon1.jpg'
import imgFalcon9 from './rockets/falcon9.png';
import imgFalconheavy from './rockets/falcon-heavy.png';
import imgBfr from './rockets/bfr.png';

//Components with images
export const Img = ({id, alt, className}) => {
  return (
    <div className={className}>
      {{
        'falcon1': (
          <img src={imgFalcon1} alt={alt} height="100%"/>
        ),
        'falcon9': (
          <img src={imgFalcon9} alt={alt} height="100%"/>
        ),
        'falconheavy': (
          <img src={imgFalconheavy} alt={alt} height="100%"/>
        ),
        'bfr': (
          <img src={imgBfr} alt={alt} height="100%"/>
        ),
        default: (
          <img src={imgFalcon9} alt='Falcon 9' height="100%" className="rocket-img"/>
        )
      }[id]}
    </div>
  );
}

export const Video = ({id, opts}) => {
  return (
    <div>
      {{
        'falcon1': (
          <YouTube
            videoId="yTaIDooc8Og"
            opts={opts}
          />
        ),
        'falcon9': (
          <YouTube
            videoId="H6hYEqrP56I"
            opts={opts}
          />
        ),
        'falconheavy': (
          <YouTube
            videoId="wbSwFU6tY1c"
            opts={opts}
          />
        ),
        'bfr': (
          <YouTube
            videoId="0qo78R_yYFA"
            opts={opts}
          />
        ),
        default: (
          <YouTube
            videoId="0qo78R_yYFA"
            opts={opts}
          />
        )
      }[id]}
    </div>
  );
} 