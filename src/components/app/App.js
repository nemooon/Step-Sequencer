import React from 'react'
import pkg from 'package.json'
import '!style!css!sass!styles/bootstrap.scss'
import styles from 'styles/app.scss'

export default class App extends React.Component {

  static get childContextTypes() {
    return {
      appdata: React.PropTypes.object,
    }
  }

  getChildContext() {
    return {
      appdata: pkg,
    }
  }

  render() {
    return (
      <div className={styles.app}>
        {this.props.children}
      </div>
    )
        // <Dialog />
  }

}
