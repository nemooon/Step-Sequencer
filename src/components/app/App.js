import React from 'react'
import '!style!css!sass!styles/bootstrap.scss'
import styles from 'styles/app.scss'

export default class App extends React.Component {

  render() {
    return (
      <div className={styles.app}>
        {this.props.children}
      </div>
    )
  }

}
