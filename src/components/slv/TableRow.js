import React from 'react'
import { Icon } from 'react-fa'
import classNames from 'classnames'
import TableValue from './TableValue'
import styles from './styles/list.scss'

const TableRow = ({ fields, item, format }) => {
  return (
    <tr>
      {fields.map(name => {
        return <TableValue type={format[name]} key={name} value={item.get(name)} />
      })}
    </tr>
  )
}

TableRow.propTypes = {
  fields: React.PropTypes.array,
  item: React.PropTypes.instanceOf(Map),
  format: React.PropTypes.object,
}
TableRow.defaultProps = {
  fields: [],
  item: new Map,
  format: {},
}

export default TableRow
