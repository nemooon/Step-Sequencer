import React from 'react'
import { Icon } from 'react-fa'
import classNames from 'classnames'
import moment from 'moment'
import numeral from 'numeral'
import styles from './styles/list.scss'

export default class TableValue extends React.Component {

  static get propTypes() {
    return {
      type: React.PropTypes.oneOf(Object.keys(this.formatTypes)),
      value: React.PropTypes.any.isRequired,
      align: React.PropTypes.oneOf(['left', 'center', 'right']),
    }
  }

  static get defaultProps() {
    return {
      type: 'string',
      value: '',
      align: 'left',
    }
  }

  static get formatTypes() {
    return {
      string: val => val,
      number: val => numeral(val).format('0,0'),
      date: val => moment(val).format('LL'),
      datetime: val => moment(val).format('LL HH:mm:ss'),
      fromNow: val => moment(val).fromNow(),
    }
  }

  render() {
    const { type, value, align } = this.props
    return (
      <td style={{textAlign: align}}>
        <div className={classNames(styles.cell, styles.valueCell)}>
          {TableValue.formatTypes[type](value)}
        </div>
      </td>
    )
  }

}
