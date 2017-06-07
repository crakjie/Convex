// @flow
import React, { Component } from 'react';
import styles from './ConfigPane.scss';




export default function ConfigPane(props) {

  function renderConfig(config) {
    const isSelected = config === this.props.selectedConfig;
    return (
      <li>
        <div className={style.item}>
          <button
            key={config.name}
            onClick={() => this.props.onClick(config)}
            className={(isSelected ? styles.selected : styles.notselected)}
          >
            {config.name}
          </button>
        </div>
      </li>
    );
}

  const configList = props.configs.map(renderConfig);
  return (
    <div className={styles.container} >
      <div>Presets</div>
      <button
        className="btn btn--super-compact"
      >add</button>
      <ul>
      {configList}
      </ul>
    </div>
  );


}
