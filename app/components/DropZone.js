import React, { Component } from 'react';
import { NativeTypes } from 'react-dnd-html5-backend';
import { DropTarget } from 'react-dnd';
import styles from './DropZone.css';

const fileTarget = {
  drop(props, monitor) {
    console.log(monitor.getItem().files);
    props.onDrop(monitor.getItem().files);
  }
};

class FileDropZone extends Component {
  render() {
    const { connectDropTarget, isOver, canDrop } = this.props;
    return connectDropTarget(
      <div className={styles.container}>
        {!isOver && !canDrop && 'Drag files from the hard drive'}
        {!isOver && canDrop && 'Drag the files here'}
        {isOver && 'Drop the files'}
      </div>
    );
  }
}

export default DropTarget(NativeTypes.FILE, fileTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))(FileDropZone);
