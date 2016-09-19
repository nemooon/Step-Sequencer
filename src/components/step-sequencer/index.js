import React from 'react'
import { Icon } from 'react-fa'
import classNames from 'classnames'
import styles from './styles/style.scss'
// import styles from './styles/style2.scss'

export default class StepSequencer extends React.Component {

  static get defaultProps() {
    return {
      scales: new Set([4, 8, 3, 6]),
      instruments: new Map([
        [1, {label: 'NONE'}],
        [2, {label: 'NONE'}],
        [3, {label: 'NONE'}],
        [4, {label: 'NONE'}],
        [5, {label: 'NONE'}],
        [6, {label: 'NONE'}],
        [7, {label: 'NONE'}],
        [8, {label: 'NONE'}],
        [9, {label: 'NONE'}],
        [10, {label: 'NONE'}],
        [11, {label: 'NONE'}],
        [12, {label: 'NONE'}],
        [13, {label: 'NONE'}],
        [14, {label: 'NONE'}],
        [15, {label: 'NONE'}],
        [16, {label: 'NONE'}],
      ]),
    }
  }

  constructor(props) {
    super(props)

    const scales = props.scales.values()

    this.state = {
      play: null,
      loop: true,
      tempo: 120,
      scales: scales,
      scale: scales.next().value,
      step: 1,
      inst: 1,
      lastStep: 16,
      stepButtonMode: null,
      sequenceData: new Map([
        [ 1, [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0]],
        [ 2, [0,1,0,0, 0,1,0,0, 0,1,0,0, 0,1,0,0]],
        [ 3, [0,0,0,0, 1,0,0,0, 0,0,0,0, 0,1,0,0]],
        [ 4, [0,0,0,0, 0,1,0,0, 0,0,0,0, 0,0,1,1]],
        [ 5, [1,0,0,0, 0,0,1,0, 0,0,0,0, 0,0,0,0]],
        [ 6, [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0]],
        [ 7, [0,0,1,0, 0,0,0,0, 1,0,1,0, 0,0,0,0]],
        [ 8, [0,0,0,0, 0,0,0,1, 0,0,0,0, 0,0,0,0]],
        [ 9, [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0]],
        [10, [0,0,0,1, 0,0,0,0, 0,0,0,1, 0,0,0,0]],
        [11, [0,1,0,0, 1,0,0,0, 1,0,0,1, 0,0,0,0]],
        [12, [0,0,0,0, 0,0,1,1, 0,0,0,0, 1,1,1,0]],
        [13, [0,1,0,1, 0,1,0,1, 0,1,0,1, 0,1,1,1]],
        [14, [0,0,1,0, 0,0,1,0, 0,0,1,0, 0,0,1,0]],
        [15, [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0]],
        [16, [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0]],
      ]),
    }
  }

  start() {
    const { play, tempo, scale } = this.state
    if (play == null) {
      this.setState({play: setInterval(this.ticker.bind(this), 60 * 1000 / tempo / scale)})
    }
  }

  stop() {
    const { play } = this.state
    if (play) {
      clearInterval(play)
      this.setState({play: null, step: 1})
    }
  }

  startStop() {
    const { play } = this.state
    if (play) {
      this.stop()
    } else {
      this.start()
    }
  }

  toggleLoop() {
    const { loop } = this.state
    this.setState({loop: !loop})
  }

  ticker() {
    const { loop, scale, step, lastStep, sequenceData } = this.state

    const beat = new Map(Array.from(sequenceData).map(([inst, sequence]) => [inst, sequence[step-1]]))
    this.props.playBeat(beat)

    if (step < lastStep) {
      this.setState({step: step+1})
    } else {
      this.setState({step: 1})
      if (loop == false) {
        this.stop()
      }
    }
  }

  setTempo(e) {
    const { play, scale } = this.state
    const tempo = e.target.value
    this.setState({tempo})
    if (play) {
      clearInterval(play)
      this.setState({play: setInterval(this.ticker.bind(this), 60 * 1000 / tempo / scale)})
    }
  }

  nextScale(e) {
    const { play, tempo } = this.state
    let { scales } = this.state
    let nextScale = scales.next()
    if (nextScale.done) {
      scales = this.props.scales.values()
      nextScale = scales.next()
    }
    const scale = nextScale.value
    this.setState({scales, scale})
    if (play) {
      clearInterval(play)
      this.setState({play: setInterval(this.ticker.bind(this), 60 * 1000 / tempo / scale)})
    }
  }

  setStepButtonMode(mode, e) {
    const { stepButtonMode } = this.state
    this.setState({
      stepButtonMode: stepButtonMode != mode ? mode : null,
    })
  }

  selectInst(step, e) {
    const { stepButtonMode } = this.state
    this.setState({
      inst: step,
      stepButtonMode: stepButtonMode == 'instSelect' ? null : stepButtonMode,
    })
  }

  clickStepBtn(step, e) {
    const { inst, stepButtonMode, sequenceData } = this.state
    switch (stepButtonMode) {
      case 'lastStep':
        this.setState({
          lastStep: step,
          stepButtonMode: null,
        })
        break;
      case 'instSelect':
        this.setState({
          inst: step,
          stepButtonMode: null,
        })
        break;
      case 'instPlay':
        this.props.playInst(step, 1)
        break;
      case 'instClear':
        sequenceData.set(step, [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0])
        this.setState({stepButtonMode: null, sequenceData})
        break;
      default:
        const sequence = sequenceData.get(inst)
        let currentValue = sequence[step-1]
        sequence[step-1] = currentValue > 0 ? 0 : 1
        sequenceData.set(inst, sequence)
        this.setState({sequenceData})
    }
  }

  render() {
    const { play, loop, tempo, scale, step, inst, lastStep, stepButtonMode, sequenceData } = this.state

    const steps = []
    for (var i = 1; i <= 16; i++) {
      let isActive = false
      let isSelect = false
      let isCurrent = play && i == step
      switch (stepButtonMode) {
        case 'lastStep':
          isSelect = i <= lastStep
          break;
        case 'instSelect':
          isActive = i == inst
          break;
        case 'instPlay':
          // isActive = i == inst
          // isCurrent = false
          break;
        default:
          let sequence = sequenceData.get(inst)
          isActive = sequence[i-1] > 0
          if (sequence[i-1] > 1) isCurrent = true
          break;
      }

      let btnClassNames = {
        [styles.active]: isActive,
        [styles.select]: isSelect,
        [styles.current]: isCurrent,
        [styles.disabled]: i > lastStep,
      }
      const instrument = this.props.instruments.get(i)

      steps.push(
        <div key={i} className={styles.step}>
          <div className={styles.stepLabel}>{i}</div>
          <div className={styles.instLabel} onClick={this.selectInst.bind(this, i)}>{instrument.label}</div>
          <button type="button" onMouseDown={this.clickStepBtn.bind(this, i)} className={classNames(styles.stepBtn, btnClassNames)} />
        </div>
      )
    }

    return (
      <div className={styles.stepSequencer}>
        <div className="btn-toolbar m-b-2">
          <div className="btn-group">
            <button type="button" className={classNames('btn', 'btn-secondary')} onClick={this.startStop.bind(this)}>
              START/STOP
            </button>
          </div>
          {/*
          <div className="btn-group">
            <button type="button" className={classNames('btn', loop ? 'btn-primary' : 'btn-secondary')} onClick={this.toggleLoop.bind(this)}>
              <Icon name="repeat" />
            </button>
          </div>
          */}
          <div className="btn-group">
            <input type="number" className="form-control" min="1" max="999" defaultValue={tempo} onChange={this.setTempo.bind(this)} />
          </div>
          <div className="btn-group">
            <button type="button" className={classNames('btn', stepButtonMode == 'lastStep' ? 'btn-primary' : 'btn-secondary')} onClick={this.setStepButtonMode.bind(this, 'lastStep')}>
              LAST STEP
            </button>
            <button type="button" className={classNames('btn', 'btn-secondary')} onClick={this.nextScale.bind(this)}>
              SCALE
            </button>
          </div>
          <div className="btn-group">
            <button type="button" className={classNames('btn', stepButtonMode == 'instSelect' ? 'btn-primary' : 'btn-secondary')} onClick={this.setStepButtonMode.bind(this, 'instSelect')}>
              INST SELECT
            </button>
            <button type="button" className={classNames('btn', stepButtonMode == 'instPlay' ? 'btn-primary' : 'btn-secondary')} onClick={this.setStepButtonMode.bind(this, 'instPlay')}>
              INST PLAY
            </button>
            <button type="button" className={classNames('btn', stepButtonMode == 'instClear' ? 'btn-primary' : 'btn-secondary')} onClick={this.setStepButtonMode.bind(this, 'instClear')}>
              CLEAR
            </button>
          </div>
        </div>
        <div className={styles.measure}>
          <div className={styles.scales}>
            <div className={classNames(styles.scale6, {[styles.active]: scale == 6})}><s /><s /><s /></div>
            <div className={classNames(styles.scale3, {[styles.active]: scale == 3})}><s /><s /><s /><s /><s /><s /></div>
            <div className={classNames(styles.scale8, {[styles.active]: scale == 8})}><s /><s /></div>
            <div className={classNames(styles.scale4, {[styles.active]: scale == 4})}><s /><s /><s /><s /></div>
          </div>
          <div className={styles.steps}>
            {steps}
          </div>
        </div>
      </div>
    )

  }

}
