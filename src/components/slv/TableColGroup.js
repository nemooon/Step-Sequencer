import React from 'react'
import { Icon } from 'react-fa'
import classNames from 'classnames'
import styles from './styles/list.scss'

const TableColGroup = ({ width }) => {
  return (
    <colgroup>
      {width.map((w, i) => {
        let isLast = width.length > i+1
        let style = {
          width: w > 0 && isLast ? w : w,
        }
        return <col key={i} style={style} />
      })}
    </colgroup>
  )
}

TableColGroup.propTypes = {
  width: React.PropTypes.array,
}
TableColGroup.defaultProps = {
  width: [],
}

export default TableColGroup
