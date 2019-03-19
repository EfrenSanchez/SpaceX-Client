//Dependencies
import React from "react";
import Moment from "react-moment";

//Images
import thumb from '../../assets/iconmonstr-thumb-9.svg';
import fail from '../../assets/fail.png';
import success from '../../assets/success.png';

//Styles
import './launchesItems.css';

class LaunchItem extends React.Component {

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const { onLoadMore } = this.props;
    if(this.scroller && window.scrollY + window.innerHeight >= document.body.scrollHeight) {
      onLoadMore();
    }
  };

  render() {
    const { entries } = this.props;
    return( 
      <div 
        style={{overflowY:'auto'}}
        ref={(scroller) => {
          this.scroller = scroller
        }}>
        <ul className="launches">
        {
          entries.map((launch, index) => (

            <li key={launch.flight_number} className={index % 2 === 0 ? "launchItem" : "launchItem2"}> 

              <img src={launch.links.mission_patch} alt={launch.mission_name} width="25%" className="launchItem_img"/>

              <div className="launchItem-body">
                <div className="launchItem-body_top">
                  <span className="launchItem_date">
                  Date: <Moment format="DD-MM-YYYY HH:mm">{launch.launch_date_local}</Moment></span>
                </div>

                <h3 className="launchItem_title">{launch.flight_number}. {launch.mission_name}</h3>
                <p className="launchItem_desc">{launch.details ? launch.details : `No mission details`}</p>
                <br/>
                
                <div className="launchItem-bottom">
                  <div className="launchItem-bottom_pers">
                    <span className="launchItem_site">Launch site: {launch.launch_site.site_name}</span>
                    <span className="launchItem_rocket">Rocket: {launch.rocket.rocket_name}</span>
                  </div>

                  <div className="launchItem-bottom_reveal">
                  {!launch.launch_success 
                    ? <img src={fail} alt="FAIL" width="25%"/>
                    : <img src={success} alt="SUCCESS" width="15%"/>
                  }
                  </div>
                </div>
                <br/>
              </div>

              <div className="launchItem_icon">
                <img src={thumb} alt="thumb"  className={launch.launch_success ? 'launch_icon-success' : 'launch_icon-fail'}/>
              </div>
            </li>

          ))
        }
        </ul>
      </div>
    );
  }
}

export default LaunchItem;