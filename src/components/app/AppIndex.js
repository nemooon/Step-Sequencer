import React from 'react'
import styles from 'styles/app.scss'

import StepSequencer from 'components/step-sequencer'
import instruments from 'components/step-sequencer/instruments/clean'

const audioCtx = new (window.AudioContext || window.webkitAudioContext)

export default props => {

  const playInst = (inst, value) => {
    inst = instruments.get(inst)
    audioCtx.decodeAudioData(inst.sound.buffer, buffer => {
      var source = audioCtx.createBufferSource()
      source.buffer = buffer
      source.connect(audioCtx.destination)
      source.start(0)
    })
  }

  const playBeat = (beat) => {
    for (var [inst, value] of beat) {
      if (inst && value > 0) {
        playInst(inst, value)
      }
    }
  }

  return (
    <div className={styles.appCenter}>
      <StepSequencer playBeat={playBeat} playInst={playInst} instruments={instruments} />
    </div>
  )
}
