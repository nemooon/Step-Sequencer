import React from 'react'
import Navi from './Navi'
import Table from './Table'
import TableValue from './TableValue'
import styles from './styles/list.scss'

export default class List extends React.Component {

  static get propTypes() {
    return {
      config: React.PropTypes.string,
      defaultConfig: React.PropTypes.object,
      heading: React.PropTypes.string,
      filterable: React.PropTypes.bool,
      selectable: React.PropTypes.bool,
      sortable: React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.objectOf(React.PropTypes.bool)]),
      multiple: React.PropTypes.bool,
      header: React.PropTypes.instanceOf(Map),
      keyName: React.PropTypes.string,
      data: React.PropTypes.arrayOf(React.PropTypes.instanceOf(Map)),
      keyword: React.PropTypes.string,
      paginate: React.PropTypes.object,
      fetching: React.PropTypes.bool,
      format: React.PropTypes.object,
      orderby: React.PropTypes.string,
      actions: React.PropTypes.array,
      onSelect: React.PropTypes.func,
      fetch: React.PropTypes.func,
    }
  }

  static get defaultProps() {
    return {
      config: null,
      defaultConfig: {},
      heading: null,
      filterable: false,
      selectable: false,
      sortable: false,
      multiple: false,
      header: new Map,
      keyName: 'id',
      data: [],
      keyword: '',
      paginate: { total: 0, per: 0, current: 1, last: 1, next: null, prev: null, from: 0, to: 0 },
      fetching: false,
      format: {},
      orderby: null,
      actions: [],
      // onSelect: null,
      // fetch: null,
    }
  }

  static get formatTypes() {
    return TableValue.formatTypes
  }

  get navi() {
    return this.refs.navi
  }

  get table() {
    return this.refs.table
  }

  render() {
    return (
      <div className={styles.list}>
        <Navi ref="navi" {...this.props} />
        <Table ref="table" {...this.props} />
      </div>
    )
  }

}
