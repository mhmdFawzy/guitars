import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCompass,
  faPhone,
  faEnvelope,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { getSiteData } from "./../../../redux/actions/siteActions";
export class Footer extends Component {
  componentDidMount() {
    if (Object.keys(this.props.siteInfo).length === 0) {
      this.props.dispatch(getSiteData());
    }
  }

  render() {
    return (
      <footer className="bck_b_dark">
        <div className="container">
          <div className="logo">Waves</div>
          <div className="wrapper">
            <div className="left">
              <h2>Contact information</h2>
              <div className="business_nfo">
                <div className="tag">
                  <FontAwesomeIcon icon={faCompass} className="icon" />
                  <div className="nfo">
                    <div>Address</div>
                    <div>
                      {this.props.siteInfo.siteData &&
                        this.props.siteInfo.siteData[0].address}
                    </div>
                  </div>
                </div>
                <div className="tag">
                  <FontAwesomeIcon icon={faPhone} className="icon" />
                  <div className="nfo">
                    <div>Phone</div>
                    <div>
                      {this.props.siteInfo.siteData &&
                        this.props.siteInfo.siteData[0].phone}
                    </div>
                  </div>
                </div>
                <div className="tag">
                  <FontAwesomeIcon icon={faClock} className="icon" />
                  <div className="nfo">
                    <div>working hours</div>
                    <div>
                      {this.props.siteInfo.siteData &&
                        this.props.siteInfo.siteData[0].hours}
                    </div>
                  </div>
                </div>
                <div className="tag">
                  <FontAwesomeIcon icon={faEnvelope} className="icon" />
                  <div className="nfo">
                    <div>Email</div>
                    <div>
                      {this.props.siteInfo.siteData &&
                        this.props.siteInfo.siteData[0].email}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="right">
              <h2>Be the first to know</h2>
              <div>
                Get all latest information about all our products and events.
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    siteInfo: state.siteInfo,
  };
};
export default connect(mapStateToProps)(Footer);
