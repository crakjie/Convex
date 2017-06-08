// @flow
import React, { Component } from 'react';
import InlineEdit from 'react-edit-inline';
import styles from './ConfigPane.scss';




export default function ConfigPane(props) {

  function setName(name, obj) {
    const x = obj;
    x.name = name;
    return obj;
  }

  function renderConfig(config) {
    const isSelected = config === props.selectedConfig;
    return (
      <li key={config.uid}>
        <div className={styles.item}>
          <button
            key={config.name}
            onClick={() => props.onClick(config)}
            className={(isSelected ? styles.selected : styles.notselected)}
          >
            <InlineEdit
              text={config.name}
              paramName="name"
              change={(value) => props.onClick(setName(value.name, config))}
            />
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
        onClick={() => props.onCreate()}
        className={styles.addButton}
      ><i className="fa fa-plus-circle" /></button>
      <ul>
      {configList}
      </ul>
    </div>
  );


}
