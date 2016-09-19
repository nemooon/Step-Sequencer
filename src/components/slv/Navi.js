import React from 'react'
import { Icon } from 'react-fa'
// import { Popover, PopoverTitle, PopoverContent }  from 'reactstrap';
import classNames from 'classnames'
import List from './List'
import styles from './styles/list.scss'

export default class Navi extends React.Component {

  static get propTypes() {
    return {
      ...List.propTypes
    }
  }

  static get defaultProps() {
    return {
      ...List.defaultProps
    }
  }

  constructor(props) {
    super(props)

    this.state = {
      popoverOpen: false,
      formData: new Map,
    }
  }

  fetch(page = null, formData = null) {
    const { paginate, orderby, fetch, listConfig } = this.props
    const perpage = 50

    if (formData) this.setState({formData})
    else { formData = this.state.formData }
    if (page == null) page = paginate.current

    const keyword = formData.get('keyword')
    fetch(keyword, orderby, perpage, page)
  }

  onSubmitFilter(e) {
    e.preventDefault()
    const formData = new Map()
    formData.set('keyword', this.refs.filter.keyword.value)
    this.fetch(1, formData)
  }

  onClickInfo(e) {
    this.setState({popoverOpen: !this.state.popoverOpen})
  }

  onChangePage(e) {
    this.refs.page.innerHTML = this.refs.range.value
  }

  onClickReload(e) {
    this.fetch()
  }

  onClickJump(e) {
    this.fetch(this.refs.range.value)
  }

  onClickPrev(e) {
    this.fetch(this.props.paginate.prev)
  }

  onClickNext(e) {
    this.fetch(this.props.paginate.next)
  }

  onClickFirst(e) {
    this.fetch(1)
  }

  onClickLast(e) {
    this.fetch(this.props.paginate.last)
  }

  render() {
    const { type, heading, actions, filterable, keyword, paginate, fetching, fetch } = this.props
    return (
      <div className={classNames(styles['list-navi'], {[styles['list-navi-v']]: type == 'group'})}>
        {heading ?
          <div className={styles['list-navi-heading']}>{heading}</div>
        : null}
        {actions.length > 0 ?
          <div className={classNames(styles['list-navi-btn-group'], 'btn-group btn-group-sm')}>
            {actions.map(({icon, label, onClick}, index) => {
              return <button key={index} type="button" className="btn btn-secondary" onClick={onClick}>{icon ? <Icon name={icon} fixedWidth /> : null}{label}</button>
            })}
          </div>
        : null}
        {filterable ?
          <form ref="filter" className={styles['list-navi-filter']} onSubmit={this.onSubmitFilter.bind(this)}>
            <div className="input-group input-group-sm">
              <span className="input-group-addon"><Icon name="filter" fixedWidth /></span>
              <input type="text" name="keyword" className="form-control" defaultValue={keyword} placeholder="絞り込み" />
              <span className="input-group-btn">
                <button type="submit" className="btn btn-secondary">検索</button>
              </span>
            </div>
          </form>
        :
          <div className={styles['list-navi-space']} />
        }
        {fetch && paginate ?
          <div className={styles['list-navi-pager']}>
            <button type="button" className={styles['list-navi-btn']} onClick={this.onClickFirst.bind(this)} disabled={paginate.current==1}><Icon name="angle-double-left" /></button>
            <button type="button" className={styles['list-navi-btn']} onClick={this.onClickPrev.bind(this)} disabled={!paginate.prev}><Icon name="angle-left" /></button>
            <button id="info" type="button" className={styles['list-navi-btn']} onClick={this.onClickInfo.bind(this)} disabled={!paginate.total}>{paginate.total ? <span>{paginate.total}件中 {paginate.from}件 ～ {paginate.to}件</span> : <Icon name="ellipsis-h" />}</button>
            <button type="button" className={styles['list-navi-btn']} onClick={this.onClickNext.bind(this)} disabled={!paginate.next}><Icon name="angle-right" /></button>
            <button type="button" className={styles['list-navi-btn']} onClick={this.onClickLast.bind(this)} disabled={!paginate.last||paginate.current==paginate.last}><Icon name="angle-double-right" /></button>
          </div>
            // <Popover placement="bottom" isOpen={this.state.popoverOpen} target="info" toggle={this.onClickInfo.bind(this)}>
            //   <PopoverContent>
            //     <div><input ref="range" type="range" name="range" min={1} max={paginate.last} defaultValue={paginate.current} onChange={this.onChangePage.bind(this)} disabled={paginate.last==1} /></div>
            //     <div><button type="button" className="btn btn-secondary btn-block btn-sm" onClick={this.onClickJump.bind(this)} disabled={paginate.last==1}>ページ<span ref="page">{paginate.current}</span>へ移動</button></div>
            //   </PopoverContent>
            // </Popover>
        : null}
        {fetch ?
          <div className={styles['list-navi-actions']}>
            <button type="button" className={styles['list-navi-btn']} onClick={this.onClickReload.bind(this)}><Icon name="refresh" /></button>
          </div>
        : null}
      </div>
    )
  }

}
