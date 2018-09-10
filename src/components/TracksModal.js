import React from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal';
import './../styles/Tracks.css';
export default class TracksModal extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node,
    handleClose: PropTypes.func.isRequired
  };

  render() {
    return (
      <Modal>
        <div className="wrapper">
          <div className="inner">
            <button onClick={this.props.handleClose} className="close">&times;</button>
            {this.props.children}
          </div>
        </div>
      </Modal>
    );
  }
}
