import React from 'react'
import { Icon } from 'react-fa'
import classNames from 'classnames'
import styles from './styles/list.scss'

const TableHead = ({ header, onDividerMouseDown, onDividerDoubleClick, onSortClick }) => {
  return (
    <tr>
      {Array.from(header.entries()).map(([key, value], i) => {
        let isSortable = true
        let sorting = false
        let direction = 'asc'
        return (
          <th key={key} title={value}>
            <div className={classNames(styles.cell, styles.headerCell, {[styles.sortable]: isSortable})} onClick={e => onSortClick(key, e)}>
              <div className={styles.headerLabel}>
                {value}
                {isSortable ?
                  <Icon className={classNames({active: sorting})} name={sorting ? `sort-${direction == 'asc' ? 'down' : 'up'}` : 'sort'} fixedWidth />
                : null}
              </div>
              <Icon name="cog" fixedWidth />
            </div>
            <div className={styles.divider} onMouseDown={e => onDividerMouseDown(i, e)} onDoubleClick={e => onDividerDoubleClick(i, e)} />
          </th>
        )
      })}
    </tr>
  )
}

TableHead.propTypes = {
  header: React.PropTypes.instanceOf(Map),
  onDividerMouseDown: React.PropTypes.func,
  onDividerDoubleClick: React.PropTypes.func,
  onSortClick: React.PropTypes.func,
}
TableHead.defaultProps = {
  header: new Map,
  onDividerMouseDown: () => {},
  onDividerDoubleClick: () => {},
  onSortClick: () => {},
}

export default TableHead
