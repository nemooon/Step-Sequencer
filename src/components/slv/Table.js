import React from 'react'
import { Icon } from 'react-fa'
import classNames from 'classnames'
import List from './List'
import TableColGroup from './TableColGroup'
import TableHead from './TableHead'
import TableRow from './TableRow'
import styles from './styles/list.scss'

export default class Table extends React.Component {

  static get propTypes() {
    return {
      header: React.PropTypes.instanceOf(Map),
      className: React.PropTypes.string,
      data: React.PropTypes.arrayOf(React.PropTypes.instanceOf(Map)),
      format: React.PropTypes.object,
    }
  }

  static get defaultProps() {
    return {
      header: new Map,
      className: '',
      data: [],
      format: {},
    }
  }

  constructor(props) {
    super(props)

    this.state = {
      width: [],
      minWidth: [],
      sort: null,
    }
  }

  componentDidMount() {
    this.initWidth()
  }

  getHeader() {
    const header = new Map
    for (var [field, label] of this.props.header) {
      header.set(field, label)
    }
    return header
  }

  initWidth() {
    this.setState({
      width: [],
      minWidth: [],
    })
    setTimeout(() => {
      const cols = this.refs.head.children[0].children
      const rows = this.refs.body.children
      const width = []
      for (var i = 0; i < cols.length; i++) {
        let colWidth = []

        let th = cols[i]
        let header = Array.from(th.children).filter(item => {
          return item.classList.contains(styles.cell)
        }).shift()
        colWidth.push(header.clientWidth)

        for (var tr of rows) {
          let td = tr.children[i]
          let value = Array.from(td.children).filter(item => {
            return item.classList.contains(styles.cell)
          }).shift()
          colWidth.push(value.clientWidth)
        }

        width.push(colWidth.reduce((a, b) => Math.max(a, b)))
      }

      this.setState({minWidth: width})
      this.setWidth(width, true)
    })
  }

  setWidth(width, split = false) {
    const { minWidth } = this.state

    const fixed = []
    for (let i in width) {
      fixed.push(width[i] < minWidth[i] ? minWidth[i] : width[i])
    }

    const remain = this.refs.view.clientWidth - fixed.reduce((a,b) => a+b)
    const r = remain > 0 && split ? remain / fixed.length : 0

    const adjusted = []
    for (let w of fixed) {
      adjusted.push(w + r)
    }
    if (remain > 0 && !split) {
      adjusted[adjusted.length-1] += remain
    }

    this.setState({width: adjusted})
  }

  onDividerMouseDown(index, e) {
    const { view } = this.refs
    const { width } = this.state

    let min = 10
    let left = 0
    for (var i = 0; i < index; i++) {
      left += width[i]
    }

    view.onmousemove = (e) => {
      var viewRect = view.getBoundingClientRect()
      var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
      var viewLeft = viewRect.left + scrollLeft

      let prev = (e.x + 3) - (left + viewLeft - view.scrollLeft)
      width[index] = prev > min ? prev : min

      this.setWidth(width)
    }

    view.onmouseup = (e) => {
      view.onmousemove = null
      view.onmouseup = null
    }
  }

  onDividerDoubleClick(index, e) {
    const { width, minWidth } = this.state
    width[index] = minWidth[index]
    this.setWidth(width)
  }

  onSortClick(key, e) {
    console.log('sort!', key)
  }

  render() {
    const { className, data, format } = this.props
    const { width } = this.state

    const header = this.getHeader()

    const containerStyle = {
      width: width.length > 1 ? width.reduce((a,b) => a+b) : 0,
    }

    return (
      <div ref="view" className={classNames(styles.table, className)}>
        <div className={styles.headContainer} style={containerStyle}>
          <table ref="headTable">
            <TableColGroup width={width} />
            <thead ref="head">
              <TableHead
                header={header}
                onDividerMouseDown={this.onDividerMouseDown.bind(this)}
                onDividerDoubleClick={this.onDividerDoubleClick.bind(this)}
                onSortClick={this.onSortClick.bind(this)}
              />
            </thead>
          </table>
        </div>
        <div className={styles.bodyContainer} style={containerStyle}>
          <table ref="bodyTable">
            <TableColGroup width={width} />
            <tbody ref="body">
              {data.map((row, index) =>
                <TableRow
                  key={index}
                  fields={Array.from(header.keys())}
                  item={row}
                  format={format}
                />
              )}
            </tbody>
          </table>
        </div>
      </div>
    )

  }

}
