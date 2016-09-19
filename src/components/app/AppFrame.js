import React from 'react'
import classNames from 'classnames'
import styles from 'styles/app.scss'

class AppFrame extends React.Component {

  render() {
    const { children } = this.props

    return (
      <div className={styles.appFrame}>
        <div className={styles.appContainer}>
          <div className={styles.appContent}>
            {children}
          </div>
        </div>
      </div>
    )
  }
}

export default AppFrame
